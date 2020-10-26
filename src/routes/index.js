const { Router } = require('express');

const router = Router(); // objeto para poder definir  url
const User = require('../models/User'); // modelo usuario
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello word'));
router.post('/signup', async(req, res) => {
    //console.log(req.body);
    const { email, password } = req.body;
    //console.log(email, password);
    const newUser = new User({ email, password });
    //console.log(newUser);
    await newUser.save(); // await cuando es un metodo asincrono va haciendo eso mientras continua, va con aysnc
    //res.send('Testing signup');
    const token = jwt.sign({ _id: newUser._id }, 'secretkey'); // aca se deberia de poner la duración del token y demas
    res.status(200).json({ token });
});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("The email doesn't exists");
    if (user.password !== password) return res.status(401).send('Wrong Password');

    const token = jwt.sign({ _id: user._id }, 'secretkey'); // todo debe ser el mismo el donde ponga el secretKey
    return res.status(200).json({ token });
});

router.get('/tasks', (req, res) => {
    res.json([{
            _id: 1, // datos publicos 
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2020-10-25T01:43:19.346Z"
        }
    ]);
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([{
            _id: 1, // datos publicos 
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2020-10-25T01:43:19.346Z"
        }
    ]);

});

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
});

module.exports = router;
// funcion que se encarga de verificar que esta logeado
function verifyToken(req, res, next) {
    //console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send('anuthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1]; // para separar el token de bearer, toma solo el token
    if (token === 'null') {
        return res.status(401).send('Unthorize Request');
    }
    const payload = jwt.verify(token, 'secretkey'); // como el id del usuario
    req.userId = payload._id;
    next();
}