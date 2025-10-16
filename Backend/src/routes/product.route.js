import express from "express"
import { protectedRoute } from "../middleware/auth.protectedRoute.js"
import { createProduct,getMyProducts } from "../controllers/product.controller.js"

const router = express.Router()

router.post('/', protectedRoute, createProduct);
router.get('/myads', protectedRoute, getMyProducts);


export default router;

