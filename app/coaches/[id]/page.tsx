import "./../../component/table.css";
import React from "react";
import {
    EnvelopeIcon,
    BookmarkIcon,
    StarIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as BlackStarIcon } from "@heroicons/react/24/solid";
import SpawnHeadband from "../../component/SpawnHeadband";
import CoachesChartEventsStatistics from "@/app/component/coachesChartEventsStatistics";
import CoachesRatingsChart from "@/app/component/coachesRatingsChart";
import GenderDoughnutChart from "@/app/component/GenderDoughnutChart";
import { data } from "autoprefixer";

const Links = {
    customers_id: [17],
};

export default async function Page({
    params,
}: {
    params: { id: string };
}): Promise<JSX.Element> {
    let dataEmployees = await fetch(
        "http://fastapi:8000/api/employees/" + params.id
    );
    let postsEmployees = await dataEmployees.json();

    let dataImg = await fetch(
        "http://fastapi:8000/api/employees/" + params.id + "/image"
    );
    let Img = await dataImg.json();
    const imgUrl: string = Img.image_url;

    let dataEvents = await fetch("http://fastapi:8000/api/events/" + params.id);
    let postsEvents = await dataEvents.json();

    let dataCustomerList = await fetch("http://fastapi:8000/api/" + params.id + "/customers")
    let postsCustomerList = await dataCustomerList.json()

    let ratingMeetings: number[] = [0, 0, 0, 0, 0];
    let GenderStats: number[] = [0, 0, 0]
    for (const customerId of postsCustomerList) {
        let dataCustomers = await fetch(
            "http://fastapi:8000/api/encounters/customer/" + customerId
        );
        let postsCustomerRatings = await dataCustomers.json();
        for (const rating of postsCustomerRatings) {
            ratingMeetings[rating.rating - 1] += 1;
        }
        let dataCustomer = await fetch("http://fastapi:8000/api/customers/" + customerId)
        let postsCustomer = await dataCustomer.json()
        switch (postsCustomer.gender) {
            case "Male":
                GenderStats[0] += 1;
                break;
            case "Female":
                GenderStats[1] += 1;
                break;
            default:
                GenderStats[2] += 1;
                break;
        }
    }

    return (
        <SpawnHeadband
            title="Coach Profile"
            elemRight={
                <div className="flex">
                    <a href="/coaches">
                        <button className="ml-4 bg-white text-[#2263b3] py-2 px-2 rounded text-sm flex items-center">
                            <ArrowLeftIcon className="h-6 w-6 mr-2" />
                            <p>Back</p>
                        </button>
                    </a>
                </div>
            }
        >
            <div className="sm:flex sm:flex-row gap-2">
                <div className="sm:flex-col border bg-white rounded-md">
                    <div className="sm:flex flex-col items-center justify-center text-center border-b p-2">
                        <img
                            alt="Image of user"
                            src={imgUrl}
                            className="w-14 rounded-full"
                        />
                        <p className="mt-2">
                            {postsEmployees.name} {postsEmployees.surname}
                        </p>
                        {/* Added margin-top to separate text from the image */}
                    </div>
                    <div className="border-b p-2">
                        <p>short detail</p>
                        <br />
                        <p className="text-gray-500">Email:</p>
                        <p>{postsEmployees.email}</p>
                        <br />
                        <p className="text-gray-500">Birthdate:</p>
                        <p>{postsEmployees.birthdate}</p>
                        <br />
                        <p className="text-gray-500">Gender:</p>
                        <p>{postsEmployees.gender}</p>
                        <br />
                        <p className="text-gray-500">Work:</p>
                        <p>{postsEmployees.work}</p>
                        <br />
                        <p className="text-gray-500">Number of clients:</p>
                        <p>{postsCustomerList.length}</p>
                    </div>
                </div>
                <div className="sm:flex sm:flex-wrap sm:w-full gap-2">
                    <div className="sm:w-full bg-white p-2 rounded-md">
                        <div className="md:w-1/2 max-h-80">
                            <CoachesChartEventsStatistics data={postsEvents} />
                        </div>
                    </div>
                    <div className="sm:w-full bg-white md:flex md:flex-row p-2 rounded-md max-sm:my-1 space-x-2">
                        <div className="- j komax-h-80">
                            <CoachesRatingsChart data={ratingMeetings} />
                        </div>
                        <div className="- j komax-h-80">
                            <GenderDoughnutChart data={GenderStats} />
                        </div>
                    </div>
                </div>
            </div>
        </SpawnHeadband>
    );
}
