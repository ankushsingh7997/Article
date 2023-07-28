const express=require('express');
const { signUp } = require('../controllers/user/signup');
const { login } = require('../controllers/user/login');
const { editUser } = require('../controllers/user/editUser');
const { authentication } = require('../middleware/authentication');
const { deleteUser } = require('../controllers/user/deleteUser');
const { createArticle } = require('../controllers/article/createArticle');
const { getArticle } = require('../controllers/article/getArticle');
const { premiumCheck } = require('../middleware/premium');
const { authentication2 } = require('../middleware/authentication2');
const { getAllArticles } = require('../controllers/article/getAllArticle');
const router=express.Router();
// user section
// user regestration
router.post('/signup',signUp)
// login
router.post('/login',login)
// edit
router.post('/editUser',authentication,authentication2,editUser)
//delete user
router.delete('/deleteUser',authentication,authentication2,deleteUser)

// article section
// create article
router.post('/createArticle',authentication,authentication2,createArticle)
// get articles
router.get('/getArticle/:id',premiumCheck,authentication,authentication2,getArticle)

// get all articles

router.get('/getAllArticles',authentication,getAllArticles)







module.exports=router;