import React, { Component } from 'react'
import pic from '../Images/BIIT.jpg'
import register from '../Images/register.jpg'
import {Link} from 'react-router-dom';
import { Form, FormGroup, Input,Label, FormText, Row,Col } from 'reactstrap';
import { Modal, Button,message ,Avatar} from 'antd';
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
 


 class Register extends Component {
  


  constructor(prop){
    super(prop)
    this.state = {
      loading: false,
      visible: false,
      Verification_Code:0,
        Email:'',
        Password:'',
        CNIC:'',
        confirmPassword:'',
        Type:'Alumni'
      
      
    };
    this.handelChange = this.handelChange.bind(this);
  }

  handelChange(e){
    console.log(e.target.id,e.target.value)
   
    this.setState({[e.target.id]:e.target.id == "Verification_Code" ? parseInt(e.target.value):e.target.value});
}



 


  onClick=()=>{

    console.log(this.state.Verification_Code)
    fetch(`http://localhost:51691/api/login/verify/${this.state.Verification_Code}`,{
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

        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
        // window.localStorage.getItem('cnic')
        window.location.replace('/login')
       
        
      }
 
  })
  }

  handleOk = () => {
    
    console.log(this.state)
    fetch('http://localhost:51691/api/login/register',{
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
          visible: true,
        });
      }
      else
      {
        message.error("Student not exist");
      }
    })
   
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
  
    return (
      <div>

<Navbar color="light" light expand="md">
    <NavbarBrand   href="/"><h1 style={{    color: 'Green'}}><Avatar  size={70} src={pic} />{' '}BIIT Alumni Directory</h1></NavbarBrand>
          <NavbarToggler  />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem  >
                <NavLink><Link style={{textDecoration:'none',color:'green'}} to="/login">Login</Link></NavLink>
              </NavItem>
              
              <NavItem>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>

       
      
      <div style={{marginLeft:'200px',marginRight:'200px',marginTop:'80px'}}>
    <h1><Avatar  size={70} src={register} />{' '}Register Now</h1><br/>

   
    <FormGroup>
     <Row>
       <Col xs='2'> <Label><b>CNIC</b></Label></Col>
       <Col xs='9'><Input  id="CNIC" placeholder=" Enter CNIC" onChange={this.handelChange} /></Col>
     </Row>
  
      
    </FormGroup>
    <FormGroup>
      <Row>
        <Col xs='2'> <Label><b>Passward</b></Label></Col>
        <Col xs='9'> <Input type="password" id="Password" placeholder=" Enter Password " onChange={this.handelChange} /></Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
        <Col xs='2'> <Label><b>Confirm Passward</b></Label></Col>
        <Col xs='9'> <Input type="password" id="Password" placeholder=" Enter Password " onChange={this.handelChange} /></Col>
      </Row>
    </FormGroup>
   <br/>
    <Button type='primary'   onClick={this.handleOk}>Register</Button> <br/> Already have an account?{' '}
    <Button type="link"><Link style={{textDecoration:'none',color:'green'}} to="/login">Sign in</Link></Button>
    
    <Modal
          visible={visible} 
          title={<b>Verification</b>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Resend
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.onClick}>
              Submit
            </Button>,
          ]}
        >
        
<p>A verification code has been sent to your email address: Kam***@gmail.com</p>
        <Label for="exampleEmail"><b>Enter 4-digit Code</b></Label>
        <Input type="number"  id="Verification_Code" placeholder="Enter" onChange={this.handelChange}/><br/>
        </Modal>
       
    </div>
      </div>
    )
  }
}

export default Register





   
