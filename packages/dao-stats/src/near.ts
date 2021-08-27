const { hexy } = require('hexy')
const nearAPI = require("near-api-js")

const path = require("path")
const homedir = require("os").homedir()

const CREDENTIALS_DIR = ".near-credentials";


const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
};

export async function findTokenReceiver(
  startBlock: string, endBlock: string, accountId: string) {
  const near = await nearAPI.connect(config);

  // creates an array of block hashes for given range
  const blockArr = [];
  let blockHash = endBlock;
  let counter = 0;
  do {
    const currentBlock = await getBlockByID(blockHash);
    blockArr.push(currentBlock.header.hash);
    blockHash = currentBlock.header.prev_hash;
    console.log("Reading block", counter, blockHash);
    counter++;
  } while (blockHash !== startBlock);

  // returns block details based on hashes in array
  const blockDetails = await Promise.all(
    blockArr.map((blockId) =>
      near.connection.provider.block({
        blockId,
      })
    )
  );

  // returns an array of chunk hashes from block details
  const chunkHashArr = blockDetails.flatMap((block) =>
    block.chunks.map(({ chunk_hash }) => chunk_hash)
  );

  //returns chunk details based from the array of hashes

  const chunkDetails = await Promise.all(
    chunkHashArr.map((chunk) => {
      return near.connection.provider.chunk(chunk);
    })
  );

  // checks chunk details for transactions
  // if there are transactions in the chunk we
  // find ones associated with passed accountId
  const tokenTransfers = chunkDetails.flatMap((chunk) =>
    (chunk.transactions || []).filter((tx) => 
        tx.receiver_id === accountId &&
        tx.actions[0].FunctionCall.method_name === 'ft_transfer')
  );
  
  let activeAccounts = new Map()
  tokenTransfers.forEach(tx => {
    const args = decodeFunctionArguments(tx.actions[0].FunctionCall.args)
    activeAccounts.set(args.receiver_id, true)
  });

  //creates transaction links from matchingTxs
  const txsLinks = tokenTransfers.map((tx) => ({
    method: tx.actions[0].FunctionCall.method_name,
    arguments: decodeFunctionArguments(tx.actions[0].FunctionCall.args),
    link: `https://explorer.near.org/transactions/${tx.hash}`,
  }));
  console.log("Matching transactions:", tokenTransfers);
  console.log("Transaction links:", txsLinks);
  
  return Array.from(activeAccounts.keys())
}

export async function retrieveLatestBlockHash() {
  const near = await nearAPI.connect(config);
  let status: NodeStatusResult = await near.connection.provider.status()
  let syncInfo: SyncInfo = status.sync_info
  return syncInfo.latest_block_hash
}

async function getBlockByID(blockID) {
  const near = await nearAPI.connect(config);
  const blockInfoByHeight = await near.connection.provider.block({
    blockId: blockID,
  });
  return blockInfoByHeight;
}



const decodeFunctionArguments = (args: string) => {
    const decodedArgs = Buffer.from(args, "base64");
    let prettyArgs: string;
    try {
        const parsedJSONArgs = JSON.parse(decodedArgs.toString());
        prettyArgs = JSON.stringify(parsedJSONArgs, null, 2);
    } catch {
        prettyArgs = hexy(decodedArgs, { format: "twos" });
    }
    return JSON.parse(prettyArgs)
}