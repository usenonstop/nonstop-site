import Image from "next/image";
import router from "next/router";
import { BiArea, BiCar } from "react-icons/bi";
import { FaBath, FaBed } from "react-icons/fa";
import { createAddressString } from "~/fns/createAddressString";

import type { CardProperty } from "~/types/property";
import { Avatar } from "~/ui/Avatar";

export const PropertyCard = ({
  property: p,
  withAvatar = true,
}: {
  property: CardProperty;
  withAvatar?: boolean;
}) => {
  return (
    <button
      onClick={() => router.push(`/imovel/${p.base36Id}`)}
      className="relative h-[500px] w-80 overflow-hidden rounded-lg border shadow-lg shadow-gray-400"
    >
      {withAvatar && (
        <Avatar href={`/agente/${p.user.slug}`} src={p.user.profileImage} />
      )}
      <Image
        src={
          p.image ?? "https://www.usenonstop.com/images/image-placeholder.webp"
        }
        alt="Imagem do imóvel"
        fill
        sizes="756px"
        className="object-cover"
      />
      <div className="absolute bottom-0 flex h-52 w-full flex-col justify-between bg-black/80 p-4 text-lg text-gray-200">
        <div className="h-16 font-medium">{createAddressString(p.address)}</div>
        <div className="flex flex-col gap-2">
          <div className="w-full text-left text-base">{`${p.address.area}, ${p.address.city}`}</div>
          <div className="flex gap-4 text-sm">
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
              {p.areas.useful?.toLocaleString("pt-BR", {
                maximumFractionDigits: 0,
              })}
              m²
            </div>
          </div>

          <div className="relative flex gap-4 text-left">
            {!!p.values.sale && p.transactionStatus !== "ALUGADO" && (
              <div className="text-md flex flex-col font-medium">
                <div className="flex flex-col">
                  <span>R$ {p.values.sale.toLocaleString()}</span>
                  <span className="-mt-1 text-sm">Venda</span>
                </div>
              </div>
            )}
            {!!p.values.longStay && p.transactionStatus !== "VENDIDO" && (
              <div className="text-md flex flex-col font-medium">
                <div className="flex flex-col">
                  <span>R$ {p.values.longStay.toLocaleString()}</span>
                  <span className="-mt-1 text-sm">Locação</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
