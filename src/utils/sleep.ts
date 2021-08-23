/**
 * @description Wait for x seconds
 * @param { number } time - Seconds
 * @returns { Promise<void> }
 */
export const sleep = async (time: number): Promise<void> => (
  new Promise<void>(res => {
    setTimeout(() => {
      res();
    }, time * 1000);
  })
);
