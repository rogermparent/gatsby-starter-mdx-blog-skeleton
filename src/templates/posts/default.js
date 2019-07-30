import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from '../../components/mdx-renderer';
import Layout from '../../components/layout';

const Post = ({
  data: {
    next,
    prev,
    mdxPage,
  }
}) => {
  const post = mdxPage.frontmatter;

  return (
    <Layout>
      <h1>{post.title}</h1>
      <div className="taxonomies">
        {mdxPage.taxonomies.map(({ taxonomy, terms }) => (
          <div>
            <b>{taxonomy.key}: </b>
            {terms ? terms.map((cat, i) => (<>
              {i !== 0 && ', '}<Link to={`/${taxonomy.key}/${cat}`}>{cat}</Link>
            </>)) : null}
          </div>
        ))}
      </div>
      <div>
        <MDXRenderer>{mdxPage.body}</MDXRenderer>
      </div>
      <div>
        { prev &&
          <span>
            <Link to={prev.pagePath}>&larr; {prev.frontmatter.title}</Link>
          </span>
        }
        {' '}
        { next &&
          <span>
            <Link to={next.pagePath}>{next.frontmatter.title} &rarr;</Link>
          </span>
        }
      </div>
    </Layout>
  );
};

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
  query postById($id: String!, $next: String, $prev: String) {
    mdxPage(id: {eq: $id}) {
      body
      frontmatter {
        title
        date(formatString: "MM/DD/YYYY")
      }
      taxonomies: childrenTaxonomyTermSet {
        taxonomy {
          key
        }
        terms
      }
    }
    next: mdxPage(id: {eq: $next}) {
      pagePath
      frontmatter {
        title
      }
    }
    prev: mdxPage(id: {eq: $prev}) {
      pagePath
      frontmatter {
        title
      }
    }
  }
`;
