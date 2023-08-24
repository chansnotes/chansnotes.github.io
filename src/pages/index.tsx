import React, { FunctionComponent, useMemo } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from '../components/Common/GlobalStyle'
import Introduction from '../components/Main/Introduction'
import Footer from '../components/Common/Footer'
import CategoryList, { CategoryListProps } from '../components/Main/CategoryList'
import PostList from '../components/Main/PostList'
import { PostListItemType } from '../types/PostItem.types'
import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}


const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: {
    search
  },
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
    },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  // const categoryList = useMemo(
  //   () =>
  //     edges.reduce(
  //       (
  //         list: CategoryListProps['categoryList'],
  //         {
  //           node: {
  //             frontmatter: { topic },
  //           },
  //         }: PostType,
  //       ) => {
  //         topic.forEach(category => {
  //           if (list[category] === undefined) list[category] = 1;
  //           else list[category]++;
  //         });

  //         list['All']++;

  //         return list;
  //       },
  //       { All: 0 },
  //     ),
  //   [],
  // )
  return (

    <Container>
      <GlobalStyle />
      <Introduction profileImage={gatsbyImageData} />
      {/* <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      /> */}
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
        file(name: { eq: "me" }) {
          childImageSharp {
            gatsbyImageData(width: 120, height: 120)
          }
        }
    }
`