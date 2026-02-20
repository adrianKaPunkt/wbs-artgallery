import type { Artwork } from "../schema/artwork";
import ArtworkCard from "./ArtworkCard";

type GalleryProps = {
  artworks: Artwork[];
};

const Gallery = ({ artworks }: GalleryProps) => {
  return (
    <div className="grid grid-cols-3 gap-7">
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <ArtworkCard artwork={artwork} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
