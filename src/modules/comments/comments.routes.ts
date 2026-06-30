import { Router } from "express";
import { commentControllers } from "./comments.controllers";


const router = Router()

router.post('/', commentControllers.commentCreate)



export const commentRouter = router