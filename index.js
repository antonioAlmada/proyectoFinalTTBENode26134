import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import productsRouter from './src.routes/products.router.js';

const app =  express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API en mantenimiento" });
});

import authRouter from './src/routes/auth.router.js';
app.use('/api/auth', authRouter);

import productsRouter from './src/routes/products.router.js';
app.use('/api/products', productsRouter);

import notFound from './src/middlewares/not-found.js';
app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));