import CustomersTable from "@/app/(private)/customers/customersTable";

export default async function Home() {
  try {
    let customersData = await fetch("http://fastapi:8000/api/customers");
    let customers = await customersData.json();

    let IMGS: {
      id: number;
      image_url: string;
    }[] = [];

    for (let customer of customers) {
      let dataImg = await fetch(
        "http://fastapi:8000/api/customers/" + customer.id + "/image"
      );
      let Img = await dataImg.json();
      IMGS.push(Img);
    }

    return <CustomersTable customers={customers} customersImage={IMGS}/>;
  } catch (e) {
    return <CustomersTable customers={[]} customersImage={[]}/>;
  }
}
