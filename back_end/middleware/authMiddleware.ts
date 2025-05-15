import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const TokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || " "
  const JWT_SECRET:string =  process.env.JWT_SECRET || ""

  if (!JWT_SECRET) {
    console.error("FATAL: JWT_SECRET not defined in environment.");
    return res.status(500).json({ msg: "Server misconfiguration" });
  }

  if (!token||token===" ") {
      console.log("ERROR: No token provided");
      req.body={email: req.body.email,password: req.body.password, tokenAuthenticated:false} 
  }else{
      jwt.verify(token, JWT_SECRET, (err:any, decodedData:any) => {
      if (err) {
        console.log("ERROR: Could not connect to the protected route");
      }
      console.log('SUCCESS: Connected to protected route');
      req.body={email: decodedData.email,id:decodedData.id,token:token,tokenAuthenticated:true} 
    })
  }
  next();
};

export default TokenAuth;
