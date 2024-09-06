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

const Links = {
  customers_id: [17],
};

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

  let ratingMeetings: number[] = [0, 0, 0, 0, 0];
  for (const customerId of Links.customers_id) {
    let dataRatings = await fetch(
      "http://fastapi:8000/api/encounters/customer/" + customerId
    );
    let postsRatings = await dataRatings.json();
    for (const postRating of postsRatings) {
      ratingMeetings[postRating.rating - 1] += 1;
    }
  }
  console.log(ratingMeetings);

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
            </p>{" "}
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
            <p>{Links.customers_id.length}</p>
          </div>
        </div>
        <div className="sm:flex sm:flex-wrap sm:w-full gap-2">
          <div className="sm:w-full bg-white p-2 rounded-md">
            <div className="md:w-1/2 max-h-80">
              <CoachesChartEventsStatistics data={postsEvents} />
            </div>
          </div>
          <div className="sm:w-full bg-white p-2 rounded-md max-sm:my-1">
            <div className="md:w-1/3 max-h-80">
              <CoachesRatingsChart data={ratingMeetings} />
            </div>
          </div>
          <div className="sm:w-full bg-white p-2 rounded-md">
            <div className="md:w-1/2 max-h-80"></div>
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
