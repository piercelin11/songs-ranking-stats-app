import { prisma } from "../prisma";

const userId = "c9485cbd-9d5a-4889-86b5-403db666b9d3"

function toString(params: number | string) : string {
  if (typeof params === "number") return params.toString() || ""
  else return params
}

//get all dates
export async function fetchAllDates (artist: number | string, take?: number , user?: string) {
  const artistId = toString(artist);

  const data = await prisma.dates.findMany({
    where: {
        user_id: userId,
        rankings: {
            some: {
                songs: {
                    albums: {
                      artist_id: artistId
                    }
                }
            }
        }
    },
    include: {
        rankings: {
            include: {
              songs: {
                include: {
                  albums: true,
                  artists: true,
                }
              }
            },
            orderBy: {
                ranking: "asc",
            },
            take,
        },
    },
    orderBy: {
        date: "desc"
    }
})

  return data
}

//get most recent dates
export async function fetchLatestDates (artist: number | string, user?: string) {
  const artistId = toString(artist);

  const data = await prisma.dates.findFirst({
    where: {
      user_id: userId,
      rankings: {
        some: {
          songs: {
            albums: {
              artist_id: artistId,
            }
          }
        }
      }
    },
    orderBy: {
      date: "desc"
    }
  });

  return data
}

//get peak
export async function fetchPeakAndAvg (artist: number | string, user?: string) {
  const artistId = toString(artist);

  const data = await prisma.rankings.groupBy({
    by: ['song_id'],
    where: {
      user_id: userId,
      songs: {
        artist_id: artistId
      },
      dates: {
        type: "OVERALL"
      }
    },
    _min: {
      ranking: true,
    },
    _avg: {
      ranking: true,
    },
    orderBy: {
      _avg: {
        ranking: "asc",
      },
    }
  });

  return data.map( (item, index) => ({
    song_id: item.song_id,
    ranking: index + 1,
    peak: item._min.ranking,
    average_ranking: item._avg.ranking
  }));
}
 
//average ranking without latest date
export async function fetchPrevAvg (artist: number | string, user?: string) {
  const artistId = toString(artist);

  const data = await prisma.rankings.groupBy({
    by: ['song_id'],
    where: {
      user_id: userId,
      songs: {
        artist_id: artistId
      },
      dates: {
        type: "OVERALL",
        id: {
          not: await fetchLatestDates(artistId).then( latest => latest?.id )
        }
      }
    },
    _min: {
      ranking: true,
    },
    _avg: {
      ranking: true,
    },
    orderBy: {
      _avg: {
        ranking: "asc",
      },
    }
  });

  return data.map( item => ({
    song_id: item.song_id,
    previous_average_ranking: item._avg.ranking
  }));
}

//all songs data & rankings by artist
export async function fetchSongs (artist: number | string, take?: number, user?: string) {
  const artistId = toString(artist);
  
  const data = await prisma.songs.findMany({
    where: {
      artist_id: artistId,
      rankings: {
        some: {
          user_id: userId,
        }
      }
    },
    include: {
      rankings: {
        where: {
          user_id: userId,
          dates: {
            type: "OVERALL"
          }
        },
        include: {
          dates: true
        },
        orderBy: {
          dates: {
            date: "desc"
          }
        },
        take,
      },
      artists: true,
      albums: true,
    }
  });

  return data;
}

//all songs data & rankings by dates
export async function fetchSongsByDate (artist: number | string, date: number | string, user?: string) {
  const artistId = toString(artist);
  const dateId = toString(date);

  const data = await prisma.rankings.findMany({
    where: {
        user_id: userId,
        date_id: dateId,
        songs: {
          artist_id: artistId
        },
        dates: {
            type: "OVERALL"
        }
    },
    include: {
        songs: {
            select: {
                song_name: true,
                albums: true,
                artists: true,
            }
        },
        dates: true
    },
    orderBy: {
        ranking: "asc"
    }
  });

  return data
}

//get previous dates
export async function fetchPrevDates (artist: number | string, date: number | string, user?: string) {
  const artistId = toString(artist);
  const dateId = toString(date);

  const allDates = await fetchAllDates(artistId);
  const timeStamp = allDates.find( item => item.id === dateId )?.date;

  const data = await prisma.dates.findMany({
    where: {
      user_id: userId,
      rankings: {
        some: {
          songs: {
            artist_id: artistId,
          }
        }
      },
      date: {
        lt: timeStamp
      }
    },
    orderBy: {
      date: "desc"
    }
  });

  return data[0];
}

//previous ranking
export async function fetchPrevRanking (artist: number | string, date: number | string, user?: string) {
  const artistId = toString(artist);
  const dateId = toString(date);

  const prevDate = await fetchPrevDates(artistId, dateId);

  const data = await prisma.rankings.findMany({
    where: {
        user_id: userId,
        date_id: prevDate?.id,
        songs: {
            artist_id: artistId,
        },
        dates: {
            type: "OVERALL"
        }
    },
    include: {
        songs: {
            select: {
                song_name: true,
                albums: true,
                artists: true,
            }
        },
        dates: true
    },
    orderBy: {
        ranking: "asc"
    }
  });

  return prevDate ? data : null ;

}

//get one song
export async function fetchSong (song: number | string, user?: string) {
  const songId = toString(song);
 
  const data = await prisma.songs.findFirst({
    where: {
      id: songId,
    },
    include: {
      rankings: {
        where: {
          user_id: userId,
          dates: {
            type: "OVERALL"
          }
        },
        include: {
          dates: true
        },
        orderBy: {
          dates: {
            date: "desc"
          }
        },
      },
      artists: true,
      albums: true,
    }
  });

  return data;
}


//get artist
export async function fetchArtist (artist: number | string ) {
  const artistId = toString(artist);
  
  const data = await prisma.artists.findFirst({
    where: {
      id: artistId
    }
  });

  return data;
}

//get all songs for sorter
export async function fetchSongsList (artist: number | string ) {
  const artistId = toString(artist);
  
  const data = await prisma.songs.findMany({
    where: {
      artist_id: artistId,
    },
    include: {
      artists: true,
      albums: true
    }
  })

  return data
}
