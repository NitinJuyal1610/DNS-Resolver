import { ResourceRecord } from '../types/dns.js';
import { hexToIp, hexToString } from '../utils.js';
import { decodeDomainName } from './decodeDomainName.js';

/*
                                       1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                                               |
    /                                               /
    /                      NAME                     /
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TYPE                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     CLASS                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      TTL                      |
    |                                               |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                   RDLENGTH                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--|
    /                     RDATA                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

*/

export const decodeRR = (
  index: number,
  response: string,
  resourceRecords: ResourceRecord[],
) => {
  while (index < response.length) {
    //get one byte
    const domainName = decodeDomainName(index, response);
    index = domainName.index;

    const recordType = response.slice(index, index + 4);
    index += 4;

    const recordClass = response.slice(index, index + 4);
    index += 4;

    const ttl = response.slice(index, index + 8);
    index += 8;

    const rdLength = response.slice(index, index + 4);
    index += 4;

    const rData = response.slice(index, index + parseInt(rdLength, 16) * 2);
    let data = rData;
    if (recordType === '0001' && recordClass === '0001') {
      data = hexToIp(rData);
    } else if (recordType === '0002') {
      data = decodeDomainName(index, response).name;
    }

    index += parseInt(rdLength, 16) * 2;

    resourceRecords.push({
      name: domainName.name,
      recordType: parseInt(recordType, 16),
      recordClass: parseInt(recordClass, 16),
      ttl: parseInt(ttl, 16),
      data,
      length: parseInt(rdLength, 16),
    });
  }
  return;
};
