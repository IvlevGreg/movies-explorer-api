export const messageDefinedInBody = async (response) => {
  expect(response.body.message).toBeDefined();
};
