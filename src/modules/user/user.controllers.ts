import { userServices } from "./user.services"
import { Request, Response } from 'express'
import httpCode from 'http-status'
import { allResponse, createResponse, errorResponse, notFoundResponse, successResponse } from "../../utility/responseMessage"
import { USER } from "./user.type"


//& USER REGISTER
const userRegister = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const user = await userServices.userRegisterIntoDB(body)
    createResponse(res, 'User created successfully', user as USER)
  } 
  catch (error: any) {
    errorResponse(res, error.message, error)
  }
}



//& USER GET
const allUserGet = async (req: Request, res: Response) => {
  const users = await userServices.userGetFromDB()

  // console.log(req)

  if (users.length === 0) {
    notFoundResponse(res)
  }

  // console.log(users)

  allResponse(res, "All users retrive succssfully", users as any)
}

export const userController = {
  userRegister,
  allUserGet,
}