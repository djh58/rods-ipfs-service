# rods-ipfs-service

## high-level
This code does the following:
1) Given an image of the rod, uploads to ipfs
2) Takes the hash from #1, and adds it to a JSON file of metadata given to it
3) Uploads this metadata file to ipfs
4) Takes the hash of that file and saves it to the smart contract for the tokenId that we want to mint. We are given a transaction payload so the front end can handle the transaction. Some slight tweaks might be needed to configure this just right in React. 

## setup
1) LATEST_SMART_CONTRACT="0xEBE15e80c4f02Dfe19B96aCBCDa5CCBA6157a45C"
2) Make a web3 storage api key at https://web3.storage/
3) `npm i`
4) Ensure line 7 `/home/dan/rods/rods-ipfs-service/src/services/contract/smartContract.js`is set according. If test = true, then it'll check the testnet RPC URL, mainnet if false

## testing
`node test/endToEndTest.js` - this is an end to end test of all code
`node test/testContractClient.js` - this tests the contract-specific code
`node test/testCreateMetadata.js` - test tests the ipfs-specific code