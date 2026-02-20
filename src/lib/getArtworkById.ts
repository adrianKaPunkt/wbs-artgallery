import { ArtworkItemSchema, type Artwork } from "@/schema/artwork";

export async function getArtworkById(id: number): Promise<Artwork | null> {
  const fields =
    "id,title,artist_title,description,alt_text,date_start,image_id,thumbnail";
  const url = `https://api.artic.edu/api/v1/artworks/${id}?fields=${fields}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    const { data, success, error } = ArtworkItemSchema.safeParse(result);

    if (!success) {
      console.log(error);
      throw new Error("Data validation failed");
    }
    console.log("Fetched artwork data:", data);
    return data.data || null;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching artwork:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
}
