import jwt from "jsonwebtoken";
const authorize = async (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            console.log("JWT_SECRET is not defined");
            throw new Error("JWT_SECRET is not defined");
        }
        const bearerToken = req.headers.authorization;
        if (bearerToken && bearerToken.startsWith("Bearer ")) {
            const token = bearerToken.split(" ")[1];
            if (jwt.verify(token, JWT_SECRET)) {
                return next();
            }
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
export { authorize };
