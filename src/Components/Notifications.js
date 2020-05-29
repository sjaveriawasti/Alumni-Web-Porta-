import React, {Component}from 'react'
import Index from './Index'
import Header from './Head'
import New from '../Images/new.png'
import Old from '../Images/old.jpg'
import {Link} from 'react-router-dom';
import survey from '../Images/survey.png'    
import event from '../Images/event.png'
import job from '../Images/job.png'
import { Container, Row, Col,Label} from 'reactstrap';
import { Layout, Menu, Tabs,Icon,message,Avatar,Card,Radio,Modal,Button} from 'antd';
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;
let Answers={
  Qno:0,
  answer:'',
} 



class Notifications extends Component {

  constructor(props){
    super(props)
    this.state = {
     
        SurveyAnswers:[],
      
      

     
    SJE_id:0,
   notifications:[],
   getnotification:false,
   eventDetail:false,
   jobDetail:false,
   surveyDetail:false,
   surveytitle:'',
   surveydetail:[],
   surveyDescription:'',
   JobDescription:'',
   jobdetail:[],
   jobtitle:'',
   joblocation:'',
   jobEndDate:'',
   EventDescription:'' ,
   evettitle:'',
   eventvenue:'',
   eventtime:'',
   eventdate:'',
   notification_id:'',
  
   
   

    };
    this.RadioOnChange=this.RadioOnChange.bind(this)
  }

  RadioOnChange(e) {
    console.log("djgsjdudwbsndgsjdh")
console.log(e)

      const ans = {...Answers};
      ans.answer=(e.target.value)
      ans.Qno=(e.target.id)
      console.log(ans)
    //  let exists = SurveyAnswers.filter(s => s.QNo === ans.Qno);
      
     // if(exists.length > 0){
       
      //  SurveyAnswers = SurveyAnswers.filter(s => s.QNo !== ans.Qno)
     // }
    this.state.SurveyAnswers.push(ans)
      
    //console.log("jjjjjjjjjjjjjjjjjjj")
    console.log(this.state.SurveyAnswers)
    //console.log(`${e.target.value}`,e.target.checked);*/
  }

