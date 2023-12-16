import { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader, Col, Container, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SinglePost from "../profile-page/SinglePost";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { fetchPost } from "../../redux/actions";

const AllPost = () => {
  const posts = useSelector(state => state.post.postMyFriends);
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const [show, setShow] = useState(false);
  const [postText, setPostText] = useState();
  const [modifica, setModifica] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [page, setPage] = useState();
  const [showPost, setShowPost] = useState(false);
  const handleClosePost = () => setShow(false);
  const handleShowPost = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const delPost = async postId => {
    try {
      const resp = await fetch(``, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (resp.ok) {
      }
    } catch (error) {
      console.log("si e' verificato un errore", error.message);
    }
  };
  useEffect(() => {
    dispatch(fetchPost(token));
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="AllPost">
      <Container>
        <Row>
          <Card className="mt-5">
            <h5 className="mt-3">I post della nostra comunity</h5>
            <Row>
              {posts && posts.length !== 0 ? (
                <Col className="d-flex justify-content-between align-items-center">
                  {posts.toReversed().map(
                    (elem, i) =>
                      i >= page * 1 - 1 &&
                      i < page * 1 && (
                        <SinglePost
                          elem={elem}
                          key={`post${i}`}
                          cancella={delPost}
                          profile={user}
                          handleClose={handleClosePost}
                          handleShow={handleShowPost}
                          show={showPost}
                          setPostText={setPostText}
                          setModifica={setModifica}
                          setIdPost={setIdPost}
                        />
                      )
                  )}
                </Col>
              ) : (
                <Row>
                  <Col className="d-flex justify-content-center">
                    <p>Nessun post...</p>
                  </Col>
                </Row>
              )}
              <CardFooter className="">
                <div className="d-flex justify-content-center">
                  <Pagination className="d-flex justify-content-center">
                    <Pagination.Item
                      onClick={() => {
                        page > 1 && setPage(page - 1);
                      }}>
                      <BsCaretLeft />
                    </Pagination.Item>
                    <Pagination.Item disabled>{page - 1 === 0 ? "..." : page - 1}</Pagination.Item>
                    <Pagination.Item active={true}>{page}</Pagination.Item>
                    <Pagination.Item disabled>{page === posts.length / 5 ? "..." : page + 1}</Pagination.Item>
                    <Pagination.Item
                      onClick={() => {
                        page < posts.length && setPage(page + 1);
                      }}>
                      <BsCaretRight />
                    </Pagination.Item>
                  </Pagination>
                </div>
              </CardFooter>
            </Row>
          </Card>
        </Row>
      </Container>
    </div>
  );
};
export default AllPost;
