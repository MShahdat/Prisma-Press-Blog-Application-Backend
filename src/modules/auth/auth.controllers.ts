import { Request, Response } from "express"
import { authServices } from "./auth.services"
import { badResponse, errorResponse, loginResponse, notFoundResponse, successResponse } from "../../utility/responseMessage"
import catchAsync from "../../utility/catchAsync"


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

  // console.log('refresh token : ', result.refreshToken)
  res.cookie('refreshToken', result.refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  })

  // console.log('cookies', req.cookies)

  loginResponse(res, result)
})


//& GENERATE REFRESH TOKEN
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // console.log('cookies : ', req.cookies.refreshToken)
  const result = await authServices.generateRefreshToken(req.cookies.refreshToken)
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
  refreshToken
}