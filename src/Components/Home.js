import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import { Carousel } from 'antd';
import { Tabs } from 'antd';
import pic from "../Images/faculty.png";
import pic1 from "../Images/BIIT1.jpg";
import pic2 from "../Images/BIIT2.jpg";
import pic3 from "../Images/BIIT3.jpg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'
 
  
const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  
  const Home = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      //////////Navigation////////////
      <div style={{backgroundColor:'light'}}>
        <Navbar color="light" light expand="md">
          <NavbarBrand   href="/"><h1 style={{    color: 'Green'}}>BIIT Alumni Directory</h1></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem  >
                <NavLink><Link style={{textDecoration:'none',color:'green'}} to="/register">Register</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link style={{textDecoration:'none',color:'green'}} to="/login">Login</Link></NavLink>
              </NavItem>
              <NavItem>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>

      


        <Carousel autoplay>
      
    <div>
    <center> <img src={pic} width="1300px" height="500px" /></center>
    </div>
    <div>
    <center> <img src={pic1} width="1300px" height="500px" /></center>
    </div>
    <div>
    <center> <img src={pic2} width="1300px" height="500px" /></center>
    </div>
    <div>
    <center> <img src={pic3} width="1300px" height="500px" /></center>
    </div>
    
  </Carousel>
  

  </div>
/*
<div style={{width:'1300px',marginLeft:'30px'}}>
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Indroduction" key="1">
    Degree Offered and Eligibility


Bachelor of Science (Computer Science)
(old name of degree was BCS (Hons.) changed to BS (CS) according to UGC recommendation)
Duration: 4 years Degree Program (8 Semesters).
Minimum 2nd division in F.Sc. Pre-Engineering, Pre-Medical, Intermediate in General Science, Computer Science, Commerce.

Bachelor of Science (Information Technology)
(old name of degree was BIT (Hons.) changed to BS (IT) according to UGC recommendation)
Duration: 4 years Degree Program (8 Semesters).
Minimum 2nd division in F.Sc. Pre-Engineering, Pre-Medical, Intermediate in General Science, Computer Science, Commerce.

Master of Computer Science (MCS)
Duration: 2 years Degree Program (4 Semesters).
Minimum 2nd division (45% marks) in B.Sc in Math, Physics, Chemistry, Engineering, Computer Science, Stats, Economics, Commerce.


    </TabPane>
    <TabPane tab="Objectives" key="2">
    Degree Offered and Eligibility


Bachelor of Science (Computer Science)
(old name of degree was BCS (Hons.) changed to BS (CS) according to UGC recommendation)
Duration: 4 years Degree Program (8 Semesters).
Minimum 2nd division in F.Sc. Pre-Engineering, Pre-Medical, Intermediate in General Science, Computer Science, Commerce.

Bachelor of Science (Information Technology)
(old name of degree was BIT (Hons.) changed to BS (IT) according to UGC recommendation)
Duration: 4 years Degree Program (8 Semesters).
Minimum 2nd division in F.Sc. Pre-Engineering, Pre-Medical, Intermediate in General Science, Computer Science, Commerce.

Master of Computer Science (MCS)
Duration: 2 years Degree Program (4 Semesters).
Minimum 2nd division (45% marks) in B.Sc in Math, Physics, Chemistry, Engineering, Computer Science, Stats, Economics, Commerce.


    </TabPane>
    <TabPane tab="Values" key="3">
    Degree Offered and Eligibility


Bachelor of Science (Computer Science)
(old name of degree was BCS (Hons.) changed to BS (CS) according to UGC recommendation)
Duration: 4 years Degree Program (8 Semesters).
Minimum 2nd division in F.Sc. Pre-Engineering, Pre-Medical, Intermediate in General Science, Computer Science, Commerce.

Bachelor of Science (Information Technology)
(old name of degree was BIT (Hons.) changed to BS (IT) according to UGC recommendation)
Duration: 4 years Degree Program (8 Semesters).
Minimum 2nd division in F.Sc. Pre-Engineering, Pre-Medical, Intermediate in General Science, Computer Science, Commerce.

Master of Computer Science (MCS)
Duration: 2 years Degree Program (4 Semesters).
Minimum 2nd division (45% marks) in B.Sc in Math, Physics, Chemistry, Engineering, Computer Science, Stats, Economics, Commerce.


    </TabPane>
    <TabPane tab="Team" key="4">
    DreamTeam is a Software Development and Designing Team established inside Barani Institute of Information Technology<br/>
     (BIIT) and started in 2012 by Mr. Ikram Afzal the Deputy Director of BIIT. This team provides <br/>
    privilege to current and graduated students of BIIT to join it as Internee or Full Time Developer.
    </TabPane>
    <TabPane tab="Functions" key="5">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
  </div>

*/
      
    );
  }
  
  
  export default Home;