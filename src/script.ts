import { buildDnsMessage } from './helpers/buildHexMessage.js';
import { decodeResponse } from './helpers/decodeResponse.js';
import { Header, Question } from './types/dns.js';
import dgram from 'dgram';

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

const message = buildDnsMessage(header, question);

const socket = dgram.createSocket('udp4');

const PORT = 53;
const HOST = '8.8.8.8';

// send a message to the server
socket.send(Buffer.from(message, 'hex'), PORT, HOST, (err) => {
  if (err) throw err;
});

// listen for a response from the server
socket.on('message', (msg, rinfo) => {
  const response = Buffer.from(msg).toString('hex');
  decodeResponse(message.length, response);
});

socket.on('error', (err) => {
  console.error(err);
  socket.close();
});

socket.on('listening', () => {
  const address = socket.address();
  console.log(`Server listening ${address.address}:${address.port}`);
});
