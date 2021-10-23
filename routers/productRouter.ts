import express from 'express';
import { body, validationResult } from 'express-validator'
import { verifyToken } from '../middewares/TokenVarify';
import { IProduct } from '../models/IProduct';
import ProductTable from '../models/Product';



const productRouter: express.Router = express.Router();

// logic for productRoutes

/*
@info:upload a product
url:http://127.0.0.1:5000/api/products/upload
method:post
@fields:name,brand,price,qty,description,image,category,usage
*/

productRouter.post('/upload', [
    body('name').not().isEmpty().withMessage('Please enter product name'),
    body('brand').not().isEmpty().withMessage('Please enter product brand'),
    body('price').not().isEmpty().withMessage('Please enter product price'),
    body('qty').not().isEmpty().withMessage('Please enter product quantity'),
    body('description').not().isEmpty().withMessage('Please enter product description'),
    body('image').not().isEmpty().withMessage('Please enter product image'),
    body('category').not().isEmpty().withMessage('Please enter product category'),
    body('usage').not().isEmpty().withMessage('Please enter product usage')

], verifyToken, async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }
    try {
        let { name, brand, price, qty, description, image, category, usage } = req.body;
        let product: IProduct = new ProductTable({ name, brand, price, qty, description, image, category, usage });
        await product.save();
        res.status(200).json({ message: 'Product added successfully' });


    } catch (error) {
        return res.status(400).json({

            message: error
        });
    }

})


/*
@info:get Men's collections
url:http://127.0.0.1:5000/api/products/men
method:get
@fields:no-field
*/
productRouter.get('/men', async (req: express.Request, res: express.Response) => {
    try {
        let product = await ProductTable.find({ category: 'MEN' });
        res.status(200).json(product);

    } catch (error) {
        return res.status(401).json({
            message: error
        });

    }

})

/*
@info:get WoMen's collections
url:http://127.0.0.1:5000/api/products/women
method:get
@fields:no-field
*/
productRouter.get('/women', async (req: express.Request, res: express.Response) => {
    try {
        let product = await ProductTable.find({ category: 'WOMEN' });
        res.status(200).json(product);

    } catch (error) {
        return res.status(401).json({
            message: error
        });

    }

})

/*
@info:get WoMen's collections
url:http://127.0.0.1:5000/api/products/kids
method:get
@fields:no-field
*/
productRouter.get('/kids', async (req: express.Request, res: express.Response) => {
    try {
        let product = await ProductTable.find({ category: 'KID' });
        res.status(200).json(product);

    } catch (error) {
        return res.status(401).json({
            message: error
        });
    }
})

/*
@info:get a single product
url:http://127.0.0.1:5000/api/product/:productId
method:get
@fields:no-field
*/
productRouter.get('/:productId', async (req: express.Request, res: express.Response) => {
    try {
        let productId = req.params.productId;
        let product = await ProductTable.findById(productId);
        res.status(200).json(product);

    } catch (error) {
        return res.status(401).json({
            message: error
        });
    }

})

export default productRouter;