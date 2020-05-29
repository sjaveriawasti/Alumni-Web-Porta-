import React, { Component } from 'react'
import { FormGroup, Label, FormText } from 'reactstrap';
import { Layout, Menu, Icon } from 'antd';
import Index from './AdminIndex'
import Head from './AdminHead'
import { Upload, message,Radio, Button} from 'antd';
import { Card } from 'antd';
import { Modal } from 'antd';
import Eventlist from './EventList'
import { Drawer, Col, Row,Tabs, Select,Form ,TimePicker,DatePicker,Input,Avatar} from 'antd';
import moment from 'moment';
import event from '../Images/event.png'
import TextArea from 'antd/lib/input/TextArea'
import { Cascader } from 'antd';
import { Dropdown } from 'antd';
const { TabPane } = Tabs;
const { MonthPicker, RangePicker } = DatePicker;

const { Option } = Select;
const InputGroup = Input.Group;


const { Content, Footer, Sider } = Layout;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];




function onChange(value) {
  console.log(value);
}



 class CreateEvent extends Component {

  constructor(props){
    super(props)
  this.state = { 
    details: {
      Title:'',
      Date:'',
      Time:'',
      Venue:'',
      Description:'',
      Creator_CNIC : localStorage.getItem("cnic"),
      Creator_Type:'Admin',
      Privacy:'Public',
      SJE_Type:'Event',
      StudentType:' ',
      Gender:' ',
      Discipline:' ',
      Session:' ',
      SJE_id:0,
     
    },
               visible: false,
               audience:false,
               istrue:false, 
               Events:[],
               type:'Event',
               CType:'Admin',
               EditEvent:false,
               UnpostedEvents:[],
               UnpostResponse:false
              
              };
              this.handleStartingDateChange = this.handleStartingDateChange.bind(this);
              this.handleEndingDateChange = this.handleEndingDateChange.bind(this);
              this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
              this.TitleOnChange=this.TitleOnChange.bind(this)
              this.TimeOnChange=this.TimeOnChange.bind(this)
              this.VenueOnChange=this.VenueOnChange.bind(this)
              this.DescriptionOnChange=this.DescriptionOnChange.bind(this)
              this.handleStudentTypeChange=this.handleStudentTypeChange.bind(this)
              this.handleGenderChange=this.handleGenderChange.bind(this)
              this.handleSessionChange=this.handleSessionChange.bind(this)
              this.handleDisciplineChange=this.handleDisciplineChange.bind(this)

     }

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleCancel = ()=> {
    
      this.setState({
        visible: false,
        audience:false,
        EditEvent:false
    });
  };
  handleback = ()=> {
    
    this.setState({
      
      audience:false
  });
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
       visible:false
     })
    message.success("Added in Unposted Events")
  
    }
  })
};


EditEvent = (title,venue,time,starting_Date,ending_Date,description)=> {
  this.state.details.Title=title;
  this.state.details.Venue=venue;
 
  this.state.details.Description=description
  this.setState({
    EditEvent:true,
});
}

handleAudience = ()=> {
    console.log("shdkjshdkj");
  this.setState({
  visible:false,
  EditEvent:false,
    audience:true
});
};
handleUnpostAudience = (id)=> {
  console.log("shdkjshdkj");
this.setState({
visible:false,
EditEvent:false,
  audience:true
});
this.state.details.SJE_id=id;
};

  TitleOnChange(e){
    this.state.details.Title=e.target.value
   }
   TimeOnChange(e){
    console.log(e)
    this.state.details.Time=moment(e._d).format("h:mm a")
    console.log( this.state.details.Time)
   }
    VenueOnChange(e){
     this.state.details.Venue=e.target.value
    }
    DescriptionOnChange(e){
     this.state.details.Description=e.target.value
    }
   
   handlePrivacyChange(e){
    this.state.details.Privacy = e;
      this.setState({
        Privacy:e,
        istrue:e === 'Private' ? true:false
      })
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
handleStartingDateChange(m){
  this.state.details.Starting_Date = moment(m._d).format("YYYY/MM/DD");
//console.log(moment)
}
handleEndingDateChange(m){
  this.state.details.Ending_Date = moment(m._d).format("YYYY/MM/DD");
//console.log(moment)
}

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
            this.setState({ Events: data, gotFriendsResponse: true })
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
         this.setState({ UnpostedEvents:data,UnpostResponse : true})
        })
         
       }
      })
         
      

    }  

  CreateEvent = () => {

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
        audience:false
      })
    })
  };
  DeleteEvent=(id)=>{
  
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
       
          this.setState({ gotFriendsResponse: true })
        
  message.succes("Post Deleted")
      }
    })
  };


  render() {
    return (
        <Layout style={{ marginLeft: 200 }}>
<Index/>
<Head/>

<div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'30px',marginLeft:'15px',float:'left',marginBottom:'350px' }}>
<center>
  <hr/>
<h3>Create Event </h3>

<Button type="primary" onClick={this.showModal}>New</Button>
</center>

<hr/>

