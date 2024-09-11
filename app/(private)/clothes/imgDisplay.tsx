"use client";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import {useState } from "react";
import Image from "next/image";

export default function ImgDisplay({
  images,
}: {
  readonly images: {
    id: number;
    customer_id: number;
    type: string;
    img_content: string;
  }[];
}) {
  let [i, setI] = useState(0);
  let listLen = images.length;

  const prevIndex: number = i - 1 < 0 ? listLen - 1 : i - 1;
  const nextIndex: number = (i + 1) % listLen;

  return (
    <div className="sm:grid sm:grid-cols-3 relative aspect-h-1 justify-center items-center aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none max-h-80">
      <div className="grow justify-center items-center text-center flex">
        {images[prevIndex] && (
          <Image
            alt="previous image"
            src={`data:image/png;base64, ${images[prevIndex].img_content}`}
            width={200}
            height={200}
            className="max-w-48 max-h-48 object-cover max-sm:hidden"
          />
        )}
      </div>

      <div className="flex sm:max-h-80 max-h-60 relative items-center justify-center max-sm:max-w-80">
        <button
          onClick={() => setI(prevIndex)}
          className="py-1 px-1 rounded text-sm flex text-white items-center absolute origin-center top-auto left-0 bg-gray-500 opacity-30 hover:opacity-100"
        >
          <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
        </button>

        {images[prevIndex] && (
          <Image
            alt="active image"
            src={`data:image/png;base64, ${images[i].img_content}`}
            width={200}
            height={200}
            className="max-w-48 max-h-48 object-cover"
          />
        )}

        <button
          onClick={() => setI(nextIndex)}
          className="py-1 px-1 rounded text-sm flex text-white items-center absolute origin-center top-auto right-0 bg-gray-500 opacity-30 hover:opacity-100"
        >
          <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
        </button>
      </div>

      <div className="grow justify-center items-center text-center flex">
        {images[nextIndex] && (
          <Image
            alt="next image"
            src={`data:image/png;base64, ${images[nextIndex].img_content}`}
            width={200}
            height={200}
            className="max-w-48 max-h-48 object-cover max-sm:hidden"
          />
        )}
      </div>
    </div>
  );
}
