import { Header, Question } from '../types/dns.js';
import { encodeDomainName } from './encodeDomainName.js';

export const buildDnsMessage = (
  header: Header,
  questions: Question[],
): string => {
  let message = '';

  //attach header
  for (const value of Object.values(header)) {
    message += value.toString(16).padStart(4, '0');
  }

  //attach question
  questions.map((question) => {
    message += encodeDomainName(question.name);
    message += question.recordClass.toString(16).padStart(4, '0');
    message += question.recordType.toString(16).padStart(4, '0');
  });

  return message;
};
