import { userServices } from "./user.services"
import { Request, Response } from 'express'
import httpCode from 'http-status'

const userRegister = async (req: Request, res: Response) => {
  const body = req.body

  const user = await userServices.userRegisterIntoDB(body)
  
  res.status(httpCode.CREATED).json(
    {
      success: true,
      statusCode: httpCode.CREATED,
      message: "User created successfully!",
      data: {
        user
      }

    })
}

export const userController = {
  userRegister,
}