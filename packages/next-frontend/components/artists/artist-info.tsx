import { ArtistProfile } from "../../types/artists";
import SocialIcon from "./social-icon";
import styles from '../../styles/components/artists/artist-info.module.css'
import utilStyles from "../../styles/utils.module.css"
import classNames from "classnames";
import SettingsIcon from '@mui/icons-material/Settings';
import { ApplicationContext } from "../../context/state";
import { useContext } from "react";

interface ArtistInfoProps {
	artist: ArtistProfile
}
export default function ArtistInfo({ artist }: ArtistInfoProps) {
	const { state } = useContext(ApplicationContext)

	//TODO: need to verify that these are the proper keys to access
	const isUser = state.wallet?.getAccountId() === artist.wallet_address

	function handleEditInfo() {
		//open artist modal
	}
	return (
		<div className={styles.artistInfo}>
			<div className={styles.header}>
				<h3 className={classNames(styles.name, utilStyles.titleSm)}>{artist.name}</h3>
				{isUser &&
					<button className={utilStyles.noStyle} onClick={handleEditInfo}>
						<SettingsIcon />
					</button>
				}
			</div>
			<div className={styles.socialList}>
				{artist.socials?.map((social, i) => (
					<SocialIcon key={social.name + i} social={social} />
				))}
			</div>
			<p>{artist.bio}</p>
		</div>
	)
}

