import { ArtistProfile } from "../../types/artists";
import SocialIcon from "./social-icon";

interface ArtistInfoProps {
	artist: ArtistProfile
}
export default function ArtistInfo({ artist }: ArtistInfoProps) {
	return (
		<div>
			<h3>{artist.name}</h3>
			<p>{artist.bio}</p>
			<div>
				{artist.socials?.map((social, i) => (
					<SocialIcon key={social.name + i} social={social} />
				))}
			</div>
		</div>
	)
}

