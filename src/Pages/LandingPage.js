import React from 'react';
import { Form, Container, Row, Col, Button } from "react-bootstrap";

function Home(){
    return (
    <>
    <Row>
      <div className="wave">
      <div className="ag-maecenas-block">
        <div className="ag-maecenas_title">
          <div className="ag-format-container">
            Plan Explore Holidays
          </div>
        </div>
      </div>
      </div>
      </Row>
    <Row>
      <div style={{"margin":"25px 0px 0px 0px"}} className="landing-page-bottom-div ">
      <h2 className="text-center">The simplest way to Plan your Holidays</h2>
      <h2 className="text-center">Signup and Login for exploration</h2>
      </div>
    </Row>
    
    </>
    )
  
}

export default Home;