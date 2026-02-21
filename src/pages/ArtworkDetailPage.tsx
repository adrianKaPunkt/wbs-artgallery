import { getArtworkById } from "@/lib/getArtworkById";
import type { Artwork } from "@/schema/artwork";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import parse from "html-react-parser";
import { getArtist } from "@/lib/getArtist";
import Notes from "@/components/Notes";

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [artist, setArtist] = useState({});

  useEffect(() => {
    async function fetchArtwork() {
      const fetchedArtwork = await getArtworkById(Number(id));
      setArtwork(fetchedArtwork);
      const fetchedArtist = await getArtist(fetchedArtwork?.artist_title || "");
      console.log(fetchedArtist);
      setArtist(fetchedArtist);
    }
    fetchArtwork();
  }, [id]);

  const imageUrl = artwork?.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://wahooart.com/media/artworks/images/full/ae/b9/aeb9e0548b9a4ed0be9828286be2c9f9.JPG";

  const artistImageUrl = artist?.thumbnail?.source
    ? artist.thumbnail.source
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

  return (
    <div className="container mx-auto pt-32 px-5 md:px-0">
      <h1 className="text-2xl font-bold">{artwork?.title}</h1>
      <p className="text-xs mt-2">by</p>
      <p className="text-xl">
        {artwork?.artist_title} - {artwork?.date_start}
      </p>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img src={imageUrl} alt={artwork?.title || "Artwork"} />
        </div>
        <div className="leading-relaxed">
          {parse(artwork?.description || "")}
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-2xl font-bold mt-10 mb-2">
          {artwork?.artist_title}
        </h2>
        <p className="leading-relaxed">
          {parse(artist?.description || "No information available.")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-10">
          <img
            className="w-full aspect-square object-cover rounded-full"
            src={artistImageUrl}
            alt={artist?.name || "Artist"}
          />
          <div className="flex col-span-2 leading-relaxed h-full items-center">
            {artist?.extract_html
              ? parse(artist.extract_html)
              : "No extract available."}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Notes id={Number(artwork?.id)} />
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
