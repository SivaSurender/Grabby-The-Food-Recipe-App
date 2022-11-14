export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const finalResponse = await res.json();

    // error handle for invalid ID
    if (!res.ok) throw new Error(`${finalResponse.message} (${res.status})`);
    return finalResponse;
  } catch (error) {
    throw error;
  }
};