<Tabs defaultActiveKey="1" >
    
    <TabPane 
    
      tab={
        <span>
           <Icon type="team" />
         Unposted Event         
        </span>
      }
      key="1"
    >
       
       {
         this.state.UnpostResponse?(<div>

{
            this.state.UnpostedEvents.map((obj) => {
                return (
                  <>
                    <div class='container'>
  <br/>
  <Row>
                <Col xs='0'><Avatar size={30} src={event} /></Col>
                <Col xs='10'><b>{obj.title}</b> 
              <br/>{obj.description}</Col>
              </Row>
             
              <Button  style={{float:'right'}} key="submit" type="primary"  onClick={()=>{this.handleUnpostAudience(obj.sjE_Detail_Id)}}>
              Post
            </Button>{" "}
            <Button style={{float:'right'}} key="submit" type="danger" onClick={()=>{this.DeleteEvent(obj.sjE_Detail_Id)}}>Delete</Button>
             
                      
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
         Posted Event
        </span>
      }
      key="2"
    >


{
            this.state.Events.map((obj) => {
                return (
                  <>
                    <div>
  <br/>
                <b><u>{obj.title}</u></b><br/>
                <p style={{color:'red'}}>{obj.time}</p><p>{obj.venue}
   
    <div style={{float:'right'}}>
                       <Icon type='edit' onClick={()=>{this.EditEvent(obj.title,obj.venue,obj.time,obj.starting_Date,obj.ending_Date,obj.description)}}/>{'   '}
                      
                       </div>
                       </p>
</div>
<hr/>
                  </>
                );
              })

            }






    
    </TabPane>
  </Tabs>,
  






<Modal
          title={<b>New Event</b>}
          visible={this.state.visible}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back"type="primary" onClick={this.PostLater}>
               Later
            </Button>,
            <Button key="submit" type="primary"   onClick={this.handleAudience}>
              Create
            </Button>
          ]}

        >
            <Label ><b>Title</b></Label>
        <Input id='Title' placeholder="Enter title" onChange={this.TitleOnChange}  />
        <br/><br/>

        <Row>
          <Col span={12}> <Label ><b>Starting Date</b></Label>{' '}</Col>
          <Col span={12}><DatePicker id='Starting_Date' defaultValue={moment('01/01/2015', dateFormatList[0])} onChange={this.handleStartingDateChange}></DatePicker><br/><br/>
       </Col>
        </Row>

        <Row>
          <Col span={12}><Label ><b>Ending Date</b></Label>{' '}
       </Col>
          <Col span={12}><DatePicker id='Ending_Date' defaultValue={moment('01/01/2015', dateFormatList[0])} onChange={this.handleEndingDateChange}></DatePicker><br/><br/>
       </Col>
        </Row>
        <Row>
          <Col span={12}> <Label ><b>Time</b></Label>{' '}
       </Col>
          <Col span={12}> <TimePicker id='Time' use12Hours format="h:mm a" onChange={this.TimeOnChange} /><br/><br/></Col>
        </Row>
       
       
       
        <Label ><b>Venue</b></Label>{' '}
        <Input id='Venue' placeholder="Address or City" onChange={this.VenueOnChange} /><br/>
        <Label ><b>Description</b></Label>{' '}
        <TextArea id='Description' type="textarea" placeholder="Details" onChange={this.DescriptionOnChange}/><br/>
        </Modal>

    

        <Modal
          title={<center><b>Event Audience</b></center>}
          visible={this.state.audience}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleback}>
              Back
            </Button>,
            <Button key="submit" type="primary"  onClick={this.CreateEvent}>
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
          </Select></Col>
          </Row>
          
          
        </InputGroup>
</div>
      ) : (
        
        <div></div>
      )}
</div>
       
        </Modal>

        <Modal
          title={<b>Repost Event</b>}
          visible={this.state.EditEvent}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.handleAudience}>
              Create
            </Button>
          ]}

        >

        <Label ><b>Title</b></Label>
        <Input id='Title' defaultValue={this.state.details.Title} onChange={this.TitleOnChange}  />
        <br/><br/>

        <Row>
          <Col span={12}> <Label ><b>Starting Date</b></Label>{' '}</Col>
          <Col span={12}><DatePicker id='Starting_Date' defaultValue={moment('01/01/2015', dateFormatList[0])}  onChange={this.handleStartingDateChange}></DatePicker><br/><br/>
       </Col>
        </Row>

        <Row>
          <Col span={12}><Label ><b>Ending Date</b></Label>{' '}
       </Col>
          <Col span={12}><DatePicker id='Ending_Date' defaultValue={moment('01/01/2015', dateFormatList[0])} onChange={this.handleEndingDateChange}></DatePicker><br/><br/>
       </Col>
        </Row>
        <Row>
          <Col span={12}> <Label ><b>Time</b></Label>{' '}
       </Col>
          <Col span={12}> <TimePicker id='Time' use12Hours format="h:mm a" onChange={this.TimeOnChange}  defaultValue={this.state.details.Time} /><br/><br/></Col>
        </Row>
       
       
       
        <Label ><b>Venue</b></Label>{' '}
        <Input id='Venue' placeholder="Address or City" onChange={this.VenueOnChange}  defaultValue={this.state.details.Venue} /><br/>
        <Label ><b>Description</b></Label>{' '}
        <TextArea id='Description' type="textarea" placeholder="Details" onChange={this.DescriptionOnChange}  defaultValue={this.state.details.Description} /><br/>
       
        </Modal>


</div>


            </Layout>
    )
  }
}

export default CreateEvent
