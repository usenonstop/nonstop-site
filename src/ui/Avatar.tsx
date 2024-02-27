import Image from "next/image";
import Link from "next/link";

export const Avatar = ({ src, href }: { src: string | null; href: string }) => {
  return (
    <Link
      href={href}
      className="absolute left-4 top-4 z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-300"
    >
      <div className="relative h-full w-full">
        <Image
          src={src ?? "https://www.usenonstop.com/images/user-placeholder.webp"}
          alt="Imagem do gestor"
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
    </Link>
  );
};
