import jwt from "jsonwebtoken";
const { sign } = jwt;

export const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    sign(
      id,
      "mysecret",
      {
        expiresIn: 600 * 600,
      },
      (err, token) => {
        err ? reject(err) : resolve(token);
      }
    );
  });
};
