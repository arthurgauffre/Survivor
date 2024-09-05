"use client";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function imgDisplay({
  images,
}: {
  images: { id: number; imageUrl: string }[];
}) {
  let [i, setI] = useState(0);
  let listLen = images.length;

  return (
    <div className="sm:grid sm:grid-cols-3 relative aspect-h-1 justify-center items-center aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none max-h-80">
      <img
        src={images[i == 0 ? listLen - 1 : i - 1].imageUrl}
        className="max-w-72 max-h-72 object-cover px-10 max-sm:hidden"
      />

      <div className="flex max-h-80 relative items-center justify-center max-sm:max-w-80">
        <button
          onClick={() => setI(i == 0 ? listLen - 1 : i - 1)}
          className="py-1 px-1 rounded text-sm flex text-white items-center absolute origin-center top-auto left-0 bg-gray-500 opacity-30 hover:opacity-100"
        >
          <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
        </button>

        <img
          src={images[i].imageUrl}
          className="max-w-fill max-h-72 lg:max-w-sm"
        />

        <button
          onClick={() => setI((i + 1) % listLen)}
          className="py-1 px-1 rounded text-sm flex text-white items-center absolute origin-center top-auto right-0 bg-gray-500 opacity-30 hover:opacity-100"
        >
          <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
        </button>
      </div>

      <img
        src={images[(i + 1) % listLen].imageUrl}
        className="max-w-72 max-h-72 object-cover px-10 max-sm:hidden"
      />
    </div>
  );
}
