import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { MDXRenderer } from '../components/mdx-renderer';

const IndexPage = ({
  data: {
    allCollectionEntry: { nodes: posts },
    mdxPage
  },
}) => (
  <Layout>
    <ul>
      <h1>{mdxPage.frontmatter.title}</h1>
      <div>
        <MDXRenderer data={mdxPage.frontmatter}>{mdxPage.body}</MDXRenderer>
      </div>
      <h2>All Posts</h2>
      {posts.map(({ page }) => (
        <li>
          <span>{page.frontmatter.date}</span> - <Link to={page.pagePath}>{page.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
);

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allCollectionEntry: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const IndexQuery = graphql`
  query IndexQuery($id: String!) {
    mdxPage(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
    allCollectionEntry(
      filter: { collection: { key: { eq: "posts" } } }
      sort: { fields: [page___frontmatter___date], order: DESC }
    ) {
      nodes {
        page {
          pagePath
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
          }
          parent {
            ... on Mdx {
              timeToRead
            }
          }
        }
      }
    }
  }
`;
