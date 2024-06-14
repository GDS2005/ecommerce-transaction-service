const Product = require('../product/product.model');
const productValidation = require('../product/product.validation');
const Joi = require('joi');

exports.createProduct = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = productValidation.createProduct.body.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, description, image, price } = value;

        // Your existing code for creating a product
        let product = await Product.findOne({ name });
        if (product) return res.status(400).json({ msg: 'Product already exists' });

        product = new Product({ name, description, image, price });

        await product.save();

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProducts = async (req, res) => {
    try {
        // No request validation needed for this function as it doesn't accept any input
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProduct = async (req, res) => {
    // Similar to getProducts, no request validation needed for this function
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate request body
        const { error, value } = productValidation.updateProduct.body.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, description, image, price } = value;

        let product = await Product.findById(id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Update product fields if provided
        if (name) product.name = name;
        if (description) product.description = description;
        if (image) product.image = image;
        if (price) product.price = price;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        // No request validation needed for this function
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        await Product.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};