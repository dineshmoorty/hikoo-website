"use client";

export default function PageLoader() {
  return (
    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-white
      "
    >
      {/* Liquid Animation */}
      <div className="relative h-24 w-24">

        {/* Outer Liquid */}
        <div
          className="
            absolute
            inset-0
            rounded-[45%]
            bg-gray-950
            animate-liquid
          "
        />

        {/* Inner Liquid */}
        <div
          className="
            absolute
            inset-[8px]
            rounded-[48%]
            bg-white
            animate-liquid-reverse
          "
        />

        {/* Center */}
        <div
          className="
            absolute
            inset-[17px]
            rounded-full
            bg-gray-950
            animate-liquid-center
          "
        />
      </div>

      {/* HIKOO */}
      <div className="mt-7 text-center">
        <h1
          className="
            text-2xl
            font-bold
            tracking-[0.25em]
            text-gray-950
          "
        >
          HIKOO
        </h1>

        <p
          className="
            mt-2
            text-xs
            font-medium
            tracking-[0.2em]
            text-gray-400
          "
        >
          LOADING
        </p>
      </div>
    </div>
  );
}