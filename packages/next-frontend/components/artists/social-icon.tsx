import { ArtistProfile, Social, SOCIAL_NAMES } from "../../types/artists";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WebsiteIcon from '@mui/icons-material/Language';

interface iconsInterface {
	[key: Social["name"]]: any
}

const ICONS: iconsInterface = {
	[SOCIAL_NAMES.FACEBOOK]: <FacebookIcon />,
	[SOCIAL_NAMES.TWITTER]: <TwitterIcon />,
	[SOCIAL_NAMES.INSTAGRAM]: <InstagramIcon />
}

interface SocialIconProps {
	social: Social
}
export default function SocialIcon({ social }: SocialIconProps) {
	const icon = ICONS?.[social.name] ?? <WebsiteIcon />
	return (
		<a href={social.url} target="_blank" rel="noopener noreferrer">
			{icon}
		</a>
	)
}