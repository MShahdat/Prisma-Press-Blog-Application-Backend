import { userServices } from "./user.services"
import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpCode from 'http-status'
import { createResponse, errorResponse, notFoundResponse, successResponse, unauthorizedResponse } from "../../utility/responseMessage"
import { USER } from "./user.type"
import catchAsync from "../../utility/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config/env"
import { jwtToken } from "../../utility/jwt"

//& USER REGISTER
const userRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const user = await userServices.userRegisterIntoDB(body)
  createResponse(res, 'User created successfully', user as USER)
})



//& USER GET
const allUserGet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await userServices.userGetFromDB()

  if (users.length === 0) {
    notFoundResponse(res)
  }
  return successResponse(res, "All users retrive succssfully", users as any)
})


//& GET ME
const getMe = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  // console.log('user from request --- ', req.user)
  
  if(!req.user){
    return notFoundResponse(res)
  }

  const {id} = req.user

  const result = await userServices.getMeFromDB(id)
  if(!result){
    return notFoundResponse(res)
  }

  return successResponse(res, 'User retrive successfully', result)

})


//& PUT USER PROFILE
const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  console.log('body ---- ', body)
  console.log('user --- ', req.user)

  if(!req.user){
    return notFoundResponse(res)
  }

  const result = await userServices.updateProfileFromDB(req.user?.id as string, body)

  return successResponse(res, 'profile updated successfully', result)
})


export const userController = {
  userRegister,
  allUserGet,
  getMe,
  updateProfile,
}