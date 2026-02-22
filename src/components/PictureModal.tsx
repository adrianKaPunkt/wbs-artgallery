import React from "react";

type PictureModalProps = {
  imgUrl: string;
  onClose: () => void;
};

const PictureModal = ({ imgUrl, onClose }: PictureModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-100 flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <img src={imgUrl} alt="Artwork" className="w-[95%] xl:w-[70%]" />
    </div>
  );
};

export default PictureModal;
