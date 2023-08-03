import React, { useState, useEffect } from 'react';
import UserplansCards from '../Components/userPlanCard';
import Header from '../Components/Header';
import { Form, Container, Row, Col, Button } from "react-bootstrap";
function Userplans({ user }) {
  const [UserPlan, setUserPlan] = useState([]);
  const baseurl = 'https://bluetent-backend.shivamkrjha.repl.co';
  const production_url = 'https://bluetent-backend.shivamkrjha.repl.co'
  async function getUserPlan() {
    const response = await fetch(`${baseurl}/api/plans/${user}`);
    const content = await response.json();
    setUserPlan(content);
    console.log(content);
  }

  useEffect(() => {
    getUserPlan();
  }, [user]);

  return (
    <>
    
    <div className="userpodcast">
    
      {UserPlan.length >= 1 ? (
        UserPlan.map((populardata) => {
          return (
            <div
              key={populardata.user}
              style={{ cursor: "pointer", width: '20rem' }}
            >
              <UserplansCards post={populardata} email={user} />
            </div>
            
          );
        })
      ) : (
        <div>
          <h2>No Podcasts</h2>
        </div>
      )}
    
    </div>

  </>
  );
}

export default Userplans;