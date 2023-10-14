export const getValidationMDErrorText = (errors) => `
${Object.values(errors)
    .map((error) => error.message)
    .join(', ')}
    `;

export const getValidationJoiErrorText = (error) => error?.validation?.body?.message;
