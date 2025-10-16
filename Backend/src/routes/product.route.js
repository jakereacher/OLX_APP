import express from "express"
import { protectedRoute } from "../middleware/auth.protectedRoute.js"
import { createProduct } from "../controllers/product.controller.js"

const router = express.Router()

router.post('/', protectedRoute, createProduct);

export default router;

