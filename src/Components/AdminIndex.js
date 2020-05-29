import React,{Component} from 'react'
import pic1 from '../Images/new.jpg'
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Layout, Menu, Icon,Avatar } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class AdminIndex extends Component {


  constructor(prop){
    super(prop)
    this.state = {
     cnic:window.localStorage.getItem("cnic")
      
    };

    }
    render(){

    
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
      <Avatar size={100} src={pic1} /><br/>
    <label><Link style={{textDecoration:'none',color:'White'}} to="/"><b>Admin</b></Link></label>
</center>


      <Menu theme="dark" mode="inline" defaultSelectedKeys={['SelectedKey']}>

      <Menu.Item key="1">
        <Link style={{textDecoration:'none',color:'White'}} to="/adminpage">
        <Icon type="home" style={{color:'green'}} />
          <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
        <Link style={{textDecoration:'none',color:'white'}} to="/addAlumni">
          <Icon type="plus" style={{color:'purple'}} />
          <span className="nav-text">Add Alumni</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
        <Link style={{textDecoration:'none',color:'white'}} to="/adminrequest">
          <Icon type="highlight" style={{color:'red'}} />
          <span className="nav-text">Requests</span>
          </Link>
        </Menu.Item>
        

        <Menu.Item key="4">
        <Link style={{textDecoration:'none',color:'White'}} to="/createEvent">
        <Icon type="project"  style={{color:'blue'}} />
          <span className="nav-text">Add Event</span>
          </Link>
        </Menu.Item>
        
        <Menu.Item key="5">
        <Link style={{textDecoration:'none',color:'white'}} to="/addjobs">
          <Icon type="plus"  style={{color:'#AEF1EC'}}/>
          <span className="nav-text">Add Jobs</span></Link>
        </Menu.Item>
        <Menu.Item key="6">
        <Link style={{textDecoration:'none',color:'white'}} to="/adminSurvey">
          <Icon type="solution" style={{color:'#C6126C'}} />
          <span className="nav-text">Survey</span>
          </Link>
        </Menu.Item>
       
       
        <Menu.Item key="7">
        <Link style={{textDecoration:'none',color:'white'}} to={`adminsurveyreport`}>
          <Icon type="solution" style={{color:'#51C612'}}/>
          <span className="nav-text">Survey Reports </span>
          <div style={{float:'right'}}></div>
          </Link>
        </Menu.Item>
        <Menu.Item key="8">
        <Link style={{textDecoration:'none',color:'white'}} to="/admin">
          <Icon type="logout" />
          <span className="nav-text">Logout</span>
          </Link>
        </Menu.Item>
        
        
      </Menu>
    </Sider>
    </Layout>
    
  )
    }
}
export default AdminIndex