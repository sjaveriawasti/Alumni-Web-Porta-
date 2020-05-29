import React, {Component}from 'react'
import Index from './Index'
import Header from './Head'
import groupimg from '../Images/Group.png'
import survey from '../Images/survey.png'
import New from '../Images/new.png'
import group from '../Images/Group.png'
import Old from '../Images/old.jpg'
import {Link} from 'react-router-dom';
import { Container, Row, Col ,Label} from 'reactstrap';
import moment from 'moment';
import { Layout, Menu,List,Radio,Avatar, Tabs,Icon,message,Button,Modal,DatePicker,TimePicker,Checkbox,Select,Input} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;
const { Option } = Select;
const InputGroup = Input.Group;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


class Survey extends Component {

  constructor(props){
    super(props)
    this.state = {
      details: {
        Title:'',
        Description:'',
        Creator_CNIC : localStorage.getItem("cnic"),
        Creator_Type:'Alumni',
        Privacy:'Public',
        SJE_Type:'Survey',
        SJE_id:0,
        Groups:[],
        Questions:[],
      },
      QuestionCheck:false,
      option1Check:false,
      option2Check:false,
      SurveyDetail:[],
      SurveyTitle:'',
      SurveyDescription:'',
      user:[],
      type:"Survey",
      CType:"Student",
      notifications:'',
     UnpostResponse:false,
      gotFriendsResponse:false,
      gotResponse: false,
      getresponse:false,
      Privacy:'',
      istrue:'',
      Audience:false,
      count:1,
      QuestionModal:false,
      createSurveyModal:false,
      surveyModal:false,
      audience:false,
      survey:false,
      optionText:'',
      option:2,
      unpostedsurveys:[],
      mysurveys:[],
      unpostAudience:false,
  
   Question:{
    QNo:0,
    text:null,
    option1:null,
    option2:null,
    option3:null,
    option4:null,
    option5:null,
   },

    };
    this.DescriptionChange=this.DescriptionChange.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.QuestionChange=this.QuestionChange.bind(this);
    this.handleOptionChange=this.handleOptionChange.bind(this);
    this.GroupsOnChange=this.GroupsOnChange.bind(this);
    this.TitleOnChange=this.TitleOnChange.bind(this);
    this.option1Change=this.option1Change.bind(this);
    this.option2Change=this.option2Change.bind(this);
    this.option3Change=this.option3Change.bind(this);
    this.option4Change=this.option4Change.bind(this);
    this.option5Change=this.option5Change.bind(this);


  }
  QuestionChange=(e)=>{
    this.state.Question.text=e.target.value
    this.setState({
      Question:{
      text: e.target.value
      },
      QuestionCheck:true
  });
  }

 option1Change=(e)=>{
   this.state.Question.option1=e.target.value;
   this.setState({
    Question:{
    text:this.state.Question.text,  
    option1: e.target.value,
    option2:null,
    option3:null,
    option4:null,
    option5:null,
    },
    option1Check:true
  });
 }

 option2Change=(e)=>{
  this.state.Question.option2=e.target.value;
  this.setState({
    Question:{
    text:this.state.Question.text,  
    option1: this.state.Question.option1,
    option2: e.target.value,
    option3:null,
    option4:null,
    option5:null,
    },
    option2Check:true
  });
}

option3Change=(e)=>{
  this.state.Question.option3=e.target.value;
  this.setState({
    Question:{
    text:this.state.Question.text,  
    option1: this.state.Question.option1,
    option2: this.state.Question.option2,
    option3: e.target.value,
    option4:null,
    option5:null,
    }
  });
}

option4Change=(e)=>{
  this.state.Question.option4=e.target.value;
  this.setState({
    Question:{
      text:this.state.Question.text,  
      option1: this.state.Question.option1,
      option2: this.state.Question.option2,
      option3: this.state.Question.option3,
      option4: e.target.value,
      option5:null,
    }
  });
}
option5Change=(e)=>{
  this.state.Question.option5=e.target.value;
  this.setState({
    Question:{
      text:this.state.Question.text,  
      option1: this.state.Question.option1,
      option2: this.state.Question.option2,
      option3: this.state.Question.option3,
      option4: this.state.Question.option4,  
    option5: e.target.value
    }
  });
}

