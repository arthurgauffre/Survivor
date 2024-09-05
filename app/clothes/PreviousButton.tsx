"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function PreviousButton({
  index,
  listSize,
  className
}: {
  index: int;
  listSize: int;
  className?: string;
}) {
  function previous() {
    let data = Array.from(document.getElementsByClassName("group"));
    data[index].classList.add("hidden");
    index = index - 1;
    if (index < 0) {
      index = listSize - 1;
    }
    data[index].classList.remove("hidden");
    return index;
  }

  return (
    <button
      onClick={previous}
      className="py-2 px-2 rounded text-sm flex items-center"
    >
      <ChevronLeftIcon className="h-6 w-6 mr-2"></ChevronLeftIcon>
    </button>
  );
}
