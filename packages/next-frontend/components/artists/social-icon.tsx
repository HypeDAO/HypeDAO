import { Social, SOCIAL_NAMES } from "../../types/artists";
import DiscordIcon from '../../public/images/Discord-Logo-White.svg';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WebsiteIcon from '@mui/icons-material/Language';

interface iconsInterface {
	[key: string]: any
}

const ICONS: iconsInterface = {
	[SOCIAL_NAMES.DISCORD]: <DiscordIcon />,
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