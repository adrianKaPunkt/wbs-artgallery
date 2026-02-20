import { ArtworkSchema } from "../schema/artwork";

type SortField = "" | "date_start";

export async function getArtwork(
  query: string,
  limit: number,
  page: number,
  sortField: SortField = "",
) {
  const fields =
    "id,title,artist_title,description,alt_text,date_start,image_id,thumbnail,pagination";
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=${limit}&page=${page}&fields=${fields}&sort=${sortField}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    const { data, success, error } = ArtworkSchema.safeParse(result);
    if (!success) {
      console.log(error);
      throw new Error("Data validation failed");
    }
    return { items: data.data, pagination: data.pagination };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching artwork:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return { items: [], pagination: null };
  }
}
