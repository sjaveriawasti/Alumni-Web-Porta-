import React, { Component } from 'react'
import pic from '../Images/BIIT.jpg'
import {Link} from 'react-router-dom';
import pic1 from '../Images/Profile.jpg'
import login from '../Images/loginlogo.jpg'
import 'bootstrap/dist/css/bootstrap.css';
import { Layout,Badge } from 'antd';
import { Container, Row, Col ,Label} from 'reactstrap';
import { Form, Icon, Input, Button, Checkbox,message, Modal,Radio,Avatar,Tabs} from 'antd';
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
const { Header, Content, Footer, Sider } = Layout;

 class Login extends Component {
constructor(props){
 super(props)
 this.state = {
   Email:'',
   Password:'',
   CNIC:'',
   user:[],
   Verification_Code:0,
   ForgetPassward:false,
   confirmation:false,
   verification:false,
   NewPassward:false,
   newpassward:''
 };

 this.handleOnChange = this.handleOnChange.bind(this);
this.handleVerificationChange=this.handleVerificationChange.bind(this)
}
handleVerificationChange(e){
  this.setState({
    [e.target.id]:e.target.id == "Verification_Code" ? parseInt(e.target.value):e.target.value
  });
}

handleOnChange(e){
  this.setState({
    [e.target.id]:e.target.value

    
  })
}

showForgetPasswardModal = () => {
  this.setState({
      ForgetPassward:true
  });
};

CloseForgetPasswardModal = () => {
  this.setState({
      ForgetPassward:false
  });
};

showConfirmationdModal = () => {
  this.setState({
    confirmation:true
});
};

CloseConfirmationModal = () => {
  this.setState({
    confirmation:false
  });
};

showVerificationModal = () => {
  this.setState({
    confirmation:false,
    verification:true
  });
};

CloseVerificationModal = () => {
  this.setState({
    verification:false
  });
};

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

handleSearch= () =>{
//const cnic=this.state.CNIC
console.log(this.state.CNIC)
  fetch(`http://localhost:51691/api/Login/ForgetPassward/${this.state.CNIC}`,{
   method:"Post",
   mode:"cors",
   headers:{
     Accept: 'application/json',
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
   }
}).then(res => {
  if(res.ok){
   res.json().then(data => {
    this.setState({ user:data}) 
    this.setState({
      ForgetPassward:false,
      confirmation:true,
      
    });
   
   })
    
  }
else{
  this.setState({
    ForgetPassward:false,
    
  });
message.error("No match Found");
}
})
}

handleVerification=()=>{
  fetch('http://localhost:51691/api/login/verify',{
      method:"POST",
      body:JSON.stringify(this.state),
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){

       
        this.setState({
          verification:false,
          NewPassward:true,
          
        });
      }
      else{
        message.error("Wrong Code");
      }
  
  })
  }

  handleNewPassward=()=>{
    fetch(`http://localhost:51691/api/login/NewPassward/${this.state.CNIC}/${this.state.newpassward}`,{
        method:"Put",
        mode:"cors",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => {
        if(res.ok){
        this.setState({
         
          NewPassward:false,
        });
          message.success("Passward Changed");
          
        }
    })
    }

handleLogin= () =>{
  fetch('http://localhost:51691/api/login/loginstudent',{
    method:"POST",
    body:JSON.stringify(this.state),
    mode:"cors",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }).then(res => {
    if(res.ok){
     res.json().then(data => {
       console.log(data)
       console.log(data.stdExists.type)
      if(data.stdExists.type == "Alumni"){
        window.localStorage.setItem('cnic',data.stdExists.cnic)
        window.location.replace('/profile')
}else if(data.stdExists.type == "Admin"){
  window.localStorage.setItem('cnic',data.stdExists.cnic)
  window.location.replace('/adminpage')
}
      
     
     })
      
    }
else{
  message.error("Identity or Password is Wrong");
}
})
}
 
  render() {
    const{stu_Name,new_Image}  = this.state.user;

    return (
      
     <div>
       
        <Navbar color="light" light expand="md">
    <NavbarBrand   href="/"><h1 style={{color: 'Green'}}><Avatar  size={70} src={pic} /> {' '}BIIT Alumni Directory</h1></NavbarBrand>
          <NavbarToggler  />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem  >
                <NavLink><Link style={{textDecoration:'none',color:'green'}} to="/register">Register</Link></NavLink>
              </NavItem>
              
              <NavItem>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>

      


        
        
       
      
         <div style={{color: 'Green',marginLeft:'200px',marginRight:'200px' ,marginTop:'80px'}}>
    <h1><Avatar  size={70} src={login} />{' '}Login</h1><br/>
        <Form  className="login-form">
        <Form.Item>
          <Row>
            <Col xs='1'> <Label><b>Email</b></Label></Col>
            <Col xs='11'>  <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              id="Email"
              onChange={this.handleOnChange}
            /></Col>
          </Row>
        
           
        
        </Form.Item>
        <Form.Item>
          <Row>
            <Col xs='1'>  <Label><b>Passward</b></Label></Col>
            <Col xs='11'>  <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              id="Password"
              onChange={this.handleOnChange}
            />
        </Col>
          </Row>
       
           
        </Form.Item>
        <Form.Item> 
          <Button onClick={this.handleLogin} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button><br/>
          <a className="login-form-forgot" onClick={this.showForgetPasswardModal}>
            Forgot password
          </a><br/>
          <Link style={{textDecoration:'none',color:'White'}} to="/register"> <a href="">Register now!</a></Link>
        </Form.Item>
      </Form>

  <Modal
    title={<b>Forget Password</b>}
    visible={this.state.ForgetPassward}
    onOk={this.handleCreate}
    onCancel={this.handleCancel}
        footer={[
            <Button key="back" onClick={this.CloseForgetPasswardModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.handleSearch}>
              Search
            </Button>
          ]}

        >
        <Label ><b>Enter CNIC</b></Label>
        <Input id='CNIC' placeholder="CNIC" onChange={this.handleOnChange}/><br/> 
  </Modal>

  <Modal
    title={<b></b>}
    visible={this.state.confirmation}
    onOk={this.handleCreate}
    onCancel={this.handleCancel}
      footer={[
            <Button key="back" onClick={this.CloseConfirmationModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.showVerificationModal}>
              Next
            </Button>
          ]}

        >
  <Label ><b><Avatar size={30} src={pic1} />Syeda Javeria Wasti</b></Label>
        <hr/>
        <Radio.Group>
           <Radio value="public">Confirm via Email</Radio><hr/>
            <Radio value="private">Confirm via SMS</Radio>
        </Radio.Group><br/><hr/>

  </Modal>

  <Modal
    visible={this.state.verification}
    title={<b>Verification</b>}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    footer={[
            <Button key="back" onClick={this.handleCancel}>
              Resend
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleVerification}>
              Submit
            </Button>,
          ]}
        >
        
          <p>A verification code has been sent to your email address: jav***@gmail.com</p>
        <Label for="exampleEmail"><b>Enter 4-digit Code</b></Label>
        <Input type="number"  id="Verification_Code" placeholder="Enter" onChange={this.handleVerificationChange}/><br/>
  </Modal>

  <Modal
    visible={this.state.NewPassward}
    title={<b>NewPassward</b>}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleNewPassward}>
              Submit
            </Button>,
          ]}
        >
        
          <p>Enter Passward That Access your account</p>
        <Label for="exampleEmail"><b>Enter Passward</b></Label>
        <Input type="passward"  id="newpassward" placeholder="Enter" onChange={this.handleOnChange}/><br/>
  </Modal>
       

    </div>
     </div>
    )
  }
}

export default Login





