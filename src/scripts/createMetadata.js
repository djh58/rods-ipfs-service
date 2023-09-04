import fs from 'fs';
import path from 'path';
import {uploadFilesFromPath} from '../web3Storage/put-files.js';

export async function createMetadataSchema(
  metadata,
  imagePath
) {
  
  const data = fs.readFileSync(
    metadata, 'utf-8'
  )

  const metadataDict = JSON.parse(data)

  console.log(metadataDict);

  if (!metadataDict.serialNumber) {
    console.error("no serial number")
  }
  
  const imageCid = await uploadFilesFromPath(imagePath);

  metadataDict.imageCid = imageCid;

  // add timestamp to metadataDict, which is a JSON
  metadataDict.timestamp = Date.now();

  const fileName = `rod_${metadataDict.serialNumber}.json`;
  const outputDir = path.join('out', fileName);

  fs.writeFileSync(outputDir, JSON.stringify(metadataDict, null, 2));

  const metadataCid = await uploadFilesFromPath(outputDir);

  return metadataCid;
}

