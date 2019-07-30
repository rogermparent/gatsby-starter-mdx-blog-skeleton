import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';

const Category = ({
  pageContext: { term, taxonomy },
  data: {
    allTaxonomyTermSet,
  },
}) => {
  const { nodes, totalCount } = allTaxonomyTermSet

  return (
    <Layout>
      <Helmet title={`Category: ${term}`} />
      <h2><Link to={`/${taxonomy}`}>{taxonomy}</Link> &ndash; {term}</h2>
      <h3>{totalCount} pages</h3>
      <ul>
        {nodes.map(({ value: page, terms }) => (
          <li>
            <Link to={page.pagePath}>{page.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
};

export default Category;

Category.propTypes = {
  pageContext: PropTypes.shape({
    term: PropTypes.string.isRequired,
    taxonomy: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allTaxonomyTermSet: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.object,
    }),
  }).isRequired,
};

export const postQuery = graphql`
  query TaxonomyTermPage($term: String!, $taxonomy: String!) {
    allTaxonomyTermSet(sort: {fields: [value___frontmatter___date], order: DESC}, filter: {taxonomy: {key: {eq: $taxonomy}}, terms: {eq: $term}}) {
      totalCount
      nodes {
        terms
        value {
          pagePath
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
          }
          parent {
            ... on Mdx {
              excerpt(pruneLength: 200)
              timeToRead
            }
          }
        }
      }
    }
  }
`;
