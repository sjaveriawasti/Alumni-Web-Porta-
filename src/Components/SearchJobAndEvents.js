import React, { Component } from 'react'
import Index from './Index'
import Header from './Head'
import { FormGroup, Label,  FormText } from 'reactstrap';
import { Layout, Menu,Upload, Tabs,Icon,Button,Radio,TimePicker,DatePicker,Dropdown ,Row,Col,Input} from 'antd'
import { List, Avatar,Cascader,message,Select } from 'antd';
import moment from 'moment';
import { Modal,Checkbox } from 'antd';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;
const {Search}=Input
const { Option } = Select;
const InputGroup = Input.Group;


 class SearchJobAndEvents extends Component {

  constructor(props){
    super(props)
  this.state = { 
    details: [],
    eventvisible: false ,
    jobvisible:false,
    search:'',   
     istrue:false  ,
     EventDescription:'' ,
     evettitle:'',
     eventvenue:'',
     eventtime:'',
     eventdate:'',
     JobDescription:'',
     jobdetail:[],
     jobtitle:'',
     joblocation:'',
     jobEndDate:'',
           
        };
        
       
      }

     
      



  showeventModal = (description,title,venue,date,time) => {
    this.setState({
        EventDescription:description,
        eventtitle:title,
        eventvenue:venue,
        eventdate:date,
        eventtime:time,
        eventvisible: true,
    });
  };

  showjobModal = (description,jobdetail,title,location,endDate) => {
    this.setState({
        JobDescription:description,
        jobdetail:jobdetail,
        jobtitle:title,
        joblocation:location,
        jobEndDate:endDate,
        jobvisible: true,
    });
  };

 
  handleCancel = ()=> {
  
    this.setState({
      eventvisible: false,
     jobvisible:false,
  });
};







handleSearchChange(e){
   this.state.search = e;
   console.log(this.state.search)
   fetch(`http://localhost:51691/api/SJE/GetDetails/${this.state.search}`, {
    method: "Get",
    mode: "cors",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }).then(res => {
    if(res.ok){
        res.json().then(data => {
          console.log("hsggggggggggg")
          console.log(data)
          console.log(data.type)
         if(this.state.search == "Job"){
            this.setState({ details:data,istrue : true})
   }else if(this.state.search == "Event"){
    this.setState({ details:data,istrue : false})
   }
         
        
        })
         
       }
  })
};
  







  render() {
   // if (this.state.gotResponse && this.state.gotFriendsResponse) {
      //const { Events} = this.state;
      console.log("gdshdgjs")
      console.log(this.state.details)

    return (
      <Layout style={{ marginLeft: 200 }}>
        <Index/>
   <Header/>
   <Content>
   <div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'30px',marginLeft:'15px',float:'left',marginBottom:'350px' }}>



<hr/>


<Search placeholder="Job/Event" onSearch={(value) => {this.handleSearchChange(value)}} enterButton />
    <br />
    


<hr/>

    {
            this.state.details.map((obj) => {
                return (
                  <>


{
   this.state.istrue ? (
       
    <div>

   <b>{obj.title}</b><br/>
   <label style={{color:'black'}}>{obj.venue}</label><br/>
   <label style={{color:'Gray'}}><Icon type="clock-circle" /> {obj.posted_Date}</label>

 <Button style={{float:"right"}} type="primary" onClick={()=>{this.showjobModal(obj.description,obj.jobDetail,obj.title,obj.venue,obj.ending_Date)}}>
          Details
          </Button><br/>
          </div>
       
        
      ) : (
        <div>
        <br/>
       
           <b><u>{obj.title}</u></b><br/>
             <p style={{color:'red'}}>{obj.starting_Date}{' '}at{' '}{obj.time}'</p><p>{obj.venue}
           </p>
           <Button style={{float:"right"}} type="primary" onClick={()=>{this.showeventModal(obj.description,obj.title,obj.venue,obj.starting_Date,obj.time)}}>
                Details
                </Button>
          <br/>
      </div>
      
       
      )}





                 
<hr/>
                  </>
                );
              })

            }





       



                  

     <Modal
          title='Event Details'
          visible={this.state.eventvisible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={[
           
            <Button key="submit" type="primary"  onClick={this.handleCancel}>
              Ok
            </Button>
          ]}


        >
          <center><h3>{this.state.eventtitle}</h3></center>
       <b>Location :</b>{this.state.eventvenue}<br/><br/>
       <Row  hidden={this.state.eventdate !=null?false:true}>
          <Col span={5}><b>Date :</b></Col>
          <Col span={5}>{this.state.eventdate}</Col>
        </Row>
        <Row  hidden={this.state.eventtime !=null?false:true}>
          <Col span={5}><b>Time :</b></Col>
          <Col span={5}>{this.state.eventtime}</Col>
        </Row>
      
       <hr/>
        <b><u>Description</u></b><br/>
       <p>{this.state.EventDescription} </p>
       <hr/>
        </Modal>
         
        <Modal
          title='Job Details'
          visible={this.state.jobvisible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={[
            
            <Button key="submit" type="primary"  onClick={this.handleCancel}>
              Ok
            </Button>
          ]}


        >
  <center><h3>{this.state.jobtitle}</h3></center>
       <b>Location :</b>{this.state.joblocation}<br/><br/>
       <Label hidden={this.state.jobEndDate !=null?false:true}> <b>End date :</b>{this.state.jobEndDate}<br/></Label>
       <hr/>
        <b><u>Description</u></b><br/>
        <Row  hidden={this.state.jobdetail.degree_Level !=null?false:true}>
          <Col span={5}><b>Degree Level :</b></Col>
          <Col span={5}>{this.state.jobdetail.degree_Level}</Col>
        </Row>
        <Row hidden={this.state.jobdetail.experience !=null?false:true}>
          <Col span={5}><b>Experience :</b></Col>
          <Col span={5}>{this.state.jobdetail.experience}</Col>
         
        </Row>
        <Row hidden={this.state.jobdetail.shift !=null?false:true}>
          <Col span={5}><b>Job Shift :</b></Col>
          <Col span={5}>{this.state.jobdetail.shift}</Col>
          
        </Row>
        <Row  hidden={this.state.jobdetail.gender !=null?false:true}>
          <Col span={5}><b>Gender :</b></Col>
          <Col span={5}>{this.state.jobdetail.gender}</Col>
          
        </Row>
        <Row hidden={this.state.jobdetail.age !=null?false:true}>
          <Col span={5}><b>Age :</b></Col>
          <Col span={5}>{this.state.jobdetail.age}</Col>
          
        </Row>
        <Row hidden={this.state.jobdetail.industry !=null?false:true}>
          <Col span={5}><b>Industry :</b></Col>
          <Col span={5}>{this.state.jobdetail.industry}</Col>
          
        </Row>
    <hr/>
         {this.state.JobDescription} 
        
        </Modal>

        
       

</div>

   </Content>
   </Layout>
    )
 // }else {
  //  return <></>
 // }
}
}
export default SearchJobAndEvents
