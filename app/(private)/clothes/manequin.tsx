"use client";
import ImgDisplay from "./imgDisplay";

export default function Manequin({
    hat,
    top,
    bottom,
    shoes,
    }: {
    readonly hat: any;
    readonly top: any;
    readonly bottom: any;
    readonly shoes: any;
}) {

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 space-y-1">
      <ImgDisplay images={hat} />
      <ImgDisplay images={top} />
      <ImgDisplay images={bottom} />
      <ImgDisplay images={shoes} />
    </div>
  );
}
