import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "No Token Provided" });
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Invalid Token" });
      req.userId = decode.id;
      next();
    });
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
