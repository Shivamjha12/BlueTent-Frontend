import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Planscard from '../Components/planCards';
// import favplan from './favplan';
// import './app.css';
import Cookies from 'js-cookie';

function Explore() {
  const [populardata, setPopulardata] = useState([]);
  // const [favdata, setfavdata] = useState([]);
  const [plans, setplans] = useState([]);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [user, setUser] = useState('');
  const [meraToken,setMeraToken] = useState('None')
  const production_url = 'https://bluetent-backend.shivamkrjha.repl.co'
  async function popularplans() {
    const response = await fetch(`${production_url}/api-plan/planFav/${user}/`);
    const content = await response.json();
    console.log(content);
    // setfavdata(content);
    // console.log(setfavdata, "This is setfavdata variable");
  }
  async function favplans() {
    const response = await fetch(`${production_url}/api/plans`);
    const content = await response.json();
    console.log(content);
    setPopulardata(content);
    console.log(populardata, "This is data variable");
  }

  async function handleSearch(e) {
    // e.preventDefault();
    setIsSearch(true);
    const response = await fetch(`${production_url}/api/plans/explore/?search=${search}`);
    const content = await response.json();
    setplans(content);
    console.log(plans, "This is Searched plans");
  }

  useEffect(() => {
    if (search === '') {
      setIsSearch(false);
    }
  }, [search]);

  useEffect(() => {
    (
      async () => {
        const token = Cookies.get('meraToken');
        setMeraToken(token)
        const response = await fetch(`${production_url}/api-user/user/${meraToken}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        console.log(content.detail);
        setName(content.name);
        setUser(content.email);
        console.log(content.email);
        // popularplans();
        favplans();

      }
    )();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleScroll = (scrollOffset) => {
    const element = document.querySelector(".horizontal-view");
    if (element) {
      element.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="searchCol mt-2 ml-5" md={8} >
            <Form onSubmit={(e) => { onSubmit(e) }} className="d-flex">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => { setSearch(e.target.value) }}
              />
              <Button onClick={(e) => {
                handleSearch(e);
              }}
                variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <h1 className="text-center my-3">Recent Plans Posted by people</h1>
      <Container>
      <div>
        <div className="horizontal-view">
          <div className="scroll-row">
            {isSearch
              ? (plans.map((plans) => {
                return (
                  <div
                    md={3}
                    key={plans.user}
                    style={{ cursor: "pointer", width: '20rem' }} >
                    <Planscard post={plans} email={user.email} key={plans.postid} />
                  </div>
                )
              }))
              : (
                
                populardata.map((populardata) => {
                return (
                  <div
                    // md={3} 
                    key={populardata.user}
                    style={{ cursor: "pointer", width: '20rem' }}
                  >
                    <Planscard post={populardata} email={user} />
                    
                  </div>)
                }))
            }
          </div>
          
        </div>

          {/* {favdata.length > 0 && (
          
          <div className="horizontal-view">
          <h3>Your Favorite</h3>
          <div className="scroll-row">
            {favdata.map((favData) => (
              <div
                key={favData.user}
                style={{ cursor: "pointer", width: '20rem' }}
              >
                <Planscard post={favData} email={user} />
              </div>
            ))}
          </div>
          </div>)} */}
          


      </div>
      
      </Container>
    </>
  );
}

export default Explore;