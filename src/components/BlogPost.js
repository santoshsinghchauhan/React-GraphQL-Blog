import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { Link } from "react-router-dom";
import { Image, Button, Breadcrumb } from "react-bootstrap";
import Moment from "react-moment";

const BlogPost = ({ data: { loading, error, post } }) => {
  if (error) {
    return <p>Error fetching posts!</p>;
  }

  if (!loading) {
    return (
      <article className="post-wrapper">
        <Breadcrumb>
          <li className="breadcrumb-item">
            <Link to="/">Sample Blog</Link>
          </li>
          <Breadcrumb.Item active>{post.slug}</Breadcrumb.Item>
        </Breadcrumb>

        {post.featuredImage && (
          <div className="post-featured-image pt-3">
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              className="mb-3 img-fluid w-100"
              rounded
            />
          </div>
        )}
        <h1>{post.title}</h1>
        <h6 className="text-muted mb-3">
          <Moment format="MMMM Do, YYYY">{new Date(post.postDate)}</Moment>
        </h6>
        <div
          className="post-body-content text-muted pb-3"
          dangerouslySetInnerHTML={{ __html: post.postBody.html }}
        />

        <Link to="/">
          <Button variant="warning btn-block">Back to Blog</Button>
        </Link>
      </article>
    );
  }
  return <p>Loading Post...</p>;
};

export const singlePost = gql`
  query singlePost($slug: String!) {
    post(where: { slug: $slug }) {
      id
      postDate
      slug
      title
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

export default graphql(singlePost, {
  options: ({ match }) => ({
    variables: {
      slug: match.params.slug
    }
  })
})(BlogPost);
