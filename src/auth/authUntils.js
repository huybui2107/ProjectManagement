const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler')
const {findByUserId} = require('../service/keyToken.service')
const { AuthFailureError ,NotFoundError } = require('../core/error.response');
const HEADER = {

    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "authorization",
    REFRESHTOKEN: "x-rtoken-id",
  };

const createTokenPair = async (payload , publicKey , privateKey) =>{
    try {
        const accessToken = await jwt.sign(payload, publicKey , {
            expiresIn :'1 day'
        })

        const refreshToken = await jwt.sign(payload, privateKey , {
            expiresIn :'7 days'
        })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        
    }
}

const authentication = asyncHandler(async(req,res,next) =>{

    const userID = req.headers[HEADER.CLIENT_ID];
    if (!userID) throw new AuthFailureError("Invalid request");
    const keyStore = await findByUserId(userID);
    if (!keyStore) throw new NotFoundError("Not found key store");
  
    if (req.headers[HEADER.REFRESHTOKEN]) {
      try {
        const refreshToken = req.headers[HEADER.REFRESHTOKEN];
        const decodeUser = jwt.verify(refreshToken, keyStore.privateKey);
        if (userID !== decodeUser.userId)
          throw new AuthFailureError("Invalid User ID");
  
        req.keyStore = keyStore;
        req.user = decodeUser;
        req.refreshToken = refreshToken;
        return next();
      } catch (error) {
        throw error;
      }
    }
  
    const accessToken = req.headers[HEADER.AUTHORIZATION];
  
    if (!accessToken) throw new AuthFailureError("Invalid request");
    try {
      const decodeUser = jwt.verify(accessToken, keyStore.publicKey);
      if (userID !== decodeUser.userId)
        throw new AuthFailureError("Invalid User ID ");
  
      req.keyStore = keyStore;
      req.user = decodeUser;
      return next();
    } catch (error) {
      throw error;
    }
})

const verifyJWT = async (token, keySecret) => {
    return await jwt.verify(token, keySecret);
  }


module.exports = {
    createTokenPair,
    authentication,
    verifyJWT

}