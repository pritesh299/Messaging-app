import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const TokenAuth = (req: Request, res: Response, next: NextFunction) => {
    
  const secret: string = process.env.JWT_SECRET || "";

  if (secret === "") {
    console.log("ERROR: Secret is undefined, please check your JWT secret");
    return res.status(500).json({ message: "Server error" });
   }

    let token = req.headers["authorization"] ||" ";
    token=token.split(" ")[1].trim()
 
  if (!token||token===" ") {
    console.log("ERROR: No token provided");
  } else( jwt.verify(token, secret, (err, decodedData:any) => {
    if (err) {
      console.log("ERROR: Could not connect to the protected route");
      return res.status(403).json({ message: "Token is not valid" ,token:token});
    }
     console.log('SUCCESS: Connected to protected route',decodedData);
     req.body=decodedData.user 
  }))

 
  next();

};

export default TokenAuth;
