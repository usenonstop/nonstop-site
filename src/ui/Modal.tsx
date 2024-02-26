import { useRef } from "react";

import { getHighestZIndex } from "~/fns/getHighestZIndex";
import { Portal } from "~/ui/Portal";

type ModalProps = React.HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
  onClose: () => void;
  transparent?: boolean;
  dark?: boolean;
};

export const Modal = ({
  children,
  onClose,
  transparent,
  dark,
  ...props
}: ModalProps) => {
  const highestZindex = useRef(getHighestZIndex());

  return (
    <Portal>
      <div {...props}>
        <div
          onClick={(e) => e.target === e.currentTarget && onClose()}
          style={{ zIndex: highestZindex.current + 1 }}
          className={`absolute inset-0 flex items-center justify-center ${
            transparent
              ? "bg-transparent"
              : dark
                ? "bg-black/95"
                : "bg-black/50"
          }`}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
