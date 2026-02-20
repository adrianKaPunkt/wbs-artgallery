import { ArtworkSchema } from "../schema/artwork";

type SortField = "" | "date_start";

export async function getArtwork(
  query: string,
  limit: number,
  page: number,
  sortField: SortField = "",
) {
  const fields =
    "id,title,artist_title,description,alt_text,date_start,image_id,thumbnail";
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=${limit}&page=${page}&fields=${fields}&sort=${sortField}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    const { data, success, error } = ArtworkSchema.array().safeParse(
      result.data,
    );
    if (!success) {
      console.log(error);
      throw new Error("Data validation failed");
    }
    console.log("Fetched artworks:", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching artwork:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
}
