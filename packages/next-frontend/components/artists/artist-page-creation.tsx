import React, { useState } from "react"
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/components/hype-registration-button.module.css'
import Modal from ".././modal";
import { ArtistProfile, ArtistForm } from "../../types/artists"
import { FormWizard } from '../../components/form/FormWizard'
import { Fields, InputType } from '../../components/form/Fields'
import { FormattedLabel } from '../../components/form/Label'
import { LabeledField } from '../../components/form/LabeledField'
import { FormStyle } from "../../components/form/utils";
import { CreateArtist, UpdateArtistProfile } from "../../connections/artists";

export default function ArtistCreation({ wallet_address, artist, onChange }: any) {
	const [modalOpen, setModalOpen] = useState(false)

	function openModal() {
		setModalOpen(true)
	}

	function closeModal() {
		setModalOpen(false)
	}

	const submitArtistCreationForm = async (values: any) => {
		if (!artist.wallet_address) return
		console.log(values);

		let artist_profile:ArtistProfile = {
			wallet_address: wallet_address,
			name: values.name,
			bio: values.bio,
			socials: [
				{ name: 'discord', url: values.discord },
				{ name: 'twitter', url: values.twitter },
				{ name: 'instagram', url: values.instagram },
			],
			collection: artist?.collection,
		}

		try {
			await CreateArtist(artist_profile)

			closeModal();
			if (onChange) {
            	onChange();
        	}
		} catch(e) {
			return;
		}
	}

	const submitArtistUpdateForm = async (values: any) => {
		let artist_profile:ArtistProfile = {
			wallet_address: artist.wallet_address,
			name: values.name === '' ?  artist.name : values.name,
			bio: values.bio === '' ? artist.bio : values.bio,
			socials: [
				{ name: 'discord', url: values.discord === '' ? artist.discord : values.discord },
				{ name: 'twitter', url: values.twitter === '' ? artist.twitter : values.twitter },
				{ name: 'instagram', url: values.instagram === '' ? artist.instagram: values.instagram },
			],
			collection: artist?.collection.map(({ id }:any) => id),
		}

		try {
			await UpdateArtistProfile(artist_profile);

			closeModal();
			if (onChange) {
            	onChange();
        	}
		} catch(e) {
			return
		}
	}

	let socialForm: any = {};
        socialForm.discord = artist && artist.socials && artist.socials.find((o: { name: string }) => o.name == 'discord')
        socialForm.twitter = artist && artist.socials && artist.socials.find((o: { name: string }) => o.name == 'twitter')
        socialForm.instagram = artist && artist.socials && artist.socials.find((o: { name: string }) => o.name == 'instagram')

	return (
		<div className={styles.registerButtonContainer}>
        <button
			className={utilStyles.secondaryButton}
					onClick={openModal}
		>
			{!artist ? 'Artist Creation' : 'Artist Update'}
		</button>
			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
			>
			<h2>{!artist ? 'ARTIST PAGE CREATION' : 'ARTIST PAGE UPDATE'}</h2>
			<FormWizard
				initialValues={{
					wallet_address: wallet_address,
					name: artist?.name ? artist.name : '',
					bio: artist?.bio,
					discord: socialForm.discord ? socialForm.discord.url : '',
					twitter: socialForm.twitter ? socialForm.twitter.url : '',
					instagram: socialForm.instagram ? socialForm.instagram.url : '',
				} as ArtistForm}
				onSubmit={async (values: ArtistForm) =>
					{artist ?
					submitArtistUpdateForm(values)
					:
					submitArtistCreationForm(values)
					}
				}
				style={FormStyle.DAO}
			>
				<Fields>
					<FormattedLabel
						left={"Artist Wallet Address"}
						right={wallet_address}
						light={true}
						padded={true}
					/>
					{artist &&
						<FormattedLabel
							left={"Artist Name"}
							right={artist.name ? artist.name : ''}
							light={true}
							padded={true}
						/>	
					}
					<LabeledField
						type={InputType.Text}
						name={"name"}
						placeholder={"Name"}
						validate={(value: string) => { }}
					/>
					{artist && (
						<FormattedLabel
							left={"Artist Bio"}
							right={artist.bio }
							light={true}
							padded={true}
						/>
					)}
					<LabeledField
						type={InputType.Text}
						name={"bio"}
						placeholder={"Bio"}
						validate={(value: any) => { }}
					/>
					{artist && (
						<FormattedLabel
							left={"Artist Discord"}
							right={socialForm.discord ? socialForm.discord.url : ''}
							light={true}
							padded={true}
						/>
					)}
					<LabeledField
						type={InputType.Text}
						name={"discord"}
						placeholder={"Discord"}
						validate={(value: any) => { }}
					/>
					{artist && (
						<FormattedLabel
							left={"Artist Twitter"}
							right={socialForm.twitter ? socialForm.twitter.url : ''}
							light={true}
							padded={true}
						/>
					)}
					<LabeledField
						type={InputType.Text}
						name={"twitter"}
						placeholder={"Twitter"}
						validate={(value: any) => { }}
					/>
					{artist && (
						<FormattedLabel
							left={"Artist Instagram"}
							right={socialForm.instagram ? socialForm.instagram.url : ''}
							light={true}
							padded={true}
						/>
					)}
					<LabeledField
						type={InputType.Text}
						name={"instagram"}
						placeholder={"Instagram"}
						validate={(value: any) => { }}
					/>
				</Fields>
			</FormWizard>
		</Modal>
	</div>
	);
}