import Image from "next/image";

import type { Languages } from "~/types/agent";
import NoSSR from "~/ui/NoSSR";

export const Flag = ({ code }: { code: Languages }) => {
  return (
    <NoSSR>
      <div>
        <Image
          alt="Country flag"
          width={32}
          height={24}
          src={`https://flagcdn.com/48x36/${code.toLowerCase()}.png`}
        />
      </div>
    </NoSSR>
  );
};
