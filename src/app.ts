import express, { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";
import httpCode from 'http-status'
import bcrypt from 'bcrypt' 
import config from "./config/env";
import { userRouter } from "./modules/user/user.routes";


const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))


//& All route handle
app.get('/', async (req: Request, res: Response) => {
  const user = await prisma.user.findMany()
  console.log(user)
  res.send('Welcome to presma press backend!')
})


//* user register
app.use('/api/users', userRouter)


export default app