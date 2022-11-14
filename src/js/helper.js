import { TIMEOUT_SECONDS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const finalResponse = await res.json();

    // error handle for invalid ID
    if (!res.ok) throw new Error(`${finalResponse.message} (${res.status})`);
    return finalResponse;
  } catch (error) {
    throw error;
  }
};
