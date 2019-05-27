// Main Jaypie export

import ModelClass from "./Model";

// eslint-disable-next-line no-unused-vars
const handler = event => {
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({})
  };
};

export default handler;
export const defaultHandler = handler;
export const Model = ModelClass;
