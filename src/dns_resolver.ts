import { decodeResponse } from './helpers/decodeResponse.js';
import { Message } from './types/dns.js';
import { dnsCall } from './script.js';

const checkSolution = (message: Message) => {
  const { answerRecords, authorityRecords, additionalRecords } = message;
  if (answerRecords.length > 0) {
    return answerRecords[0].data;
  }

  if (!(authorityRecords.length > 0 && additionalRecords.length > 0)) {
    throw new Error('No record found!');
  }

  return null;
};
export const dnsResolver = (response: string) => {
  const message = decodeResponse(response);
  const result = checkSolution(message);
};
