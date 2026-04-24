import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No Token Provided" });
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET);
    req.userId = decode.id;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken
