import { Link } from "react-router";
import type { Artwork } from "../schema/artwork";
import { Button } from "./ui/button";
// import parse from "html-react-parser";

type ArtworkCardProps = {
  artwork: Artwork;
};

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  if (!artwork) return null;

  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`
    : "https://wahooart.com/media/artworks/images/full/ae/b9/aeb9e0548b9a4ed0be9828286be2c9f9.JPG";

  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-full cursor-pointer border bg-white border-gray-100 flex flex-col">
      <div className="h-64 w-full overflow-hidden shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork?.title || "Artwork Image"}
            className="object-cover h-full w-full"
          />
        ) : null}
      </div>

      {/* content area */}
      <div className="p-6 text-center flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          <h2 className="text-xl font-bold line-clamp-1">{artwork?.title}</h2>
          <p className="mt-3 line-clamp-1">
            {artwork?.artist_title ? artwork?.artist_title : "Unknown Artist"}
          </p>
          <p>({artwork?.date_start ? artwork?.date_start : "Unknown Date"})</p>
          <p className="line-clamp-2 mt-7 mb-6 text-gray-600">
            {artwork.thumbnail?.alt_text}
          </p>
        </div>

        <Link to={`/artwork/${artwork.id}`}>
          <Button variant="default" className="w-full mt-2">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArtworkCard;
