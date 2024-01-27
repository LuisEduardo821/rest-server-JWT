const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { login } = require('../controllers/auth');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login_page', { msg: '' });
});

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validateField,
], login);



module.exports = router;