import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import { userRouter } from "./modules/user/user.routes";
import { rootResponse } from "./utility/responseMessage";
import { authRouter } from "./modules/auth/auth.routes";
import logger from "./middleWare/logger";
import { postsRouter } from "./modules/posts/posts.routes";
import { commentRouter } from "./modules/comments/comments.routes";


const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(logger)


//& All route handle
app.get('/', async (req: Request, res: Response) => {
  rootResponse(res)
})


//* user register
app.use('/api/users', userRouter)

//* auth
app.use('/api/auth', authRouter)

//* posts
app.use('/api/posts', postsRouter)

//* comments
app.use('/api/comments', commentRouter)

export default app