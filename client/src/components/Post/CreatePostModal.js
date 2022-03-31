import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'






function CreatePostModal({ show, setshow, getPosts }) {
    const textData = useRef()

    const [postData, setpostData] = useState({
        post: "",
        comments: []
    })

    useEffect(() => {
        if(postData.post !== "") 
        savePost()
    }, [postData])

    const handleClose = () => {
        setpostData({
            post: textData.current.value,
            comments: []
        })
    }

    const savePost = async () => {
        const saveData = await axios.post('/savepost', postData)
        console.log(saveData);
        setshow(false)
        getPosts()
    }
    
    return (
        <div>
            <Modal show={show} centered>
                <Modal.Header >
                    <Modal.Title>Make Your Post Here</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                        <Form.Control as="textarea" rows={3} ref={textData} placeholder="Write Your Post..." />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { setshow(false) }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose() }}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreatePostModal