import { userServices } from "./user.services"
import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpCode from 'http-status'
import { createResponse, errorResponse, notFoundResponse, successResponse } from "../../utility/responseMessage"
import { USER } from "./user.type"
import catchAsync from "../../utility/catchAsync"


//& USER REGISTER
const userRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const user = await userServices.userRegisterIntoDB(body)
  createResponse(res, 'User created successfully', user as USER)
})



//& USER GET
const allUserGet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await userServices.userGetFromDB()
  // console.log(req)

  if (users.length === 0) {
    notFoundResponse(res)
  }
  // console.log(users)
  successResponse(res, "All users retrive succssfully", users as any)
})

export const userController = {
  userRegister,
  allUserGet,
}