import { Header, Question } from './types/dns.js';

const encodeQname = (name: string): string => {
  let encodedName = '';
  for (const label of name.split('.')) {
    encodedName += label.length.toString(16).padStart(2, '0');
    encodedName += Buffer.from(label).toString('hex');
  }
  encodedName += '00';
  return encodedName;
};

const buildDnsMessage = (header: Header, questions: Question): string => {
  let message = '';

  for (const value of Object.values(header)) {
    message += value.toString(16).padStart(4, '0');
  }
  message += encodeQname(questions.name);

  message += question.recordClass.toString(16).padStart(4, '0');
  message += question.recordType.toString(16).padStart(4, '0');
  console.log(message);
  return message;
};

const header: Header = {
  id: 22,
  flags: parseInt('0100', 16),
  numQuestions: 1,
  numAnswers: 0,
  numAuthorityRecords: 0,
  numAdditionalRecords: 0,
};

const question: Question = {
  name: 'dns.google.com',
  recordType: 1,
  recordClass: 1,
};

buildDnsMessage(header, question);
