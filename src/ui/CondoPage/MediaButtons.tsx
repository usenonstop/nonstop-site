import { useAtom } from "jotai";
import { AiOutlineCamera, AiOutlineVideoCamera } from "react-icons/ai";
import { BiArea } from "react-icons/bi";
import { HiOutlineMap } from "react-icons/hi";
import { TbView360 } from "react-icons/tb";
import type { CondoDTO } from "~/types/condo";
import { MediaButton } from "~/ui/MediaButton";
import {
  currentMediaIdxAtom,
  imagesAtom,
  mediaAtom,
  videosAtom,
} from "~/ui/CondoPage/HeroImage";

export const MediaButtons = ({ condo }: { condo: CondoDTO }) => {
  const [media, setMedia] = useAtom(mediaAtom);
  const [, setImages] = useAtom(imagesAtom);
  const [, setVideos] = useAtom(videosAtom);
  const [, setCurrMediaIdx] = useAtom(currentMediaIdxAtom);

  return (
    <div className="flex w-full flex-wrap gap-2 text-sm font-medium text-gray-800">
      <MediaButton
        active={media === "images"}
        onClick={() => {
          setMedia("images");
          setImages(condo.media.images);
          setCurrMediaIdx(0);
        }}
        icon={<AiOutlineCamera size={18} />}
        label="Imóvel"
      />
      <MediaButton
        disabled={condo.media.floorPlans.length < 1}
        active={media === "floorplans"}
        onClick={() => {
          setMedia("floorplans");
          setImages(condo.media.floorPlans);
        }}
        icon={<BiArea size={18} />}
        label="Plantas"
      />
      <MediaButton
        disabled={condo.media.videos.length < 1}
        active={media === "videos"}
        onClick={() => {
          setMedia("videos");
          setVideos(condo.media.videos);
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
        disabled={condo.media.tours.length < 1}
        active={media === "tours"}
        onClick={() => {
          setMedia("tours");
          setVideos(condo.media.tours);
        }}
        icon={<TbView360 size={18} />}
        label="Tour virtual"
      />
    </div>
  );
};
