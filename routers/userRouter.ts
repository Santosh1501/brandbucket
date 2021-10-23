import express from 'express';
import { IAddress, IUser } from '../models/IUser';
import UserTable from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { body, validationResult } from 'express-validator'
import { verifyToken } from '../middewares/TokenVarify';



const userRouter: express.Router = express.Router();

/*
@info:Register a User 
@url:http://127.0.0.1:5000/api/users/register
@method:POST
@fields:name,email,password,confirmPassword
@access:public
*/
userRouter.post('/register', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required')
], async (req: express.Request, res: express.Response) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // database logic
    try {
        let { name, email, password } = req.body;
        let user: IUser = await UserTable.findOne({ email: email });
        //    check user is present or not

        if (user) {
            return res.status(401).json({ msg: `Hi ${name}... Already Exist. Try Different Email Account` })
        }

        // encrypt password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt)

        // Avtar url image from email

        let avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

        //   default address

        let address: IAddress = {
            flat: '',
            street: '',
            landmark: '',
            city: '',
            mobile: '',
            state: '',
            country: '',
            pin: '',
        };

        // craete a new user 
        let newUser = await new UserTable({ name, email, password: hashedPassword, avatar, address });
        newUser = await newUser.save();

        res.status(200).json({ msg: `Hi ${name}... Registration Has successfully Done` })



    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: error }] })

    }

})


// logIn User

/*
@info:logIn a User 
@url:http://127.0.0.1:5000/api/users/login
@method:POST
@fields:email,password
@access:public
*/
userRouter.post('/login', [
    body('email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required')
], async (req: express.Request, res: express.Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // database logic
    try {
        let { email, password } = req.body;
        let user = await UserTable.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ msg: 'Invalid Email Id' })
        }

        // check for Password if user is there
        let isMatch: boolean = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({ msg: 'Invalid Password' })
        }
        // create a token jwt 
        let payload = {
            user: {
                id: user._id,
                name: user.name,
            }
        }
        if (process.env.JWT_SECRET_KEY !== undefined) {
            jwt.sign(payload, process.env.JWT_SECRET_KEY, (error, token) => {
                if (error) {
                    throw error;
                }
                res.status(200).json({
                    msg: `${email}... LoggedIn successfully...`,
                    token: token
                })
            })
        }

        // jwt.sign(payload, '12345ahgchg6651514', (error, token) => {
        //     if (error) {
        //         throw error;
        //     }
        //     res.status(200).json({
        //         msg: 'LogIn success',
        //         token: token
        //     })
        // })



    } catch (error) {
        // console.error(error)
        res.status(500).json({ errors: [{ msg: error }] })

    }
})


/*
@info:Get logIn User data
@url:http://127.0.0.1:5000/api/users/
@method:get
@fields:no fields
@access:private
*/
// login data 
userRouter.get('/', verifyToken, async (req: express.Request, res: express.Response) => {
    try {
        let user: IUser = await UserTable.findById(res.locals.jwt);
        res.status(200).json(user)
    } catch (error) {
        return res.status(401).json({ msg: error })
    }

})


/*
@info:update d address
@url:http://127.0.0.1:5000/api/users/address
@method:post
@fields:flat,street,landmark,city,mobile,state,country,pin
@access:private
*/
userRouter.post('/address', [
    body('flat').not().isEmpty().withMessage('flat is required'),
    body('street').not().isEmpty().withMessage('street is required'),
    body('landmark').not().isEmpty().withMessage('landmark is required'),
    body('city').not().isEmpty().withMessage('city is required'),
    body('mobile').not().isEmpty().withMessage('mobile is required'),
    body('state').not().isEmpty().withMessage('state is required'),
    body('country').not().isEmpty().withMessage('country is required'),
    body('pin').not().isEmpty().withMessage('pin is required')

], verifyToken, async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let { flat, street, landmark, city, mobile, state, country, pin } = req.body;
        let newAddress: IAddress = {
            flat: flat,
            street: street,
            landmark: landmark,
            city: city,
            mobile: mobile,
            state: state,
            country: country,
            pin: pin
        }
        let user: IUser = await UserTable.findById(res.locals.jwt);
        user.address = newAddress;
        await user.save();
        return res.status(200).json({ msg: 'Address updated successfully' })
    } catch (error) {
        return res.status(401).json({ msg: error })

    }

})

export default userRouter;

