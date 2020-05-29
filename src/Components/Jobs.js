import React, { Component } from 'react'
import Index from './Index'
import Header from './Head'
import groupimg from '../Images/Group.png'
import job from '../Images/job.png'
import { Layout, Menu, Tabs,Icon,Button,Input,Select,message,DatePicker} from 'antd'
import { List, Avatar, Checkbox } from 'antd';
import { FormGroup, Label,  FormText ,Row,Col} from 'reactstrap';
import { Modal,Radio } from 'antd';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const {Search}=Input
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;
const { Option } = Select;

const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;
const data = [
  
  
];
 class Jobs extends Component {

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
      Creator_Type:'Alumni',
      Privacy:'Public',
      SJE_Type:'Job',
      SJE_id:0,
      Groups:[],
    },
    
            visible: false ,
            NewJob:false,
            type:'Job',
            Jobs:[],
            CType:'Student',
            istrue:false,
            description:'',
            notifications:[],
            isTrue:false,
            user:[],
            UnpostedJobs:[],
            EditJob:false,
            UnpostResponse:false,
            
 
  };
  this.TitleOnChange=this.TitleOnChange.bind(this)
  this.VenueOnChange=this.VenueOnChange.bind(this)
  this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
  this.DescriptionOnChange=this.DescriptionOnChange.bind(this);
  this.handleEndingDateChange = this.handleEndingDateChange.bind(this);
  this.handleJobTypeChange=this.handleJobTypeChange.bind(this);
  this.handleGenderChange=this.handleGenderChange.bind(this);
  this.AgeOnChange=this.AgeOnChange.bind(this);
  this.Degree_LevelOnChange=this.Degree_LevelOnChange.bind(this);
  this.ExperienceOnChange=this.ExperienceOnChange.bind(this);
  this.IndustryOnChange=this.IndustryOnChange.bind(this);

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
      this.state.details.Shift=e
    }  
    handleGenderChange(e){
      this.state.details.JobGender=e
    }  

    handlePrivacyChange(e){
      this.state.details.Privacy = e;
      this.setState({
        Privacy:e,
        isTrue:e === 'Private' ? true:false
      })
    }

    EditJob = (title,venue,description)=> {
      this.state.details.Title=title;
      this.state.details.Venue=venue;
      this.state.details.Description=description;
      
      this.setState({
        EditJob:true,
    });
    }
    

  showModal = (d) => {
    this.setState({
      visible: true,
      description:d
    });
  };

  handleCreate = ()=> {
    this.setState({
      visible: false,
    });
  };

  handleCancel = ()=> {
  
    this.setState({
      visible: false,
      NewJob:false,
      Audience:false,
      EditJob:false
  });
};


 showNewJobModal=()=>{
   
  this.setState({
    NewJob: true,
 });

}
AudienceModal = () => {
  this.setState({
    Audience: true,
    NewJob: false,
  });

}

UnpostAudienceModal = (id) => {
  this.setState({
    Audience: true,
    NewJob: false,
  });
  this.state.details.SJE_id=id

}

closeNewJobModal=()=>{
   
  this.setState({
    NewJob: false,
 });

}

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
     
    })

    fetch(`http://localhost:51691/api/FriendAndGroup/GetGroups/${cnic}`,{
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
     this.setState({ user:data,gotResponse : true})
    })
     
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

CreateJob = () => {

  fetch(`http://localhost:51691/api/SJE/CreateEvent`, {
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
     
      this.setState({ Audience: false })
      message.success("Job posted")
    
  
    }
  })
};

  render() {
    return (
      <Layout style={{ marginLeft: 200 }}>
        <Index/>
   <Header/>
   <Content>
   <div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'30px',marginLeft:'15px',float:'left',marginBottom:'350px' }}>

<hr/>
<center>
<h3>Add Jobs </h3>

<Button type="primary" onClick={this.showNewJobModal}>New</Button>
</center>
<hr/>
<Tabs defaultActiveKey="1" >
    
    <TabPane 
    
      tab={
        <span>
           <Icon type="team" />
         Unposted Jobs        
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
                 <Button style={{float:'right'}} key="submit" type="primary"  onClick={()=>{this.UnpostAudienceModal(obj.sjE_Detail_Id)}}>
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
         Posted Jobs
        </span>
      }
      key="2"
    >


{
            this.state.Jobs.map((obj) => {
                return (
                  <>
                    <div class='container'>
  <br/>
          <Row>
                <Col xs='0'><Avatar size={30} src={job} /> </Col>
                <Col xs='8'><b>{obj.title}{" "}</b>
                {" "} posted {" "}<br/>
                      {" "} <b>on</b> {" "} {obj.posted_Date}{" "} <b>at </b>{" "}{obj.posted_Time}<br/>
                {obj.venue}<br/>
                 </Col>
              
                 </Row>
                 <Icon type='edit' style={{float:"right"}} onClick={()=>{this.EditJob(obj.title,obj.venue,obj.description)}}/>{'   '}
                      
              <br/>  
          
         
</div>
<hr/>
                  </>
                );
              })

            }


    
    </TabPane>
  </Tabs>,


  
<Modal
          title='Details'
          visible={this.state.visible}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.handleCreate}>
              Ok
            </Button>
          ]}


        >
           
       <p>{this.state.description} </p>
        </Modal>


        <Modal
          title={<b>Add Job</b>}
          visible={this.state.NewJob}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.PostLater}>
            Later
            </Button>,
            <Button key="submit" type="primary"  onClick={this.AudienceModal}>
              Add
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
        <Input  id="" placeholder="eg:26-40" onChange={this.IndustryOnChange}/><br/>
        <Label ><b>Description</b></Label>{' '}
        <TextArea id="Description" type="textarea" placeholder="Details" onChange={this.DescriptionOnChange}/><br/><br/>
     

</Modal>


<Modal
          title={<b>Edit Job</b>}
          visible={this.state.EditJob}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.closeNewJobModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.AudienceModal}>
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
        <Input  id="" placeholder="eg:26-40" onChange={this.IndustryOnChange}/><br/>
        <Label ><b>Description</b></Label>{' '}
        <TextArea id="Description" type="textarea" placeholder="Details" defaultValue={this.state.details.Venue} onChange={this.DescriptionOnChange}/><br/><br/>
     

</Modal>

        <Modal
          title={<center><b>Job Audience</b></center>}
          visible={this.state.Audience}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.CreateJob}>
              Post
            </Button>
          ]}

        >



<Label ><b>Select Audience</b></Label>
<InputGroup compact>
          <Select id='Privacy' defaultValue="Public" onChange={this.handlePrivacyChange} >
            <Option value="Public">Public</Option>
            <Option value="Private">Private</Option>
          </Select>
        </InputGroup>

<div>


{
   this.state.isTrue ? (
       <div>
       <Label ><b>Select Groups</b></Label><br/>
         
       {
            this.state.user.map((obj) => {
              return (
                <>

                     <Checkbox onChange={this.GroupsOnChange} value={obj.group_Id}><Avatar size={30} src={groupimg}/>
                      {obj.group_Name} </Checkbox>
                   
                   
                <br/>  
                </>
              );
            })

          }
                  
             
</div>
      ) : (
        
        <div></div>
      )}
</div>
       
     
    

        
       
           
       
        </Modal>




</div>

   </Content>
   </Layout>
    )
  }
}
export default Jobs
/*<Label ><b>Choose Field</b></Label>
<InputGroup compact>
  <Select id='Privacy' defaultValue="All" onChange={this.handleFieldChange} >
    <Option value="All">All</Option>

    <Option value="Private">Private</Option>
  </Select>
</InputGroup>*/