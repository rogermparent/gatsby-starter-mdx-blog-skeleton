import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';

const Category = ({
  pageContext: { taxonomy },
  data: {
    allTaxonomyTermSet: { group },
  },
}) => (
  <Layout>
    <Helmet title={taxonomy} />
    <h3>{taxonomy}</h3>
    <ul>
      {group.map(({fieldValue, totalCount}) => (
        <li key={fieldValue}>
          <Link to={`/${taxonomy}/${fieldValue}`}>{fieldValue}</Link> ({totalCount})
        </li>
      ))}
    </ul>
  </Layout>
);

export default Category;

Category.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.object,
    }).isRequired,
    allTaxonomyTermSet: PropTypes.shape({
      group: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const postQuery = graphql`
  query CategoriesPage($taxonomy: String!) {
    allTaxonomyTermSet(filter: { taxonomy: { key: { eq: $taxonomy } } }) {
      group(field: terms) {
        fieldValue
        totalCount
      }
    }
  }
`;
