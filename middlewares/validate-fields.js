const { validationResult } = require('express-validator');

const validateField = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.render('login_page', { msg: 'correo y contraseña requeridos' });
    };
    next();

}

module.exports = {
    validateField,
}