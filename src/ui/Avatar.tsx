import Image from "next/image";

export const Avatar = ({ src }: { src: string | null }) => {
  return (
    <div className="absolute left-4 top-4 z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-300">
      <div className="relative h-full w-full">
        <Image
          src={src ?? "https://www.usenonstop.com/images/user-placeholder.webp"}
          alt="Imagem do gestor"
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
    </div>
  );
};
