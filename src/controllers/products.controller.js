import * as Model from '../models/Products.js';

export const getAllProducts = async(req, res) => {
    const { category } = req.query;

    const products = await Model.getAllProducts();

    if(category) {
        const filteredProducts = products.filter((item) =>
            item.categories.includes(category)
        );

        return res.json(filteredProducts);
    }

    res.json(products);
};

export const searchProducts = (req, res) => {
    const { name } = req.query;

    if(!name) {
        return res.status(400).json({ error: "Debe proporcionar un nombre para la búsqueda" });
    }

    const products = Model.getAllProducts();

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
    );

    if(filteredProducts.length == 0) {
        return res.status(404).json({ error: "No se econtraron productos" });
    }

    res.json(filteredProducts);
};

export const getProductById = async (req, res) => {
    const id = req.params.id;

    const product = await Model.getProductById(id);

    if (!product) {
        res.status(404).json({ error: "No existe el producto" });
    }

    res.json(product);
};

export const createProduct = async (req, res) => {
    const { name, price, categories } = req.body;

    const newProduct = await Model.createProduct({ name, price, categories });

    res.status(201).send(newProduct);
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, categories } = req.body;

    if (!name || !price || !categories) {
        return res
        .status(422)
        .json({ error: "Faltan datos para actualizar el producto" });
    }

    const updatedProduct = await Model.updateProduct(id, { name, price, categories });
    if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const deleted = await Model.deleteProduct(id);

    if (!deleted) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(204).send();
};
