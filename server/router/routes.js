const express = require('express');
const router = express.Router();
const { savePost, getPost, deletePost, updatePost, saveComments, saveCommentReply, deleteComment, editComment } = require('../controller/controller')






router.get('/getpost', getPost);
router.post('/savepost', savePost);
router.delete('/deletepost/:id', deletePost);
router.put('/editpost', updatePost);
router.post('/post/comments', saveComments);
router.post('/post/replyComment', saveCommentReply);
router.delete('/deleteComment', deleteComment);
router.post('/post/editcomment', editComment)

module.exports = router

