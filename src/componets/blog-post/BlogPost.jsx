import { Container } from "react-bootstrap";
import FormAddPost from "../profile-page/FormAddPost";
import { useDispatch, useSelector } from "react-redux";
import AllPost from "./AllPost";
import NavBar from "../stucture/NavBar.jsx";
import { useEffect } from "react";
import { fetchPost } from "../../redux/actions";

const BlogPost = () => {
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost(token));
  }, []);
  return (
    <Container
      fluid
      className="ContainerProfileMain">
      <NavBar />
      <Container
        style={{ maxWidth: "70vw", paddingTop: "2rem" }}
        className="overflow-y-scroll containerBlog border rounded-3"
        fluid>
        <h2
          className="text-center mb-5"
          style={{ fontWeight: "bold" }}>
          I racconti della nostra comunity
        </h2>
        <FormAddPost user={user} />
        <AllPost />
      </Container>
    </Container>
  );
};
export default BlogPost;
