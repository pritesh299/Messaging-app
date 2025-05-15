import jwt from "jsonwebtoken";
const TokenAuth = (req, res, next) => {
    const secret = process.env.JWT_SECRET || "";
    if (secret === "") {
        console.log("ERROR: Secret is undefined, please check your JWT secret");
        return res.status(500).json({ message: "Server error" });
    }
    let token = req.body.token || " ";
    /*   token=token.split(" ")[1].trim() */
    if (!token || token === " ") {
        console.log("ERROR: No token provided");
        console.log(req.body);
        req.body = { email: req.body.email, password: req.body.password, tokenAuthenticated: false };
    }
    else
        (jwt.verify(token, secret, (err, decodedData) => {
            if (err) {
                console.log("ERROR: Could not connect to the protected route");
                console.log({ message: "Token is not valid" });
            }
            console.log('SUCCESS: Connected to protected route');
            req.body = { email: req.body.email, password: req.body.password, tokenAuthenticated: true };
        }));
    next();
};
export default TokenAuth;
