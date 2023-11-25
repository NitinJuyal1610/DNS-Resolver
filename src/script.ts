import { dnsResolver } from './dns_resolver.js';
import { buildDnsMessage } from './helpers/buildHexMessage.js';
import { decodeResponse } from './helpers/decodeResponse.js';
import { Header, Question } from './types/dns.js';
import dgram from 'dgram';

// udp socket
const socket = dgram.createSocket('udp4');

//root name server
const HOST = '198.41.0.4';

// message input

const header: Header = {
  id: 22,
  flags: 0,
  numQuestions: 1,
  numAnswers: 0,
  numAuthorityRecords: 0,
  numAdditionalRecords: 0,
};

const question: Question = {
  name: '',
  recordType: 1,
  recordClass: 1,
};

const main = async () => {
  //build input
  const domainInput = process.argv[2];
  question.name = domainInput;

  if (!question.name) {
    console.log('Please enter a domain name!');
    return;
  }
  try {
    const response = await dnsCall(HOST);
    const resultIp = await dnsResolver(response);
    console.log(`🎊${question.name} resolves to ${resultIp}🎊`);

    socket.close();
  } catch (error) {
    console.log(error.message);
  }
};

export const dnsCall = (host: string): Promise<string> => {
  const PORT = 53;

  const message = buildDnsMessage(header, [question]);

  console.log(`Querying ${host} for ${question.name}`);

  return new Promise((resolve, reject) => {
    socket.send(Buffer.from(message, 'hex'), PORT, host, (err) => {
      if (err) {
        reject(err);
      }
    });

    // listen for a response from the server
    socket.on('message', async (msg, rinfo) => {
      const response = Buffer.from(msg).toString('hex');
      resolve(response);
    });
  });
};

main();
