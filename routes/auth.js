const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login_page', { msg: '' });
});

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validateField,
], login);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validateField,
], googleSignIn);



module.exports = router;