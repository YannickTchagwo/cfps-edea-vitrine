export const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')
    .trim();
export const matches = (text, domain, query, selectedDomain) =>
  (!selectedDomain || domain === selectedDomain) &&
  normalize(query)
    .split(/\s+/)
    .every((word) => normalize(text).includes(word));