  SubmitSurvey = () => {
  const  cnic=window.localStorage.getItem("cnic")
    fetch(`http://localhost:51691/api/SJE/SubmitSurvey/${cnic}/${this.state.SJE_id}/${this.state.notification_id}`, {
      method: "POST",
      body:JSON.stringify(this.state.SurveyAnswers),
      mode: "cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){
        this.setState({
          surveyDetail:false,
        })
      }
    })
  };
 
  showEventDetail=(nid,description,title,venue,date,time)=>{
    fetch(`http://localhost:51691/api/Notification/UpdateStatus/${nid}`,{
        method:"Put",
        mode:"cors",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
      this.setState({
          eventDetail:true,
          EventDescription:description,
          eventtitle:title,
          eventvenue:venue,
          eventdate:date,
          eventtime:time,
      })
  }
  showJobDetail=(nid,description,jobdetail,title,location,endDate)=>{
    fetch(`http://localhost:51691/api/Notification/UpdateStatus/${nid}`,{
        method:"Put",
        mode:"cors",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
    this.setState({
      JobDescription:description,
      jobdetail:jobdetail,
      jobtitle:title,
      joblocation:location,
      jobEndDate:endDate,
        jobDetail:true,
    })
}
showSurveyDetail=(detail,title,description,nid,SJEid)=>{

    fetch(`http://localhost:51691/api/Notification/UpdateStatus/${nid}`,{
  method:"Put",
  mode:"cors",
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
})
  
    this.setState({
        surveydetail:detail,
        surveytitle:title,
        surveyDescription:description,
        surveyDetail:true,
        SJE_id:SJEid,
        notification_id:nid,

    })
}
handleCancel=()=>{
    this.setState({
        eventDetail:false,
        jobDetail:false,
        surveyDetail:false
    })
}

  componentDidMount=()=>{
    const cnic= window.localStorage.getItem("cnic");
    fetch(`http://localhost:51691/api/Notification/GetNotifications/${cnic}`,{
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
          console.log("fjhgkjhgjhgjh")
          console.log(data)
         this.setState({ notifications:data,getnotification : true,})
        })
         
       }
     
     })
       

}



  render(){
   
    const{Friends,Requests}  = this.state;
   
    console.log(this.state.Friends)
  return (
    <Layout style={{ marginLeft: 200 }}>
        <Index/>
   <Header/>
   <Content>
   <div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'15px',marginLeft:'15px',float:'left',height:'700px'}}>
  
<br/>
  
   <div className='container' style={{backgroundColor:'#EAF2F8',width:'900px',height:'500px',overflow:'auto',marginLeft:'20px'}}>
   <hr/>
   <b> Notifications</b>
  <hr/>
{
    this.state.getnotification?(<div>
        {
             this.state.notifications.map((obj) => {
                return (
                  <>
                    {
                      obj.sjE_Type=="Event"?(
                        <div >
                              <Card  bordered={false}  style={obj.seen_Status=='Unseen'?{ width:"867px" , backgroundColor:"#AED6F1" }:{ width:"867px" , backgroundColor:"white" }}>
                              <Row>
                                <Col xs='1'><Avatar size={30} src={job} /></Col>
                                <Col> <b><u>{obj.title}</u>{" "} ({obj.sjE_Type})</b><br/>
                                   <label style={{color:'red'}}>{obj.starting_Date}.{obj.time}'</label><br/><label>{obj.venue}</label>
                                 </Col>
                              </Row>
                             
                        <Button style={{float:"right"}} type="primary" onClick={()=>{this.showeventModal(obj.description,obj.title,obj.venue,obj.starting_Date.obj.time)}}>
                        Details
                       </Button>
                              </Card>

                    
                      </div>
                      
                      ):
   (
   
    
   <div>
       {
          obj.sjE_Type=="Job"?(<div>
              <Card  bordered={false} style={obj.seen_Status=='Unseen'?{ width:"867px" , backgroundColor:"#AED6F1" }:{ width:"867px" , backgroundColor:"white" }}>
              <Row>
                <Col xs='1'><Avatar size={30} src={job} /> </Col>
                <Col xs='8'><b>{obj.title}{" "} ({obj.sjE_Type})</b><br/>
                 <label style={{color:'black'}}>{obj.venue}</label><br/>
                 <label style={{color:'Gray'}}><Icon type="clock-circle" /> {obj.posted_Date}</label></Col>
              
                 </Row>
              <Button type='primary' style={{float:'right'}} onClick={()=>{this.showJobDetail(obj.notification_Id,obj.description,obj.jobDetail,obj.title,obj.venue,obj.ending_Date)}}>
                Details
                </Button>
                
              </Card>
       
          </div>):
          
          (<div>
              <Card  bordered={false}style={obj.seen_Status=='Unseen'?{ width:"867px" , backgroundColor:"#AED6F1" }:{ width:"867px" , backgroundColor:"white" }}>
              <Row>
                <Col xs='1'><Avatar size={30} src={survey} /></Col>
                <Col xs='10'><b>{obj.title}{" "} ({obj.sjE_Type})</b>
              <br/>{obj.description}</Col>
              </Row>
               
              <Button type='primary' style={{float:'right'}} onClick={()=>{this.showSurveyDetail(obj.surveyDetail,obj.title,obj.description,obj.notification_Id,obj.sjE_Detail_Id)}} >Start Survey</Button>
              </Card>
          
<br/>
          </div>)
       }
      
   </div>
   
   )
                    }
                   
                  </>
                );
              })

            }


    </div>):(<div></div>)
}
   </div>



   </div>
   </Content>

   <Modal
          title='Event Details'
          visible={this.state.eventDetail}
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
          visible={this.state.jobDetail}
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



        <Modal
          title='Survey'
          visible={this.state.surveyDetail}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          footer={[
           
            <Button key="submit" type="primary"  onClick={this.SubmitSurvey}>
              Submit
            </Button>
          ]}


        >

        <center><h3>{this.state.surveytitle}</h3></center>
  <p><b>Description:</b>{this.state.surveyDescription}</p><hr/> 
{
  
  this.state.surveydetail.map((obj) => {
    return (
      <>
 
  <Label ><b>{obj.question_No}</b>{" "}:{" "}{obj.question}</Label><br/>
        <Radio.Group>
    <Radio onChange={this.RadioOnChange} id={obj.question_No} value={obj.option_1}>{obj.option_1}</Radio>
    <Radio onChange={this.RadioOnChange} id={obj.question_No} value={obj.option_2}>{obj.option_2}</Radio>
    {
      obj.option_3 != null?(
      <Radio onChange={this.RadioOnChange} id={obj.question_No} value={obj.option_3}>{obj.option_3}</Radio>
      ):(<div></div>)
    }

    {
      obj.option_4 != null?(
        <Radio onChange={this.RadioOnChange} id={obj.question_No} value={obj.option_4}>{obj.option_4}</Radio>
      ):(<div></div>)
    }

    {
      obj.option_5 != null?(
        <Radio  onChange={this.RadioOnChange} id={obj.question_No} value={obj.option_5}>{obj.option_5}</Radio>
      ):(<div></div>)
    }   
   
   
    
    </Radio.Group>

<hr/>
      </>
    );
  })

}
        </Modal>

        
       


   </Layout>
  );
}
}


export default Notifications
