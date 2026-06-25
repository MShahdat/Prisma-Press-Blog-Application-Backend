import { Request, Response } from "express"
import { authServices } from "./auth.services"
import { badResponse, errorResponse, loginResponse, notFoundResponse, successResponse } from "../../utility/responseMessage"
import catchAsync from "../../utility/catchAsync"


//& LOGIN USER
const login = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await authServices.loginFromDB(body)

  if (result === 0) {
    notFoundResponse(res)
    return
  }
  if (!result) {
    badResponse(res, "Invalid user credentials")
    return
  }


 

  res.cookie('refreshToken', result.refreshToken, {
    secure: false,    // set ture in production
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7   // 7 days
  })

   res.cookie('accessToken', result.accessToken, {
    secure: false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 1
  })

  // console.log('cookies', req.cookies)

  loginResponse(res, result)
})


//& GENERATE REFRESH TOKEN
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // console.log('cookies : ', req.cookies.refreshToken)
  const token = req.cookies.refreshToken;
  const result = await authServices.generateRefreshToken(token)
  
  if (!result) {
    throw new Error('User is blocked. Please try again letter')
  }

  const rs = {
    accessToken: result
  }
  successResponse(res, 'Token refreshed successfully', rs)

})



export const authController = {
  login,
  refreshToken,
}