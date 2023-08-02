import React,{useState,useEffect} from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useLocation,Link, useNavigate, useParams } from "react-router-dom";
import Actions from '../Components/actions';
// import { useLocation } from 'react-router-dom';
function Planpage({user}){
    const production_url = 'https://hearlit-podcast-web-app-backend-djangorest.shivamkrjha.repl.co';
    const { planID } = useParams();
    const [podcastdata,setPodcastdata] = useState([]);
    const actionData = {
        "username":user,
        "postid": planID
    }
    console.log(actionData,"actiondata <------------------------------------------------------------->");
    async function popularPodcast(){
        try{
        const response = await fetch(`${baseurl}/api/destinationPlan/${planID}`);
        const content = await response.json();
        console.log(content,"hereeeeeeeeeeeeeeeeeeeeeeeeee is data");
        setPodcastdata(content);
        console.log(podcastdata,"This is data variable");
        }
        catch(error){
            console.log(error);
            console.log("error happened");
        }
        console.log(actionData,"Here is action data variable========------========-------=")
    }
    const { title, destination, description, budget, no_of_people, no_of_days, purpose_of_visit,date_of_visit,likes} = podcastdata;
    const baseurl = 'http://localhost:8000';
    
    useEffect(
        ()=>{
            console.log(planID," here is useEffect() function ------------------------------------xxxxxxxxxxxxxxxxxxxxx");
            popularPodcast();
        }
    );
    return(
    <div>
        <div className="podcastpagemain1">

        <Container className="podcastpagemain">
            <Row className="podcastpagerow1">
                <Col md="auto">
                <img className="podcastpageimg" style={{"height":"175px","height":"175px"}}src={"https://www.ibef.org/assets/images/states/delhi-2.jpg"} />
                </Col>
                <Col className="podcastpagecol1" md={8}>
                <p className="podcastpagetype">{destination}</p>
                    <Col  className="Favorite-box">
                        <div className="fav-div-right">
                        <h2 className="podcastpagetitle">{title}</h2>
                        </div>
                        <div className="fav-div-left">
                        <Actions actionData={actionData} />
                        </div>
                    </Col>
                
                <p style={{"margin":"0.5rem 0rem 0rem 0rem"}} className="podcastpagelikes">Liked by {likes}</p>
                </Col>
            </Row>
            <Row>
                <div style={{"margin":"2.5rem 0rem 0rem 0rem"}}>
                    <h3>The Buget is {budget}</h3>
                    <h6>Number of people visiting is {no_of_people} for {no_of_days} days on {date_of_visit}. </h6>
                    <h6>Purpose: {purpose_of_visit}</h6>
                </div>
            </Row>
            <Row className="podcastpagerow3">
                <p style={{"margin":"1.5rem 0rem 0rem 0rem"}} className="podcastpagespeaker">{description}</p>
            </Row>
            <Row>
                
            </Row>
        </Container>
        </div>
    </div>
    
    );
}
export default Planpage;