import {mintWrapper} from '../services/contract/smartContract.js';
import { createMetadataSchema } from "../services/createMetadata.js";

export async function pinAndMint(
    metadataJsonPath,
    imagePath,
    fromAddress,
    tokenId
) {
    const ipfsHash = await createMetadataSchema(
        metadataJsonPath,
        imagePath
    );
    const mintPayload = await mintWrapper(
        fromAddress, tokenId, ipfsHash
    );
    console.log(mintPayload)
    return mintPayload;
}