import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from '../components/Common/GlobalStyle'
import Introduction from '../components/Main/Introduction'
import Footer from '../components/Common/Footer'
import CategoryList from '../components/Main/CategoryList'
import PostList from '../components/Main/PostList'
import { PostListItemType } from '../types/PostItem.types'
import { graphql } from 'gatsby'

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
  }
}


const IndexPage: FunctionComponent<IndexPageProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  }
}) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      {/* <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} /> */}
      <PostList posts={edges} />
      <Footer />
    </Container>
  )
}

export default IndexPage

export const getPostList = graphql`
    query getPostList {
        allMarkdownRemark(
            sort: [{
                frontmatter: {date: DESC}
            }, {frontmatter: {title: DESC}}]
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        topic
                        category
                        date(formatString: "YYYY.MM.DD.")
                        excerpt
                        thumbnail {
                            childImageSharp {
                              gatsbyImageData(width: 768, height: 400)
                            }
                          }
                    }
                }
            }
        }
    }
`