import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export default prisma;

export async function getAvgSongsRanking() {
  const peakAndAvgRaw = await prisma.rankings.groupBy({
    by: ['song_id'],
    where: {
      user_id: "c9485cbd-9d5a-4889-86b5-403db666b9d3"
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

  const peakAndAvg = peakAndAvgRaw.map((songRanking, index) => ({
    ranking: index + 1,
    song_id: songRanking.song_id,
    peak: songRanking._min?.ranking || 0,
    average_ranking: songRanking._avg?.ranking || 0,
  }));

  const songsRankingsRaw = await prisma.songs.findMany({
    include: {
      rankings: {
        where: {
          user_id: "c9485cbd-9d5a-4889-86b5-403db666b9d3",
          dates: {
            type: "OVERALL"
          }
        },
        orderBy: {
          dates: {
            date: "desc"
          }
        },
      },
      albums: {
        select: {
          album_name: true,
          album_color: true,
        }
      }
    }
  })

  const songsRankings = songsRankingsRaw.map( item => ({
    ...item,
    times_in_top_10: item.rankings.filter( rankingItem => rankingItem.ranking <= 10 ).length,
    total_chart_run: item.rankings.reduce((acc, cur, index, array) => {
        if (index === 0) {
          return acc;
        }
        return acc + Math.abs(cur.ranking - array[index - 1].ranking);
      }, 0)
  }));

  const result = peakAndAvg.map( (item, index) => {
    const findRanking = songsRankings.find( rankingItem => rankingItem.id === item.song_id );
    return {...item, ...findRanking}
  });

  return result;
}