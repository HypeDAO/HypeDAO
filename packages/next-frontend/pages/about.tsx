import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { GetArtist } from "../connections/artists";
import utilStyles from "../styles/utils.module.css"
import { ArtistProfile } from "../types/artists";

export default function About() {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Who We Are</h1>
				<h3 className={utilStyles.infoText}>Read the full article on <a href="https://medium.com/hypedao/hypedao-651c05d55c5c" target="_blank" rel="noopener noreferrer">Medium</a>!</h3>
				<div className={utilStyles.scrim}>
					<h2 style={{ marginTop: "0" }}>HypeDAO is an Official Artist Guild on <a href="https://near.org/">NEAR Protocol</a>.</h2>
					<p>We are a group of artists, designers, developers and writers aimed at building a strong community around cryptoart and developing the tools to succeed in the field.</p>
					<br />

					<ListWithHeader
						header="Why Near Protocol?"
						list={[
							"Best cross-platform user-experience on any blockchain",
							"Incredibly cheap and fast transactions",
							"Plethora of open-source tools from a quickly growing, altruistic developer community",
							"Healthy standards for on-chain art, split-revenue, and royalties",
							"An amazing grant program for uplifting creative projects, which we are funded through!"
						]}
					/>
					<br />

					<h2>Our Backstory</h2>
					<p>HypeDAO began as #NFTHYPEGANG on twitter — a collective of NFT creators that banded together to help eachother gain traction among the sea of new artists, and endless hype coming from more high profile NFT platforms. Between December and July, the HYPEGANG grew from 12 members to over 500 between a dozen different HYPE groups.</p>
					<br />

					<ListWithHeader
						header="Our Mission"
						list={[
							"To empower artists through tools and bounties",
							"To educate artists about how DAOs other tools can work for them",
							"To have fun and get people HYPED!!",
							"To provide the roadmap and framework for more Artist DAOs to take shape"
						]}
					/>
					<br />

					<h2>The Team</h2>
					<p>The leading council consists of 4 members: <a href="https://twitter.com/mxjxn" target="_blank" rel="noopener noreferrer">MXJXN</a>
						, <a href="https://twitter.com/EV3RETH" target="_blank" rel="noopener noreferrer">EV3RETH</a>
						, <a href="https://twitter.com/PixieSnakes" target="_blank" rel="noopener noreferrer">Kodandi</a>
						, and <a href="https://twitter.com/zexononerotaki" target="_blank" rel="noopener noreferrer">ZON</a>
						. Each can be reached on Twitter, Telegram, or Discord.</p>

					<br />

					<h3>
						Curious? Join us on <a href="https://discord.gg/PcRVndBU" target="_blank" rel="noopener noreferrer">Discord</a> or <a href="https://t.me/hypedao" target="_blank" rel="noopener noreferrer">Telegram</a>!!!
					</h3>
				</div>
			</main>
		</Layout>
	)
}

interface ListProps {
	header: string;
	list: string[]
}
function ListWithHeader({ header, list }: ListProps) {
	return (
		<div>
			<h2>{header}</h2>
			<ul>
				{list.map((item, i) => (
					<li key={i + item[0]}>{item}</li>
				))}
			</ul>
		</div>
	)
}