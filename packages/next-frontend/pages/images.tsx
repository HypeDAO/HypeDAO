import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Images() {

	const [text, setText] = useState("")
	// const src = `https://d.img.vision/hypedao/Surreal_${text}.png`
	const src = `https://hosting.photobucket.com/images/i/EV3RETH/Surreal_${text}.png`

	return (
		<Layout>
			<div className={classNames(utilStyles.scrim, utilStyles.centerContent)} style={{ flexDirection: "column" }}>
				<h1>Img.Vision</h1>
				<a href={src} download="custom" title="Surreal Download">
					<Image
						src={src}
						height="500"
						width="500"
						alt="Img.vision"
						placeholder="blur"
						blurDataURL="https://d.img.vision/hypedao/Surreal_1419.png"
					/>
				</a>
				<input type="text" value={text} onChange={({ target }) => setText(target.value)} />
				<br />
			</div>
		</Layout>
	)
}