import jwt from 'jsonwebtoken'
import express from 'express'

interface payload {
    user: {
        id: string;
        name: string;
    }
}

// create function to verify token
export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token = req.header("token")
    if (!token) {
        return res.status(401).json({

            message: "No token provided"
        })
    } else {
        try {
            if (process.env.JWT_SECRET_KEY !== undefined) {
                jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
                    if (error) {
                        return res.status(401).json({
                            message: "Token is not valid"
                        })
                    } else {
                        if (payload !== undefined) {
                            res.locals.jwt = await payload.user.id;
                            next();
                        }
                    }
                })
            }

            // jwt.verify(token, '12345ahgchg6651514', async (error, payload) => {
            //     if (error) {
            //         return res.status(401).json({
            //             message: "Token is not valid"
            //         })
            //     } else {
            //         if (payload !== undefined) {
            //             res.locals.jwt = await payload.user.id;
            //             next();
            //         }
            //     }
            // })

        } catch (error) {
            return res.status(401).json({
                message: "Token is not valid"
            })

        }
    }

}


