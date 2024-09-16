// ARRAY 

export const deepCopy = <AS extends unknown[]>(as: AS): AS =>
  JSON.parse(JSON.stringify(as));
