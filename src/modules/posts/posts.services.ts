import { Role } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { authorization } from "../../middleWare/auth"
import { POSTS, updatePayload } from "./post.type"



//& CREATE POST
const createPostIntoDB = async (id: string, payload: POSTS) => {
  const post = await prisma.post.create({
    data: {
      ...payload,
      authorId: id
    },
    include: {
      comment: true
    }
  })
  return post
}


//& GET ALL POST
const getPostFromDB = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true
        },
      },
      comment: true,
      _count: {
        select: {
          comment: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return result
}


//& GET MY POSTS
const getMyPostFromDB = async (id: string) => {
  const result = await prisma.post.findMany({
    where: {authorId: id},
    include: {
      comment: true,
      _count: {
        select: {
          comment: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
  })
  return result
}

//& GET POST BY ID
const getPostByIdFromDB = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: {
      id: id
    }
  })

  if(!result) {
    return null
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: id
    },
    data: {
      views: {
        increment: 1
      }
    },
    include: {
      comment: true,
      _count: {
        select: {
          comment: true
        }
      },
      author: {
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true
        }
      }
    },
    omit: {
      authorId: true
    }
  })
  return updatedPost
} 


//& UPDATE POST
const updatePostIntoDB = async (postId: string, payload: updatePayload, userId: string, loggedRole: Role) => {

  const allowKey = ['title', 'content', 'thumbnail', 'tags']
  const keys = Object.keys(payload)

  const isValid = keys.some((key) => !allowKey.includes(key))
  if(isValid){
    throw new Error('Invalid or extra fields in request body')
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      author: true
    }
  })

  if(!post){
    return null
  }

  const {authorId} = post
  const getAccess = authorization.ownAuth(loggedRole, authorId, userId)

  if(getAccess === 'unauthorized'){
    return 'unauthorized'
  }
  
  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      ...payload
    },
    include: {
      author: {
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true
        }
      },
      comment: true
    },
    omit: {
      authorId: true
    }
  })
  return updatedPost
}



//& DELETE POST
const deletePostFromDB = async (postId: string, userId: string, loggedRole: Role) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      author: true
    }
  })
  if(!post){
    return null
  }

  const role = post.author.role
  const authorId = post.authorId
  const getAccess = authorization.ownAuth(loggedRole, authorId, userId, role)
  if(getAccess === 'unauthorized'){
    return 'unauthorized'
  }

  const deletePost = await prisma.post.delete({
    where: {
      id: postId
    }
  })
  console.log('delete done')
  return deletePost
}





export const postServices = {
  createPostIntoDB,
  getPostFromDB,
  getMyPostFromDB,
  getPostByIdFromDB,
  updatePostIntoDB,
  deletePostFromDB,

}