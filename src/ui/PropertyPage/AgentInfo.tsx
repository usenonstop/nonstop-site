import { Avatar } from "~/ui/Avatar";
import { ContactButton } from "~/ui/ContactButton";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import type { Property } from "~/types/property";

export const AgentInfo = ({ property }: { property: Property }) => {
  return (
    <div className="absolute bottom-0 right-40 z-10 h-[calc(100%-500px)]">
      <div className="sticky top-10 hidden w-96 flex-col gap-4 rounded-lg bg-white p-7 shadow-lg xl:flex">
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
              title={property.user.email}
              className="max-w-[240px] truncate text-sm text-gray-600"
            >
              {property.user.email}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <ContactButton
            invert
            fullWidth
            show={!!property.user.whatsapp}
            href={`https://wa.me/+55${property.user.whatsapp?.replace(/\D/g, "") ?? ""
              }`}
            icon={<FaWhatsapp />}
            label="Whatsapp"
          />
          <div className="flex w-full gap-2">
            <ContactButton
              fullWidth
              show={!!property.user.phone}
              href={`tel:${property.user.phone ?? ""}`}
              icon={<FaPhone size={12} />}
              label="Telefone"
            />
            <ContactButton
              fullWidth
              show={!!property.user.email}
              href={`mailto:${property.user.email}`}
              icon={<HiOutlineMail />}
              label="Email"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
