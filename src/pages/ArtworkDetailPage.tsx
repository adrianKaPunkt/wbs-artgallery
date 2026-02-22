import { useParams } from "react-router";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Notes from "@/components/Notes";
import Star from "@/components/Star";
import PictureModal from "@/components/PictureModal";
import { getArtworkById } from "@/lib/getArtworkById";
import { getArtist } from "@/lib/getArtist";
import type { Artwork } from "@/schema/artwork";

type Artist = {
  name: string;
  description: string;
  thumbnail: {
    source: string;
  };
  extract_html: string;
};

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchArtwork() {
      const fetchedArtwork = await getArtworkById(Number(id));
      setArtwork(fetchedArtwork);
      const fetchedArtist = await getArtist(fetchedArtwork?.artist_title || "");
      setArtist(fetchedArtist);
    }
    fetchArtwork();
  }, [id]);

  function handleModal() {
    setIsModalOpen((prev) => !prev);
  }

  const imageUrl = artwork?.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : "https://wahooart.com/media/artworks/images/full/ae/b9/aeb9e0548b9a4ed0be9828286be2c9f9.JPG";

  const artistImageUrl = artist?.thumbnail?.source
    ? artist.thumbnail.source
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

  return (
    <>
      {isModalOpen && <PictureModal imgUrl={imageUrl} onClose={handleModal} />}
      <div className="container mx-auto pt-32 px-5 md:px-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{artwork?.title}</h1>
            <p className="text-xs mt-2">by</p>
            <p className="text-xl">
              {artwork?.artist_title ? artwork?.artist_title : "Unknown Artist"}{" "}
              - {artwork?.date_start}
            </p>
          </div>
          <div className="mr-7">
            <Star id={artwork?.id ? artwork.id : undefined} size={50} />
          </div>
        </div>
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div onClick={handleModal} className="cursor-pointer">
            <img src={imageUrl} alt={artwork?.title || "Artwork"} />
          </div>
          <div className="leading-loose text-lg">
            {parse(artwork?.description || "")}
          </div>
        </div>
        {artist?.description && (
          <div className="bg-black/90 text-gray-200 p-10 rounded-3xl">
            <div>
              <h2 className="text-2xl font-bold mt-2 mb-2">
                {artwork?.artist_title}
              </h2>
              <p className="leading-relaxed">
                {parse(artist?.description || "No information available.")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-10">
              <img
                className="w-full aspect-square object-cover rounded-full"
                src={artistImageUrl}
                alt={artist?.name || "Artist"}
              />
              <div className="flex col-span-2 text-lg leading-loose h-full items-center">
                {artist?.extract_html
                  ? parse(artist.extract_html)
                  : "No extract available."}
              </div>
            </div>
          </div>
        )}
        {artwork?.id && (
          <div className="mt-20">
            <Notes id={artwork?.id ?? ""} />
          </div>
        )}
      </div>
    </>
  );
};

export default ArtworkDetailPage;
