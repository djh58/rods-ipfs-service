import { config } from 'dotenv';
import { ethers } from 'ethers';
import {abi} from './abi.js';

config(); // Load environment variables from .env file
  
const test = true;
const smart_contract_addr = process.env.LATEST_SMART_CONTRACT;
const rpc = test ? process.env.RPC_TESTNET_URL : process.env.RPC_MAINNET_URL;

const provider = new ethers.JsonRpcProvider(rpc);

const contract = new ethers.Contract(smart_contract_addr, abi, provider);

// tokenid should be a Bigint, and ipfshash should be a string
export async function mintWrapper(from, tokenId, ipfsHash) {
  
    const adminRole = "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775";
    const hasRole = await contract.hasRole(adminRole, from); 
    if (!hasRole) {
        console.error("from address does not have ADMIN_ROLE");
    }
    // Encode the function call data for the mint function
    const data = contract.interface.encodeFunctionData('mint', [tokenId, ipfsHash]);
  
    // Specify the transaction details
    const tx = {
        from,
        to: smart_contract_addr,
      data: data,
    };
  
    // Estimate gas cost
    const gasEstimate = await provider.estimateGas(tx);

    return {
      tokenId: tokenId.toString(),
      ipfsHash: ipfsHash,
      data: data,
      gasEstimate: gasEstimate.toString(),
    };
  }
  
  