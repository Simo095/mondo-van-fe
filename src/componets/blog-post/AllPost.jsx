/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CardFooter, Col, Container, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import SinglePost from "../blog-post/SinglePost";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { fetchPost, fetchPostCategory } from "../../redux/actions";

const AllPost = () => {
  const posts = useSelector(state => state.post.data);
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);
  const category = useSelector(state => state.post.category);
  const cat = useSelector(state => state.post.categoryString);

  const [page, setPage] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="AllPost">
      <Container fluid>
        <h5 className="mt-3 text-white">I post della nostra comunity</h5>
        <Row>
          {posts && posts.length !== 0 ? (
            <Col className="d-flex flex-column gap-3 justify-content-between align-items-center">
              {posts.toReversed().map((elem, i) => (
                <SinglePost
                  elem={elem}
                  key={elem.id}
                  profile={user}
                />
              ))}
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
                    if (category) {
                      dispatch(fetchPostCategory(token, page - 2, cat));
                    } else {
                      dispatch(fetchPost(token, page - 2));
                    }
                  }}>
                  <BsCaretLeft />
                </Pagination.Item>
                <Pagination.Item disabled>{page - 1 === 0 ? "..." : page - 1}</Pagination.Item>
                <Pagination.Item active={true}>{page}</Pagination.Item>
                <Pagination.Item disabled>{posts.length === 0 ? "..." : page + 1}</Pagination.Item>
                <Pagination.Item
                  onClick={() => {
                    if (category) {
                      dispatch(fetchPostCategory(token, page, cat));
                    } else {
                      dispatch(fetchPost(token, page));
                    }
                    setPage(page + 1);
                  }}>
                  <BsCaretRight />
                </Pagination.Item>
              </Pagination>
            </div>
          </CardFooter>
        </Row>
      </Container>
    </div>
  );
};
export default AllPost;
