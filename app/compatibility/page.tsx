import SpawnHeadband from "../component/SpawnHeadband";
import AstroDropDownMenu from './AstroCompatibility';

export default async function Home() {
    let data = await fetch('http://fastapi:8000/api/customers');
    let posts = await data.json();

    const customerList: [string, string][] = posts.map((customer: any) => [customer.name + " " + customer.surname, customer.astrologicalSign]);
    return (
        <AstroDropDownMenu data={customerList} />
    );
}
