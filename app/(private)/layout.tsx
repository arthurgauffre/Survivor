import NavBar from "@/app/components/NavBar";
import { verifySession } from "@/app/lib/dal";
import { customFetch } from "../components/customFetch";

export default async function PrivateLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  } = await verifySession();
  const userRole = session?.role;

  let imageData: Response;
  let userData: Response;
  if (userRole === "admin") {
    imageData = await customFetch(
      "http://fastapi:8000/api/employees/" + session.userId + "/image",
      session.accessToken
    );
    userData = await customFetch(
      "http://fastapi:8000/api/employees/" + session.userId,
      session.accessToken
    );
  } else {
    imageData = await customFetch(
      "http://fastapi:8000/api/customers/" + session.userId + "/image",
      session.accessToken
    );
    userData = await customFetch(
      "http://fastapi:8000/api/customers/" + session.userId,
      session.accessToken
    );
  }
  const userImage: string = await imageData.json();
  const userInfo: {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    work: string;
  } = await userData.json();

  console.log("userInfo", userInfo);

  return (
    <main>
      <NavBar UserRole={userRole} UserImage={userImage} userInfo={userInfo} />
      {children}
    </main>
  );
}
