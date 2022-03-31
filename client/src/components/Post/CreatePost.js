import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import CreatePostModal from './CreatePostModal'
import { FaCommentAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';
import { RiSendPlaneFill } from 'react-icons/ri';
import { BsFillReplyFill } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';

function CreatePost() {

    const [recievedData, setrecievedData] = useState({})
    const [show, setshow] = useState(false)

    const [showEditForm, setshowEditForm] = useState({ id: '' })
    const [updatePostData, setupdatePostData] = useState({ _id: 0, post: "", })

    const [showcommentbox, setshowcommentbox] = useState({ id: '' });
    const [reply, setreply] = useState({})

    const [comment, setcomment] = useState({});
    const [postCom, setpostCom] = useState(false);

    const [editComntState, seteditComntState] = useState(false)
    const [defEditComnt, setdefEditComnt] = useState("")
    const [updateEditComnt, setupdateEditComnt] = useState({})

    const [commentReply, setcommentReply] = useState({});
    const [replyCom, setreplyCom] = useState(false);

    const updatePost = useRef();
    const commentinput = useRef();
    const replyinput = useRef();

    const makePost = () => { setshow(true) }

    useEffect(() => { getPosts() }, []);
    useEffect(() => { editPost() }, [updatePostData]);
    useEffect(() => { postComment() }, [comment]);
    useEffect(() => { postReply() }, [commentReply]);
    useEffect(() => { postEditedComment() }, [updateEditComnt])

    //Get Posts Data
    const getPosts = async () => {
        try {
            const getPostData = await axios.get('/getpost')
            setrecievedData(getPostData.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    //Set Edit Post Data
    const update = (id) => {
        setupdatePostData({
            _id: id,
            post: updatePost.current.value,
        })
    }

    //Update Edit Post Data
    const editPost = async (id) => {
        try {
            if (updatePostData._id) {
                const editData = await axios.put('/editpost', updatePostData)
                if (editData.data.error) {
                    alert(editData.data.message);
                } else {
                    getPosts()
                    setshowEditForm({ id: '' })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Delete Posts Data 
    const deletePost = async (id) => {
        const delurl = `/deletepost/${id}`
        const deleteRes = await axios.delete(delurl)
        if (deleteRes.data.error) {
            alert(deleteRes.data.message)
        } else {
            alert(deleteRes.data.message)
            getPosts()
        }
    }

    //Set Comment on Post
    const Comment = (id) => {
        setcomment({ _id: id, Comments: commentinput.current.value })
        setpostCom(true)
    }

    //Post Comment on Post
    const postComment = async (id) => {
        try {
            if (postCom) {
                const res = await axios.post('/post/comments', comment)
                if (res.data.error) {
                    alert(res.data.message)
                    setpostCom(false)
                } else {
                    getPosts()
                    setpostCom(false)
                    setcomment({})
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    //Delete Comment
    const deleteComment = async (mainId, comntId, index) => {
        const commentId = {
            "commentId": comntId,
            "mainId": mainId,
            "index": index
        }
        const deleteRes = await axios.delete('/deleteComment', { data: { ids: commentId } })
        if (deleteRes.data.error) {
            alert(deleteRes.data.message)
        } else {
            alert(deleteRes.data.message)
            getPosts()
        }
    }

    //Set Edit Comment
    const editComment = (mainId) => {
        if (editComntState) {
            const { id, index } = defEditComnt
            setupdateEditComnt({
                mainId: mainId,
                comntId: id,
                index: index,
                comment: commentinput.current.value
            })
        }
    }

    //Post Edited Comment
    const postEditedComment = async () => {
        try {
            if (editComntState) {
                const res = await axios.post('/post/editcomment', updateEditComnt)
                if (res.data.error) {
                    alert(res.data.message)
                } else {
                    seteditComntState(false)
                    setdefEditComnt({})
                    getPosts();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Set Reply on Comment
    const replyComment = (mainId, Id) => {
        setcommentReply({ mainId, Id, reply: replyinput.current.value });
        setreplyCom(true);
    }

    //Post Reply on Comment
    const postReply = async () => {
        try {
            if (replyCom) {
                const res = await axios.post('/post/replyComment', commentReply)
                if (res.data.error) {
                    alert(res.data.message)
                    setreplyCom(false)
                } else {
                    getPosts();
                    setreplyCom(false);
                    setcommentReply({});
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container mt-4">
            <button onClick={() => { makePost() }} className="mb-5 custom-btn btn-5 ">Create Your Post</button>
            {recievedData.length > 0 && recievedData.map((ele, inx) => {
                return (
                    <div key={inx} className="d-flex justify-center-end">
                        <Card style={{ width: "60vw", margin:'auto' }} className="mb-4 postCard ">

                            <Card.Body >
                                {(showEditForm.id !== ele._id) ? <h4>'{ele.post}'</h4> :
                                    <Form.Group className=" " controlId="exampleForm.ControlTextarea1" >
                                        <Form.Control as="textarea" rows={3} ref={updatePost} placeholder="Write Your Post..." defaultValue={ele.post} />
                                        <div className="mt-2 d-flex justify-center-start">
                                            <RiSendPlaneFill className="postIcons" onClick={() => { update(ele._id) }} />
                                            <GrClose className="postIcons" onClick={() => { setshowEditForm({ id: "" }) }} />
                                        </div>
                                        
                                    </Form.Group>}
                            </Card.Body>

                            <Card.Footer className="d-flex justify-content-between cardFooter" >
                            
                                <FaCommentAlt className="postIcons comntIcon" onClick={() => {
                                    setshowcommentbox(ele._id)
                                    seteditComntState(false)
                                }} />

                                <div>
                                    <FaEdit className="postIcons editIcon" onClick={() => { setshowEditForm({ id: ele._id }) }} />
                                    <FaTrash className="postIcons trashIcon" onClick={() => { deletePost(ele._id) }} />
                                </div>

                            </Card.Footer>

                            {(showcommentbox === ele._id) &&
                                <Card.Body>
                                    <div className="d-flex justify-content-evenly my-2 ">
                                        <Form.Control type="text" className='commentinput' placeholder="Comment on post" defaultValue={editComntState ? defEditComnt.comment : ""} ref={commentinput}  />
                                        <RiSendPlaneFill className="postIcons" onClick={() => { !editComntState ? Comment(ele._id) : editComment(ele._id) }} />
                                        <GrClose className="postIcons" onClick={() => {
                                            setshowcommentbox({ _id: '' })
                                            setreply()
                                            seteditComntState(false)
                                        }} />
                                    </div>

                                    <>
                                        {ele.comments.length > 0 && ele.comments.map((com, inx) => {
                                            return (
                                                <div key={inx}>
                                                    <div >
                                                        <div className="mx-5 d-flex justify-content-between ">
                                                           <p className="commentfont"> {com.comment}</p>
                                                            <div className="d-flex justify-content-between my-1">
                                                                <BsFillReplyFill className="postIcons replyIcon" onClick={() => { setreply(com._id) }} />
                                                                <MdEdit className="postIcons editIcon" onClick={() => {
                                                                    setdefEditComnt({
                                                                        "id": com._id,
                                                                        "comment": com.comment,
                                                                        "index": inx
                                                                    })
                                                                    seteditComntState(true)
                                                                }} />
                                                                <TiDelete className="postIcons deletecommentIcon" onClick={() => deleteComment(ele._id, com._id, inx)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <>
                                                        {(reply === com._id) && <>
                                                            <div className=" mx-5 d-flex justify-content-evenly">
                                                                <Form.Control type="text" placeholder="reply on Comment" ref={replyinput} className="commentinput" />
                                                                <RiSendPlaneFill className="postIcons" onClick={() => { replyComment(ele._id, com._id) }} />

                                                                <GrClose className="postIcons" onClick={() => { setreply() }} />
                                                            </div>
                                                            <>
                                                                {com.replies.length > 0 && com.replies.map((val) => {
                                                                    return (
                                                                        <div key={val._id} className="mx-5 my-1">
                                                                            <div className="mx-5 d-flex justify-content-between">
                                                                                <i>{val.reply}</i>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                                }
                                                            </>
                                                        </>
                                                        }
                                                    </>
                                                </div>
                                            )
                                        })
                                        }
                                    </>
                                </Card.Body>
                            }
                        </Card>
                    </div>
                )
            })
            }
            {show && <CreatePostModal show={show} setshow={setshow} getPosts={getPosts} />}
        </div >
    )
}

export default CreatePost
