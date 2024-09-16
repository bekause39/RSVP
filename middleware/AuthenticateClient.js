// Importing Authentication Middleware
import pkg from 'dotenv'
const dotenv = pkg
import jwt from 'jsonwebtoken'
const {sign, verify}  = jwt

dotenv.config();

// Creating a token
export default function createToken(client) {
    return sign(
        {
            email_add: client.email_add,
            client_pass: client.client_pass
        },
        process.env.SECRET_KEY, 
        { 
            expiresIn: '1h'
        }
    );
}
//
export  function verifyAToken(req, res, next) {
    try{
        const token = req.cookies["LegitClient"] !== null ? req.cookies["LegitClient"] :
        "Please register" ;
        const isValid = null;
        if(token !== "Please register") {
            isValid = verify(token, process.env.SECRET_KEY);
            if(isValid) {
                req.authenticated = true;
                next();
            }else {
                res.status(400).json({err: "Please register"})
            }
        }else {
            res.status(400).json({err: "Please register"})
        }
    }catch(e) {
        res.status(400).json({err: e.message});
    }
}
// export default {createToken, verifyAToken};