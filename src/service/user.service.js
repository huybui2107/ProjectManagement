'use strict'
const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { getInfoData } = require("../utils");
const { createTokenPair } = require('../auth/authUntils')
const KeyTokenService = require('../service/keyToken.service')
const { BadRequestError, AuthFailureError, ForbiddenError } = require("../core/error.response");
const { Types } = require('mongoose');
class UserService {
    login = async ({ email, password }) => {
        console.log(`TEST`, email);
        console.log(`TEST 01`, password)
        const findUser = await User.findOne({ email: email }).lean()
        console.log(`TEST 02`, findUser)
        if (!findUser) throw new BadRequestError("User not registered");

        const match = await bcrypt.compare(password, findUser.password);
        if (!match) throw new AuthFailureError(`Authentication error `);

        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const tokens = await createTokenPair({ userId: findUser._id, email }, publicKey, privateKey);
        console.log(`TEST 02`, findUser._id)
        const keyStore = await KeyTokenService.createKeyToken({
            userId: findUser._id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken
        })
        return {
            User: getInfoData({ fileds: ['_id', 'username', 'email'], object: findUser }),
            tokens
        }
    }
    signUp = async (data) => {
        //  try {
        console.log(`TEST ::`, data)
        const findUser = await User.findOne({ email: data.email }).lean();
        if (findUser) throw new BadRequestError('Error: User already rigister!')

        const hashPassword = await bcrypt.hash(data.password, 12);
        const newUser = await User.create(
            {
                username: data.username,
                email: data.email,
                phone: data.phone,
                password: hashPassword,

            });
        if (newUser) {

            const privateKey = crypto.randomBytes(64).toString("hex");
            const publicKey = crypto.randomBytes(64).toString("hex");



            const tokens = await createTokenPair({ userId: newUser._id, email: data.email }, publicKey, privateKey);

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken
            })
            if (!keyStore) throw new BadRequestError('publicKeyString error')
            return {

                User: getInfoData({ fileds: ['_id', 'username', 'email'], object: newUser }),
                tokens

            }
        }

    }
    handleRefreshToken = async ({ refreshToken, keyStore, user }) => {
        const { userID, email } = user;
        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.removeKeyByuserId(userID);
            throw new ForbiddenError("Some thing wrong happened. Please re-login");
        }

        if (keyStore.refreshToken !== refreshToken)
            throw new AuthFailureError("User not registered");

        const foundUser = await User.findOne({ email });
        if (!foundUser) throw new AuthFailureError("User not registered");
        //Create token moi
        const tokens = await createTokenPair(
            {
                userID,
                email,
            },
            keyStore.publicKey,
            keyStore.privateKey
        );

        //update token
        await KeyTokenService.updateKey(tokens, refreshToken, keyStore);
        return {
            user,
            tokens,
        };

    };
    logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore._id);
        return delKey;
    }
    getUserById = async (id) => {
        return await User.findById(new Types.ObjectId(id)).select("username email _id")
    }
}
module.exports = new UserService();