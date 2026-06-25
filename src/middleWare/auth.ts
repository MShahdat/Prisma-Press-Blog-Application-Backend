import { NextFunction, Request, Response } from "express";
import { forbiddenResponse, unauthorizedResponse } from "../utility/responseMessage";
import { jwtToken } from "../utility/jwt";
import config from "../config/env";
import { ActiveStatus } from "../../generated/prisma/enums";

const roleAuth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // const token = req.cookies.accessToken
    const token = req.headers.authorization

    console.log('token ---- ', token)
    if (!token) {
      return unauthorizedResponse(res, 'Unauthorized access');
    }

    const decoded = jwtToken.jwtVerify(token, config.jwt_access_sectet)
    if (!decoded) {
      return unauthorizedResponse(res, "unauthorized")
    }

    const {id, name, email, activeStatus, role} = decoded;
    console.log('role - ', role)

    if(activeStatus === ActiveStatus.BLOCKED){
      throw new Error('user temporary blocked')
    }

    if (!roles.includes(role)) {
      return forbiddenResponse(res, 'do not permit for you')
    }
    
    req.user = {
      id,
      name,
      email,
      activeStatus,
      role
    }
    next();
  }
}


export const authorization = {
  roleAuth,
}

