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
