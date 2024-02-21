import { FaArrowUp } from "react-icons/fa";

export const NoToken = () => (
  <div className="flex items-center gap-2">
    <span>
      Inclua seu token nonStop ali em cima para fazer a mágica acontecer
    </span>
    <FaArrowUp className="rotate-45 transform" />
  </div>
);
