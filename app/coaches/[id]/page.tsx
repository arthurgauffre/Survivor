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

function Rating(numberStar: number) {
    const rating = [];

    for (let i = 0; i < numberStar; i++) {
        rating.push(<BlackStarIcon key={i} className="h-4 w-4" />);
    }
    for (let i = numberStar; i < 5; i++) {
        rating.push(<StarIcon key={i} className="h-4 w-4" />);
    }
    return rating;
}

export default async function Page({ params }: { params: { id: string } }): Promise<JSX.Element> {
    let dataEmployees = await fetch('http://fastapi:8000/api/employees/' + params.id);
    let postsEmployees = await dataEmployees.json();

    let dataImg = await fetch('http://fastapi:8000/api/employees/' + params.id + '/image');
    let Img = await dataImg.json();
    const imgUrl: string = Img.image_url;

    let dataEvents = await fetch('http://fastapi:8000/api/events/' + params.id);
    let postsEvents = await dataEvents.json();

    console.log(postsEvents);
    return (
        <SpawnHeadband
            title='Coach Profile'
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
            <div className="flex flex-wrap gap-2">
                <div className="flex-col border bg-white rounded-md">
                    <div className="flex flex-col items-center justify-center text-center border-b p-2">
                        <img
                            alt="Image of user"
                            src={imgUrl}
                            className="w-14 rounded-full"
                        />
                        <p className="mt-2">{postsEmployees.name} {postsEmployees.surname}</p> {/* Added margin-top to separate text from the image */}
                    </div>
                    <div className="border-b p-2">
                        <p>short detail</p>
                        <br />
                        <p className="text-gray-500">Email:</p>
                        <p>{postsEmployees.email}</p>
                        <br/>
                        <p className="text-gray-500">Birthdate:</p>
                        <p>{postsEmployees.birthdate}</p>
                        <br />
                        <p className="text-gray-500">Gender:</p>
                        <p>{postsEmployees.gender}</p>
                        <br />
                        <p className="text-gray-500">Work:</p>
                        <p>{postsEmployees.work}</p>
                    </div>
                </div>
                <div className="flex flex-wrap grow border bg-white p-2 rounded-md">
                    <div className="w-2/3">
                        <CoachesChartEventsStatistics data={postsEvents}/>
                    </div>
                </div>
            </div>
        </SpawnHeadband>
    );
}
