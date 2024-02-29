import { BiArea, BiCar } from "react-icons/bi";
import { FaBath, FaBed, FaPhone, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { applyIntMask } from "~/fns/applyIntMask";
import { formatPrice } from "~/fns/formatPrice";
import type { CondoDTO } from "~/types/condo";
import { Avatar } from "~/ui/Avatar";
import { ContactButton } from "~/ui/ContactButton";
import { IconValue } from "~/ui/IconValue";
import { HeroImage } from "~/ui/CondoPage/HeroImage";
import { AgentInfo } from "~/ui/CondoPage/AgentInfo";
import { MediaButtons } from "~/ui/CondoPage/MediaButtons";
import { PropertyMap } from "~/ui/PropertyPage/PropertyMap";
import { PropertyValue } from "~/ui/PropertyPage/PropertyValue";
import { CONDO_FEATURE_WITH_LABEL } from "~/consts/property";

export const CondoPage = ({ condo }: { condo: CondoDTO }) => {
  const coordinates = condo.address.geo.coordinates;
  const lat = coordinates[0];
  const lng = coordinates[1];

  const managerEmail = condo.user.corporateEmail
    ? condo.user.corporateEmail
    : condo.user.email;

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center pb-20">
      <HeroImage condo={condo} />

      <AgentInfo condo={condo} />

      <div className="mr-auto flex w-full max-w-2xl flex-col gap-5 p-4 md:gap-7 md:px-0 md:pb-0 md:pt-10">
        <div className="text-4xl font-medium">{condo.name}</div>

        {(!!condo.sale || !!condo.longStay) && (
          <div className="w-full">
            <div className="flex flex-col gap-4 text-xl font-medium text-gray-700">
              {condo.sale.min && (
                <div className="flex flex-col">
                  <span>
                    {formatPrice(applyIntMask(condo.sale.min))}
                    {condo.sale.max && condo.sale.max > condo.sale.min
                      ? " - R$ " + applyIntMask(condo.sale.max)
                      : ""}
                  </span>
                  <span className="-mt-1 text-xs text-gray-600">Venda</span>
                </div>
              )}
              {condo.longStay.min && (
                <div className="flex flex-col">
                  <span>
                    {formatPrice(applyIntMask(condo.longStay.min))}
                    {condo.longStay.max &&
                    condo.longStay.max > condo.longStay.min
                      ? " - R$ " + applyIntMask(condo.longStay.max)
                      : ""}
                  </span>
                  <span className="-mt-1 text-xs text-gray-600">Locação</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex w-full gap-5 text-gray-500">
          {condo.rooms.min && (
            <IconValue
              icon={<FaBed />}
              value={`${condo.rooms.min}${condo.rooms.max !== condo.rooms.min ? ` - ${condo.rooms.max}` : ""}`}
            />
          )}
          <IconValue
            icon={<FaBath />}
            value={`${condo.baths.min}${
              condo.baths.max !== condo.baths.min ? ` - ${condo.baths.max}` : ""
            }`}
          />
          <IconValue
            icon={<BiCar />}
            value={`${condo.parkingLots.min}${
              condo.parkingLots.max !== condo.parkingLots.min
                ? ` - ${condo.parkingLots.max}`
                : ""
            }`}
          />
          <IconValue
            icon={<BiArea />}
            value={`${condo.areas.min}${
              condo.areas.max !== condo.areas.min
                ? ` - ${applyIntMask(condo.areas.max)}`
                : ""
            }m²`}
          />
        </div>

        <MediaButtons condo={condo} />

        {!!condo.description && (
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium">Sobre o condomínio</div>
            <div className="-mr-1 max-h-60 overflow-scroll pr-3 text-sm text-gray-600 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg">
              {condo.description}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium">Informações gerais</div>

          <div className="text-sm">
            <PropertyValue
              label="Ano de construção"
              value={condo.yearOfConstruction}
            />

            {condo.areas.min && (
              <PropertyValue
                label="Área útil"
                value={`${condo.areas.min}${condo.areas.max && condo.areas.max > condo.areas.min ? " - " + condo.areas.max : ""}`}
                transform={(v) => `${v} m²`}
              />
            )}

            {condo.rooms.min && (
              <PropertyValue
                label="Quartos"
                value={`${condo.rooms.min}${condo.rooms.max && condo.rooms.max > condo.rooms.min ? " - " + condo.areas.max : ""}`}
              />
            )}

            {condo.baths.min && (
              <PropertyValue
                label="Banheiros"
                value={`${condo.baths.min}${condo.baths.max && condo.baths.max > condo.baths.min ? " - " + condo.baths.max : ""}`}
              />
            )}

            {condo.parkingLots.min && (
              <PropertyValue
                label="Vagas"
                value={`${condo.parkingLots.min}${condo.parkingLots.max && condo.parkingLots.max > condo.parkingLots.min ? " - " + condo.parkingLots.max : ""}`}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium">
            Características do condomínio
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            {condo.features.length === 0 && (
              <div className="text-gray-600">
                Não há características cadastradas
              </div>
            )}
            {condo.features.map((f) => (
              <div key={f} className="rounded-lg border p-2 shadow">
                {
                  CONDO_FEATURE_WITH_LABEL.find(
                    (feature) => feature.value === f,
                  )?.label
                }
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 xl:hidden">
          <div className="text-lg font-medium">Gestor responsável</div>
          <div className="flex items-end gap-2">
            <div className="w-20">
              <Avatar
                href={`/agente/${condo.user.slug}`}
                src={condo.user.profileImage}
              />
            </div>
            <div>
              <div
                title={condo.user.name ?? ""}
                className="max-w-[240px] truncate text-lg font-medium"
              >
                {condo.user.name}
              </div>
              <div
                title={managerEmail}
                className="max-w-[240px] truncate text-sm text-gray-600"
              >
                {managerEmail}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <ContactButton
              show={!!condo.user.phone}
              href={`tel:${condo.user.phone ?? ""}`}
              icon={<FaPhone size={12} />}
              label="Telefone"
            />
            <ContactButton
              show={!!condo.user.whatsapp}
              href={`https://wa.me/+55${
                condo.user.whatsapp?.replace(/\D/g, "") ?? ""
              }`}
              icon={<FaWhatsapp />}
              label="Whatsapp"
            />
            <ContactButton
              show={!!managerEmail}
              href={`mailto:${managerEmail}`}
              icon={<HiOutlineMail />}
              label="Email"
            />
          </div>
        </div>

        {!!lat && !!lng && (
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium">Localização</div>
            <div className="h-80 w-full">
              <PropertyMap zoom={15} center={{ lat, lng }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
