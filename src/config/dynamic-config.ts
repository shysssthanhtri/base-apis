export const getDynamicConfig = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing config for ${key}`);
  }
  return value;
};

export const setDynamicConfig = (key: string, value: string): void => {
  process.env[key] = value;
};
