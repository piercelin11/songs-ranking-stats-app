import PageHeader from "@/components/common/PageHeader";
import RankingBox from "@/components/common/RankingBox";
import { getAvgSongsRanking } from "@/lib/prisma";

export default async function Dashboard() {
  const result = await getAvgSongsRanking();
  console.log(result[4]);

  return (
    <div>
      <PageHeader>
        <h1>Dashboard Page</h1>
      </PageHeader>


      <RankingBox data={result} />

    </div>
  );
}
