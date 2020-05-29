import React, { Component } from 'react'
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from './AdminHead'
import Index from './AdminIndex'
import Old from '../Images/old.jpg'
import New from '../Images/new.png'
import { Layout, Menu, Icon,message ,Checkbox,Avatar,Modal,Button} from 'antd';
const CheckboxGroup = Checkbox.Group;
const { Content, Footer, Sider } = Layout;
 class AddAlumni extends Component {
  constructor(props){
    super(props)
    this.state = {

     visible:false,
     session:'',
     section:'',
     sections:[],
     program:'',
     disciplines:[],
     sessions:[],
     checkedList:[],
     istrue:false,
     norecords:false,
     Results:[],
     deleteAlumni:'',
     
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleDiciplineChange = this.handleDiciplineChange.bind(this);
  }


  

  handleSessionChange(e){
   
    this.state.session=e.target.value
  
  
console.log(this.state.session)
    fetch(`http://localhost:51691/api/Search/GetDicipline/${this.state.session}`,{
      method:"GET",
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
  }).then(response => response.json().then
  (data => {
   
    this.setState({disciplines:data})
  
  }))

  }


  handleDiciplineChange(e){
   
    this.state.discipline=e.target.value
  
  
console.log(this.state.session)
    fetch(`http://localhost:51691/api/Search/GetSection/${this.state.discipline}`,{
      method:"GET",
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
  }).then(response => response.json().then
  (data => {
   
    this.setState({sections:data})
    console.log(this.state.sessions)
  
  }))

  }


  handleOnChange(e){
   
     this.state.section=e.target.value
    
  }

  componentDidMount= () =>{
  
    
    fetch(`http://localhost:51691/api/Search/GetSession/`,{
     method:"GET",
     mode:"cors",
     headers:{
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
     }
 }).then(response => response.json().then
 (data => {
  
   this.setState({sessions:data})
 
 }))
 
   }

  
   handleDeleteAlumni = () => {

    fetch(`http://localhost:51691/api/Admin/DeleteAlumni/${this.state.deleteAlumni}`, {
      method: "Put",
      mode: "cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }) .then(res => {
        if(res.ok){
          message.success("Alumni Added");
          this.setState({
              visible:false,
          })
        }
        else
        {
         
          message.error("Record not saved");
          
        }
      })
     
    };


  handleClick= () =>{
    console.log(this.state.section)
  
    fetch(`http://localhost:51691/api/Search/SearchDeleteAlumni/${this.state.session}/${this.state.discipline}/${this.state.section}`,{
      method:"Get",
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then(response => {
      if(response.ok){
        response.json()
        .then(data => {
          console.log("jdhjshdjskhd")
          console.log(data)
          this.setState({
            Results:data,istrue:true})
        })
      }else{
        this.setState({
        norecords:true})
        message.error("No records")
      }
    })
  }

  showModal = (cnic) => {
    this.setState({
      visible: true,
    });
    this.state.deleteAlumni=cnic
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const{Results}  = this.state;
    console.log(this.state.Result)
    return (

        <Layout style={{ marginLeft: 200 }}>
    
        <Index/>
    
        <Header/>
        <Content>
        <div  style={{backgroundColor:'White',width:'580px',marginTop:'15px' ,marginLeft:'15px',float:'left',height:'700px'}}>
        <Alert color="dark" width='100'height='5px'>
       <b> RollBack Alumni</b>
      </Alert>
      
<Container>



  {
      this.state.istrue?(<div>

          {
              Results.map((obj) => {
                return (
              <>
             <Row>    
                 <Col> {obj.student_Name}<br/>
                {obj.reg_No}</Col>
                <Col><Button type='danger'onClick={()=>{this.showModal(obj.cnic)}}>Danger</Button></Col>
                  </Row>
               
              </>
            );
          })
          }
           
      </div>):(<div></div>)
  }
    

    <Modal
          title="Confirm"
          visible={this.state.visible}
          onOk={this.handleDeleteAlumni}
          onCancel={this.hideModal}
          okText="Yes"
          cancelText="No"
        >
          <p>Do you want to delete this record ...</p>
          
        </Modal>






</Container>

        </div>

        <div class='container' style={{backgroundColor:'White',width:'400px',marginTop:'15px',marginLeft:'15px',float:'left',height:'500px'}}>
        <Form>
        <Alert color="dark" width='120'height='5'>
       <b>Search Students</b>
      </Alert>
      <Label for="exampleSelect"><b>Select Session</b></Label>
        <Input type="select"  id="session" onChange={this.handleSessionChange}>
          <option>-- Select Session --</option>
         {
           this.state.sessions.map((value,key)=>{
             return (<>
              <option value={value.session}>{value.session}</option>
              
             </>)
           })
         }
          
        </Input>
         

        <Label for="exampleSelect"><b>Select Discipline</b></Label>
        <Input type="select"  id="program" onChange={this.handleDiciplineChange}>
        <option>-- Select Discipline --</option>

        {
           this.state.disciplines.map((value,key)=>{
             return (<>
              <option value={value.discipline}>{value.discipline}</option>
              
             </>)
           })
         }
        
        </Input>

        <Label for="exampleSelect"><b>Select section</b></Label>
        <Input type="select"  id="section" onChange={this.handleOnChange}>
        <option>-- Select Section --</option>
        {
           this.state.sections.map((value,key)=>{
             return (<>
              <option value={value.section}>{value.section}</option>
              
             </>)
           })
         }
        </Input><br/>
      <Button type='primary' onClick={this.handleClick}>Search</Button>
    </Form>

        </div>
</Content>
      </Layout>
    )
  }
}
export default AddAlumni