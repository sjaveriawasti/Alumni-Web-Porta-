import React , { Component}from 'react'
import pic from '../Images/logo.png'
import pic1 from '../Images/Profile.jpg'
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Layout, Menu, Icon,Avatar,Badge } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Index extends Component {


  constructor(prop){
    super(prop)
    this.state = {
      user:{},
      gotResponse : false
      
    };

    }

   

   componentDidMount= () =>{
  
   const cnic= window.localStorage.getItem("cnic");
   fetch(`http://localhost:51691/api/Students/GetAll/${cnic}`,{
    method:"GET",
    mode:"cors",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
}).then(response => response.json().then
(data => {
  
  this.setState({ user:data,gotResponse:true})

}))

         

  }
  render(){

    if(this.state.gotResponse){
      const{student}  = this.state.user;
  return (
    
      <Layout>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        
      }}
    >
      <div className="logo" style={{backgroundColor:'#8080802e',marginTop:'15px',marginLeft:'15px'}} />
      <center>
      <Avatar size={100} src={"http://localhost:51691/"+student.new_Image} />
    <br/>
    <label><Link style={{textDecoration:'none',color:'White'}} to="/profile"><b>{student.student_Name}</b></Link></label>
</center>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['SelectedKey']}>
        <Menu.Item key="1">
        <Link style={{textDecoration:'none',color:'White'}} to="/editprofile">
          <Icon type="edit" style={{color:'green'}}/>
          <span className="nav-text">Edit Profile</span>
         
          </Link>
        </Menu.Item>
        
        <Menu.Item key="2">
        <Link style={{textDecoration:'none',color:'white'}} to="/search">
          <Icon type="search"  style={{color:'red'}} />
          <span className="nav-text">Search Alumni</span></Link>
        </Menu.Item>

        <Menu.Item key="3">
        <Link style={{textDecoration:'none',color:'white'}} to="/searchJob">
          <Icon type="search"  style={{color:'red'}}/>
          <span className="nav-text">Search Jobs And Events</span></Link>
        </Menu.Item>
        <Menu.Item key="4">
        <Link style={{textDecoration:'none',color:'white'}} to="/friends">
          <Icon type="team" style={{color:'yellow'}} />
          <span className="nav-text" >Friends</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
        <Link style={{textDecoration:'none',color:'white'}} to="/groups">
          <Icon type="usergroup-add"  style={{color:'purple'}}/>
          <span className="nav-text">Groups</span>
          </Link>
        </Menu.Item>
       
        <Menu.Item key="6">
        <Link style={{textDecoration:'none',color:'white'}} to="/event">
          <Icon type="project" style={{color:'#F1AEB5'}} />
          <span className="nav-text">Events </span>
          <div style={{float:'right'}}> </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
        <Link style={{textDecoration:'none',color:'white'}} to="/jobs">
          <Icon type="apartment"  style={{color:'#AEF1EC'}} />
          <span className="nav-text">Jobs</span>
          <div style={{float:'right'}}> </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="8">
        <Link style={{textDecoration:'none',color:'white'}} to="/survey">
          <Icon type="solution" style={{color:'#C6126C  '}}/>
          <span className="nav-text">Survey </span>
          <div style={{float:'right'}}></div>
          </Link>
        </Menu.Item>
        <Menu.Item key="9">
        <Link style={{textDecoration:'none',color:'white'}} to="/surveyreport">
          <Icon type="solution"  style={{color:'#51C612 '}}/>
          <span className="nav-text">Survey Reports </span>
          <div style={{float:'right'}}></div>
          </Link>
        </Menu.Item>
              

        
      </Menu>
    </Sider>
    </Layout>
    
   
  )
    }else{
      return <></>
    }
  }
}

export default Index
/*
 <Menu.Item key="6">
        <Link style={{textDecoration:'none',color:'white'}} to="/imagegallery">
          <Icon type="appstore-o" />
          <span className="nav-text">Image Gallery </span>
          </Link>
        </Menu.Item>
*/