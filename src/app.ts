import express, { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";

const app: Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))


//* All route handle
app.get('/', async (req: Request, res: Response) => {
  const user = await prisma.user.findMany()
  console.log(user)
  res.send('Welcome to presma press backend!')
})


export default app