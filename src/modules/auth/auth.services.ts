import jwt, { SignOptions, type JwtPayload } from "jsonwebtoken"
import { prisma } from "../../lib/prisma"
import { LOGIN } from "./type"
import bcrypt from 'bcrypt'
import config from "../../config/env"

const loginFromDB = async (payload: LOGIN) => {
  const { email, password } = payload

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return 0
  }

  // const user = await prisma.user.findUniqueOrThrow({
  //   where: {email}
  // })

  const pass = user.password
  const isMatch = await bcrypt.compare(password, pass)

  if (!isMatch) {
    return false
  }

  //& JWT TOKEN GENERATE
  const { id, name, role, activeStatus } = user

  if (activeStatus === 'BLOCKED') {
    throw new Error('User is blocked. Please try again letter')
  }

  const jwtPayload = {
    id,
    name,
    email,
    role,
    activeStatus
  } as JwtPayload

  console.log('jwt payload ', jwtPayload)

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_sectet as string,
    { expiresIn: config.jwt_access_expires_in as SignOptions['expiresIn'] })

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expires_in as SignOptions['expiresIn'] }
  )

  const result = {
    accessToken: accessToken,
    refreshToken: refreshToken
  }
  return result
}


const generateRefreshToken = async (token: string) => {
  try {
    if (!token) {
      throw new Error("Unauthorized access!");
    }
    
    const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string) as JwtPayload

      const {email} = decoded
      // console.log('decoded', decoded)
      const isUser = await prisma.user.findUnique({
        where: {email}
      })

      if(isUser?.activeStatus === 'BLOCKED'){
        return false
      }

      // console.log(isUser)
      //& TOKEN GENERATE
      
      const jwtPayload = {
        id: isUser?.id,
        name: isUser?.name,
        email,
        role: isUser?.role,
        activeStatus: isUser?.activeStatus
      }
      
      // console.log(jwtPayload)

      const accessToken = jwt.sign(jwtPayload, config.jwt_access_sectet as string, {expiresIn: config.jwt_access_expires_in as SignOptions['expiresIn']})

      // console.log('access token: ', accessToken)

      return accessToken;
  }
  catch (error: any) {
    throw new Error(error.message)
  }
}


export const authServices = {
  loginFromDB,
  generateRefreshToken,
}