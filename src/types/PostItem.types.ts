import { IGatsbyImageData } from 'gatsby-plugin-image'

export type PostFrontmatterType = {
    title: string
    date: string
    category: string[]
    topic: string
    excerpt: string
    thumbnail: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
        }
    }
}

export type PostListItemType = {
    node: {
        id: string
        frontmatter: PostFrontmatterType
    }
}