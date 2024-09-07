import SpawnHeadband from "@/app/components/SpawnHeadband";
import Collapsible from "@/app/components/collapse";

export default async function Home() {
  let posts: { id: number, title: string, tip: string }[] = [];

  try {
    let data = await fetch("http://fastapi:8000/api/tips");
    posts = await data.json();
  } catch (e) {
    posts = [];
  }

  return (
    <SpawnHeadband title="Tips for Coaches">
      <div className="bg-white rounded-t-md flex-row">
        {posts.map((post: any) => (
          <Collapsible title={post.title} key={post.id}>
            {post.tip}
          </Collapsible>
        ))}
      </div>
    </SpawnHeadband>
  );
}
