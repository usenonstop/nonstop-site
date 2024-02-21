import Image from "next/image";
import { BiArea, BiCar } from "react-icons/bi";
import { FaBath, FaBed } from "react-icons/fa";

import type { HomeProperty } from "~/types/property";

export const PropertyCard = ({ property: p }: { property: HomeProperty }) => {
  return (
    <div className="relative h-[500px] w-80 overflow-hidden rounded-lg border shadow-lg shadow-gray-400">
      <div className="absolute left-4 top-4 z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-300">
        <div className="relative h-full w-full">
          <Image
            src={p.manager.image}
            alt="Imagem do gestor"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      </div>
      <Image
        src={p.image}
        alt="Imagem do imóvel"
        fill
        sizes="320px"
        className="object-cover"
      />
      <div className="absolute bottom-0 flex h-40 w-full flex-col justify-between bg-black/80 p-4 text-lg text-gray-200">
        <div className="h-16 font-medium">{`${p.address.street}, ${p.address.number}`}</div>
        <div className="flex flex-col gap-2">
          <div className="text-base">{`${p.address.area}, ${p.address.city}`}</div>
          <div className="flex gap-3 text-sm">
            <div className="flex items-center gap-1">
              <FaBed />
              {p.rooms}
            </div>
            <div className="flex items-center gap-1">
              <FaBath />
              {p.baths}
            </div>
            <div className="flex items-center gap-1">
              <BiCar />
              {p.parkingLots}
            </div>
            <div className="flex items-center gap-1">
              <BiArea />
              {p.areas.useful?.toFixed(0)}m²
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
