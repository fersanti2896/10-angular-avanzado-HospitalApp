
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const login = async( req, res = response ) => {
    const { email, password } = req.body;

    try {
        
        /* Verificar email */
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ) {
            return  res.status(404).json({
                ok: false,
                msg: 'Email no válido!'
            })
        }

        /* Verificar contraseña */
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );
        
        if( !validPassword ) {
            return  res.status(404).json({
                ok: false,
                msg: 'Password no válido!'
            })
        }

        /* Generar el JWT */

        return  res.status(200).json({ 
            ok: true,
            msg: 'Hola mundo!'
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ 
            ok: false,
            msg: 'Error inesperado!'
        })
    }
}

module.exports = {
    login
}