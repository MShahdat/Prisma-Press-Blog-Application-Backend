import { Router } from "express";
import { commentControllers } from "./comments.controllers";
import catchAsync from "../../utility/catchAsync";


const router = Router()

router.post('/', catchAsync(commentControllers.commentCreate))



export const commentRouter = router