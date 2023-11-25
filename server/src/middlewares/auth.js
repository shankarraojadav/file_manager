import jwt from "jsonwebtoken";

const Auth = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.user;

      if (requiredRole && req.user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden - Insufficient permissions" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  };
};

export default Auth;
