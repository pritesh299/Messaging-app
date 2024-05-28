import jwt from "jsonwebtoken";
const TokenAuth = (req, res, next) => {
    const secret = process.env.JWT_SECRET || "";
    if (secret === "") {
        console.log("ERROR: Secret is undefined, please check your JWT secret");
        return res.status(500).json({ message: "Server error" });
    }
    let token = req.headers["authorization"] || " ";
    token = token.split(" ")[1].trim();
    if (!token || token === " ") {
        console.log("ERROR: No token provided");
        return res.status(403).json({ message: "No token" });
        next();
    }
    jwt.verify(token, secret, (err, decodedData) => {
        if (err) {
            console.log("ERROR: Could not connect to the protected route");
            return res.status(403).json({ message: "Token is not valid", token: token });
        }
        console.log('SUCCESS: Connected to protected route', decodedData);
        req.body = decodedData.user;
    });
    next();
};
export default TokenAuth;
