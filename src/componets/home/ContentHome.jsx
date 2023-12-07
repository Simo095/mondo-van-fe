import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router";

const ContentHome = () => {
  const apiNews = "2b1292ceaa8e43c8a98b7e54f5d39a53";
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState(null);
  const [url, setUrl] = useState("");
  const NewsFetch = async () => {
    const news = await fetch(`https://newsapi.org/v2/everything?q=van+outdoor&language=it&apiKey=${apiNews}`, {
      method: "GET"
    });
    if (news.ok) {
      const data = await news.json();
      console.log(data);
      setArticles(data.articles);
      console.log(articles);
      setContent(data.articles[0].description);
      setUrl(data.articles[0].url);
    }
  };
  return (
    <Container>
      <h2 className="text-black">News</h2>
      <Row>
        {articles ? (
          articles.map((article, i) => (
            <Col
              key={i}
              className="d-flex flex-column"
              sm={3}>
              <Card>
                <Card.Img
                  variant="top"
                  alt={article.title}
                  src={article.urlToImage}
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <Button href={article.url}>url</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
      <Button onClick={NewsFetch}>NEWS</Button>
      <Button href={url}>URL</Button>
    </Container>
  );
};
export default ContentHome;
