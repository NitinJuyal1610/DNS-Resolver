export interface Header {
  id: number;
  flags: number;
  numQuestions: number;
  numAnswers: number;
  numAuthorityRecords: number;
  numAdditionalRecords: number;
}

export interface Question {
  name: string;
  recordType: number;
  recordClass: number;
}

export interface ResourceRecord {
  name: string;
  recordType: number;
  recordClass: number;
  ttl: number;
  data: string;
  length: number;
}

export interface Message {
  header: Header;
  questions: Question[];
  answerRecords: ResourceRecord[];
  authorityRecords: ResourceRecord[];
  additionalRecords: ResourceRecord[];
}
