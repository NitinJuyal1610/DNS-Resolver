export const decodeResponse = (requestLength: number, response: string) => {
  const headerBytes = response.slice(0, 24);
  const questionBytes = response.slice(24, requestLength);

  const header = {
    id: parseInt(headerBytes.slice(0, 4), 16),
    flags: parseInt(headerBytes.slice(4, 8), 16),
    numQuestions: parseInt(headerBytes.slice(8, 12), 16),
    numAnswers: parseInt(headerBytes.slice(12, 16), 16),
    numAuthorityRecords: parseInt(headerBytes.slice(16, 20), 16),
    numAdditionalRecords: parseInt(headerBytes.slice(20, 24), 16),
  };

  const isResponse = header.flags & 0x8000;
  if (isResponse) {
    //get the answers , authority records, additional records
  }
};