  handleNext=()=>{
    this.state.survey=true;
 this.state.Question.QNo=this.state.count;
this.state.details.Questions.push(this.state.Question);
console.log("jdjskfhdkjfhkdjhfksd")
console.log(this.state.details.Questions)
this.state.count=this.state.count+1;
this.setState({
 option:2,
  Question:{
  
   text:'',
   option1:null,
   option2:null,
   option3:null,
   option4:null,
   option5:null,
},
QuestionCheck:false,
option2Check:false,
option1Check:false,
QuestionModal: false,
QuestionModal:true
});
}

PostSurvey=()=>{

  fetch(`http://localhost:51691/api/SJE/PostSurvey`, {
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
       Audience:false
     })
    
  
    }
  })
};




GroupsOnChange(e) {
  console.log(e.target.value)
  if(e.target.checked){
    this.state.details.Groups.push(e.target.value)
  }else{
    this.state.details.Groups =this.state.details.Groups.filter(m =>m !== e.target.value) 
  }
  //console.log(`${e.target.value}`,e.target.checked);
}

TitleOnChange(e){
  this.state.details.Title=e.target.value
 }
 DescriptionChange(e){
  this.state.details.Description=e.target.value
 }

  showCreateSurveyModal = () => {
    this.setState({
        createSurveyModal:true
    });
  };

  CloseCreateSurveyModal = () => {
    this.setState({
        createSurveyModal:false
    });
  };

  showSurveyModal = (details,title,description) => {
    this.setState({
      SurveyDetail:details,
      SurveyTitle:title,
      SurveyDescription:description,
        surveyModal:true
    });
  };

  CloseSurveyModal = () => {
    this.setState({
        surveyModal:false
    });
  };
 

  AudienceModal = () => {

 if(this.state.QuestionCheck===true && this.state.option1Check===true && this.state.option2Check===true ){
  this.state.Question.QNo=this.state.count;
  this.state.details.Questions.push(this.state.Question);
  console.log("jdjskfhdkjfhkdjhfksd")
  console.log(this.state.details.Questions)
  this.setState({
    Audience: true,
    QuestionModal:false
  });
 }
    
else{
  this.setState({
    Audience: true,
    QuestionModal:false
  });
}

  
  }
  UnpostAudienceModal = (id) => {

    if(this.state.QuestionCheck===true && this.state.option1Check===true && this.state.option2Check===true ){
     this.state.Question.QNo=this.state.count;
     this.state.details.Questions.push(this.state.Question);
     console.log("jdjskfhdkjfhkdjhfksd")
     console.log(this.state.details.Questions)
     this.setState({
       Audience: true,
       QuestionModal:false,
       unpostAudience:true
     });
     this.state.details.SJE_id=id;
    }
       
   else{
     this.setState({
       Audience: true,
       QuestionModal:false,
       unpostAudience:true,
     });
   }
   this.state.details.SJE_id=id;
     
     }

  handlePrivacyChange(e){
    this.state.details.Privacy = e;
    this.setState({
      Privacy:e,
      istrue:e === 'Private' ? true:false
    })
 }

 handleOptionChange(e){
  this.state.option = e;
  this.setState({
    option:e,
    
  })
}


  showQuestionModal = () => {
    this.setState({
      QuestionModal: true,
      createSurveyModal:false
    });
  }

  closeQuestionModal = () => {
    this.setState({
      QuestionModal: false,
    });
  }

  handleCancel = () => {
    this.setState({
      Audience: false,
    });
  }
  DeleteSurvey=(id)=>{
  
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
         Audience:false
       })
       
      message.success("Added in Unposted Surveys")
    
      }
    })
  };

  componentDidMount=()=>{

    const cnic = window.localStorage.getItem("cnic");
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
   else{
    message.error("No Friends");
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
      console.log("fjhgkjhgjhgjh")
      console.log(data)
     this.setState({ unpostedsurveys:data,UnpostResponse : true,})
    })
     
   }
 
 })

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
      this.setState({ mysurveys: data })
    })

  }
 
})


  }  


  render(){
    if (this.state.gotResponse) {
  return (
    <Layout style={{ marginLeft: 200 }}>
        <Index/>
   <Header/>
   <Content>
   <div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'15px',marginLeft:'15px',float:'left',height:'700px'}}>
  
   
   
<hr/>
      <center>
<h3>Create Survey </h3>

<Button type="primary" onClick={this.showCreateSurveyModal}>New</Button>
</center>
      <hr/>

      <Tabs defaultActiveKey="1" >
    
    <TabPane 
    
      tab={
        <span>
           <Icon type="team" />
         Unposted Survey       
        </span>
      }
      key="1"
    >
       {
         this.state.UnpostResponse?(<div>
{
            this.state.unpostedsurveys.map((obj) => {
                return (
                  <>
                    <div>
  <br/>
       <Row>
                <Col xs='1'><Avatar size={30} src={survey} /></Col>
                <Col xs='10'><b>{obj.title}</b> 
              <br/>{obj.description}</Col>
              </Row>
              <Button  style={{float:'right'}} key="submit" type="primary"  onClick={()=>{this.UnpostAudienceModal(obj.sjE_Detail_Id)}}>
              Post
            </Button>{" "}
            <Button style={{float:'right'}} key="submit" type="danger" onClick={()=>{this.DeleteSurvey(obj.sjE_Detail_Id)}}>Delete</Button>
             <br/>
             
</div>
<hr/>
                  </>
                );
              })

            }
         </div>):(<div>
           <center>No Posts</center>
         </div>)
       }
       
      
    </TabPane>
<TabPane
      tab={
        <span>
          <Icon type="profile" />
         Posted Survey
        </span>
      }
      key="2"
    >


{
            this.state.mysurveys.map((obj) => {
                return (
                  <>
                    <div>
  <br/>
       <Row>
                <Col xs='1'><Avatar size={30} src={survey} /></Col>
                <Col xs='10'><b>{obj.title}</b> {" "} posted {" "}<br/>
                      {" "} <b>on</b> {" "} {obj.posted_Date}{" "} <b>at </b>{" "}{obj.posted_Time}
              <br/>{obj.description}</Col>
              </Row>
               
             
</div>
<hr/>
                  </>
                );
              })

            }

    
    </TabPane>
  </Tabs>,

     
      
      
   
  <Modal
          title={<b>Create Survey</b>}
          visible={this.state.createSurveyModal}
          onOk={this.handleCreate}
          onCancel={this.CloseCreateSurveyModal}
          footer={[
            <Button key="back" onClick={this.CloseCreateSurveyModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.showQuestionModal}>
              Next
            </Button>
          ]}

        >
       <Label ><b>Title</b></Label> 
        <Input  placeholder="Title" onChange={this.TitleOnChange} /><br/>
        <Label ><b>Description</b></Label>        
        <TextArea type="textarea" placeholder="Description" onChange={this.DescriptionChange} /><br/>
        
      
        </Modal>
     
        <Modal 
          title={<b>Questions</b>}
          visible={this.state.QuestionModal}
          onOk={this.handleCreate}
          onCancel={this.closeQuestionModal}
          footer={[
            
            

           
           <> <Button key="submit" type="primary"  onClick={this.handleNext}>
           Next
         </Button>
           <Button hidden={this.state.survey ? false:true} key="submit" type="primary"  onClick={this.AudienceModal}>
             Finish
           </Button></>

            
          ]}

        >
  <Label ><b> Question #{this.state.count}</b></Label>
          
        <Input id="text"type="textarea" placeholder="Enter Question"  onChange={this.QuestionChange} value={this.state.Question.text}/>

        <Label ><b>Select options</b></Label>
        <InputGroup compact>
          <Select id='Privacy' value={this.state.option} onChange={this.handleOptionChange} >
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </InputGroup>
       
      
          <Label ><b>Option 1</b></Label>
          <Input onChange={this.option1Change} value={this.state.Question.option1}/>
          <Label ><b>Option 2</b></Label>
          <Input onChange={this.option2Change} value={this.state.Question.option2}/>
          <Label  hidden={this.state.option == 3||this.state.option == 4 ||this.state.option == 5 ? false:true} ><b>Option 3</b></Label>
          <Input hidden={this.state.option == 3 ||this.state.option == 4 ||this.state.option == 5 ? false:true} onChange={this.option3Change} value={this.state.Question.option3}/>
          <Label  hidden={this.state.option == 4 ||this.state.option == 5? false:true}><b>Option 4</b></Label>
          <Input hidden={this.state.option == 4 ||this.state.option == 5? false:true} onChange={this.option4Change} value={this.state.Question.option4}/>
          <Label hidden={this.state.option == 5? false:true}><b>Option 5</b></Label>
          <Input hidden={this.state.option == 5? false:true} onChange={this.option5Change}  value={this.state.Question.option5}/>
  
      

        <br/>
       

       
        
        </Modal>

        <Modal
          title={<b><center>{this.state.SurveyTitle}</center></b>}
          visible={this.state.surveyModal}
          onOk={this.showSurveyModal}
          onCancel={this.CloseSurveyModal}
          footer={[
            <Button key="back" onClick={this.CloseSurveyModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={this.CloseSurveyModal}>
              Submit
            </Button>
          ]}

        >
 <p><b>Description:</b>{this.state.SurveyDescription}</p><hr/> 
{
  
  this.state.SurveyDetail.map((obj) => {
    return (
      <>
 
  <Label ><b>{obj.question_No}</b>{" "}:{" "}{obj.question}</Label><br/>
        <Radio.Group>
    <Radio value={obj.option_1}>{obj.option_1}</Radio>
    <Radio value={obj.option_2}>{obj.option_2}</Radio>
    {
      obj.option_3 != null?(
      <Radio value={obj.option_3}>{obj.option_3}</Radio>
      ):(<div></div>)
    }

    {
      obj.option_4 != null?(
        <Radio  value={obj.option_4}>{obj.option_4}</Radio>
      ):(<div></div>)
    }

    {
      obj.option_5 != null?(
        <Radio value={obj.option_5}>{obj.option_5}</Radio>
      ):(<div></div>)
    }   
   
   
    
    </Radio.Group>

<hr/>
      </>
    );
  })

}
      
  
              
                
        </Modal>
     
        
           
        <Modal
          title={<center><b>Survey Audience</b></center>}
          visible={this.state.Audience}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          footer={[
            <Button  hidden={this.state.unpostAudience?true:false} key="submit" type="primary"  onClick={this.PostLater}>
              Later
            </Button>,
            <Button  key="submit" type="primary"  onClick={this.PostSurvey}>
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
}else {
  return <></>
}
}
 
}


export default Survey
/*
  <Label ><b>2:Familiarity with Operating System</b></Label>{' '}
        <Radio.Group>
                  <Radio value="Not at all">Not at all</Radio>
                  <Radio value="Unfamiliar">Unfamiliar</Radio>
                  <Radio value="Familiar">Familiar</Radio>
                  <Radio value="Very Familiar">Very Familiar</Radio>
                </Radio.Group>
                <Label ><b>3:Familiarity with Microsoft Word</b></Label>{' '}
        <Radio.Group>
                  <Radio value="Not at all">Not at all</Radio>
                  <Radio value="Unfamiliar">Unfamiliar</Radio>
                  <Radio value="Familiar">Familiar</Radio>
                  <Radio value="Very Familiar">Very Familiar</Radio>
                </Radio.Group>
                <Label ><b>4:Familiarity with Microsoft Excel</b></Label>{' '}
        <Radio.Group>
                  <Radio value="Not at all">Not at all</Radio>
                  <Radio value="Unfamiliar">Unfamiliar</Radio>
                  <Radio value="Familiar">Familiar</Radio>
                  <Radio value="Very Familiar">Very Familiar</Radio>
                </Radio.Group>
                
                <Label ><b>5:Familiarity with Microsoft PowerPoint</b></Label>{' '}
        <Radio.Group>
                  <Radio value="Not at all">Not at all</Radio>
                  <Radio value="Unfamiliar">Unfamiliar</Radio>
                  <Radio value="Familiar">Familiar</Radio>
                  <Radio value="Very Familiar">Very Familiar</Radio>
                </Radio.Group>
                



 {
      this.state.getnotification?(<div>


      </div>):(<div>
        No Posts
      </div>)
    }
   

*/