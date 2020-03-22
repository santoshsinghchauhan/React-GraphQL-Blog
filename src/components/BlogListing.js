import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Moment from "react-moment";
import { Row, Col, Card } from "react-bootstrap";

const BlogListing = ({ data: { loading, error, posts } }) => {
  function truncate(str) {
    return str.length > 10 ? str.substring(0, 120) + "..." : str;
  }

  if (error) {
    return <p>Error fetching posts!</p>;
  }

  if (!loading) {
    return (
      <div className="wrapper posts-listing">
        <Row>
          {posts.map(post => (
            <Col md={6} lg={4} key={post.id} className="mb-5">
              <Card className="post-item">
                {post.featuredImage && (
                  <Link to={`/sample-blog/${post.slug}`}>
                    <Card.Img
                      variant="top"
                      alt={post.title}
                      src={`https://media.graphcms.com/resize=w:768,h:432,fit:crop/${post.featuredImage.url}`}
                      className="img-fluid"
                    />
                  </Link>
                )}
                <Card.Body>
                  <Card.Title>
                    <Link to={`/sample-blog/${post.slug}`}>{post.title}</Link>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <Moment format="MMMM Do, YYYY">
                      {new Date(post.postDate)}
                    </Moment>
                  </Card.Subtitle>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: truncate(post.postBody.text)
                    }}
                  />
                </Card.Body>
                <Link to={`/sample-blog/${post.slug}`}>
                  <Card.Footer className="text-muted">Read More</Card.Footer>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
  return (
    <div className="loading">
      <div className="loading-anim">Loading...</div>
    </div>
  );
};

export const posts = gql`
  query posts {
    posts(orderBy: postDate_DESC) {
      id
      postDate
      title
      slug
      featuredImage {
        id
        url
      }
      postBody {
        raw
        html
        markdown
        text
      }
    }
  }
`;

export default graphql(posts)(BlogListing);
