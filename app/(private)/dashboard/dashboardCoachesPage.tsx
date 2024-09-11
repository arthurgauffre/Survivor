import SpawnHeadband from "@/app/components/SpawnHeadband";
import CustomersChart from "@/app/components/charts/CustomersChart";
import EventsChart from "@/app/components/charts/EventsChart";
import MeetingsChart from "@/app/components/charts/MeetingsChart";
import { customFetch } from "@/app/components/customFetch";


export default async function DashboardCoachesPage({ accessToken, userId }: { accessToken: string, userId: number }) {
  let employee: {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthDate: string;
    gender: string;
    work: string;
    customer_list: number[];
  } = {
    id: 0,
    email: "",
    name: "",
    surname: "",
    birthDate: "",
    gender: "",
    work: "",
    customer_list: [],
  };

  let customersLists: {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    description: string;
    astrologicalSign: string;
    phone_number: string;
    address: string;
    linkedCoach: number;
  }[] = [];

  let encountersList: {
    id: number;
    customer_id: number;
    date: string;
    rating: number;
    comment: string;
    source: string;
  }[] = [];

  try {
    let data = await customFetch(
      `http://fastapi:8000/api/employees/${userId}`,
      accessToken
    );
    employee = await data.json();
  } catch (error) {
    console.error(error);
  }

  for (let i = 0; i < employee.customer_list.length; i++) {
    try {
      let data = await customFetch(
        `http://fastapi:8000/api/customers/${employee.customer_list[i]}`,
        accessToken
      );
      let customer = await data.json();
      customersLists.push(customer);
    } catch (error) {
      console.error(error);
    }
  }

  for (let i = 0; i < customersLists.length; i++) {
    try {
      let data = await customFetch(
        `http://fastapi:8000/api/customers/${customersLists[i].id}/encounters`,
        accessToken
      );
      let encounters = await data.json();
      encountersList.push(...encounters);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SpawnHeadband title="Dashboard" littleText="Welcome!">
      <div className="flex flex-wrap gap-6 text-black">
        {/* Row 1, Column 1 */}
        <div className="w-full lg:w-[48%] bg-white shadow-md rounded-md p-4">
          <div>Customer Overview</div>
          <h2 className="text-gray-500 text-xs mb-8">
            When customers have joined over time.
          </h2>
          <div className="flex flex-wrap justify-start gap-40">
            <div>
              <p className="text-gray-500 text-xs">Total of meetings</p>
              <p>{encountersList.length}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Number of customers</p>
              <p>{employee.customer_list.length}</p>
            </div>
          </div>
          <CustomersChart />
        </div>

        {/* Row 1, Column 2 */}
        <div className="w-full lg:w-[48%] bg-white shadow-md rounded-md p-4">
          <div>Events</div>
          <h2 className="text-gray-500 text-xs mb-8">
            Event participation over time.
          </h2>
          <div className="flex flex-wrap justify-start gap-40">
            <div>
              <p className="text-gray-500 text-xs">Monthly</p>
              <p>666</p>
              <p className="text-sm text-green-500">6.66</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Weekly</p>
              <p>666</p>
              <p className="text-sm text-red-500">6.66</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Daily (Avg)</p>
              <p>666</p>
            </div>
          </div>
          <EventsChart />
        </div>

        {/* Row 2, Column 1 */}
        <div className="w-full lg:w-[48%] bg-white shadow-md rounded-md p-4">
          <div>Customers by Country</div>
        </div>

        {/* Row 2, Column 2 */}
        <div className="w-full lg:w-[48%] bg-white shadow-md rounded-md p-4">
          <div>Meetings Top Sources</div>
          <div className="flex justify-center items-center w-full">
            <div className="w-2/5">
              <MeetingsChart />
            </div>
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
