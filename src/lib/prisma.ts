import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const userId = "c9485cbd-9d5a-4889-86b5-403db666b9d3"

function toNumber(params: number | string) : number {
  if (typeof params === "string") return parseInt(params) | NaN
  else return params
}

//get all dates
export async function fetchAllDates (artist: number | string, take?: number , user?: string) {
  const artistId = toNumber(artist);

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
                  artist: true,
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
  const artistId = toNumber(artist);

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
      id: "desc"
    }
  });

  return data
}

//get peak
export async function fetchPeakAndAvg (artist: number | string, user?: string) {
  const artistId = toNumber(artist);

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
  const artistId = toNumber(artist);

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
  const artistId = toNumber(artist);
  
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
      artist: true,
      albums: true,
    }
  });

  return data;
}

//all songs data & rankings by dates
export async function fetchSongsByDate (artist: number | string, date: number | string, user?: string) {
  const artistId = toNumber(artist);
  const dateId = toNumber(date);

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
                artist: true,
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
  const artistId = toNumber(artist);
  const dateId = toNumber(date);

  const data = await prisma.dates.findFirst({
    where: {
      user_id: userId,
      rankings: {
        every: {
          songs: {
            artist_id: artistId,
          }
        }
      },
      id: {
        lt: dateId
      }
    },
    orderBy: {
      id: "desc"
    }
  });

  return data
}

//previous ranking
export async function fetchPrevRanking (artist: number | string, date: number | string, user?: string) {
  const artistId = toNumber(artist);
  const dateId = toNumber(date);

  const prevDate = await fetchPrevDates(artistId, dateId);

  const data = await prisma.rankings.findMany({
    where: {
        user_id: userId,
        date_id: prevDate?.id,
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
                artist: true,
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
  const songId = toNumber(song);
 
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
      artist: true,
      albums: true,
    }
  });

  return data;
}


//get artist
export async function fetchArtist (artist: number | string ) {
  const artistId = toNumber(artist);
  
  const data = await prisma.artists.findFirst({
    where: {
      id: artistId
    }
  });

  return data;
}
