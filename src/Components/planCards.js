import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
// margin: '1.5rem 1rem 1rem 1rem' style={{ height: 'auto',width: '23rem' }}
const handleScroll = (scrollOffset) => {
  const element = document.querySelector(".horizontal-view");
  if (element) {
    element.scrollBy({ left: scrollOffset, behavior: "smooth" });
  }
};

function Planscard({post,email}){
    const navigate = useNavigate();
    const { title,postid, thumbnail, likes, file} = post;
    const baseurl = 'https://bluetent-backend.shivamkrjha.repl.co';
    const production_url = 'https://bluetent-backend.shivamkrjha.repl.co'
    console.log(email,"<------------email---------------------------->")
    return(
    <Card className="podcastCard" style={{"margin":"0rem 0.5rem 0rem 0rem"}}>
      <Card.Img className="podcastImg" variant="top" style={{"height":"15rem", "width":"15rem"}} src={"https://www.ibef.org/assets/images/states/delhi-2.jpg"} />
      <Card.Body>
        <Card.Title>{title} </Card.Title>
        <Card.Text>{likes} people like this</Card.Text>
        {/* <Card.Text>
          {description.slice(0, 100)}
        </Card.Text> */}
        
        <Button onClick={()=>{navigate(`/plan/${postid}`,{ state: { prop1: email} });}} variant="primary">Open</Button>
      </Card.Body>
    </Card>
    
    );
}

export default Planscard;