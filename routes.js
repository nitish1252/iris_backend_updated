const express = require('express');
const router = express.Router();

// Import controller functions
const {userSignUp, userSignIn, userData, updateCoverImg, updateProfileImg, fetchSelectedData, fetchSearchData, updateUserData}  = require('./controllers/signupController');
const {uploadFile} = require('./controllers/fileUpload')
const {savePost, postData, updateLikeCount, deletePost, updateComments} = require('./controllers/postController')

// Define routes
router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/upload', uploadFile);
router.get('/getdata', userData);
router.post('/updatecoverimg', updateCoverImg);
router.post('/updateprofileimg', updateProfileImg);
router.post('/savepost', savePost);
router.get('/getposts', postData);
router.post('/updatelikecount', updateLikeCount);
router.post('/deletepost', deletePost);
router.post('/updatecomment', updateComments)
router.get('/fetchselecteddata', fetchSelectedData)
router.get('/fetchsearchdata', fetchSearchData)
router.post('/updateuserdata', updateUserData);

// Export the router
module.exports = router;
