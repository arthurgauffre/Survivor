import React from "react";
import {
    EnvelopeIcon,
    BookmarkIcon,
    StarIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as BlackStarIcon } from "@heroicons/react/24/solid";
import "@/app/components/table.css";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import CoachesChartEventsStatistics from "@/app/components/coachesChartEventsStatistics";
import CoachesRatingsChart from "@/app/components/charts/coachesRatingsChart";
import GenderDoughnutChart from "@/app/components/charts/GenderDoughnutChart";
import { data } from "autoprefixer";
import Image from "next/image";

const Links = {
    customers_id: [17],
};

export default async function Page({
    params,
}: {
    params: { id: string };
}): Promise<JSX.Element> {

    let postsEmployees: {
        id: number;
        email: string;
        name: string;
        surname: string;
        birthdate: string;
        gender: string;
        work: string;
        customer_list: number[];
    } = {
        id: 0,
        email: "",
        name: "",
        surname: "",
        birthdate: "",
        gender: "",
        work: "",
        customer_list: [],
    };

    let Img: {
        image_url: string;
    } = {
        image_url: "",
    };

    let postsEvents: {
        id: number;
        title: string;
        date: string;
        location: string;
        description: string;
    }[] = [];

    let postsCustomerList: number[] = [];

    let postsCustomerRatings: {
        id: number;
        customer_id: number;
        date: string;
        rating: number;
        comment: string;
        source: string;
    }[] = [];

    let postsCustomer: {
        id: 0;
        email: string;
        name: string;
        surname: string;
        birthdate: string;
        gender: string;
        description: string;
        astrologicalSign: string;
        phone_number: string;
        address: string;
    } = {
        id: 0,
        email: "",
        name: "",
        surname: "",
        birthdate: "",
        gender: "",
        description: "",
        astrologicalSign: "",
        phone_number: "",
        address: "",
    };

    try {
        let dataEmployees = await fetch(
            "http://fastapi:8000/api/employees/" + params.id
        );
        postsEmployees = await dataEmployees.json();
    } catch (e) {
        console.log(e);
    }

    try {
        let dataImg = await fetch(
            "http://fastapi:8000/api/employees/" + params.id + "/image"
        );
        Img = await dataImg.json();
    } catch (e) {
        console.log(e);
    }
    const imgUrl: string = Img.image_url;

    try {
        let dataEvents = await fetch(
            "http://fastapi:8000/api/events/" + params.id
        );
        postsEvents = await dataEvents.json();
    }
    catch (e) {
        console.log(e);
    }

    try {
        let dataCustomerList = await fetch("http://fastapi:8000/api/" + params.id + "/customers")
        postsCustomerList = await dataCustomerList.json()
    } catch (e) {
        console.log(e);
    }

    let ratingMeetings: number[] = [0, 0, 0, 0, 0];
    let GenderStats: number[] = [0, 0, 0]
    for (const customerId of postsCustomerList) {
        try {
            let dataCustomers = await fetch(
                "http://fastapi:8000/api/encounters/customer/" + customerId
            );
            postsCustomerRatings = await dataCustomers.json();
        } catch (e) {
            console.log(e);
        }
        for (const rating of postsCustomerRatings) {
            ratingMeetings[rating.rating - 1] += 1;
        }
        try {
            let dataCustomer = await fetch("http://fastapi:8000/api/customers/" + customerId)
            postsCustomer = await dataCustomer.json()
        } catch (e) {
            console.log(e);
        }
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
                        <Image
                            alt="Image of user"
                            src={imgUrl}
                            width={56}
                            height={56}
                            className="rounded-full"
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
