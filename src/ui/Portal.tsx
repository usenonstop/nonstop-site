import { createPortal } from "react-dom";

interface Props {
  id?: string;
  children: React.ReactNode;
}

export const Portal = ({ id = "main", children }: Props) => {
  const existingParent = document.querySelector(`#${id}`);
  if (!existingParent) return null;
  return createPortal(children, existingParent);
};
