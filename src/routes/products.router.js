import {Router} from 'express';
import { getAllProducts } from '../controllers/products.controller.js';

const router = Router();

import { 
    getAllProducts, 
    searchProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
    } from '../controllers/products.controller.js';

router.get("/products", getAllProducts);

router.get("/products/search", searchProducts);

router.get("/products/:id", getProductById);

router.post("/products", createProduct);

router.put("/products", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;