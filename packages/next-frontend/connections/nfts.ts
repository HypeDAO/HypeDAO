import { NFT, NFTRequest } from "../types/artists";
import { Delete, Post, Put } from "./helpers";

export function CreateNFT(createNFTRequest: NFTRequest): Promise<NFT> {
	return Post('/nft', createNFTRequest)
}
export function UpdateNFT(nft: NFT): Promise<NFT> {
	return Put('/nft', nft)
}
export function DeleteNFT(id: number): Promise<NFT> {
	return Delete(`/nft/${id}`)
}