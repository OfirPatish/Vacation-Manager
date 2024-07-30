import jwt from "jsonwebtoken";

const SECRET_KEY = "a3f5e8d9c1b2a4d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4";

const generateToken = (userDetails: {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}): string => {
  const payload = {
    user_id: userDetails.user_id,
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    email: userDetails.email,
    role: userDetails.role,
  };

  const options = { expiresIn: "1h" };

  const token = jwt.sign(payload, SECRET_KEY, options);
  console.log("JWT payload created successfully:", payload);
  console.log("JWT token generated successfully: ", "Bearer " + token);

  return "Bearer " + token;
};

const validateToken = (token: string): jwt.JwtPayload | null => {
  try {
    const tokenWithoutPrefix = token.split(" ")[1];
    const decodedPayload = jwt.verify(tokenWithoutPrefix, SECRET_KEY) as jwt.JwtPayload;
    //console.log("JWT payload decoded successfully:", decodedPayload);
    return decodedPayload;
  } catch (err: any) {
    console.log("Error during JWT validation: ", err.name);
    return null;
  }
};

export { generateToken, validateToken };
