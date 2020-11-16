const { response, request } = require("express")
const jwt = require("jsonwebtoken") 

const jwtValidate = (req = request, res = response, next) => {
 const token = req.header("x-token")

 if(!token) return res.status(401).json({
   ok: false, 
   msg: "Token is required"
  })

 try {
   const {uid, name} = jwt.verify(token, process.env.SECRET_JWT)
   req.user = { uid, name }
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token invalid"
    })
  }
  next()
}

module.exports = {jwtValidate}