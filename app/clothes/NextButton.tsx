"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function NextButton({
  index,
  listSize,
  className
}: {
  index: int;
  listSize: int;
  className?: string;
}) {
  function next() {
    let data = Array.from(document.getElementsByClassName("group"));
    data[index].classList.add("hidden");
    index++;
    if (index >= listSize)
      index = 0;
    data[index].classList.remove("hidden");
  }

  return (
    <button
      onClick={next}
      className="py-2 px-2 rounded text-sm flex items-center"
    >
      <ChevronRightIcon className="h-6 w-6 mr-2"></ChevronRightIcon>
    </button>
  );
}
