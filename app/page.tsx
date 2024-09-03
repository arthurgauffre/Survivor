import SpawnHeadband from "./SpawnHeadband";
import Spawnbox from "./box";

let text_tyle = {
  color: "black",
};

export default function Home() {
  return (
    <SpawnHeadband title="Dashboard" litletext="Welcome!">
      <div className="grid grid-cols-3 gap-5" style={text_tyle}>
        <div> <Spawnbox title="Number of Clients:" content="*get from API*"></Spawnbox> </div>
        <div> <Spawnbox title="Number of Coaches:" content="*get from API*"></Spawnbox></div>
        <div> <Spawnbox title="Number of Meetings:" content="*get from API*"></Spawnbox></div>
        <div> <Spawnbox title="Next Event:" content="*get from API*"></Spawnbox></div>
        <div> <Spawnbox title="Last Tip Given:" content="*get from API*"></Spawnbox></div>
        <div> <Spawnbox title="Best Rated Encounter:" content="*get from API*"></Spawnbox></div>
      </div>
    </SpawnHeadband>
  );
}
