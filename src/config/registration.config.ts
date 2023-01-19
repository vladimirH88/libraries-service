const loginLength = { min: 8, max: 64 };
const loginLengthError = `Длинна логина должна быть от ${loginLength.min} до ${loginLength.max} символов`;

const passwordLength = { min: 6, max: 30 };
const passwordLengthError = `Длинна пароля должна быть от ${loginLength.min} до ${loginLength.max} символов`;

export { loginLength, loginLengthError, passwordLength, passwordLengthError };
