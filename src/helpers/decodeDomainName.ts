import { hexToString } from '../utils.js';

export const decodeDomainName = (
  index: number,
  response: string,
): { name: string; index: number } => {
  let resultName = '';

  // stop fetching when we encounter a zero
  while (index < response.length) {
    //get one byte
    const byte = response.slice(index, index + 2);
    const label = parseInt(byte, 16);

    //increment the index
    index += 2;
    if (byte === '00') {
      //is a zero
      resultName = resultName.slice(0, -1);
      break;
    }
    if (label & 0xc0) {
      // is a pointer
      //fetch from the offset and return

      /*
            The pointer takes the form of a two octet sequence:
            +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
            | 1  1|                OFFSET                   |
            +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
     */

      const offset =
        ((label & 0x3f) << 8) | parseInt(response.slice(index, index + 2), 16);

      //increment the index
      index += 2;

      resultName += decodeDomainName(offset * 2, response).name;
      break;
    } else {
      //is a label
      //add the label
      resultName += hexToString(response.slice(index, index + label * 2));
      index += label * 2;
      resultName += '.';
    }
  }

  return {
    name: resultName,
    index: index,
  };
};
