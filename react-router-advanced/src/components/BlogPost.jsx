import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  return <h3>Viewing Blog Post ID: {id}</h3>;
};

export default BlogPost;
