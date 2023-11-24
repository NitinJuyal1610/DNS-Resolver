export const hexToString = (hex: string): string => {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.slice(c, c + 2), 16));
  }

  return String.fromCharCode(...bytes);
};

export const hexToIp = (hex: string): string => {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.slice(c, c + 2), 16));
  }
  return bytes.join('.');
};
