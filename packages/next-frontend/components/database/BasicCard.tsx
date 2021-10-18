import classNames from "classnames";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/components/database/BasicCard.module.css'

import Image from 'next/image'

import whiteImage from '../../public/images/nai.png'


interface BasicCardProps {
    title: string,
    image?: string,
    description?: string,
    link?: string,
}

interface LoadedProps {
    src: string,
    width: string,
    quality: string,
}

const myLoader = ({ src, width, quality }: LoadedProps) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function BasicCard({ title, image, description, link }: BasicCardProps) {
    return (
        <li className={classNames(
            styles.basicCard,
            utilStyles.scrim
        )}>
            <h3>
                {title}
            </h3>
            <div>
                <Image
                    // className={formStyles.statusIcon}
                    // loader={myLoader}
                    src={whiteImage}
                    alt=""
                    layout="responsive"
                />
            </div>
            {description && (
                <div className={utilStyles.titleLabel}>
                    {description}
                </div>
            )}

        </li >
    )
}