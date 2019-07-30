import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'
import SpotifyPlayer from './SpotifyPlayer'

const shortcodes = {
  SpotifyPlayer,
}

const CustomMDXRenderer = ({ children, data = {}, components = {} }) => (
  <MDXProvider
    components={{
      ...shortcodes,
      ...components,
    }}
  >
    <MDXRenderer scope={data}>{children}</MDXRenderer>
  </MDXProvider>
)

CustomMDXRenderer.propTypes = {
  children: PropTypes.string.isRequired,
  components: PropTypes.object,
  data: PropTypes.object,
}

export { CustomMDXRenderer as MDXRenderer }
