import type { Artwork } from "../schema/artwork";
import ArtworkCard from "./ArtworkCard";

type GalleryProps = {
  artworks: Artwork[];
  handleFavoriteChange?: () => void;
};

const Gallery = ({ artworks, handleFavoriteChange }: GalleryProps) => {
  return (
    <div className="grid grid-cols-3 gap-7">
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <ArtworkCard
            artwork={artwork}
            handleFavoriteChange={handleFavoriteChange}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
