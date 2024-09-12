import React from "react";
import { DateTime } from "luxon";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import "@/app/components/table.css";
import SpawnHeadband from "@/app/components/SpawnHeadband";
import CoachesChartEventsStatistics from "@/app/components/coachesChartEventsStatistics";
import CoachesRatingsChart from "@/app/components/charts/coachesRatingsChart";
import GenderDoughnutChart from "@/app/components/charts/GenderDoughnutChart";
import AgeDoughnutChart from "@/app/components/charts/AgeDoughnutChart";
import SignAstroChart from "@/app/components/charts/SignAstroChart";
import Image from "next/image";

import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { customFetch } from "@/app/components/customFetch";

export default async function Page({
  params,
}: {
  readonly params: { id: string };
}) {
  const session: {
    isAuth: boolean;
    userId: number;
    role: string;
    accessToken: string;
  } = await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  switch (userRole) {
    case "admin":
      return <CoachesIdProfilPage params={params} accessToken={accessToken} />;
    case "customer":
      redirect("/dashboard");
    case "coach":
      redirect("/dashboard");
    default:
      redirect("/login");
  }
}

export async function CoachesIdProfilPage({
  params,
  accessToken,
}: {
  readonly params: { id: string };
  readonly accessToken: string;
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

  let Img: string = "";

  let postsEvents: {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
  }[] = [];

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

  let sliceOfCustomersAge: number[] = [0, 0, 0];
  let actualTime: number = DateTime.now().year;

  let SignAstroCustomerList: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  try {
    let dataEmployees = await customFetch(
      "http://fastapi:8000/api/employees/" + params.id,
      accessToken
    );
    postsEmployees = await dataEmployees.json();
  } catch (e) {
    console.log(e);
  }

  try {
    let dataImg = await customFetch(
      "http://fastapi:8000/api/employees/" + params.id + "/image",
      accessToken
    );
    Img = await dataImg.json();
  } catch (e) {
    console.log(e);
  }
  const img: string = Img;

  try {
    let dataEvents = await customFetch(
      "http://fastapi:8000/api/events/" + params.id,
      accessToken
    );
    postsEvents = await dataEvents.json();
  } catch (e) {
    console.log(e);
  }

  let ratingMeetings: number[] = [0, 0, 0, 0, 0];
  let GenderStats: number[] = [0, 0, 0];
  for (const customerId of postsEmployees.customer_list) {
    try {
      let dataCustomers = await customFetch(
        "http://fastapi:8000/api/encounters/customer/" + customerId,
        accessToken
      );
      postsCustomerRatings = await dataCustomers.json();
    } catch (e) {
      console.log(e);
    }
    for (const rating of postsCustomerRatings) {
      ratingMeetings[rating.rating - 1] += 1;
    }
    try {
      let dataCustomer = await customFetch(
        "http://fastapi:8000/api/customers/" + customerId,
        accessToken
      );
      postsCustomer = await dataCustomer.json();
      if (actualTime - +(postsCustomer.birthdate.split("-")[0]) < 30) {
        sliceOfCustomersAge[0] += 1;
      } else if (
        actualTime - +(postsCustomer.birthdate.split("-")[0]) >= 30 &&
        actualTime - +(postsCustomer.birthdate.split("-")[0]) < 50
      ) {
        sliceOfCustomersAge[1] += 1;
      } else {
        sliceOfCustomersAge[2] += 1;
      }
      switch (postsCustomer.astrologicalSign) {
        case "Aries":
          SignAstroCustomerList[0] += 1;
          break;
        case "Taurus":
          SignAstroCustomerList[1] += 1;
          break;
        case "Gemini":
          SignAstroCustomerList[2] += 1;
          break;
        case "Cancer":
          SignAstroCustomerList[3] += 1;
          break;
        case "Leo":
          SignAstroCustomerList[4] += 1;
          break;
        case "Virgo":
          SignAstroCustomerList[5] += 1;
          break;
        case "Libra":
          SignAstroCustomerList[6] += 1;
          break;
        case "Scorpio":
          SignAstroCustomerList[7] += 1;
          break;
        case "Sagittarius":
          SignAstroCustomerList[8] += 1;
          break;
        case "Capricorn":
          SignAstroCustomerList[9] += 1;
          break;
        case "Aquarius":
          SignAstroCustomerList[10] += 1;
          break;
        case "Pisces":
          SignAstroCustomerList[11] += 1;
          break;
      }
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
              src={`data:image/png;base64,${img}`}
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
            <div className="mt-4">
              <p className="text-gray-500">Email:</p>
              <p className="whitespace-nowrap">{postsEmployees.email}</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-500">Birthdate:</p>
              <p>{postsEmployees.birthdate}</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-500">Gender:</p>
              <p>{postsEmployees.gender}</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-500">Work:</p>
              <p>{postsEmployees.work}</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-500">Number of clients:</p>
              <p>{postsEmployees.customer_list.length}</p>
            </div>
          </div>
        </div>
        <div className="sm:flex sm:flex-wrap md:flex sm:w-full gap-2">
          <div className="sm:w-full md:flex bg-white p-2 rounded-md">
            <div className="md:w-1/2 max-h-80">
              <CoachesChartEventsStatistics data={postsEvents} />
            </div>
            <div className="md:w-1/2 max-h-80">
              <SignAstroChart data={SignAstroCustomerList}/>
            </div>
          </div>
          <div className="sm:w-full bg-white md:flex md:flex-row p-2 rounded-md max-sm:my-1 space-x-2">
            <div className="- j komax-h-80">
              <CoachesRatingsChart data={ratingMeetings} />
            </div>
            <div className="- j komax-h-80">
              <GenderDoughnutChart data={GenderStats} />
            </div>
            <div className="- j komax-h-80">
              <AgeDoughnutChart data={sliceOfCustomersAge} />
            </div>
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
