import Card from "@/components/Card";
import Header from "@/components/Header";
import CardsData from "@/data/data";
import Container from "@/components/Container";
import ClearDBButton from "@/components/ClearDBButton";

export default function Home() {
  return (
    <Container>
      <Header title="home" back={false}/>
      <div className="flex flex-wrap justify-center gap-[25px] pb-[20px]">
        {CardsData.map((item, index) => (
          <div key={index}>
            <Card item={item} />
          </div>
        ))}
        <ClearDBButton/>
      </div>
    </Container>
  );
}
