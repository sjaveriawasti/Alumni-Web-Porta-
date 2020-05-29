import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import pic1 from '../Images/logo.png';
import {Link} from 'react-router-dom';
import pic from '../Images/BIIT.jpg'
import { Container ,Label} from 'reactstrap';
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
  DropdownItem } from 'reactstrap';
  import { Layout,Badge, Icon ,Row,Col} from 'antd';
  import { Menu, Dropdown, Button,Avatar,Modal,Input,message } from 'antd';
  import pic2 from '../Images/Profile.jpg'
import MenuItem from 'antd/lib/menu/MenuItem';
  const { Header, Content, Footer, Sider } = Layout;

 const menu = (
    <Menu>
     <Menu.Item><Link style={{textDecoration:'none',color:'Green'}} to="/"> Logout</Link></Menu.Item>
    
  </Menu>
  )  
  

  class Head extends Component {
    constructor(props){
     super(props)
     this.state = {
      user:{},
      gotResponse : false,
      Ncount:0,
      getCount:false,
      Nobage:false,
     //  NewPassward:false,
     //  newpassward:''
     };
    
     //this.handleOnChange = this.handleOnChange.bind(this);
    
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

 fetch(`http://localhost:51691/api/Notification/GetNotificationCount/${cnic}`,{
  method:"GET",
  mode:"cors",
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
}).then(res => {
  if(res.ok){
   res.json().then(data => {
     console.log("fjhgkjhgjhgjh")
     console.log(data)
    this.setState({ Ncount:data, getCount: true,})
   })
    
  }
  else{
    this.setState({ Nobage: true,})
  }

})


 
    }
    showNewPasswardModal = () => {
      this.setState({
      
        verification:false,
        NewPassward:true
      });
    };
    
    CloseNewPasswardModal = () => {
      this.setState({
        NewPassward:false
      });
    };
 Getnotification=()=>{
 console.log("kkkkkkkkkkkkkkkkkkk")
 this.setState({
   getCount:false,
   Nobage:true,
 })
 }
  
    //,height:'60px',width:'1000px',position:'fixed'
    render() {
     // const{stu_Name,new_Image}  = this.state.user;
     if(this.state.gotResponse){
      const{student}  = this.state.user;
  return (
   
    <Layout >
      
    <Header  style={{ background: '#fff', padding: 0, }} >
   

    <Row>
      <Col span={8}> <Avatar  size={70} src={pic} /> </Col>
      <Col span={13}><Link style={{textDecoration:'none',color:'Green'}} to="/"><h1 style={{color:'green'}}>BIIT Alumni Directory</h1></Link></Col>
      <Col hidden={this.state.getCount == true?false:true} span={1} >
      <Link style={{textDecoration:'none',color:'grey'}} to="/notifications"> <Badge count={this.state.Ncount}> <Icon type="bell" theme="filled" onClick={this.Getnotification} /></Badge></Link> 
    </Col>
    <Col hidden={this.state.getCount == false?false:true} span={1} >
      <Link style={{textDecoration:'none',color:'grey'}} to="/notifications">  <Icon type="bell" theme="filled" onClick={this.Getnotification} /></Link> 
    </Col>
    <Col  span={1}>
      <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" >
                      <Avatar  size={25} src={"http://localhost:51691/"+student.new_Image} /> <Icon type="down" />
                      </a>
                    </Dropdown>
        
        </Col>
   
   
    </Row>

    
    
       
    
    
      </Header>
    </Layout>
      


    
   
      )
    }else{
      return <></>
    }
  }
}
export default Head
// 