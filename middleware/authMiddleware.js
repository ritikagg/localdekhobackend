import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if(decoded){
        //req.user = await User.findById(decoded.id).select('-password')

        next()
      }else{
         res.status(401)
         throw new Error('Not authorized, token is invalid')
      }

      
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }else if (req.params.timestamp && req.params.code &&req.params.hmac){
    next()

  }else if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

const checkUserlogin = (async(req , res , next) =>{

})

export default { protect, admin, checkUserlogin }
