import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import MainTemplate from '../components/Common/mainTemplate'
import { PostPageItemType } from '../types/PostItem.types'
import PostHead from '../components/Post/PostHead'
import PostContent from '../components/Post/PostContent'

type PostTemplateProps = {
    data: {
        allMarkdownRemark: {
            edges: PostListItemType[]
        }
    }
    location: {
    href: string
  }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
    data: {
        allMarkdownRemark: { edges },
    },
    location: { href },
}) {
const {
    node: {
      html,
      frontmatter: {
        title,
        excerpt, 
        date,
        category,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0]

    return (
        <MainTemplate title={title} description={excerpt} url={href} image={publicURL}>
            <PostHead
                title={title}
                date={date}
                category={category}
                thumbnail={gatsbyImageData}
            />
            <PostContent html={html} />
        </MainTemplate>
    )
}


export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            excerpt
            date(formatString: "YYYY.MM.DD.")
            category
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
                publicURL
            }
          }
        }
      }
    }
  }
`