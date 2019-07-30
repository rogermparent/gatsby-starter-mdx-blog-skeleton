import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from '../components/mdx-renderer';
import Layout from '../components/layout';

const Post = ({
  data: {
    mdxPage,
  }
}) => (
    <Layout>
      <h1>{mdxPage.frontmatter.title}</h1>
      <div>
        <MDXRenderer>{mdxPage.body}</MDXRenderer>
      </div>
    </Layout>
  )
;

export default Post;

Post.propTypes = {
  data: PropTypes.shape({
    mdxPage: PropTypes.object.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
    site: PropTypes.shape({
      siteMetadata: PropTypes.object,
    }),
  }).isRequired,
};

export const postQuery = graphql`
  query pageById($id: String!) {
    mdxPage(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
