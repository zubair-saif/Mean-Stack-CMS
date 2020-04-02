
const express = require('express');
const router = express.Router();
const passport = require('passport');

// const employeeRoute = require('../controller/employee');
const articleCtrl = require('../controller/post.js');
const profileCtrl = require('../controller/profile');
const loginCtrl = require('../controller/login');
const resetCtrl = require('../controller/resetPassword');
const signupCtrl = require('../controller/signup');
const commentCtrl = require('../controller/comments');
/**
 * user athancations routes
 */

router.post('/signup', signupCtrl.signUp);
router.post('/signin', loginCtrl.sigIn);
router.post('/restpass', resetCtrl.sendResetEmailPass);

/**
 *  profile routes
 */

router.get('/verify-jwt',
    passport.authenticate('jwt', { session: false }),
    profileCtrl.profileFetch);



/**
 * file upload
 */


/**
 * articles routes 
 * */

router.get('/posts', articleCtrl.getAllPosts);
router.post('/createpost',
    passport.authenticate('jwt', { session: false }),
    articleCtrl.create);
router.put('/updatepost/:id',
    articleCtrl.updatePost,
    passport.authenticate('jwt', { session: false })
);
router.get('/getsinglepost/:id', articleCtrl.getSinglePost);
router.delete('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    articleCtrl.deletePost);


/**
 * comments routes 
 */

router.get('/allcommentofpost/:postId',
    commentCtrl.fetchCommentsByPostId);
router.post('/comment/:postId',
    passport.authenticate('jwt', { session: false }),
    commentCtrl.commentOnPost
);

module.exports = router;


// // employee routes
// router.get('/', employeeRoute.getAll);
// router.post('/create', employeeRoute.create);
// router.put('/update/:id', employeeRoute.update);
// router.delete("/delete/:id", employeeRoute.delete);
// router.get('/read/:id', employeeRoute.getOne);
