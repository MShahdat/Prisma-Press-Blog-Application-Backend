import config from "../../config/env"
import { prisma } from "../../lib/prisma"
import bcrypt from 'bcrypt'
import { UpdatePayload, USER } from "./user.type"


//& USER REGISTER
const userRegisterIntoDB = async (payload: USER) => {
  const {name, email, password, activeStatus, role, profilePhoto, bio, } = payload
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
      password: hasPass,
      activeStatus,
      role: role,
      profile: {
        create: {
          profilePhoto,
          bio
        }
      }
    }
  })

  // await prisma.profile.create({
  //   data: {
  //     userId: createdUser.id,
  //     profilePhoto: profilePhoto
  //   }
  // })

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


//& ALL USER GET
const userGetFromDB = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      comment: true,
      post: false
    },
    omit: {
      password: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return users
}


//& GET ME
const getMeFromDB = async (id: string) => {

  const user = await prisma.user.findUnique({
    where: {
      id
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
      comment: true
    }
  })

  return user
}


//& UPDATE USER PROFILE
const updateProfileFromDB = async (id: string, payload: UpdatePayload) => {

  const allowKey = ['name', 'profilePhoto', 'bio'] as const
  const {name, profilePhoto, bio} = payload
  const keys = Object.keys(payload)

  const isValid = keys.some((key) => !allowKey.includes(key as any))
  
  if(isValid){
    throw new Error('Invalid or extra fields in request body')
  }

  const updateProfile = await prisma.user.update({
    where: {id: id},
    data: {
      name,
      profile: {
        update: {
          profilePhoto,
          bio
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  })

  return updateProfile
}


export const userServices = {
  userRegisterIntoDB,
  userGetFromDB,
  getMeFromDB,
  updateProfileFromDB,
}