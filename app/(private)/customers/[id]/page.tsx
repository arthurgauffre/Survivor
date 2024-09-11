import MeetingTable from "./MeetingTable";
import PaymentHistoryTable from "./PaymentHistoryTable";
import React from "react";
import {
  EnvelopeIcon,
  BookmarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import "@/app/components/table.css";
import SpawnHeadband from "@/app/components/SpawnHeadband";

import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { customFetch } from "@/app/components/customFetch";

export default async function Page({params}: {readonly params: {id: string}}) {
  const session: { isAuth: boolean; userId: number; role: string, accessToken: string } =
    await verifySession();
  const userRole = session?.role;
  const accessToken: string = session?.accessToken;

  switch (userRole) {
    case "admin":
      return <PaymentHistoryPage params={params} accessToken={accessToken} />;
    case "user":
      redirect("/dashboard");
    case "coach":
      return <PaymentHistoryPage params={params} accessToken={accessToken} />;
    default:
      redirect("/login");
  }
}

export async function PaymentHistoryPage({ params, accessToken }: { readonly params: { id: string }, readonly accessToken: string }): Promise<JSX.Element> {
  const data = await customFetch("http://fastapi:8000/api/customers/" + params.id, accessToken)
  const customer = await data.json()

  let meetings: {
    id: number;
    customer_id: number;
    date: string;
    rating: number;
    comment: string;
    source: string;
  }[] = [];
  let payments: {
    id: number;
    date: string;
    payment_method: string;
    amount: number;
    comment: string;
  }[] = [];
  let picture: string = "";
  try {
    let meetingsData = await customFetch(
      "http://fastapi:8000/api/encounters/customer/" + params.id, accessToken
    );
    meetings = await meetingsData.json();
  } catch (e) {
    meetings = [];
  }
  try {
    let paymentsData = await customFetch(
      "http://fastapi:8000/api/customers/" +
        params.id +
        "/payement_history", accessToken
    );
    payments = await paymentsData.json();
  } catch (e) {
    payments = [];
  }
  try {
    let pictureData = await customFetch(
      "http://fastapi:8000/api/customers/" +
        params.id +
        "/image", accessToken
    );
    picture = await pictureData.json();
  } catch (e) {
    picture = "";
  }
  // let eventsData = await fetch(
  //   "http://localhost:3000/api/encounters/customer/" + params.id
  // );
  // let events = await eventsData.json();
  return (
    <SpawnHeadband
      title={"Customer Profile"}
      elemRight={
        <div className="flex">
          <a href="/customers">
            <button className="ml-4 bg-white text-[#2263b3] py-2 px-2 rounded text-sm flex items-center">
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
              <p>Back</p>
            </button>
          </a>
        </div>
      }
    >
      <div className="flex flex-wrap gap-2">
        <div className="flex-col border bg-white">
          <div className="sm:flex flex-col items-center justify-center text-center border-b p-2">
            <Image
              alt="Image of user"
              src={`data:image/png;base64,${picture}`}
              width={56}
              height={56}
              className="rounded-full"
            />
            <p className="mt-2">{customer.name} {customer.surname}</p>
            {/* Added margin-top to separate text from the image */}
          </div>

          <div className="border-b flex flex-auto justify-center p-2 gap-2">
            <EnvelopeIcon aria-hidden="true" className="h-6 w-6" />
            <BookmarkIcon aria-hidden="true" className="h-6 w-6" />
          </div>
          <div className="border-b flex justify-center p-2 gap-2">
            <div className="text-center">
              <p>{meetings.length}</p>
              <p>Total</p>
              <p>Encounters</p>
            </div>
            <div className="text-center">
              <p>{meetings.filter( (e) => {return e.rating > 3}).length }</p>
              <p>Positives</p>
            </div>
            <div className="text-center">
              <p>{meetings.filter( (e) => {return e.date == new Date()}).length}</p>
              <p>In Progress</p>
            </div>
          </div>
          <div className="border-b p-2">
            <p className="overflow-auto max-w-60 mb-2">{customer.description}</p>
            <p className="overflow-auto max-w-60 mb-2">User ID: {customer.id}</p>
            <p className="overflow-auto max-w-60 mb-2">Email: {customer.email}</p>
            <p className="overflow-auto max-w-60 mb-2">Address: {customer.address}</p>
            <p className="overflow-auto max-w-60 mb-2">Last Activity: {customer.lastseen}</p>
            <p className="overflow-auto max-w-60 mb-2">Coach {customer.linkedCoach}</p>
          </div>
        </div>
        <div className="flex-none border bg-white p-2 grow">
          <p>Recent Meeting</p>
          <MeetingTable meetings={meetings} />
          <p>Payment History</p>
          <PaymentHistoryTable paymentsHistory={payments} />
        </div>
      </div>
    </SpawnHeadband>
  );
}
