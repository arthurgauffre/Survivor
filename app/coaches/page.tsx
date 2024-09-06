import CoachesTable from "./coachesTable";

export default async function Home() {
  let data = await fetch("http://fastapi:8000/api/employees");
  let coaches: {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    description: string;
    astrologicalSign: string;
  }[] = await data.json();

  return (
    <CoachesTable coaches={coaches} />
  );
}
