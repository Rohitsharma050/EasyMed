import jwt from 'jsonwebtoken'


//user authentication middleware
const authDoctor = async (req,res,next)=>{
    try {
        
        const dToken = req.headers.dtoken || req.headers.dToken || req.headers.DToken
        if(!dToken)
        {
            return res.json({
            success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(dToken,process.env.JWT_SECRET)
        req.body = req.body || {}
        req.body.docId  = token_decode.id
        next()

    } catch (error) {
         console.log(error)
        return res.json({
            success:false,message:error.message})
    }
}

export default authDoctor;