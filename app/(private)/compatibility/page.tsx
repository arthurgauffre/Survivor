import AstrologicalDropDownMenu from "./AstroCompatibility";

export default async function Home() {

  try {
    let data = await fetch("http://fastapi:8000/api/customers");
    let posts: {
      id: number;
      name: string;
      surname: string;
      astrologicalSign: string;
    }[] = await data.json();

    const customerList: [string, string][] = (
      posts.map(
        (customer: {
          id: number;
          name: string;
          surname: string;
          astrologicalSign: string;
        }) => [
          customer.name + " " + customer.surname,
          customer.astrologicalSign,
        ]
      ) as [string, string][]
    ).sort();

    return <AstrologicalDropDownMenu data={customerList} />;
  } catch (e) {
    return <AstrologicalDropDownMenu data={[]} />;
  }
}
