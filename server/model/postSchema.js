const mongoose = require('mongoose')







const PostApp = new mongoose.Schema({
    post : { type: String, required: true},
    comments : [
        {
            comment: { type : String }, 
            replies: [
                {
                    reply : { type : String }
                }
            ]
        }
    ]
})

const Database = mongoose.model("PostsData", PostApp)
module.exports = Database