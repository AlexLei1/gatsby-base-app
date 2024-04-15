import * as React from "react"
import { Link, graphql } from "gatsby"
import {GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import SinglePost from "../templates/single-post"


const IndexPage = ({data}) => {
	const {nodes} = data.allMarkdownRemark;
	return (
		<Layout>
			<Seo title="Home" />
			<h1>Hi people</h1>
			<div className="posts">
				{nodes.map(post => {
					const { category, title, url, image } = post.frontmatter;
					const img = getImage(image);
					return (

						// <SinglePost id={id} category={category} title={title} url={url} image={img}  />
						<div className="post" key={post.id}>
							<GatsbyImage image={img} alt={title}/>
							<Link to={`/${category}/${url}`}>{title}</Link>
						</div>
					)
				})}
			</div>
		</Layout>
	)
} 



export default IndexPage

export const query = graphql`
	query MainPage {
		allMarkdownRemark {
			nodes {
				frontmatter {
					category
					title
					url
					image {
						childImageSharp {
							gatsbyImageData(width: 200, placeholder: BLURRED, formats: [AUTO, AVIF])
						}
					}
				}
				id
			}
		}
	}
`