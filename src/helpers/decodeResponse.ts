import { Header, Question, ResourceRecord, Message } from '../types/dns.js';
import { decodeDomainName } from './decodeDomainName.js';
import { decodeRR } from './decordeRR.js';

export const decodeResponse = (response: string): Message => {
  const headerBytes = response.slice(0, 24);
  const questions: Question[] = [];
  const resourceRecords: ResourceRecord[] = [];
  let answerRecords: ResourceRecord[] = [];
  let authorityRecords: ResourceRecord[] = [];
  let additionalRecords: ResourceRecord[] = [];
  let nextIndex = 24;

  //decoded the header
  const header: Header = {
    id: parseInt(headerBytes.slice(0, 4), 16),
    flags: parseInt(headerBytes.slice(4, 8), 16),
    numQuestions: parseInt(headerBytes.slice(8, 12), 16),
    numAnswers: parseInt(headerBytes.slice(12, 16), 16),
    numAuthorityRecords: parseInt(headerBytes.slice(16, 20), 16),
    numAdditionalRecords: parseInt(headerBytes.slice(20, 24), 16),
  };

  // decode question
  for (let i = 0; i < header.numQuestions; i++) {
    const { name, index } = decodeDomainName(nextIndex, response);
    nextIndex = index;
    const question = {
      name,
      recordType: parseInt(response.slice(nextIndex, nextIndex + 4), 16),
      recordClass: parseInt(response.slice(nextIndex + 4, nextIndex + 8), 16),
    };

    questions.push(question);
    nextIndex += 8;
  }

  //decode RRs
  const isResponse = header.flags & 0x8000;
  if (isResponse) {
    //get the answers , authority records, additional records
    decodeRR(nextIndex, response, resourceRecords);

    //slice the resource records
    let currPartition = 0;
    answerRecords = resourceRecords.slice(currPartition, header.numAnswers);
    currPartition += header.numAnswers;
    authorityRecords = resourceRecords.slice(
      currPartition,
      currPartition + header.numAuthorityRecords,
    );
    currPartition += header.numAuthorityRecords;
    additionalRecords = resourceRecords.slice(
      currPartition,
      currPartition + header.numAdditionalRecords,
    );
  }

  return {
    header,
    questions,
    answerRecords,
    authorityRecords,
    additionalRecords,
  };
};
