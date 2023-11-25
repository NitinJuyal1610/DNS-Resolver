import { decodeResponse } from './helpers/decodeResponse.js';
import { Message } from './types/dns.js';
import { dnsCall } from './script.js';

const checkSolution = (responseMessage: Message) => {
  const { answerRecords } = responseMessage;
  if (answerRecords.length > 0) {
    return answerRecords[0].data;
  }
  return null;
};

const findValidServer = (responseMessage: Message) => {
  const { additionalRecords } = responseMessage;

  for (const record of additionalRecords) {
    if (record.recordType === 1) {
      return record.data;
    }
  }
  return null;
};
export const dnsResolver = async (response: string) => {
  // decode response
  const decodedResponse = decodeResponse(response);

  // check for answer record
  if (checkSolution(decodedResponse)) {
    return checkSolution(decodedResponse);
  }

  // find next valid server
  if (findValidServer(decodedResponse)) {
    const newResponse = await dnsCall(findValidServer(decodedResponse));
    return dnsResolver(newResponse);
  }

  throw new Error('Domain not found !');
};
