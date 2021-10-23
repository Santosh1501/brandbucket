import express from 'express';
import { verifyToken } from '../middewares/TokenVarify'
import { body, validationResult } from 'express-validator'
import OrderTable from './../models/Order';
import { IOrder } from '../models/IOrder';
import UserTable from '../models/User';
import { IUser } from '../models/IUser';


const orderRouter: express.Router = express.Router()


// logic
/*
@info:Place an order
url:http://127.0.0.1:5000/api/orders/place
method:Post
@fields:tax,total,Item
*/

orderRouter.post('/place', [
    body('tax').not().isEmpty().withMessage('Tax is required'),
    body('total').not().isEmpty().withMessage('Total is required'),
    body('items').not().isEmpty().withMessage('Items  required')
], verifyToken, async (req: express.Request, res: express.Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let { items, tax, total } = req.body;
        // i want rest name,email,mobile of user when i logged in..
        let user: IUser = await UserTable.findById(res.locals.jwt)
        let order: IOrder = new OrderTable({
            name: user.name,
            email: user.email,
            mobile: user.address.mobile,
            items: items,
            tax: tax,
            total: total
        })
        await order.save()
        res.status(200).json({ message: 'Order placed successfully' })

    } catch (error) {
        res.status(400).json({ msg: error })

    }

});


/*
@info:get all orders details
url:http://127.0.0.1:5000/api/orders/
method:get
@fields:no field
*/

orderRouter.get('/', verifyToken, async (req: express.Request, res: express.Response) => {
    try {
        let user: IUser = await UserTable.findById(res.locals.jwt)
        let orders = await OrderTable.find({ email: user.email })
        res.status(200).json({ orders: orders })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
})




export default orderRouter;
