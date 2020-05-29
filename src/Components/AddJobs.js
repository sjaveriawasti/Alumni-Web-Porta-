import React, { Component } from 'react'
import { FormGroup, Label, FormText } from 'reactstrap';
import { Layout, Menu, Icon } from 'antd';
import Index from './AdminIndex'
import Head from './AdminHead'
import job from '../Images/job.png'
import { Upload, message, Button} from 'antd';
import { Card } from 'antd';
import { Modal } from 'antd';
import Joblist from './JobList'
import { Drawer, Col, Row, Select,Form ,TimePicker,DatePicker,Input,Avatar,Tabs,Checkbox} from 'antd';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea'
const { TabPane } = Tabs;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const InputGroup = Input.Group;

const { Option } = Select;

const { Content, Footer, Sider } = Layout;


 class AddJobs extends Component {
  constructor(props){
    super(props)
this.state = { 
    details: {
      Title:'',
      Ending_Date:'',
      Time:'',
      Venue:'',
      Description:'',
      Industry:'',
      Degree_Level:'',
      Experience:'',
      Age:'',
      Shift:'',
      JobGender:'',
      Creator_CNIC : localStorage.getItem("cnic"),
      Creator_Type:'Admin',
      Privacy:'Public',
      SJE_Type:'Job',
      StudentType:' ',
      Gender:' ',
      Discipline:' ',
      Session:' ',
      Jobless:null,
      SJE_id:0,
     
    },
    
            visible: false ,
            type:'Job',
            Jobs:[],
            CType:'Admin',
            EditJob:false,
            UnpostedJobs:[],
            UnpostResponse:false,
 
  };
  this.TitleOnChange=this.TitleOnChange.bind(this)
  this.VenueOnChange=this.VenueOnChange.bind(this)
  this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
  this.DescriptionOnChange=this.DescriptionOnChange.bind(this);
  this.handleEndingDateChange = this.handleEndingDateChange.bind(this);
  this.handleJobTypeChange=this.handleJobTypeChange.bind(this);
  this.handleJobGenderChange=this.handleJobGenderChange.bind(this);
  this.AgeOnChange=this.AgeOnChange.bind(this);
  this.Degree_LevelOnChange=this.Degree_LevelOnChange.bind(this);
  this.ExperienceOnChange=this.ExperienceOnChange.bind(this);
  this.IndustryOnChange=this.IndustryOnChange.bind(this);
  this.handleStudentTypeChange=this.handleStudentTypeChange.bind(this)
  this.handleGenderChange=this.handleGenderChange.bind(this)
  this.handleSessionChange=this.handleSessionChange.bind(this)
  this.handleDisciplineChange=this.handleDisciplineChange.bind(this)
  this.onChange=this.onChange.bind(this)
}

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    handleAudience = ()=> {
      console.log("shdkjshdkj");
    this.setState({
    visible:false,
    EditJob:false,
      audience:true
  });
  };
  handleUnpostAudience = (id)=> {
    console.log("shdkjshdkj");
  this.setState({
  visible:false,
  EditJob:false,
    audience:true
});
this.state.details.SJE_id=id;
};
  
    componentDidMount=()=>{

      const cnic = window.localStorage.getItem("cnic");
        fetch(`http://localhost:51691/api/SJE/GetMyPosts/${cnic}/${this.state.type}/${this.state.CType}`, {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }).then(res => {
          if (res.ok) {
            res.json().then(data => {
              console.log(data)
              this.setState({ Jobs: data, gotFriendsResponse: true })
            })
    
          }
          else {
          
          }
        })
        fetch(`http://localhost:51691/api/SJE/GetUnpostedPosts/${cnic}/${this.state.type}/${this.state.CType}`,{
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
    console.log(data)
   this.setState({ UnpostedJobs:data,UnpostResponse : true})
  })
   
 }
})
    }


    CreateJob = () => {

      fetch(`http://localhost:51691/api/Admin/SJEDetails`, {
        method: "POST",
        body:JSON.stringify(this.state.details),
        mode: "cors",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => {
        this.setState({
          visible: false,
          audience:false,
      });
      })
    };

    PostLater=()=>{
      fetch(`http://localhost:51691/api/SJE/PostLater`, {
        method: "POST",
        body:JSON.stringify(this.state.details),
        mode: "cors",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => {
        if (res.ok) {
         this.setState({
           NewJob:false
         })
         
        message.success("Added in Unposted Jobs")
      
        }
      })
    };
    DeleteJob=(id)=>{
  
      fetch(`http://localhost:51691/api/SJE/DeleteEvent/${id}`, {
        method: "Put",
        mode: "cors",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(res => {
        if (res.ok) {
         
           message.success("post Deleted")
          
    
        }
      })
    };
    onChange(e) {
      if(e.target.checked){
        this.state.details.Jobless=(e.target.value)
      }else{
    this.state.details.Jobless=null;
      }
      //console.log(`${e.target.value}`,e.target.checked);
    }
  
    handleCancel = ()=> {
    
      this.setState({
        visible: false,
        EditJob:false,
        audience:false
    });
  };
  EditJob = (title,venue,description)=> {
    this.state.details.Title=title;
    this.state.details.Venue=venue;
    this.state.details.Description=description;
    
    this.setState({
      EditJob:true,
  });
  }
  AgeOnChange(e){
    this.state.details.Age=e.target.value
   }
   Degree_LevelOnChange(e){
    this.state.details.Degree_Level=e
   }
   ExperienceOnChange(e){
    this.state.details.Experience=e
   }
   TitleOnChange(e){
    this.state.details.Title=e.target.value
   }
   VenueOnChange(e){
    this.state.details.Venue=e.target.value
   }
   DescriptionOnChange(e){
    this.state.details.Description=e.target.value
   }
   IndustryOnChange(e){
     this.state.details.Industry=e.target.value
   }
   handleEndingDateChange(m){
     this.state.details.Ending_Date = moment(m._d).format("DD/MM/YYYY");
   //console.log(moment)
   }
   handleJobTypeChange(e){
     console.log(e)
     this.state.details.Shift=e
   }  
   handleJobGenderChange(e){
     this.state.details.JobGender=e
   }  
   handleStudentTypeChange(e){
    this.state.details.StudentType = e;
   
 }
 handleGenderChange(e){
  this.state.details.Gender = e;
 
}
handleDisciplineChange(e){
  this.state.details.Discipline = e;
 
}
handleSessionChange(e){
  this.state.details.Session = e;
 
}

   handlePrivacyChange(e){
    this.state.details.Privacy = e;
      this.setState({
        Privacy:e,
        istrue:e === 'Private' ? true:false
      })
   }
  render() {
    return (
        <Layout style={{ marginLeft: 200 }}>
<Index/>
<Head/>

<div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'30px',marginLeft:'15px',float:'left',marginBottom:'350px' }}>
<hr/>
<center>
<h3>Add Jobs </h3>

<Button type="primary" onClick={this.showModal}>New</Button>
</center>
<hr/>


  
<Tabs defaultActiveKey="1" >
    
    <TabPane 
    
      tab={
        <span>
           <Icon type="team" />
         Unposted Job        
        </span>
      }
      key="1"
    >
       
       {
         this.state.UnpostResponse?(<div>
           {
            this.state.UnpostedJobs.map((obj) => {
                return (
                  <>
                    <div class='container'>
  <br/>
          <Row>
                <Col xs='0'><Avatar size={30} src={job} /> </Col>
                <Col xs='8'><b>{obj.title}</b><br/>
                {obj.venue}<br/>
                 </Col>
              
                 </Row>
                 <Button style={{float:'right'}} key="submit" type="primary"  onClick={()=>{this.handleUnpostAudience(obj.sjE_Detail_Id)}}>
              Post
            </Button>   
            <Button style={{float:'right'}} key="submit" type="danger" onClick={()=>{this.DeleteJob(obj.sjE_Detail_Id)}}>Delete</Button>
              
              <br/>  
          
         
</div>
<hr/>
                  </>
                );
              })

            }
         </div>):(<div></div>)
       }
      
      
    </TabPane>
<TabPane
      tab={
        <span>
          <Icon type="profile" />
         Posted Job
        </span>
      }
      key="2"
    >


{
            this.state.Jobs.map((obj) => {
                return (
                  <>
                    <div>
  <br/>
  <Row>
                <Col xs='3'><Avatar size={30} src={job} /> </Col>
                <Col xs='8'><b>{obj.title}{" "}</b><br/>
                 <label style={{color:'black'}}>{obj.venue}</label><br/>
                 </Col>
              
                 </Row>
                 <Icon type='edit' style={{float:"right"}} onClick={()=>{this.EditJob(obj.title,obj.venue,obj.description)}}/>{'   '}
                   
              
</div>
<hr/>
                  </>
                );
              })

            }


    
    </TabPane>
  </Tabs>,



<Modal
          title={<b>New Job</b>}
          visible={this.state.visible}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary"  onClick={this.PostLater}>
              Later
            </Button>,
            
            <Button key="submit" type="primary"  onClick={this.handleAudience}>
              Create
            </Button>
          ]}

        >
        <Label ><b>Job Title</b></Label>
        <Input id="Title" placeholder="Title " onChange={this.TitleOnChange}/>{" "}
        <Label ><b>Location</b></Label>{' '}
        <Input  id="Venue" placeholder="Job Address or City" onChange={this.VenueOnChange}/><br/><br/>
       
         <Row>
          <Col span={5}> <Label ><b>Degree Level</b></Label>{' '}</Col>
          <Col span={7}><InputGroup compact>
          <Select id='Degree_Level' defaultValue="1" onChange={this.Degree_LevelOnChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Matric">Matric</Option>
            <Option value="A-Level">A-Level</Option>
            <Option  value="O-Level">O-Level</Option>
            <Option  value="Bachelors">Bachelors</Option>
            <Option  value="Master">Masters</Option>
            <Option value="MPhil">MPhil</Option>
            <Option value="MS">MS</Option>
          </Select>
         </InputGroup><br/><br/>
          </Col>
          <Col span={4}> <Label ><b>Experience</b></Label>{' '}</Col>
          <Col span={2}><InputGroup compact>
          <Select id='Experience' defaultValue="1" onChange={this.ExperienceOnChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Not Required"> Not Required</Option>
            <Option value="Fresh"> Fresh</Option>
            <Option  value="Less than 1 year"> Less then 1 year</Option>
            <Option value="1 year">1 Year</Option>
            <Option value="2 year">2 Year</Option>
            <Option value="3 year">3 Year</Option>
            <Option value="4 year">4 Year</Option>
            <Option value="5 year">5 Year</Option>
            <Option value="6 year">6 Year</Option>
            <Option value="7 year">7 Year</Option>
            <Option value="8 year">8 Year</Option>
            <Option value="9 year">9 Year</Option>
          </Select>
        </InputGroup></Col>
       </Row>
        
       <Row>
          <Col span={5}>  <Label for="exampleSelect"><b>Job Shift</b></Label>{' '}</Col>
          <Col span={7}>  <InputGroup compact>
          <Select id='Shift' defaultValue="1" onChange={this.handleJobTypeChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Morning"> Morning</Option>
            <Option value="Night"> Night</Option>
            <Option  value="Afternoon"> Afternoon</Option>
          </Select>
        </InputGroup>
          </Col>
          <Col span={4}><Label for="exampleSelect"><b>Gender</b></Label></Col>
          <Col span={2}> <InputGroup compact>
          <Select id='Gender' defaultValue="1" onChange={this.handleJobGenderChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Male"> Male</Option>
            <Option value="Female"> Female</Option>
            <Option  value="Male/Female"> Male/Female</Option>
          </Select>
        </InputGroup></Col>
       </Row>
        <br/>
       <Row>
          <Col span={5}><Label ><b>Ending Date</b></Label>{' '}</Col>
          <Col span={12}> <DatePicker id='Date' defaultValue={moment('01/01/2015', dateFormatList[0])} onChange={this.handleEndingDateChange}></DatePicker><br/>
          </Col>
        </Row><br/>
        
        <Label ><b>Age</b></Label>{' '}
        <Input  id="Age" placeholder="eg:26-40" onChange={this.AgeOnChange}/><br/>
        <Label ><b>Industry</b></Label>{' '}
        <Input  id="" placeholder="eg:Education/Computer Science" onChange={this.IndustryOnChange}/><br/>
        <Label ><b>Description</b></Label>{' '}
        <TextArea id="Description" type="textarea" placeholder="Details" onChange={this.DescriptionOnChange}/><br/><br/>
     
        </Modal>

        <Modal
          title={<b>Edit Job</b>}
          visible={this.state.EditJob}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            
            <Button key="submit" type="primary"  onClick={this.handleAudience}>
              Add
            </Button>
          ]}


        >
        <Label ><b>Job Title</b></Label>
        <Input id="Title" placeholder="Title " defaultValue={this.state.details.Title} onChange={this.TitleOnChange}/>{" "}
        <Label ><b>Location</b></Label>{' '}
        <Input  id="Venue" placeholder="Job Address or City" defaultValue={this.state.details.Venue} onChange={this.VenueOnChange}/><br/><br/>
       
         <Row>
          <Col span={5}> <Label ><b>Degree Level</b></Label>{' '}</Col>
          <Col span={7}><InputGroup compact>
          <Select id='Degree_Level' defaultValue="1" onChange={this.Degree_LevelOnChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Matric">Matric</Option>
            <Option value="A-Level">A-Level</Option>
            <Option  value="O-Level">O-Level</Option>
            <Option  value="Bachelors">Bachelors</Option>
            <Option  value="Master">Masters</Option>
            <Option value="MPhil">MPhil</Option>
            <Option value="MS">MS</Option>
          </Select>
         </InputGroup><br/><br/>
          </Col>
          <Col span={4}> <Label ><b>Experience</b></Label>{' '}</Col>
          <Col span={2}><InputGroup compact>
          <Select id='Experience' defaultValue="1" onChange={this.ExperienceOnChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Not Required"> Not Required</Option>
            <Option value="Fresh"> Fresh</Option>
            <Option  value="Less than 1 year"> Less then 1 year</Option>
            <Option value="1 year">1 Year</Option>
            <Option value="2 year">2 Year</Option>
            <Option value="3 year">3 Year</Option>
            <Option value="4 year">4 Year</Option>
            <Option value="5 year">5 Year</Option>
            <Option value="6 year">6 Year</Option>
            <Option value="7 year">7 Year</Option>
            <Option value="8 year">8 Year</Option>
            <Option value="9 year">9 Year</Option>
          </Select>
        </InputGroup></Col>
       </Row>
        
       <Row>
          <Col span={5}>  <Label for="exampleSelect"><b>Job Shift</b></Label>{' '}</Col>
          <Col span={7}>  <InputGroup compact>
          <Select id='Job_Shift' defaultValue="1" onChange={this.handleJobtypeChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Morning"> Morning</Option>
            <Option value="Night"> Night</Option>
            <Option  value="Afternoon"> Afternoon</Option>
          </Select>
        </InputGroup>
          </Col>
          <Col span={4}><Label for="exampleSelect"><b>Gender</b></Label></Col>
          <Col span={2}> <InputGroup compact>
          <Select id='Gender' defaultValue="1" onChange={this.handleGenderChange} >
            <Option value="1"> Choose One</Option>
            <Option value="Male"> Male</Option>
            <Option value="Female"> Female</Option>
            <Option  value="Male/Female"> Male/Female</Option>
          </Select>
        </InputGroup></Col>
       </Row>
        <br/>
       <Row>
          <Col span={5}><Label ><b>Ending Date</b></Label>{' '}</Col>
          <Col span={12}> <DatePicker id='Date' defaultValue={moment('01/01/2015', dateFormatList[0])} onChange={this.handleEndingDateChange}></DatePicker><br/>
          </Col>
        </Row><br/>
        
        <Label ><b>Age</b></Label>{' '}
        <Input  id="Age" placeholder="eg:26-40" onChange={this.AgeOnChange}/><br/>
        <Label ><b>Industry</b></Label>{' '}
        <Input  id="" placeholder="eg: Educaion/Computer Science" onChange={this.IndustryOnChange}/><br/>
        <Label ><b>Description</b></Label>{' '}
        <TextArea id="Description" type="textarea" placeholder="Details" defaultValue={this.state.details.Venue} onChange={this.DescriptionOnChange}/><br/><br/>
     

</Modal>
<Modal
          title={<center><b>Event Audience</b></center>}
          visible={this.state.audience}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
           
            <Button key="submit" type="primary"  onClick={this.CreateJob}>
              Post
            </Button>
          ]}

        >




<InputGroup>
<Row>
  <Col span={8}><Label ><b>Select Audience</b></Label>{' '}</Col>
  <Col  span={8}>
          <Select id='Privacy' defaultValue="Public" onChange={this.handlePrivacyChange} >
            <Option value="Public">Public</Option>
            <Option value="Private">Private</Option>
          </Select></Col>
</Row>

        </InputGroup><br/>

<div>


{
   this.state.istrue ? (
       <div>
      

<InputGroup >
      <Row>
   <Col span={8}> <Label ><b>Student Type</b></Label></Col>
        <Col span={8}><Select id='type' defaultValue="Select Type" onChange={this.handleStudentTypeChange} >
            <Option value="All">All</Option>
            <Option value="Completed">Alumni</Option>
            <Option value="Incomplete">Current Students</Option>
          </Select></Col>
      </Row>
      </InputGroup><br/>
      <InputGroup >
      <Row>
   <Col span={8}> <Label ><b>For jobless</b></Label></Col>
        <Col span={8}><Checkbox onChange={this.onChange} value={"Jobless"}></Checkbox></Col>
      </Row>
      </InputGroup><br/>
       
       <InputGroup>
         <Row>
           <Col span={8}><Label ><b>Select Gender</b></Label>{' '}</Col>
           <Col span={8}> <Select id='Gender' defaultValue="Select Gender " onChange={this.handleGenderChange} >
            <Option value="All">All</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select></Col>
         </Row>
        </InputGroup><br/>
         
          <InputGroup >
          <Row>
            <Col span={8}><Label ><b>Select Discipline</b></Label>{' '}</Col>
            <Col span ={8}> <Select id='Discipline' defaultValue="Select Discipline" onChange={this.handleDisciplineChange} >
            <Option value="BSCS">BSCS</Option>
            <Option value="BSIT">BSIT</Option>
            <Option value="MCS">MCS</Option>
            <Option value="MIT">MCS</Option>
          </Select>{' '}</Col>
          </Row>
          
         
        </InputGroup><br/>
         
         
          <InputGroup >
          <Row>
            <Col span={8}><Label ><b>Select Session</b></Label>{'  '}</Col>
            <Col span ={8}><Select id='Year' defaultValue="Select Session" onChange={this.handleSessionChange} >
            <Option value="2015 SPRING">2015 SPRING</Option>
            <Option value="2015 FALL">2015 FALL</Option>
            <Option value="2016 SPRING">2016 SPRING</Option>
            <Option value="2016 FALL">2016 FALL</Option>
            <Option value="2017 SPRING">2016 SPRING</Option>
            <Option value="2017 FALL">2016 FALL</Option>
          </Select></Col>
          </Row>
          
          
        </InputGroup>
</div>
      ) : (
        
        <div></div>
      )}
</div>
       
        </Modal>

</div>


            </Layout>
    )
  }
}

export default AddJobs

