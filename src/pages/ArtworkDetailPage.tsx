import { getArtworkById } from "@/lib/getArtworkById";
import type { Artwork } from "@/schema/artwork";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import parse from "html-react-parser";

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    async function fetchArtwork() {
      const fetchedArtwork = await getArtworkById(Number(id));
      setArtwork(fetchedArtwork);
    }
    fetchArtwork();
  }, [id]);

  const imageUrl = artwork?.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://wahooart.com/media/artworks/images/full/ae/b9/aeb9e0548b9a4ed0be9828286be2c9f9.JPG";

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">{artwork?.title}</h1>
      <div className="mt-5 grid grid-cols-2 gap-10">
        <div>
          <img src={imageUrl} alt={artwork?.title || "Artwork"} />
        </div>
        <div>{parse(artwork?.description || "")}</div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
