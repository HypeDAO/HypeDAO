import { NFT, NFTRequest, UrlContent } from "../types/artists";
import { Delete, Get, Post, Put } from "./helpers";

export function GetLinkPreview(url: string): Promise<UrlContent> {
	//using POST because get requests cant have a body
	return Post('/nft/url-content', { url })
}

export function CreateNFT(createNFTRequest: NFTRequest): Promise<NFT> {
	return Post('/nft', createNFTRequest)
}
export function UpdateNFT(nft: NFT): Promise<NFT> {
	return Put('/nft', nft)
}
export function DeleteNFT(id: number): Promise<NFT> {
	return Delete(`/nft/${id}`)
}