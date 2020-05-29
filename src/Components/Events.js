import React, { Component } from 'react'
import Index from './Index'
import Header from './Head'
import New from '../Images/new.png'
import img1 from '../Images/web.png'
import group from '../Images/Group.png'
import img2 from '../Images/AI camp.jpg'
import img3 from '../Images/devfest.png'
import groupimg from '../Images/Group.png'
import Eventlist from './EventList'
import { FormGroup, Label, Col,Row, FormText } from 'reactstrap';
import { Layout, Menu,Upload, Tabs,Icon,Button,Radio,TimePicker,DatePicker,Dropdown,Input,Form, Empty} from 'antd'
import { List, Avatar,Cascader,message,Select } from 'antd';
import { Modal,Checkbox } from 'antd';
import moment from 'moment';
import event from '../Images/event.png'
import FormItem from 'antd/lib/form/FormItem'
import TextArea from 'antd/lib/input/TextArea'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;
const {Search}=Input
const { Option } = Select;
const InputGroup = Input.Group;




 class Events extends Component {

  constructor(prop){
    super(prop)
  this.state = { 
    details: {
      Title:'',
      Starting_Date:'',
      Ending_Date:'',
      Time:'',
      Venue:'',
      Description:'',
      Creator_CNIC : localStorage.getItem("cnic"),
      Creator_Type:'Alumni',
      Privacy:'Public',
      SJE_Type:'Event',
      SJE_id:0,
     
      Groups:[],
    },
            visible: false ,
            NewEvent:false,
            Audience:false,
            user:[],
            gotFriendsResponse:false,
            gotResponse: false,
            getresponse:false,
            istrue:false,
            Events:[],
            type:'Event',
            CType:'Student',
            notifications:[],
            description:'',
            EditEvent:false,
            UnpostedEvents:[],
            UnpostResponse:false
           

            
           
        };
        this.handleStartingDateChange = this.handleStartingDateChange.bind(this);
        this.handleEndingDateChange = this.handleEndingDateChange.bind(this);
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
        this.GroupsOnChange=this.GroupsOnChange.bind(this)
        this.TitleOnChange=this.TitleOnChange.bind(this)
        this.TimeOnChange=this.TimeOnChange.bind(this)
        this.VenueOnChange=this.VenueOnChange.bind(this)
        this.DescriptionOnChange=this.DescriptionOnChange.bind(this)
      }

      FriendsOnChange(e) {
        if(e.target.checked){
          this.state.details.SelectedFriends.push(e.target.value)
        }else{
          this.state.details.SelectedFriends =this.state.details.SelectedFriends.filter(m =>m !== e.target.value) 
        }
        //console.log(`${e.target.value}`,e.target.checked);
      }

      GroupsOnChange(e) {
        console.log(e.target.value)
        if(e.target.checked){
          this.state.details.Groups.push(e.target.value)
        }else{
          this.state.details.Groups =this.state.details.Groups.filter(m =>m !== e.target.value) 
        }
        //console.log(`${e.target.value}`,e.target.checked);
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
      NewEvent:false,
      Audience:false
    });
  };

  handleCancel = ()=> {
  
    this.setState({
      visible: false,
      NewEvent:false,
      Audience:false,
      EditEvent:false,
  });
};

EditEvent = (title,venue,time,starting_Date,ending_Date,description)=> {
  this.state.details.Title=title;
  this.state.details.Venue=venue;
 
  this.state.details.Description=description
  this.setState({
    EditEvent:true,
});
 
  
};
NewEventModal = () => {
  this.setState({
    NewEvent: true,
  });
};

AudienceModal = () => {
  this.setState({
    Audience: true,
    NewEvent: false,
    EditEvent:false
  });

}

UnpostAudienceModal = (id) => {
  this.setState({
    Audience: true,
    NewEvent: false,
    EditEvent:false
  
  });
  this.state.details.SJE_id=id;

}

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


