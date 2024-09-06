import CustomersTable from "./customersTable";

export default async function Home() {
  try {
    let data = await fetch("http://fastapi:8000/api/customers");
    let posts = await data.json();

    return <CustomersTable customers={posts} />;
  } catch (e) {
    return <CustomersTable customers={[]} />;
  }
}
