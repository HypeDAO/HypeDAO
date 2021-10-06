export interface Proposal {
	id: number;
	description: string;
	url: string;
	proposer: string;
	kind: any;
	status: string;
}

export interface PayoutProposal {
    receiver: string;
    description: string;
    amount: string;
}

export interface HypeTransfer {
    receiver: string;
    amount: string;
}