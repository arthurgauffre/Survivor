import SpawnHeadband from "../component/SpawnHeadband";

// async function getCoaches() {
// let data = await fetch('http://fastapi:8000/api/clothes');
// let posts = await data.json();
// console.log(posts);
// };

// getCoaches();

export default function Home() {
  return (
    <SpawnHeadband title="Clothes">
      <div className="flex">
        <img src="https://siecledigital.fr/wp-content/uploads/2017/05/Rickroll.jpg" alt="toto" />
      </div>
    </SpawnHeadband>
  );
}
