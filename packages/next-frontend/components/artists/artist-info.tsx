import { ArtistProfile } from "../../types/artists";
import SocialIcon from "./social-icon";
import styles from '../../styles/components/artists/artist-info.module.css'
import utilStyles from "../../styles/utils.module.css"

interface ArtistInfoProps {
	artist: ArtistProfile
}
export default function ArtistInfo({ artist }: ArtistInfoProps) {
	return (
		<div className={styles.artistInfo}>
			<h3 className={utilStyles.titleSm}>{artist.name}</h3>
			<p>{artist.bio}</p>
			<div>
				{artist.socials?.map((social, i) => (
					<SocialIcon key={social.name + i} social={social} />
				))}
			</div>
		</div>
	)
}

