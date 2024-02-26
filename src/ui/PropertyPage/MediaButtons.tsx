import { useAtom } from "jotai";
import { AiOutlineCamera, AiOutlineVideoCamera } from "react-icons/ai";
import { BiArea } from "react-icons/bi";
import { HiOutlineMap } from "react-icons/hi";
import { TbView360 } from "react-icons/tb";
import type { PropertyDTO } from "~/types/property";
import { MediaButton } from "~/ui/MediaButton";
import {
  currentMediaIdxAtom,
  imagesAtom,
  mediaAtom,
  videosAtom,
} from "~/ui/PropertyPage/HeroImage";

export const MediaButtons = ({ property }: { property: PropertyDTO }) => {
  const [media, setMedia] = useAtom(mediaAtom);
  const [, setImages] = useAtom(imagesAtom);
  const [, setVideos] = useAtom(videosAtom);
  const [, setCurrMediaIdx] = useAtom(currentMediaIdxAtom);
  const condoImages = property.condo?.media.images ?? [];

  return (
    <div className="flex w-full flex-wrap gap-2 text-sm font-medium text-gray-800">
      <MediaButton
        active={media === "images"}
        onClick={() => {
          setMedia("images");
          setImages(property.media.images);
          setCurrMediaIdx(0);
        }}
        icon={<AiOutlineCamera size={18} />}
        label="Imóvel"
      />
      <MediaButton
        disabled={condoImages.length < 1}
        active={media === "condo-images"}
        onClick={() => {
          setMedia("condo-images");
          setImages(condoImages);
          setCurrMediaIdx(0);
        }}
        icon={<AiOutlineCamera size={18} />}
        label="Condomínio"
      />
      <MediaButton
        disabled={property.media.floorPlans.length < 1}
        active={media === "floorplans"}
        onClick={() => {
          setMedia("floorplans");
          setImages(property.media.floorPlans);
        }}
        icon={<BiArea size={18} />}
        label="Plantas"
      />
      <MediaButton
        disabled={property.media.videos.length < 1}
        active={media === "videos"}
        onClick={() => {
          setMedia("videos");
          setVideos(property.media.videos);
        }}
        icon={<AiOutlineVideoCamera size={18} />}
        label="Vídeos"
      />
      <MediaButton
        active={media === "streetview"}
        onClick={() => setMedia("streetview")}
        icon={<HiOutlineMap size={18} />}
        label="Streetview"
      />
      <MediaButton
        disabled={property.media.tours.length < 1}
        active={media === "tours"}
        onClick={() => {
          setMedia("tours");
          setVideos(property.media.tours);
        }}
        icon={<TbView360 size={18} />}
        label="Tour virtual"
      />
    </div>
  );
};
