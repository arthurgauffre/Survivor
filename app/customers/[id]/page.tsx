import React from "react";
import { EnvelopeIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import SpawnHeadband from "../../SpawnHeadband";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <SpawnHeadband title={params.id}>
      <div className="flex flex-wrap gap-2">
        <div className="flex-col border bg-white">
          <div className="border-b items-center text-center justify-center p-2">
            <img
              alt="Image of user"
              src="https://randomuser.me/api/portraits"
              className="h-8 w-8 rounded-full"
            />
            <p>profile name</p>
          </div>
          <div className="border-b flex flex-auto justify-center p-2 gap-2">
            <EnvelopeIcon aria-hidden="true" className="h-6 w-6" />
            <BookmarkIcon aria-hidden="true" className="h-6 w-6" />
          </div>
          <div className="border-b flex justify-center p-2 gap-2">
            <div className="text-center">
              <p>23</p>
              <p>Total</p>
              <p>Encounters</p>
            </div>
            <div className="text-center">
              <p>20</p>
              <p>Positives</p>
            </div>
            <div className="text-center">
              <p>3</p>
              <p>In Progress</p>
            </div>
          </div>
          <div className="border-b p-2">
            <p>short detail</p>
            <p>User ID:</p>
            <p>Email</p>
            <p>Address</p>
            <p>Last Activity:</p>
            <p>Coach</p>
          </div>
        </div>
        <div className="flex-none border bg-white p-2 grow">
          <p>Recent Meeting</p>
          <p>Payment History</p>
        </div>
      </div>
    </SpawnHeadband>
  );
}