handleStartingDateChange(m){
  this.state.details.Starting_Date = moment(m._d).format("DD/MM/YYYY");
//console.log(moment)
}
handleEndingDateChange(m){
  this.state.details.Ending_Date = moment(m._d).format("DD/MM/YYYY");
//console.log(moment)
}


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
       NewEvent:false
     })
     
    message.success("Added in Unposted Events")
  
    }
  })
};


CreateEvent = () => {

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
     
      this.setState({ Audience: false,EditEvent:false })
    message.success("Created")
  
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
          this.setState({ Events: data, gotFriendsResponse: true })
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
   this.setState({ UnpostedEvents:data,UnpostResponse : true})
  })
   
 }
})
   
}

  render() {
    
    if (this.state.gotResponse && this.state.gotFriendsResponse) {
      //const { Events} = this.state;
      console.log(this.state.Events)
     
    
    return (
      <Layout style={{ marginLeft: 200 }}>
        <Index/>
   <Header/>
   <Content>
   <div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'30px',marginLeft:'15px',float:'left',marginBottom:'350px' }}>
<hr/>

      <center>
<h3>Create Event </h3>

<Button type="primary" onClick={this.NewEventModal}>New</Button>
</center>

<hr/>
<Tabs defaultActiveKey="1" >
    
    <TabPane 
    
      tab={
        <span>
           <Icon type="team" />
         Unposted Events        
        </span>
      }
      key="1"
    >

      {
        this.state.UnpostResponse ?(<div>
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
             
              <Button  style={{float:'right'}} key="submit" type="primary"  onClick={()=>{this.UnpostAudienceModal(obj.sjE_Detail_Id)}}>
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
        </div>):(<div>
          <center >No Posts</center>
        </div>)
      }
       


    
      
      
    </TabPane>
<TabPane
      tab={
        <span>
          <Icon type="profile" />
         Posted Events
        </span>
      }
      key="2"
    >


{
            this.state.Events.map((obj) => {
                return (
                  <>
                    <div class='container'>
  <br/>
  <Row>
                <Col xs='0'><Avatar size={30} src={event} /></Col>
                <Col xs='10'><b>{obj.title}</b> {" "} posted {" "}<br/>
                      {" "} <b>on</b> {" "} {obj.posted_Date}{" "} <b>at </b>{" "}{obj.posted_Time}
              <br/>{obj.description}</Col>
              </Row>
                      
                       <Icon  style={{float:'right'}}type='edit'onClick={()=>{this.EditEvent(obj.title,obj.venue,obj.time,obj.starting_Date,obj.ending_Date,obj.description)}} />
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
          title={<b>New Event</b>}
          visible={this.state.NewEvent}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back"  type="primary"  onClick={this.PostLater}>
             Later
            </Button>,
            <Button key="submit" type="primary"  onClick={this.AudienceModal}>
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
          visible={this.state.Audience}
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



<Label ><b>Select Audience</b></Label>
<InputGroup compact>
          <Select id='Privacy' defaultValue="Public" onChange={this.handlePrivacyChange} >
            <Option value="Public">Public</Option>
            <Option value="Private">Private</Option>
          </Select>
        </InputGroup>

<div>


{
   this.state.istrue ? (
       <div>
       <Label hidden={this.state.user != null?false:true}><b>Select Groups</b></Label><br/>
         
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

        <Modal
          title={<b>Repost Event</b>}
          visible={this.state.EditEvent}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.AudienceModal}>
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

   </Content>
   </Layout>
    )
  }else {
    return <></>
  }
}
}
export default Events

// 


/*
<List
    itemLayout="vertical"
    size="large"
    dataSource={data}
    renderItem={item => (
      <List.Item
        key={item.title}
        extra={
          <img
            width={300}
            height={150}
            alt="logo"
            src={item.src}
          />
         
         
        }
        
      >
        <List.Item.Meta
        
      title={<b><u>{item.title}</u></b>}
          
      description={<p>{item.time}<br/>{item.location}</p>}
        />
        {item.content}

        <div>
        <Button type="primary" onClick={this.showModal}>
          Details
          </Button>
        </div>
      </List.Item>
      
       )}
       />
*/