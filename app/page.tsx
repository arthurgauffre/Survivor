import SpawnHeadband from "./component/SpawnHeadband";
import Spawnbox from "./box";
import CustomersChart from "./component/CustomersChart";
import EventsChart from "./component/EventsChart";

let text_tyle = {
  color: "black",
};

async function getCoaches() {
  let data = await fetch('http://fastapi:8000/api/employees')
  console.log(data);
  let posts = await data.json()
  console.log(posts);
};

getCoaches();

export default function Home() {
  return (
    <SpawnHeadband title="Dashboard" litletext="Welcome!">
      <div className="flex flex-wrap gap-6" style={text_tyle}>
        <div className="w-full bg-white shadow-md rounded-md p-4">
          <div className="">Customer Overview</div>
          <h2 className="text-gray-500 text-xs mb-8">When customers have joined in the time.</h2>
          <div className="flex justify-start gap-40">
            <div>
              <p className="text-gray-500 text-xs">Customers</p>
              <p className="">666</p>
              <p className="text-sm text-green-500">6.66</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Doing meetings</p>
              <p className="">666</p>
              <p className="text-sm text text-red-500">6.66</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Customers by coach</p>
              <p className="">666</p>
            </div>
          </div>
          <CustomersChart />
        </div>
        <div className="w-full bg-white shadow-md rounded-md p-4">
          <div className="">Events</div>
          <h2 className="text-gray-500 text-xs mb-8">When customers have joined in the time.</h2>
          <div className="flex justify-start gap-40">
            <div>
              <p className="text-gray-500 text-xs">Monthly</p>
              <p className="">666</p>
              <p className="text-sm text-green-500">6.66</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Weekly</p>
              <p className="">666</p>
              <p className="text-sm text text-red-500">6.66</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Dayly (Avg)</p>
              <p className="">666</p>
            </div>
          </div>
          <EventsChart />
        </div>
        <div className="w-full bg-white shadow-md rounded-md p-4">
          <div className="">Customers by Country</div>
        </div>
        <div className="w-full bg-white shadow-md rounded-md p-4">
          <div className="">Meetings top sources</div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
