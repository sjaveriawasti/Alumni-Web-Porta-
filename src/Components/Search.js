import React, { Component } from 'react'
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from './Head'
import Index from './Index'
import Old from '../Images/old.jpg'
import New from '../Images/Profile.jpg'
import { Layout, Menu, Icon,message } from 'antd';

const { Content, Footer, Sider } = Layout;
 class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
     aridNo:'',
     name:null,
     Result:[],
     session:'',
     section:'',
     attribute:null,
     cnic:window.localStorage.getItem('cnic'),
     Program:'',
     sessions:[],
     type:'',
     istrue:false
     
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e){
    console.log(e.target.value)
    this.setState({
      [e.target.id]:e.target.value
    })
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
 
   RequestSend= (fcnic) =>{
    const cnic= window.localStorage.getItem("cnic");
  
    fetch(`http://localhost:51691/api/FriendAndGroup/RequestSend/${fcnic}/${cnic}`,{
      method:"Put",
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then(response => {
      if(response.ok){
        this.setState({
          istrue: true,
        });
       
      }
    })
  }


  handleClick= () =>{
  
    fetch('http://localhost:51691/api/Search/SearchStudents',{
      method:"POST",
      body:JSON.stringify(this.state),
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
          console.log("sjhgsahajhsjh")
          console.log(data)
          this.setState({Result:data})
        })
      }else{
        message.error("No Data Found.")
      }
    })
  }


  render() {
    const{Result}  = this.state;
    console.log(this.state.Result)
    return (

        <Layout style={{ marginLeft: 200 }}>
    
        <Index/>
    
        <Header/>
        <Content>
        <div  style={{backgroundColor:'White',width:'580px',marginTop:'15px' ,marginLeft:'15px',float:'left',height:'700px'}}>
        <Alert color="dark" width='100'>
       <h3> Searching Results</h3>
      </Alert>
      
<Container>


{
  Result.map((value,key)=>{
    return (
      <>
    
<Row>
        <Col xs='3'><img src={Old} width='80px' height='100px'></img></Col>
        <Col  hidden={value.new_Image!=null?false:true} xs='3'><img src={"http://localhost:51691/"+value.new_Image} width='80px' height='100px'></img></Col>
        <Col  hidden={value.new_Image!=null?true:false} xs='3'><img src={New} width='80px' height='100px'></img></Col>




        {
   this.state.istrue ? (
       
    <Col xs='6'>{value.stu_Name}<br/>{value.reg_No}<br/>
    {value.discipline}-{value.semester}{value.section}<br/><button><Link style={{textDecoration:'none',color:'green'}} to={`friendProfile/${value.cnic}`}>View Profile</Link></button>
    {' '} <button hidden={value.isFriend != 1 ? false:true}>Add Friend</button>
        </Col>
      ) : (
        <Col xs='6'>{value.stu_Name}<br/>{value.reg_No}<br/>
        {value.discipline}-{value.semester}{value.section}<br/><button><Link style={{textDecoration:'none',color:'green'}} to={`friendProfile/${value.cnic}`}>View Profile</Link></button>
    {' '} <button  onClick={()=>{this.RequestSend(value.cnic)}} hidden={value.isFriend != 1 ? false:true} >Add Friend</button>
        </Col>
       
      )}





        
      </Row><br/>
      </>
    );
  })
}

</Container>

        </div>

        <div style={{backgroundColor:'White',width:'400px',marginTop:'15px',marginLeft:'15px',float:'left',height:'700px'}}>
        <Alert color="dark" width='100'>
       <h3> Select Filter</h3>
      </Alert>
     <div  class='container'>
        <Form>
        <FormGroup>
        <Label><b>Alumni/Students</b></Label>
        <Input type="select"  id="type" onChange={this.handleOnChange}>
        <option>-- Select type --</option>
          <option value='Completed'>Alumni</option>
          <option value='Incomplete'>Students</option>
         
          </Input>
      </FormGroup>
      <FormGroup>
        <Label><b>Search By Name</b></Label>
        <Input   id="name" placeholder="name" onChange={this.handleOnChange}/>
      </FormGroup>
      <FormGroup>
        <Label><b>Search By Arid-No</b></Label>
        <Input   id="aridNo" placeholder="ARID NO" onChange={this.handleOnChange}/>
      </FormGroup>
      <FormGroup>

      <Label for="exampleSelect"><b>Select Session</b></Label>
        <Input type="select"  id="session" onChange={this.handleOnChange}>
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
        <Input type="select"  id="section" onChange={this.handleOnChange}>
        <option>-- Select Discipline --</option>
          <option>BSCS</option>
          <option>BSIT</option>
          <option>MCS</option>
          
        </Input>

       
         
        <FormGroup>
        <Label><b>Search By attribute</b></Label>
        <Input   id="attribute" placeholder="eg : jobless,C#,C++" onChange={this.handleOnChange}/>
        
      </FormGroup>
       
      
       
       
      </FormGroup>
      <Button onClick={this.handleClick}>Search</Button>
    </Form>
</div>
        </div>
</Content>
      </Layout>
    )
  }
}
export default Search