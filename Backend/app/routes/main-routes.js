
const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeeRoute = require('../controller/employee');
const postController = require('../controller/post.js');
const usersController = require('../controller/users');
const LoginController = require('../controller/login');
const resetEmailPass = require('../controller/resetPassword');


router.post('/signup', usersController.signUp);
router.post('/signin', LoginController.sigIn);
router.post('/restpass', resetEmailPass.sendResetEmailPass);

router.get('/verify-jwt',
    passport.authenticate('jwt', { session: false }),
    usersController.VerifyUser);


// employee routes
router.get('/', employeeRoute.getAll);
router.post('/create', employeeRoute.create);
router.put('/update/:id', employeeRoute.update);
router.delete("/delete/:id", employeeRoute.delete);
router.get('/read/:id', employeeRoute.getOne);


router.get('/posts', postController.getAllPosts);
router.post('/createPost',
    passport.authenticate('jwt', { session: false }),
    postController.create);

router.get('/getOne/:id', postController.getSinglePost);
router.delete('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    postController.deletePost);


router.get('/allcommentofpost/:id',
    passport.authenticate('jwt', { session: false }),
    postController.SinglePostWithAllComment);
router.post('/comment/:id',
    passport.authenticate('jwt', { session: false }),
    postController.commentOnPost);

module.exports = router;