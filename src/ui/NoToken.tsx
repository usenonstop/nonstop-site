import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

export const NoToken = () => (
  <div className="flex flex-col items-center">
    <div>
      Pegue sem token em:{" "}
      <Link
        className="underline"
        href="https://www.usenonstop.com/preferencias"
      >
        https://www.usenonstop.com/preferencias
      </Link>
    </div>
    <div className="flex items-center justify-center gap-2">
      Inclua seu token nonStop ali em cima para fazer a mágica acontecer
      <FaArrowUp className="rotate-45 transform" />
    </div>
  </div>
);
