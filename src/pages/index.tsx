import React, { FunctionComponent, useMemo } from 'react'
import Introduction from '../components/Main/Introduction'
import CategoryList, { CategoryListProps } from '../components/Main/CategoryList'
import PostList from '../components/Main/PostList'
import { PostListItemType } from '../types/PostItem.types'
import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'
import MainTemplate from '../components/Common/mainTemplate'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}


const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: {
    search
  },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: {
        gatsbyImageData,
        publicURL,
      },
    },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { category },
            },
          }: PostListItemType,
        ) => {

          if (list[category] === undefined) list[category] = 1;
          else list[category]++;

          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  )

  return (

    <MainTemplate
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}>
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </MainTemplate>
  )
}

export default IndexPage

export const getPostList = graphql`
    query getPostList {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
        allMarkdownRemark(
            sort: [{
                frontmatter: {date: DESC}
            }, {frontmatter: {title: DESC}}]
        ) {
            categoryList: distinct(field:  {frontmatter: {category: SELECT}})
            edges {
                node {
                    id
                    fields {
                      slug
                    }
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
          publicURL
        }
    }
`