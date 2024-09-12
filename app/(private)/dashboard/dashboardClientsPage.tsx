import SpawnHeadband from "@/app/components/SpawnHeadband";
import CustomersChart from "@/app/components/charts/CustomersChart";
import EventsChart from "@/app/components/charts/EventsChart";
import MeetingsChart from "@/app/components/charts/MeetingsChart";


export default function DashboardClientsPage({accessToken, userId}: {accessToken: string, userId: number}) {
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
                <p className="text-gray-500 text-xs">Customers</p>
                <p>2</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Doing meetings</p>
                <p>24</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Customers by coach</p>
                <p>5</p>
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
                <p>2</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Weekly</p>
                <p>233</p>
                <p className="text-sm text-red-500">6.66</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Daily (Avg)</p>
                <p>34</p>
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
