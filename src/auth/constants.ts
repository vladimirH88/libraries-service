export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: '600s',
  //   secret: process.env.JWT_SECRET,
};

export const getConfirmLink = (id: number) =>
  `http://localhost:5000/auth/confirm/?id=${id}`;
