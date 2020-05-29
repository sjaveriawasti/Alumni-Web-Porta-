import React, { Component } from 'react'
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from './AdminHead'
import Index from './AdminIndex'
import Old from '../Images/old.jpg'
import New from '../Images/new.png'
import { Layout, Menu, Icon,message ,Checkbox,Avatar} from 'antd';
const CheckboxGroup = Checkbox.Group;
const { Content, Footer, Sider } = Layout;
 class AddAlumni extends Component {
  constructor(props){
    super(props)
    this.state = {

     checkAll: false,
     plainOptions:[],
     session:'',
     section:'',
     sections:[],
     program:'',
     disciplines:[],
     sessions:[],
     checkedList:[],
     istrue:false,
     norecords:false,
     indeterminate:true
     
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    //this.onChange = this.onChange.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleDiciplineChange = this.handleDiciplineChange.bind(this);
  }


  // onChange() {
  //   // if(e.target.checked){
  //   //   this.state.alumni.push(e.target.value)
  //   // }else{
  //   //   this.state.alumni = this.state.alumni.filter(m =>m !== e.target.value) 
  //   // }
  //   //console.log(`${e.target.value}`,e.target.checked);
  //   this.setState({
  //     alumni,
  //     indeterminate: !!alumni.length && alumni.length < Result.length,
  //     checkAll: alumni.length === Result.length,
  //   });
  //}
  // onChange = checkedList => {
  
  //   this.setState({
  //     checkedList,
  //     indeterminate: !!checkedList.length && checkedList.length < this.state.plainOptions.length,
  //     checkAll: checkedList.length === this.state.plainOptions.length,
  //   });
  // };

  // onCheckAllChange = e => {
  //   this.setState({
  //     checkedList: e.target.checked ? this.state.plainOptions : [],
  //     indeterminate: false,
  //     checkAll: e.target.checked,
  //   });
  // };


  onCheck = (e) => {
    const values= this.state.plainOptions.map(record => record.value)
    this.setState({
      checkAll: e.target.checked,
      checkedList: e.target.checked ? values : [],
    });
    ;
  }

  onGroupChange = (checkedList) => {
    this.setState({
      checkedList,
      checkAll: checkedList.length === this.state.plainOptions.length,
    });
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

  
   handleAddAlumni = () => {

    fetch(`http://localhost:51691/api/Admin/AddAlumni`, {
      method: "Put",
      body:JSON.stringify(this.state.checkedList),
      mode: "cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }) .then(res => {
        if(res.ok){
          message.success("Alumni Added");
        }
        else
        {
         
          message.error("Record not saved");
          
        }
      })
     
    };


  handleClick= () =>{
    console.log(this.state.section)
  
    fetch(`http://localhost:51691/api/Search/SearchAlumni/${this.state.session}/${this.state.discipline}/${this.state.section}`,{
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
            plainOptions:data,istrue:true})
        })
      }else{
        this.setState({
        norecords:true})
        message.error("No records")
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
        <Alert color="dark" width='100'height='5px'>
       <b> Add Alumni</b>
      </Alert>
      
<Container>


<div hidden={this.state.istrue?false:true} style={{ display: "inline-grid", marginRight: 10 }}>
        <div >
        <Checkbox  onChange={this.onCheck}
          checked={this.state.checkAll} >check all</Checkbox>
        <Checkbox.Group options={this.state.plainOptions} onChange={this.onGroupChange} value={this.state.checkedList} style={{ width: '100%', marginLeft: '5%', fontWeight: 'lighter',display:"inline-grid" }}>

          </Checkbox.Group>
      </div>
      </div>






<div style={{float:'right'}}>
  <Button hidden={this.state.istrue?false:true} onClick={this.handleAddAlumni}>Add Alumni</Button></div>
  
    








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
      <Button  onClick={this.handleClick}>Search</Button>
    </Form>

        </div>
</Content>
      </Layout>
    )
  }
}
export default AddAlumni