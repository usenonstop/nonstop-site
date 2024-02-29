import Image from "next/image";
import router from "next/router";
import { createAddressString } from "~/fns/createAddressString";
import { BiArea, BiCar } from "react-icons/bi";
import { FaBath, FaBed } from "react-icons/fa";
import type { CardCondo } from "~/types/condo";
import { applyIntMask } from "~/fns/applyIntMask";

export const CondoCard = ({ condo: c }: { condo: CardCondo }) => {
  return (
    <button
      onClick={() => router.push(`/condominio/${c.id}`)}
      className="relative h-[500px] w-80 overflow-hidden rounded-lg border shadow-lg shadow-gray-400"
    >
      <Image
        src={
          c.image ?? "https://www.usenonstop.com/images/image-placeholder.webp"
        }
        alt="Imagem do imóvel"
        fill
        sizes="756px"
        className="object-cover"
      />
      <div className="absolute bottom-0 flex h-52 w-full flex-col justify-between gap-3 bg-black/80 p-4 text-lg text-gray-200">
        <div className="min-h-14 text-xl font-medium">{c.name}</div>
        <div className="flex h-full flex-col gap-2 text-left">
          <div>{createAddressString(c.address)}</div>
          <div className="w-full text-left text-base">{`${c.address.area}, ${c.address.city}`}</div>
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {c.type !== "COMERCIAL" && c.rooms.min && c.rooms.max && (
              <div className="flex items-center gap-1">
                <FaBed />
                {c.rooms.min}
                {c.rooms.max !== c.rooms.min ? ` - ${c.rooms.max}` : ""}
              </div>
            )}

            {c.baths.min && c.baths.max && (
              <div className="flex items-center gap-1">
                <FaBath />
                {c.baths.min}
                {c.baths.max !== c.baths.min ? ` - ${c.baths.max}` : ""}
              </div>
            )}

            {c.parkingLots.min && c.parkingLots.max && (
              <div className="flex items-center gap-1">
                <BiCar />
                {c.parkingLots.min}
                {c.parkingLots.max !== c.parkingLots.min
                  ? ` - ${c.parkingLots.max}`
                  : ""}
              </div>
            )}

            {c.areas.min && c.areas.max && (
              <div className="flex items-center gap-1">
                <BiArea />
                {applyIntMask(c.areas.min)}
                {c.areas.max !== c.areas.min
                  ? ` - ${applyIntMask(c.areas.max)}`
                  : ""}
                m²
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
