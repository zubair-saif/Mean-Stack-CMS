
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
    passport.authenticate('jwt', { session: false }),
    articleCtrl.updatePost
);
router.get('/getsinglepost/:id', articleCtrl.getSinglePost);
router.delete('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    articleCtrl.deletePost);

router.get('/my-post',
    passport.authenticate('jwt', { session: false }),
    articleCtrl.fetchPostbyUserId);

/**
 * comments routes 
 */

router.get('/allcommentofpost/:postId',
    commentCtrl.fetchCommentsByPostId);
router.post('/comment/:postId',
    passport.authenticate('jwt', { session: false }),
    commentCtrl.commentOnPost
);


/**
 * uploads
 */
// router.post('upload/uploadImage/:type', uploadRoutes.uploads)

module.exports = router;


// // employee routes
// router.get('/', employeeRoute.getAll);
// router.post('/create', employeeRoute.create);
// router.put('/update/:id', employeeRoute.update);
// router.delete("/delete/:id", employeeRoute.delete);
// router.get('/read/:id', employeeRoute.getOne);
