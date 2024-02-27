import Image from "next/image";
import { IoMdClose } from "react-icons/io";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
// import { StreetView } from "~/components/Molecules/StreetView";
import { createYtEmbedUrl } from "~/fns/createYtEmbedUrl";
import type { MediaType } from "~/types/property";
import { Modal } from "~/ui/Modal";

export const PropertyMediaModal = ({
  onClose,
  images,
  handleForward,
  handleBack,
  show,
  // streetViewPosition,
  videos,
  handleVideosBack,
  handleVideosForward,
}: {
  onClose: () => void;
  images: { name: string; url: string }[];
  videos: string[];
  handleForward: (idx: number) => void;
  handleBack: (idx: number) => void;
  show: MediaType;
  handleVideosBack: (x: number) => void;
  handleVideosForward: (x: number) => void;
  streetViewPosition: { lat?: number; lng?: number };
}) => {
  const firstImage = images[0];
  const firstVideo = videos[0];
  const isImage =
    show === "images" || show === "floorplans" || show === "condo-images";
  const isVideo = show === "videos" || show === "tours";
  // const { lat, lng } = streetViewPosition;
  const showButtons =
    (isImage && images.length > 1) || (isVideo && videos.length > 1);

  return (
    <Modal dark onClose={onClose}>
      <div
        className={`relative flex h-full w-full ${
          isImage ? "max-w-6xl" : "max-w-7xl"
        } flex-col justify-center gap-3`}
      >
        <button
          onClick={onClose}
          className="absolute right-8 top-4 z-10 flex items-center gap-2 rounded-lg bg-black/50 px-3 py-2 text-white"
        >
          Fechar
          <IoMdClose size={20} />
        </button>

        {["images", "condo-images", "floorplans", "videos", "tours"].includes(
          show,
        ) &&
          showButtons && (
            <>
              <button
                onClick={() => {
                  if (isImage) handleBack(1);
                  if (isVideo) handleVideosBack(1);
                }}
                className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow shadow-gray-600 xl:-left-16 xl:bg-gray-800 xl:shadow-none"
              >
                <BsChevronLeft
                  size={14}
                  className="stroke-1 text-gray-700 xl:text-white"
                />
              </button>
              <button
                onClick={() => {
                  if (isImage) handleForward(1);
                  if (isVideo) handleVideosForward(1);
                }}
                className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow shadow-gray-600 xl:-right-16 xl:bg-gray-800 xl:shadow-none"
              >
                <BsChevronRight
                  size={14}
                  className="stroke-1 text-gray-700 xl:text-white"
                />
              </button>
            </>
          )}

        {(show === "images" ||
          show === "floorplans" ||
          show === "condo-images") && (
          <div className="flex h-full w-full max-w-6xl flex-col justify-center gap-3">
            <div className="relative">
              <div
                className={`relative aspect-video w-full overflow-hidden lg:rounded-lg`}
              >
                <Image
                  draggable={false}
                  className="object-cover"
                  alt={firstImage ? firstImage.name : "Imóvel sem imagem"}
                  src={
                    firstImage
                      ? firstImage.url
                      : "https://www.usenonstop.com/images/image-placeholder.webp"
                  }
                  priority
                  sizes="100vw 
                           (min-width: 1280px) 1200px"
                  fill
                />
              </div>
            </div>
            <div className="hidden w-full gap-3 lg:flex">
              {images.slice(1, 5).map((p, i) => (
                <button
                  onClick={() => handleForward(i + 1)}
                  key={p.url}
                  className="relative h-28 w-44 overflow-hidden rounded"
                >
                  {i === 3 && images.length > 5 && (
                    <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-black/60 text-lg text-white">
                      +{images.length - 5}
                    </div>
                  )}
                  <Image
                    draggable={false}
                    sizes="0vw
                    (min-width:1024px) 176px"
                    src={p.url}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* {!!lat && !!lng && show === "streetview" && ( */}
        {/*   <div className="relative aspect-video w-full max-w-7xl overflow-hidden lg:rounded-lg"> */}
        {/*     <StreetView position={{ lat, lng }} /> */}
        {/*   </div> */}
        {/* )} */}

        {(show === "tours" || show === "videos") && !!firstVideo && (
          <div className="relative aspect-video w-full max-w-7xl overflow-hidden lg:rounded-lg">
            <iframe
              scrolling="no"
              width="100%"
              height="100%"
              src={createYtEmbedUrl(firstVideo)}
              allowFullScreen
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
