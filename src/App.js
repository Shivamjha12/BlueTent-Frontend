import logo from './logo.svg';
import loader from "./assets/loader.gif";
import './App.css';
// Importing the react and dependent libraries classes or functions
import React,{ useState,useEffect } from "react";
import { Container,Row, Col } from "react-bootstrap";
import Cookies from 'js-cookie';

// Importing Pages from Pages File Directory
import Login from './Pages/login_page';
import Signup from './Pages/signup_page';
import Home from './Pages/LandingPage';
import AddPlan from './Pages/addPlan';
import Userplans from './Pages/yourPlans'
import Planpage from './Pages/PlanPage';

// Importing Components from Components File Directory
import Header from './Components/Header';
import { useNavigate,Route, Routes,Navigate,Redirect  } from "react-router-dom";

function App() {
  const baseurl = 'http://127.0.0.1:8000';
  const [user,setUser] = useState('');
  const navigate = useNavigate();
  const [meraToken,setMeratoken] = useState('None');
  useEffect(()=>{
    (
        async () => {
            const token = Cookies.get('meraToken');
            console.log(token);
            setMeratoken(token);
            // setMeratoken(token);
            // const name = Cookies.get('name');
            // console.log(name,"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX----------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            // Cookies.remove('name');
            // const fname = Cookies.get('name');
            // console.log(name,"second","XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX----------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            const response = await fetch(`${baseurl}/api-user/user/${meraToken}`,{
            // mode:'no-cors',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            });
            const content = await response.json();
            console.log(content.detail);
            if(content.email){
              await setUser(content.email);
            }
            else{
              setUser('notUser');
            }
            console.log(user, "here we checking the data is set in user or not");
        }
    )();
},[user]);

  if(user==null){
    return <div className="loader-container">
      <img src={loader} alt="Loading" className="loader-image" />
    </div>
  }
  return (
    <>
    <Header user={user}/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element= {user==='notUser'?(<Signup/>):(<Home/>)}/>
    <Route path="/login" element={user==='notUser'?(<Login/>):(<Home/>)}/>
    <Route path="/addplan" element={user==='notUser'?(<Login/>):(<AddPlan user={user}/>)}/>
    <Route path="/editplan/:editID" element={<AddPlan user1={user} />}/> 
    <Route path="/yourPlans" element={user==='notUser'?(<Login/>):(<Userplans user={user}/>)}/>
    <Route path="/plan/:PlanID/:email" element= {<Planpage user={user} />} />
    </Routes>
    <h4>{user}</h4>
    </>
  );
}

export default App;
