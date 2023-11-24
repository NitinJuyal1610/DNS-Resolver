export const encodeDomainName = (name: string): string => {
  let encodedName = '';
  for (const label of name.split('.')) {
    encodedName += label.length.toString(16).padStart(2, '0');
    encodedName += Buffer.from(label).toString('hex');
  }
  encodedName += '00';
  return encodedName;
};
