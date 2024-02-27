import { BiArea, BiCar } from "react-icons/bi";
import { FaBath, FaBed, FaBuilding, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {
  COMMERCIAL_TYPE_WITH_LABEL,
  CONDO_FEATURE_WITH_LABEL,
  FACE_WITH_LABEL,
  PROPERTY_FEATURE_WITH_LABEL,
  PROPERTY_USE_WITH_LABEL,
  RESIDENTIAL_TYPE_WITH_LABEL,
} from "~/consts/property";
import { applyFloatMask } from "~/fns/applyFloatMask";
import { applyIntMask } from "~/fns/applyIntMask";
import { createPropertyTitle } from "~/fns/createPropertyTitle";
import { formatPrice } from "~/fns/formatPrice";
import type { PropertyDTO } from "~/types/property";
import { Avatar } from "~/ui/Avatar";
import { ContactButton } from "~/ui/ContactButton";
import { IconValue } from "~/ui/IconValue";
import { AgentInfo } from "~/ui/PropertyPage/AgentInfo";
import { HeroImage } from "~/ui/PropertyPage/HeroImage";
import { MediaButtons } from "~/ui/PropertyPage/MediaButtons";
import { ParkingLotsTable } from "~/ui/PropertyPage/ParkingLotsTable";
import { PropertyMap } from "~/ui/PropertyPage/PropertyMap";
import { PropertyValue } from "~/ui/PropertyPage/PropertyValue";

export const PropertyPage = ({
  property,
  hideFloor,
}: {
  property: PropertyDTO;
  hideFloor?: boolean;
}) => {
  const isLand =
    property.type === "TERRENO_COMERCIAL" ||
    property.type === "TERRENO_RESIDENCIAL";

  const hideAddress = property.mgmtDecisions.some(
    (d) => d === "OCULTAR_ENDERECO",
  );

  const managerEmail = property.user.corporateEmail
    ? property.user.corporateEmail
    : property.user.email;

  const coordinates = property.address.geo.coordinates;
  const lat = coordinates[0];
  const lng = coordinates[1];

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center pb-20">
      <HeroImage hideFloor={hideFloor} property={property} />

      <AgentInfo property={property} />

      <div className="mr-auto flex w-full max-w-2xl flex-col gap-5 p-4 md:gap-7 md:px-0 md:pb-0 md:pt-10">
        <div className="text-xl font-semibold">
          {createPropertyTitle(property)}
        </div>

        {(!!property.values.sale || !!property.values.longStay) && (
          <div className="w-full">
            <div className="flex gap-4 text-xl font-medium text-gray-700">
              {property.values.sale && (
                <div className="flex flex-col">
                  <span>
                    {property.mgmtDecisions.includes("OCULTAR_PRECO")
                      ? "Sob Consulta"
                      : formatPrice(applyIntMask(property.values.sale))}
                  </span>
                  <span className="-mt-1 text-xs text-gray-600">Venda</span>
                </div>
              )}
              {property.values.longStay && (
                <div className="flex flex-col">
                  <span>
                    {property.mgmtDecisions.includes("OCULTAR_PRECO")
                      ? "Sob Consulta"
                      : formatPrice(applyIntMask(property.values.longStay))}
                  </span>
                  <span className="-mt-1 text-xs text-gray-600">Locação</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex w-full gap-3 text-sm text-gray-500">
          <IconValue
            icon={<FaBed />}
            value={property.use === "RESIDENCIAL" ? property.rooms : null}
          />
          <IconValue
            icon={<FaBath />}
            value={property.use === "RESIDENCIAL" ? property.baths : null}
          />
          <IconValue icon={<BiCar />} value={property.parkingLots.length} />
          <IconValue
            icon={<BiArea />}
            value={`${applyIntMask(
              isLand ? property.areas.land : property.areas.useful,
            )}m²`}
          />
        </div>

        <MediaButtons property={property} />

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>Código do imóvel: {property.base36Id}</div>
          <button>
            <FiShare2 />
          </button>
        </div>

        {!!property.description && (
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium">Sobre o imóvel</div>
            <div className="-mr-1 max-h-60 overflow-scroll pr-3 text-sm text-gray-600 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg">
              {property.description}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium">Informações gerais</div>

          <div className="text-sm">
            <PropertyValue
              label="Uso"
              value={
                PROPERTY_USE_WITH_LABEL.find((p) => p.value === property.use)
                  ?.label
              }
            />

            <PropertyValue
              label="Tipo"
              value={
                RESIDENTIAL_TYPE_WITH_LABEL.find(
                  (p) => p.value === property.type,
                )?.label ??
                COMMERCIAL_TYPE_WITH_LABEL.find(
                  (p) => p.value === property.type,
                )?.label
              }
            />

            <PropertyValue
              label="Face"
              value={
                FACE_WITH_LABEL.find((f) => f.value === property.face)?.label
              }
            />

            {!hideFloor && (
              <PropertyValue label="Andar" value={property.floor} />
            )}

            {!isLand && (
              <>
                <PropertyValue
                  label="Área útil"
                  value={property.areas.useful}
                  transform={(v) => `${applyFloatMask(v)}m²`}
                />

                <PropertyValue
                  label="Área total"
                  value={property.areas.total}
                  transform={(v) => `${applyFloatMask(v)}m²`}
                />
              </>
            )}

            <PropertyValue
              label="Área terreno"
              value={property.areas.land}
              transform={(v) => `${applyFloatMask(v)}m²`}
            />

            {!!property.values.sale &&
              property.areas.useful &&
              !property.mgmtDecisions.includes("OCULTAR_PRECO") && (
                <PropertyValue
                  label="Valor por m²"
                  value={`${formatPrice(
                    applyIntMask(property.values.sale / property.areas.useful),
                  )}/m²`}
                />
              )}

            <PropertyValue
              label="Condomínio"
              value={
                property.values.condoFee === 0
                  ? "ISENTO"
                  : `${formatPrice(applyIntMask(property.values.condoFee))}`
              }
            />

            <PropertyValue
              label="IPTU (anual)"
              value={
                property.values.propertyTax === 0
                  ? "ISENTO"
                  : `${formatPrice(applyIntMask(property.values.propertyTax))}`
              }
            />

            {!isLand && (
              <PropertyValue
                label="Quartos"
                value={property.use === "RESIDENCIAL" ? property.rooms : null}
              />
            )}

            <PropertyValue
              label="Suítes"
              value={property.use === "RESIDENCIAL" ? property.suites : null}
            />

            <PropertyValue label="Banheiros" value={property.baths} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium">Vagas</div>
          {property.parkingLots.length === 0 && (
            <div className="text-gray-600">Não há vagas cadastradas</div>
          )}
          <ParkingLotsTable parkingLots={property.parkingLots} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium">Características do imóvel</div>

          <div className="flex flex-wrap gap-2 text-sm">
            {property.features.length === 0 && (
              <div className="text-gray-600">
                Não há características cadastradas
              </div>
            )}
            {property.features.map((f) => (
              <div key={f} className="rounded-lg border p-2 shadow">
                {
                  PROPERTY_FEATURE_WITH_LABEL.find(
                    (feature) => feature.value === f,
                  )?.label
                }
              </div>
            ))}
          </div>
        </div>

        {property.condo && (
          <>
            {!hideAddress && (
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Condomínio</div>

                <div className="flex items-center gap-4 rounded-lg border p-4 text-sm text-gray-600">
                  <FaBuilding />
                  <span>{property.condo.name}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">
                Características do condomínio
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                {property.condo.features.length === 0 && (
                  <div className="text-gray-600">
                    Não há características cadastradas
                  </div>
                )}
                {property.condo.features.map((f) => (
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
          </>
        )}

        <div className="flex flex-col gap-2 xl:hidden">
          <div className="text-lg font-medium">Gestor responsável</div>
          <div className="flex items-end gap-2">
            <div className="w-20">
              <Avatar
                href={`/agente/${property.user.slug}`}
                src={property.user.profileImage}
              />
            </div>
            <div>
              <div
                title={property.user.name ?? ""}
                className="max-w-[240px] truncate text-lg font-medium"
              >
                {property.user.name}
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
              show={!!property.user.phone}
              href={`tel:${property.user.phone ?? ""}`}
              icon={<FaPhone size={12} />}
              label="Telefone"
            />
            <ContactButton
              show={!!property.user.whatsapp}
              href={`https://wa.me/+55${
                property.user.whatsapp?.replace(/\D/g, "") ?? ""
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

        {!!lat && !!lng && !hideAddress && (
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
