export const validationDefinedInBody = (response) => {
  expect(response.body.validation).toBeDefined();
};
