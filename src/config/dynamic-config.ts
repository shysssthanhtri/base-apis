export const getDynamicConfig = ( key: string ): string => {
  const value = process.env[key];
  if ( !value ) {
    throw new Error( `Missing config for ${key}` );
  }
  return value;
};
