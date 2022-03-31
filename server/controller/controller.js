const Database = require('../model/postSchema')



const getPost = async (req, res) => {
    try {
        const allData = await Database.find().lean()
        res.status(200).json({
            error: false,
            message: "data recieved",
            data: allData
        })
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        })
    }
}

const savePost = async (req, res) => {
    const { post, comments } = req.body
    try {
        const newPost = await new Database({
            post,
            comments
        }).save()

        res.status(200).json({
            error: false,
            message: "Post Saved successfully...!",
            data: null
        })
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        })
    }
}

const deletePost = async (req, res) => {
    const _id = req.params.id
    try {
        const deletedPost = await Database.deleteOne({ _id })
        console.log(deletedPost);

        if (deletedPost.deletedCount) {
            res.status(200).json({
                error: false,
                message: "Post deleted",
                data: null
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Delete failed",
                data: null
            })
        }
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        })
    }
}

const updatePost = async (req, res) => {
    const { _id, post } = req.body
    try {
        console.log(req.body)
        const editRes = await Database.updateOne({ _id: _id }, { $set: { post: post } })
        // console.log(editRes)
        if (editRes.modifiedCount) {
            res.status(200).json({
                error: false,
                message: "Update successfull",
                data: null
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Same data posted",
                data: null
            })
        }
    } catch (err) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        })

    }
}

const saveComments = async (req, res) => {
    const { _id, Comments } = req.body;
    try {
        if (Comments) {
            var insertComment = {
                comment: Comments,
                replies: []
            }
        }
        const data = await Database.updateOne({ _id: _id }, { $push: { comments: insertComment } })
        console.log(data)
        if (data.modifiedCount) {
            res.status(200).json({
                error: false,
                message: "commented Successfully",
                data: null
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Comment failed",
                data: null
            })
        }
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        })
    }
}

const saveCommentReply = async (req, res) => {
    // console.log(req.body);
    const { mainId, Id, reply } = req.body
    try {
        const resp = await Database.updateOne({ "_id": mainId, 'comments._id': Id }, { $push: { "comments.$.replies": { "reply": reply } } })
        if (resp.modifiedCount) {
            res.status(200).json({
                error: false,
                message: "Replied Successfully",
                data: null
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Reply failed",
                data: null
            })
        }
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        })
    }
}

const editComment = async (req, res) => {
    console.log(req.body)
    const { mainId, comntId, comment } = req.body
    try {
        const updateComnt = await Database.updateOne({ "_id": mainId, "comments._id": comntId }, { $set: { "comments.$.comment": comment } })
        if (updateComnt.modifiedCount) {
            res.status(200).json({
                error: false,
                message: "comment Updated Successfully...!",
                data: null
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Comment Update failed",
                data: null
            })
        }
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        }).log(error);c
    }
}

const deleteComment = async (req, res) => {
    const { mainId, commentId, index } = req.body.ids
    try {
        const deleteComm = await Database.updateOne({ "_id": mainId, 'comments._id': commentId },
            { $pull: { "comments": { _id: commentId } } })

        console.log(deleteComm);
        if (deleteComm.modifiedCount) {
            res.status(200).json({
                error: false,
                message: "Comment deleted...!",
                data: null
            })
        } else {
            res.status(200).json({
                error: true,
                message: "Comment is not deleted...!",
                data: null
            })
        }
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Something went wrong",
            data: null
        })
    }
}


module.exports = {
    savePost, getPost, deletePost, updatePost, saveComments, saveCommentReply, deleteComment, editComment
}




