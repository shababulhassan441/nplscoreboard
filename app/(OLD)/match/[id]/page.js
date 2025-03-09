import Scoreboard from "@/components/Scoreboard";

export default async function MatchPage({ params }) {
  return (
    <div className="container mx-auto p-5">
      <Scoreboard matchId={(await params).id} />
    </div>
  );
}
