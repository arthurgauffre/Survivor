import SpawnHeadband from "@/app/components/SpawnHeadband";
import Collapsible from "@/app/components/collapse";
import { PlusIcon } from "@heroicons/react/20/solid";

import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { customFetch } from "@/app/components/customFetch";

export default async function Page() {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  switch (userRole) {
    case "admin":
      return <TipsPage accessToken={accessToken} />;
    case "user":
      return <TipsPage accessToken={accessToken} />
    case "coach":
      return <TipsPage accessToken={accessToken} />;
    default:
      redirect("/login");
  }
}

export async function TipsPage({ accessToken }: { accessToken: string }) {
  let posts: { id: number; title: string; tip: string }[] = [];

  try {
    let data = await customFetch("http://fastapi:8000/api/tips", accessToken);
    posts = await data.json();
  } catch (e) {
    console.log("i");
  }
  if (!Array.isArray(posts)) {
    posts = [];
  }

  return (
    <SpawnHeadband title="Tips for Coaches" elemRight={
      <div className="flex">
        <button className="ml-4 bg-[#2263b3] text-white py-2 px-2 rounded text-sm">
          <PlusIcon className="h-6 w-6"></PlusIcon>
        </button>
      </div>
    }>
      <div className="bg-white rounded-t-md flex-row">
        {posts.map((post) => (
          <Collapsible title={post.title} key={post.id}>
            {post.tip}
          </Collapsible>
        ))}
      </div>
    </SpawnHeadband>
  );
}
