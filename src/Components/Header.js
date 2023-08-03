import React,{ useEffect } from "react";
import { Navbar,Nav, Container,Row, Col } from "react-bootstrap";
import Logo from "../assets/logo.png";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
function Header({user}) {
    const navigate = useNavigate();
    // const production_url = 'https://bluetent-backend.shivamkrjha.repl.co';
    const baseurl = 'https://bluetent-backend.shivamkrjha.repl.co';
    async function handleLogout(e){
      e.preventDefault();
      const response = await fetch(`${baseurl}/api-user/logout`,{
        method: "POST",
        headers: {
             "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify("")
        });
        Cookies.remove('meraToken');
        navigate('login/');
        console.log(response);
        navigate(0);

    }

    useEffect(() => {
      console.log("re render the navigation");
      console.log("Reeeee",user);
    },[handleLogout])
  return (
    <Container>
      <Navbar style={{ background: "white" }}>
        <Container>
          <Navbar.Brand onClick={(e)=>{navigate('/')}}>
            <img alt="" style={{ height: "48px", width:"48px"}} src={Logo} className="d-inline-block align-top" /> <p className="d-inline-block my-2 mx-2">BlueTent</p>
          </Navbar.Brand>
          <Row>
          <Col md={12}>
            <Nav className="me-auto">
              {user!=="notUser"?(
              <>
              <Nav.Link onClick={(e)=>{navigate('/explore')}}>
                Explore 
                </Nav.Link>
              <Nav.Link onClick={(e)=>{navigate('/yourPlans')}}>
                Your Plans
                </Nav.Link>
              <Nav.Link onClick={(e)=>{navigate('/addplan')}}>
                Add Plans
                </Nav.Link>
              <Nav.Link onClick={(e) =>{
                handleLogout(e);
                }}>Log out</Nav.Link>
              </>
              )
              :(
                <>
                <Nav.Link onClick={(e) =>{navigate('/register')}}>Signup</Nav.Link>
                <Nav.Link onClick={(e) =>{navigate('/login')}}>Login</Nav.Link>
                </>
                )
              }
              
            </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </Container>
    
  );
}

export default Header;