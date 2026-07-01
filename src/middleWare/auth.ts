import { NextFunction, Request, Response } from "express";
import { forbiddenResponse, unauthorizedResponse } from "../utility/responseMessage";
import { jwtToken } from "../utility/jwt";
import config from "../config/env";
import { ActiveStatus, Role } from "../../generated/prisma/enums";
import catchAsync from "../utility/catchAsync";

const roleAuth = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken
      :
      req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1]
        :
        req.headers.authorization


    // console.log('token ---- ', token)
    if (!token) {
      return unauthorizedResponse(res, 'Unauthorized access');
    }

    const decoded = jwtToken.jwtVerify(token, config.jwt_access_sectet)
    if (!decoded) {
      return unauthorizedResponse(res, "unauthorized")
    }

    const { id, name, email, activeStatus, role } = decoded;
    console.log('role - ', role)
    console.log('status ---', activeStatus)

    if (activeStatus === 'BLOCKED') {
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
  })
}


const ownAuth = (loggedRole: Role, authorId: string, userId: string, role: Role) => {
  if(loggedRole === 'USER' && (authorId !== userId)){
    return 'unauthorized'
  }

  if(loggedRole === 'ADMIN' && role === 'ADMIN'){
    if(authorId !== userId){
      return 'unauthorized'
    }
  }
}
export const authorization = {
  roleAuth,
  ownAuth,
}

