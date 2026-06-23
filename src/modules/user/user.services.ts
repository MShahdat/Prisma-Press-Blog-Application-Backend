import config from "../../config/env"
import { prisma } from "../../lib/prisma"
import bcrypt from 'bcrypt'
import { USER } from "./user.type"



const userRegisterIntoDB = async (payload: USER) => {
  const {name, email, password, profilePhoto} = payload
  const isUser = await prisma.user.findUnique({
    where: {email}
  })

  if(isUser){
    throw new Error("User already exist!")
  }

  const hasPass = await bcrypt.hash(password as string, Number(config.solt_or_rounds))

  const createdUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hasPass
    }
  })

  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto: profilePhoto
    }
  })

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: email
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  })

  return user
}


export const userServices = {
  userRegisterIntoDB,
}