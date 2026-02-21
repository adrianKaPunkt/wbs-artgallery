import type { Artwork } from "../schema/artwork";
import ArtworkCard from "./ArtworkCard";

type GalleryProps = {
  artworks: Artwork[];
};

const Gallery = ({ artworks }: GalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-5 md:px-0">
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <ArtworkCard artwork={artwork} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
