import { prisma } from "../prisma";

const userId = "c9485cbd-9d5a-4889-86b5-403db666b9d3"

const boygenius = ["56f75caa-407f-4032-86fd-e1341b9a5532", "eba8588b-6256-401e-9fec-0696a910ced1", "46f6c0a0-df49-4c28-897e-da4f23c817ea", "1cbc780e-c60d-410f-9e9e-fe835d13d493"];
const boys = ["eba8588b-6256-401e-9fec-0696a910ced1", "46f6c0a0-df49-4c28-897e-da4f23c817ea", "1cbc780e-c60d-410f-9e9e-fe835d13d493"];

function toGroup(params: string | {in: string[]}) : string | {in: string[]} {
  if(boygenius.includes(params as string)) 
    return ({in: boygenius})
  else return params
}


//get all dates from an artist
export async function fetchAllDates (artist: string | {in: string[]}, take?: number , user?: string) {
  const artistId = toGroup(artist);

  const data = await prisma.dates.findMany({
    where: {
        user_id: userId,
        rankings: {
            every: {
                songs: {
                  artist_id: artistId
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

//get most recent dates from an artist
export async function fetchLatestDates (artist: string | {in: string[]} , user?: string) {
  const artistId = toGroup(artist);

  const data = await prisma.dates.findFirst({
    where: {
      user_id: userId,
      rankings: {
        every: {
          songs: {
            artist_id: artistId,
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

//get peak and average from an artist
export async function fetchPeakAndAvg (artist?: string, user?: string) {
  let artistId: string | {in: string[]} | undefined;
  if(artist) 
    artistId = toGroup(artist)
  else artistId = undefined;

  const data = await prisma.rankings.groupBy({
    by: ['song_id'],
    where: {
      user_id: userId,
      songs: {
        artist_id: artistId
      },
      dates: {
        type: "ARTIST"
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
 
//average ranking without latest date from an artist
export async function fetchPrevAvg (artist: string , user?: string) {
  const artistId = toGroup(artist);

  const data = await prisma.rankings.groupBy({
    by: ['song_id'],
    where: {
      user_id: userId,
      songs: {
        artist_id: artistId
      },
      dates: {
        type: "ARTIST",
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

//all songs data & rankings by artist from an artist
export async function fetchSongs (artist: string, take?: number, user?: string) {
  const artistId = toGroup(artist);
  
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
            type: "ARTIST"
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

//all songs data & rankings by dates from an artist
export async function fetchSongsByDate (artist: string | null, date: string, type?: "ARTIST" | "CHAMPIONSHIP" ,user?: string) {
  const artistId = artist ? toGroup(artist) : undefined;
  const dateId = toGroup(date);

  const data = await prisma.rankings.findMany({
    where: {
        user_id: userId,
        date_id: dateId,
        songs: {
          artist_id: artistId
        },
        dates: {
            type: type ? type : "ARTIST"
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

//get previous dates from an artist
export async function fetchPrevDates (artist: string | {in: string[]}, date: string, user?: string) {
  const artistId = toGroup(artist);
  const dateId = toGroup(date);

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

//previous ranking from an artist
export async function fetchPrevRanking (artist: string, date: string, user?: string) {
  const artistId = toGroup(artist);
  const dateId = toGroup(date);

  const prevDate = await fetchPrevDates(artistId, dateId as string);

  const data = await prisma.rankings.findMany({
    where: {
        user_id: userId,
        date_id: prevDate?.id,
        songs: {
            artist_id: artistId,
        },
        dates: {
            type: "ARTIST"
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
export async function fetchSong (song: string, user?: string) {
  const songId = toGroup(song);
 
  const data = await prisma.songs.findFirst({
    where: {
      id: songId,
    },
    include: {
      rankings: {
        where: {
          user_id: userId,
          dates: {
            type: "ARTIST"
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
export async function fetchArtist (artist: string ) {
  const artistId = toGroup(artist);
  
  const data = await prisma.artists.findFirst({
    where: {
      id: artistId
    }
  });

  return data;
}






//get user's artist
export async function fetchArtistByUser (user?: string) {
  const data = await prisma.dates.findMany({
    where: {
      user_id: user,
    },
    include: {
      rankings: {
        include: {
          songs: {
            include: {
              artists: true
            }
          }
        },
        take: 1,
      }
    }
  })

  return data.map( item => ({
    date_id: item.id,
    date: item.date,
    artist_id: item.rankings[0]?.songs.artists.id,
    artist_name: item.rankings[0]?.songs.artists.artist_name,
  }));
}
 
//get user's unlog artist
export async function fetchUnLogArtistByUser (user?: string) {
  const data = await prisma.artists.findMany({
    where: {
      songs: {
        every: {
          rankings: {
            none: {
              user_id: user
            }
          }
        }
      },
      id: {
        not: { in: boys }
      }
    },
    orderBy: {
      artist_name: "asc"
    }
  });

  return data.map( item => ({
    artist_id: item.id,
    artist_name: item.artist_name
  }));
}

//fetch all songs
export async function fetchAllSongs (user?: string) {
  
  const data = await prisma.songs.findMany({
    where: {
      rankings: {
        some: {
          user_id: userId,
        }
      },
      /* album_id: {
        not: null
      } */
    },
    include: {
      artists: {
        include: {
          songs: {
            where: {
              rankings: {
                some: {
                  user_id: user
                }
              }
            }
          }
        }
      },
      albums: {
        include: {
          songs: {
            where: {
              rankings: {
                some: {
                  user_id: user
                }
              }
            }
          }
        }
      },
    }
  });

  return data;
}

//fetch all dates
export async function fetchAllDatesByUser (datesTake?: number, rankingsTake?: number, user?: string) {
  const data = await prisma.dates.findMany({
    where: {
        user_id: userId,
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
            take: rankingsTake,
        },
    },
    take: datesTake,
    orderBy: {
        date: "desc"
    }
})

  return data
}





//get albums for sorter filter
export async function fetchArtistsAlbums (artist: string ) {
  const artistId = toGroup(artist);

  const albums = await prisma.albums.findMany({
    where: {
      artist_id: artistId
    }, 
    include: {
      artists: true
    },
    orderBy: {
      release_date: "desc"
    }
  });

  return albums
}

//get singles for sorter filter
export async function fetchArtistsSingles (artist: string ) {
  const artistId = toGroup(artist);

  const singles = await prisma.songs.findMany({
    where: {
      artist_id: artistId,
      album_id: null
    }, 
    include: {
      artists: true
    },
    orderBy: {
      release_date: "desc"
    }
  });

  return singles
}

//get all songs for sorter
export async function fetchSongsList (artist: string | null, album?: string | string[]) {
  const artistId = artist ? toGroup(artist) : undefined;
  //const albumId = album && typeof album === "string" ? album : {in: album}
  
  const data = await prisma.songs.findMany({
    where: {
      artist_id: artistId,
      //album_id: albumId as string | {in: string[]},
    },
    include: {
      artists: true,
      albums: true
    }
  })

  return data
}
