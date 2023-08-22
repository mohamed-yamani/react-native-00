const Product = require('../models/products');

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product({
            title: req.body.title,
            supplier: req.body.supplier,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            product_location: req.body.product_location,
            price: req.body.price,
        });
        try {
            print(req.body);
            await newProduct.save();
            res.status(200).json({ message: 'Product created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong 1' });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate([
                {
                  $search: {
                    index: "UM6PBooking",
                    text: {
                      query: req.params.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]);
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

}