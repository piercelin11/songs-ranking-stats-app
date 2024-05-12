import PageHeader from "@/components/common/PageHeader";
import RankingBox from "@/components/common/RankingBox";
import styles from "@/styles/stats.module.css"

export default function Dashboard() {
  return (
    <div>
      <PageHeader>
        <h1>Dashboard Page</h1>
      </PageHeader>


      <RankingBox />

    </div>
  );
}
