import React, { useState } from "react"
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/components/hype-registration-button.module.css'
import Modal from ".././modal";
import { ArtistProfile, NFTRequest } from "../../types/artists"
import { FormWizard } from '../../components/form/FormWizard'
import { Fields, InputType } from '../../components/form/Fields'
import { LabeledField } from '../../components/form/LabeledField'
import { FormStyle } from "../../components/form/utils";
import { CreateNFT } from "../../connections/nfts";
import { UpdateArtistNftList } from "../../connections/artists";

interface NftCreationProps {
	artist: ArtistProfile,
	wallet?: string,
	onChange?: Function,
}

export default function NftCreation({ artist, wallet, onChange }: NftCreationProps) {
	const [modalOpen, setModalOpen] = useState(false)

	function openModal() {
		setModalOpen(true)
	}

	function closeModal() {
		setModalOpen(false)
	}

	const submitNftCreationForm = async (values: any) => {
		let newNft:NFTRequest = {
			owner_address: artist?.wallet_address,
			title: values.title,
			description: values.description,
			market_url: values.market_url,
		}

		let result
		try {
			result = await CreateNFT(newNft)
		} catch(e) {
			console.error(e);
			return
		}
		const id = result.id.valueOf();

		if (artist.collection && artist.collection != null && artist.collection[0] != null) {
			const collection_array = artist.collection?.map(each => each.id) || [];
			UpdateArtistNftList({
				...artist,
				collection: [
					...collection_array,
					id, 
				],
			})
		} else {
			UpdateArtistNftList({
				...artist,
				collection: [id],
			})
		}
	
		closeModal();
		if (onChange) {
            onChange();
        }
	}

	return (
        <div className={styles.registerButtonContainer}>
        <button
			className={utilStyles.secondaryButton}
					onClick={openModal}
		>
			NFT Creation
		</button>
			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
			>
				<FormWizard
                    initialValues={{
    					owner_address: artist?.wallet_address,
    					title: '',
    					description: '',
    					market_url: '',
    					preview_url: '',
                    } as NFTRequest}
					onSubmit={async (values: any) =>
						{submitNftCreationForm(values)}
                    }
                    style={FormStyle.DAO}
                >
					<Fields>
				<h2>NFT CREATION</h2>
				<span>{wallet}</span>
				<h3>NFT Title</h3>
				<LabeledField
                	type={InputType.Text}
                    name={"title"}
                    placeholder={"Title"}
                    validate={(value: string) => { }}
                />
                <h3>NFT Market link</h3>
				<LabeledField
                    type={InputType.Text}
                    name={"market_url"}
                    placeholder={"Market Url"}
                    validate={(value: string) => { }}
                />
                <h3>NFT Image Preview link</h3>
				<LabeledField
                    type={InputType.Text}
                    name={"preview_url"}
                    placeholder={"Preview Url"}
                    validate={(value: string) => { }}
                />
                <h3>NFT Description</h3>
				<LabeledField
                    type={InputType.Text}
                    name={"description"}
                    placeholder={"Description"}
                    validate={(value: string) => { }}
                />
				</Fields>
				</FormWizard>
			</Modal> 
		</div>
	)
}