const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');




const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        // verificar si el email existe
        if (!user) {
            return res.render('login_page', {
                msg: 'Usuario | Contraseña no son correcost -correo-'
            });
        }

        //verificar si el usuario esta activo
        if (!user.state) {

            return res.render('login_page', {
                msg: 'Usuario inactivo state - false',
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {

            return res.render('login_page', {
                msg: 'Contraseña no coincide',
            })
        }

        //generar el JWT
        const token = await generateJWT(user.id);

        return res.render('dashboard', { token });


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hablen con el ingeniero error interno'
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, picture, email } = await googleVerify(id_token);
        console.log({ name, picture, email });

        res.render('dashboard', {
            name,
            picture,
            email,
        });


    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar',
        })
    }
}

module.exports = {
    login,
    googleSignIn,
}