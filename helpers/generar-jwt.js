const jwt = require("jsonwebtoken")

const generarJwt = async (uid = '') => {
    return new Promise( (resolve, reject) => {

        const payload = {
            uid,
        };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })
    })

}

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = Buffer.from(base64, 'base64').toString('utf-8');
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};


module.exports = {
    generarJwt,
    parseJwt,
}