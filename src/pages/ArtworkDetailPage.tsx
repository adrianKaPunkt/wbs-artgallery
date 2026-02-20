import { useParams } from "react-router";

const ArtworkDetailPage = () => {
  const { id } = useParams();
  return <div>ArtworkDetailPage for artwork ID: {id}</div>;
};

export default ArtworkDetailPage;
