import React from 'react'
import { Container, Navbar } from 'react-bootstrap'






function TopNav() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Post App</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default TopNav