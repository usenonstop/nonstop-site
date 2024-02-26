/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { createAddressString } from "~/fns/createAddressString";
import { createYtEmbedUrl } from "~/fns/createYtEmbedUrl";
import type { MediaFile, MediaType, PropertyDTO } from "~/types/property";
import { PropertyMediaModal } from "~/ui/PropertyPage/MediaModal";
import { StreetView } from "~/ui/PropertyPage/StreetView";

export const mediaAtom = atom<MediaType>("images");
export const imagesAtom = atom<MediaFile[]>([]);
export const videosAtom = atom<string[]>([]);
export const currentMediaIdxAtom = atom(0);

export const HeroImage = ({
  property,
  hideFloor,
}: {
  property: PropertyDTO;
  hideFloor?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [media, setMedia] = useAtom(mediaAtom);
  const [images, setImages] = useAtom(imagesAtom);
  const [videos, setVideos] = useAtom(videosAtom);
  const [currMediaIdx, setCurrMediaIdx] = useAtom(currentMediaIdxAtom);
  const prevImage = images[images.length - 1];
  const nextImage = images[1];
  const firstImage = images[0];
  const firstVideo = videos[0];
  const { coordinates } = property.address.geo;
  const lat = coordinates[0];
  const lng = coordinates[1];
  const isImage =
    media === "images" || media === "floorplans" || media === "condo-images";
  const isVideo = media === "videos" || media === "tours";
  const showButtons =
    (isImage && images.length > 1) || (isVideo && videos.length > 1);
  const condoImages = property.condo?.media.images ?? [];

  useEffect(() => {
    setImages(property.media.images);
    setVideos(property.media.videos);
  }, []);

  const { address } = property;

  const hideAddress = property.mgmtDecisions.some(
    (d) => d === "OCULTAR_ENDERECO",
  );

  const positionLast = (arr: MediaFile[]) => {
    arr = [...arr];
    const lastEls = arr.splice(-1);
    arr.unshift(...lastEls);
    return arr;
  };

  const handleBack = (n: number) => {
    if (condoImages.length > 0) {
      if (currMediaIdx - n < 0) {
        if (media === "images") {
          setMedia("condo-images");
          setImages(positionLast(condoImages));
          setCurrMediaIdx(condoImages.length - 1);
        }
        if (media === "condo-images") {
          setMedia("images");
          setImages(positionLast(property.media.images));
          setCurrMediaIdx(property.media.images.length - 1);
        }
      } else {
        setCurrMediaIdx((i) => i - n);
        setImages((i) => {
          const arr = [...i];
          const lastEls = arr.splice(-n);
          arr.unshift(...lastEls);
          return arr;
        });
      }
    } else {
      setImages((i) => {
        const arr = [...i];
        const lastEls = arr.splice(-n);
        arr.unshift(...lastEls);
        return arr;
      });
    }
  };

  const handleForward = (n: number) => {
    if (condoImages.length > 0) {
      if (currMediaIdx + n > images.length - 1) {
        if (media === "images") {
          setMedia("condo-images");
          setImages(condoImages);
          setCurrMediaIdx(0);
        }
        if (media === "condo-images") {
          setMedia("images");
          setImages(property.media.images);
          setCurrMediaIdx(0);
        }
      } else {
        setCurrMediaIdx((i) => i + n);
        setImages((i) => {
          const arr = [...i];
          const firstEls = arr.splice(0, n);
          arr.push(...firstEls);
          return arr;
        });
      }
    } else {
      setImages((i) => {
        const arr = [...i];
        const firstEls = arr.splice(0, n);
        arr.push(...firstEls);
        return arr;
      });
    }
  };

  const handleVideosBack = (n: number) =>
    setVideos((i) => {
      const arr = [...i];
      const lastEls = arr.splice(-n);
      arr.unshift(...lastEls);
      return arr;
    });

  const handleVideosForward = (n: number) =>
    setVideos((i) => {
      const arr = [...i];
      const firstEls = arr.splice(0, n);
      arr.push(...firstEls);
      return arr;
    });

  const onClick = (idx: number) => {
    if (idx > 0) handleForward(idx);
    setShowModal(true);
  };

  return (
    <div className="relative h-96 w-full md:overflow-hidden md:rounded-lg">
      {["images", "condo-images", "floorplans", "videos", "tours"].includes(
        media,
      ) &&
        showButtons && (
          <div className="pointer-events-none absolute z-10 h-96 w-full">
            <button
              disabled={isVideo && videos.length < 1}
              onClick={(e) => {
                e.stopPropagation();
                if (isImage) handleBack(1);
                if (isVideo) handleVideosBack(1);
              }}
              className="pointer-events-auto absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow shadow-gray-600"
            >
              <BsChevronLeft size={14} className="stroke-1 text-gray-700" />
            </button>
            <button
              disabled={isVideo && videos.length < 1}
              onClick={(e) => {
                e.stopPropagation();
                if (isImage) handleForward(1);
                if (isVideo) handleVideosForward(1);
              }}
              className="pointer-events-auto absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-white shadow shadow-gray-600"
            >
              <BsChevronRight size={14} className="stroke-1 text-gray-700" />
            </button>
          </div>
        )}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(0)}
        className="@container relative h-96 w-full md:overflow-hidden md:rounded-lg"
      >
        {!!lat && lng && media === "streetview" && (
          <StreetView position={{ lat, lng }} />
        )}

        {(media === "tours" || media === "videos") && !!firstVideo && (
          <div className="relative h-96 w-full">
            <div className="absolute h-full w-full" />
            <iframe
              scrolling="no"
              width="100%"
              height="100%"
              src={createYtEmbedUrl(firstVideo)}
              allowFullScreen
            />
          </div>
        )}

        {(media === "images" ||
          media === "floorplans" ||
          media === "condo-images") && (
          <>
            <Image
              draggable={false}
              className="hidden object-cover"
              alt={prevImage?.name ?? "Imóvel sem imagem"}
              src={prevImage?.url ?? "/images/image-placeholder.webp"}
              priority
              sizes="100vw 
                (min-width: 1280px) 1200px"
              fill
            />
            <Image
              draggable={false}
              className="object-cover"
              alt={firstImage?.name ?? "Imóvel sem imagem"}
              src={firstImage?.url ?? "/images/image-placeholder.webp"}
              priority
              sizes="100vw 
                (min-width: 1280px) 1200px"
              fill
            />
            <Image
              draggable={false}
              className="hidden object-cover"
              alt={nextImage?.name ?? "Imóvel sem imagem"}
              src={nextImage?.url ?? "/images/image-placeholder.webp"}
              priority
              sizes="100vw 
                (min-width: 1280px) 1200px"
              fill
            />

            <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-black to-transparent opacity-50" />

            <div className="@sm:max-w-2xl absolute bottom-10 left-4 max-w-xs text-xl font-medium text-white">
              {hideAddress
                ? createAddressString(address, [])
                : hideFloor
                  ? createAddressString(address, ["number"])
                  : createAddressString(address)}
            </div>

            <div className="absolute bottom-4 left-4 max-w-xs truncate text-sm font-medium text-white">
              {`${address.area} - ${address.city}/${address.state}`}
            </div>
          </>
        )}
      </div>

      {showModal && (
        <PropertyMediaModal
          show={media}
          images={images}
          videos={videos}
          onClose={() => setShowModal(false)}
          handleForward={handleForward}
          handleBack={handleBack}
          streetViewPosition={{ lat, lng }}
          handleVideosBack={handleVideosBack}
          handleVideosForward={handleVideosForward}
        />
      )}
    </div>
  );
};
