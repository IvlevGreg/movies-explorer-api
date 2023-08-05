const validationDefinedInBody = (response) => {
  expect(response.body.validation).toBeDefined();
};

module.exports = { validationDefinedInBody };
