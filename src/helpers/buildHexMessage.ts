import { Header, Question } from '../types/dns.js';

const encodeQname = (name: string): string => {
  let encodedName = '';
  for (const label of name.split('.')) {
    encodedName += label.length.toString(16).padStart(2, '0');
    encodedName += Buffer.from(label).toString('hex');
  }
  encodedName += '00';
  return encodedName;
};

export const buildDnsMessage = (header: Header, question: Question): string => {
  let message = '';

  //attach header
  for (const value of Object.values(header)) {
    message += value.toString(16).padStart(4, '0');
  }

  //attach question
  message += encodeQname(question.name);
  message += question.recordClass.toString(16).padStart(4, '0');
  message += question.recordType.toString(16).padStart(4, '0');

  return message;
};
