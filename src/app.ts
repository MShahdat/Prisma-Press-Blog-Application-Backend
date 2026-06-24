import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import { userRouter } from "./modules/user/user.routes";
import { rootResponse } from "./utility/responseMessage";
import { authRouter } from "./modules/auth/auth.routes";


const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log('Time : ', Date.now());
//   next();
// })


//& All route handle
app.get('/', async (req: Request, res: Response) => {
  rootResponse(res)
})


//* user register
app.use('/api/users', userRouter)

//* auth
app.use('/api/auth', authRouter)


export default app