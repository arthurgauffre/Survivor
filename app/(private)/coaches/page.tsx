import CoachesTable from "@/app/(private)/coaches/coachesTable";

export default async function Home() {
  try {
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
    let IMGS: {
      id: number;
      image_url: string;
    }[] = [];

    for (let coach of coaches) {
      let dataImg = await fetch(
        "http://fastapi:8000/api/employees/" + coach.id + "/image"
      );
      let Img = await dataImg.json();
      IMGS.push(Img);
    }

    return <CoachesTable coaches={coaches} CoachImages={IMGS}/>;
  } catch (e) {
    console.log(e);
    return <CoachesTable coaches={[]} CoachImages={[]}/>;
  }
}
