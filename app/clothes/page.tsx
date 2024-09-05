import React from "react";
import SpawnHeadband from "../component/SpawnHeadband";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

const images = [
  {
    id: 1,
    imageUrl: "https://thispersondoesnotexist.com/",
  },
  {
    id: 2,
    imageUrl:
      "https://i.kym-cdn.com/photos/images/newsfeed/002/422/058/391.jpg",
  },
  {
    id: 3,
    imageUrl:
      "https://image.spreadshirtmedia.net/image-server/v1/compositions/T235A1PA4253PT17X33Y9D186071565W6476H9353/views/1,width=1200,height=630,appearanceId=1,backgroundColor=F2F2F2/gnome-meme-dank-vous-avez-ete-gnomed-bavoir-bebe.jpg",
  },
];

export default function Home() {
  let i = 0;

  return (
    <SpawnHeadband title="Clothes">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="flex">
            <PreviousButton index={i} listSize={images.length} />
            <NextButton index={i} listSize={images.length} />
          </div>
          <div className="">
            {images.map((product) => (
              <div
                key={product.id}
                className={`group relative ${
                  product.id != i + 1 ? "hidden" : ""
                }`}
              >
                <div className="relative aspect-h-1 justify-center flex items-center aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
                  <PreviousButton
                    index={i}
                    listSize={images.length}
                    className="absolute left-2 z-10 p-2"
                  />

                  <img
                    alt={product.id}
                    src={product.imageUrl}
                    className="h-full w-auto object-cover px-10"
                  />

                  <NextButton
                    index={i}
                    listSize={images.length}
                    className="absolute right-2 z-10 p-2"
                  />
                </div>

                {/* <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SpawnHeadband>
  );
}
