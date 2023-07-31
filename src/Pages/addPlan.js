import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Cookies from 'js-cookie';
import { useNavigate,useParams } from 'react-router-dom';

function AddPlan(user1){
    const navigate = useNavigate();
    const [user,setUser] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [destination, setDestination] = useState('');
    const [no_of_people,setNo_of_people] = useState('');
    const [budget,setBudget] = useState('');
    const [purpose_of_visit,setPurpose_of_visit] = useState('');
    const [no_of_days,setNo_of_days] = useState('');
    const [date_of_visit,setDate_of_visit] = useState('')
    const [id,setId] = useState('')
    const [editPlanPostdata,setEditplanpostdata] = useState([]);
    const [destionations,setDestinations] = useState([])
    const {editID} = useParams()
    const baseurl = 'http://localhost:8000';
    const production_url = 'https://hearlit-podcast-web-app-backend-djangorest.shivamkrjha.repl.co'
    useEffect(() => {
        // const {formuser} = user1
        // console.log(formuser,"here is form user and here is user",user,user1.user)
        setUser(user1.user);
        if (editID) {
          setId(editID);
          EditPlanPostData();
          console.log(title, " - ", description, " - ", " getfunction2");
        }
      }, [user,editID]);
    async function EditPlanPostData(){
        try{
        const response = await fetch(`${baseurl}/api/destinationPlan/${editID}`);
        const content = await response.json();
        setEditplanpostdata(content);
        console.log(editPlanPostdata,"the data is set")

        
        }
        catch(error){
            console.log(error);
            console.log("error happened");
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user1, "chooor sala idhar hi hn.....................")
        // setUser(user1)
        const formData = new FormData();
        formData.append('user', user);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('destination',destination);
        formData.append('budget', budget);
        formData.append('purpose_of_visit', purpose_of_visit);
        formData.append('no_of_days', no_of_days);
        formData.append('no_of_people', no_of_people);
        formData.append('date_of_visit', date_of_visit);
        console.log(formData, "This is form data json object");
        console.log(user,"user", title, description, destination, budget, purpose_of_visit, no_of_days, no_of_people, date_of_visit)
        if(editID){
            const editformData = {
                "title": title==='' ? editPlanPostdata.title : title,
                "description": description==='' ? editPlanPostdata.description : description,
                "no_of_people": no_of_people===''? editPlanPostdata.no_of_people: no_of_people,
              };
            const url = `${baseurl}/api/updatePlan/${editID}`;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(editformData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(editformData,"--------------------here is editformdata-----------------------")
            console.log(response,"Response from url");
            if(response.status === 201){
                alert('Edits saved successfully!');
                navigate('/mypodcasts');

            }else { alert('Something went wrong!'); }
            console.log(editPlanPostdata)
            console.log(editPlanPostdata," value of editPlanPostdata")
        }
        else{
            const url = `${baseurl}/api/addplan`;
            console.log(formData, "This is form data json object1");
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            if(response.status === 201){
                const token = Cookies.get('meraToken');
                console.log(token,"Hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                alert('Post created successfully!');
            }else { alert('Something went wrong!'); }
        }
      };

        

    return(<div >
        <Container>
                <div className="podcast_form my-5">
                {id===''?<h3>Create your Plan</h3>:<h3>Edit Your Plan Details</h3>}
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        name="title"
                        defaultValue={id && editPlanPostdata.title}
                        placeholder='Enter Your Title'
                        onChange={(e)=>{setTitle(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{id===''?"Description":"Current Description"}</Form.Label>
                    <Form.Control
                        as="textarea"
                        {...id===''?"required":{}}
                        defaultValue={id && editPlanPostdata.description}
                        name="description"
                        placeholder={id===''?"Add your Description":"Edit Description"}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                        type="text"
                        {...id===''?"required":{}}
                        name="destination"
                        placeholder='Add destination'
                        defaultValue={id && editPlanPostdata.destination}
                        onChange={(e)=>{setDestination(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                        type="number"
                        onkeypress="return event.charCode >= 48" 
                        min="1"
                        {...id===''?"required":{}}
                        name="budget"
                        placeholder='Add Your Budget'
                        defaultValue={id && editPlanPostdata.budget}
                        onChange={(e)=>{setBudget(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{id===''?"No of People":"Edit No of People"}</Form.Label>
                    <Form.Control
                        type="number"
                        onkeypress="return event.charCode >= 48" 
                        min="1"
                        {...id===''?"required":{}}
                        name="no_of_people"
                        placeholder='Enter No of People'
                        defaultValue={id && editPlanPostdata.no_of_people}
                        onChange={(e)=>{setNo_of_people(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{id===''?"No of Days":"Edit No of Days"}</Form.Label>
                    <Form.Control
                        type="number"
                        onkeypress="return event.charCode >= 48" 
                        min="1"
                        {...id===''?"required":{}}
                        name="no_of_days"
                        placeholder='Enter No of Days'
                        defaultValue={id && editPlanPostdata.no_of_days}
                        onChange={(e)=>{setNo_of_days(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>purpose_of_visit</Form.Label>
                    <Form.Control
                        type="text"
                        {...id===''?"required":{}}
                        name="Visit Purpose"
                        placeholder='Add Purpose'
                        defaultValue={id && editPlanPostdata.purpose_of_visit}
                        onChange={(e)=>{setPurpose_of_visit(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Visit</Form.Label>
                    <Form.Control
                        type="date"
                        {...id===''?"required":{}}
                        name="Visit Date"
                        placeholder='Add Date'
                        dateFormat="YYYY-MM-DD"
                        defaultValue={id && editPlanPostdata.date_of_visit}
                        onChange={(e)=>{setDate_of_visit(e.target.value)}}
                    >
                    </Form.Control>
                </Form.Group>
                <Button varient="primary" type="submit" className="submitButton">
                    {id===''?"Submit":"Save Edit"}
                </Button>
                </Form>
                </div>
                
            </Container>
    </div>
    )
}

export default AddPlan;