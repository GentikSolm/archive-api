import { verify } from 'jsonwebtoken'

export default (req, res, next) => {
    const authHeader = req.get('Authorization')
    let isAuth = true;
    if (!authHeader) {
        isAuth = false
        return next()
    }
    const token = authHeader.split(' ')[1]
    if (!token || token === '') {
        isAuth = false
        return next()
    }
    let decodedToken
    try {
        decodedToken = verify(token, process.env.JWT_SECRET)
    } catch (err) {
        isAuth = false
        return next()
    }

    if (!decodedToken) {
        isAuth = false
        return next()
    }

    if(!isAuth) {
        throw new Error("Unauthenticated!")
    }
    return next()
}
