import jwt from "jsonwebtoken";

interface token {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const accessTokenGen = (
  firstName: string,
  lastName: string,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
    },
    process.env.ACCESS_JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
};

export const refreshTokenGen = (
  firstName: string,
  lastName: string,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
    },
    process.env.REFRESH_JWT_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export const accessAndRefreshTokenGen = (
  firstName: string,
  lastName: string,
  email: string,
  role: string
) => {
  const accessToken = accessTokenGen(firstName, lastName, email, role);
  const refreshToken = refreshTokenGen(firstName, lastName, email, role);
  return { accessToken, refreshToken };
};
