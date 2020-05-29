import React, { Component } from 'react'
import Index from './Index'
import Header from './Head'
import groupimg from '../Images/Group.png'
import New from '../Images/new.png'
import Old from '../Images/old.jpg'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Label } from 'reactstrap';
import { Layout, Menu, Tabs, Icon, message, Button, Avatar, List, Modal, Input, Checkbox, Dropdown ,Radio,Select,Card} from 'antd'
const { SubMenu } = Menu;
const {option}=Select;
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;
let Answers={
  Qno:0,
  answer:'',
} 


  


class OpenGroup extends Component {

  constructor(prop) {
    super(prop)
    this.state = {
      group: {
        groupName: '',
        members: [],
        cnic : localStorage.getItem("cnic")
      },
      SurveyAnswers:[],
        GroupMember:false,
        showmembers:false,
        groupMembers:{},
        gotResponse:false,
        getGroupResponse:false,
        posts:{},
        eventdetails:false,
        jobDetails:false,
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
        surveyDetail:false,
        surveytitle:'',
        surveydetail:[],
        surveyDescription:'',
        AddMember:false,
        newmembersResponse:false,
        newmembers:{},
        notification_id:0,
        mycnic: localStorage.getItem("cnic")

    };
    this.onChange=this.onChange.bind(this)
    this.RadioOnChange=this.RadioOnChange.bind(this)
  }


  componentDidMount = () => {

    console.log("hdkjshksdj")
    console.log(this.props.cnic)
    fetch(`http://localhost:51691/api/FriendAndGroup/GetGroupPost/${this.props.id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      
        res.json().then(data => {
          console.log("hdgsjhds")
          console.log(data)
          this.setState({ posts: data, getGroupResponse: true})
        })

    })
  
  }
  
 ShowMembers = () => {

    const cnic = window.localStorage.getItem("cnic");
    fetch(`http://localhost:51691/api/FriendAndGroup/GetMembers/${this.props.id}`, {
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

          this.setState({ groupMembers: data, 
            gotResponse: true ,
            })
        })

        if(this.state.mycnic===this.props.cnic){
          this.setState({
            GroupMember: true,
           
          });
        }
        else{
          this.setState({
            showmembers: true,
           
          });
        }

      }
      else {
        message.error("No Friends");
      }
    })
}

DeleteMember = (cnic) => {
  console.log(this.state.group)
  // this.setState({
  //   NewGroup: false,

  // });

  fetch(`http://localhost:51691/api/FriendAndGroup/GroupMemberDelete/${this.props.id}/${cnic}`, {
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
      

    }
  })
};

LeaveGroup = (cnic) => {
  console.log(this.state.group)

  fetch(`http://localhost:51691/api/FriendAndGroup/GroupMemberDelete/${this.props.id}/${cnic}`, {
    method: "Put",
  
    mode: "cors",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }).then(res => {
    if (res.ok) {
     
        this.setState({ gotFriendsResponse: true,
        showmembers:false })
      

    }
  })
};


 AddNewMembersInGroup = () => {
    console.log(this.state.group)
    // this.setState({
    //   NewGroup: false,

    // });

    fetch(`http://localhost:51691/api/FriendAndGroup/AddNewMembers/${this.props.id}`, {
      method: "Post",
      body:JSON.stringify(this.state.group),
      mode: "cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if (res.ok) {
       
          this.setState({ gotFriendsResponse: true,
          AddMember:false
         })
        message.success("Added")

      }
    })
  };

  onChange(e) {
    if(e.target.checked){
      this.state.group.members.push(e.target.value)
    }else{
      this.state.group.members =this.state.group.members.filter(m =>m !== e.target.value) 
    }
    //console.log(`${e.target.value}`,e.target.checked);
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
  CloseGroupMembers = () => {
    this.setState({
      GroupMember: false,

    });
  };

  showSurveyDetail=(detail,title,description,SJEid)=>{

  
    this.setState({
        surveydetail:detail,
        surveytitle:title,
        surveyDescription:description,
        surveyDetail:true,
        SJE_id:SJEid,
        notification_id:0,
        

    })
}

  showEventdetails=(description,title,venue,date,time)=>{
    this.setState(
      {
       eventdetails:true,
       EventDescription:description,
       eventtitle:title,
       eventvenue:venue,
       eventdate:date,
       eventtime:time,
      }
    );
  };
  showJobdetails=(description,jobdetail,title,location,endDate)=>{
    this.setState(
      {
        JobDescription:description,
        jobdetail:jobdetail,
        jobtitle:title,
        joblocation:location,
        jobEndDate:endDate,
       jobDetails:true,
      

      }

    );
  };
ShowAddMembers=()=>{
 
    const cnic = window.localStorage.getItem("cnic");
    fetch(`http://localhost:51691/api/FriendAndGroup/GetNewMembers/${this.props.id}/${cnic}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      
        res.json().then(data => {
          console.log("jhkjfk")
            console.log(data)
          this.setState({ newmembers: data, 
            newmembersResponse: true,
              AddMember:true,
              GroupMember:false
             
           
           })
          
        })
    })
};

handleBack=()=>{
  this.setState({
    AddMember:false,
    GroupMember:true

  })
}
  handleCancel=()=>{
    this.setState(
      {
        eventdetails:false,
        jobDetails:false,
        AddMember:false,
        showmembers:false
      }
    )
  }
  
   

  render() {
    
   
   
    const{groupmembers,admin}  = this.state.groupMembers;
   


     console.log()
      return (

      
        <Layout style={{ marginLeft: 200 }}>
          <Index />
          <Header />
          <Content>
            <div className='container' style={{ backgroundColor: 'White', width: '1000px', marginTop: '15px', marginLeft: '15px', float: 'left', height: '700px' }}>
<hr/>
      <Link style={{textDecoration:'none',color:'Black'}} to="/groups"><Icon type="left" /></Link> {" "}<b>{this.props.group_Name}</b>


<div style={{float:"right"}}><Button type="primary" onClick={this.ShowMembers}>Edit</Button></div>

<hr/>
{
   this.state.getGroupResponse ? (
       
    <div style={{ background: '#ECECEC', padding: '30px' }}>
{
             this.state.posts.map((obj) => {
                return (
                  <>
                    {
                      obj.sjE_Type=="Event"?(
                      
                        <div >
                        <Card bordered={true} style={{ width: 900 }}>
                          <Row>
                            <Col xs='0'><Avatar size={30} src={"http://localhost:51691/"+obj.new_Image}/></Col>
                            <Col><b>{obj.student_Name}</b> {" "} posted {" "} <b>(Event)</b><br/>
                      {" "} <b>on</b> {" "} {obj.posted_Date}{" "} <b>at </b>{" "}{obj.posted_Time}</Col>
                          </Row>
                        <hr/>
           <b><u>{obj.title}</u></b><br/>
             <p style={{color:'red'}}>{obj.starting_Date}{' '}at{' '}{obj.time}'</p><p>{obj.venue}
           </p>
           <Button type="primary" onClick={()=>{this.showEventdetails(obj.description,obj.title,obj.venue,obj.starting_Date,obj.time)}}>
                Details
                </Button>
                        </Card>
                        <hr/>
                      </div>
                      
                      ):
   (
   
    <div >


      {
        obj.sjE_Type=="Job"?(<div>
           <Card  bordered={false} style={{ width: 900 }}>
      <Row>
        <Col xs='0'><Avatar size={30} src={"http://localhost:51691/"+obj.new_Image}/></Col>
        <Col><b>{obj.student_Name}</b> {" "} posted {" "} <b>(Job)</b><br/>
        {" "} <b>on</b> {" "} {obj.posted_Date}{" "}<b>at</b>{" "}{obj.posted_Time}<hr/>
            <b><u>{obj.title}</u></b><br/>
            <p style={{color:'black'}}>{obj.venue}</p>,
            </Col>
      </Row>
    
            <Button type="primary" onClick={()=>{this.showJobdetails(obj.description,obj.jobDetail,obj.title,obj.venue,obj.ending_Date)}}>
              Details
            </Button>
    </Card>
    <hr/>
        </div>):(<div>
          <Card  bordered={false} style={{ width: 900 }}>
      <Row>
        <Col xs='0'><Avatar size={30} src={"http://localhost:51691/"+obj.new_Image}/></Col>
        <Col><b>{obj.student_Name}</b> {" "} posted {" "} <b>(Job)</b><br/>
        {" "} <b>on</b> {" "} {obj.posted_Date}{" "}<b>at</b>{" "}{obj.posted_Time}<hr/>
            <b><u>{obj.title}</u></b><br/>
            <p style={{color:'black'}}>{obj.venue}</p>,
            </Col>
      </Row>
    
               
              <Button type='primary' style={{float:'right'}} onClick={()=>{this.showSurveyDetail(obj.surveyDetail,obj.title,obj.description,obj.sjE_Detail_Id)}} >Start Survey</Button>
              </Card>
        </div>)
      }
   
  </div>
   
   ) } </> );})
 }



    </div>
      ) : (
      <div>No posts</div>
       
      )}


            </div>
          </Content>

          <Modal
            title={<center><b>Group Members</b></center>}
            visible={this.state.GroupMember}
            onOk={this.handleCreate}
            onCancel={this.CloseGroupMembers}
            footer={[
              <Button key="Cancel" onClick={this.CloseGroupMembers}>
                Cancel
            </Button>,
              <Button key="submit" type="primary" onClick={this.ShowAddMembers}>
                Add Members
            </Button>
            ]}

          >

              {
                 this.state.gotResponse ? (

                
          <div>

            
<Row>
                  
                    <Col xs='1'><Avatar size={30} src={"http://localhost:51691/"+admin.new_Image}/></Col>
                    <Col> {admin.student_Name}{' '}<b>(Admin)</b><br/>
                {admin.reg_No}{' '}<b>(</b>{admin.discipline}-{admin.semester}{admin.section}<b>)</b>{''}<br/></Col>
                  </Row><hr/>
          {
                  groupmembers.map((obj) => {
                    return (
                  <>
                  <Row>
                    
                    <Col xs='1'><Avatar size={30} src={"http://localhost:51691/"+obj.new_Image}/></Col>
                    <Col> {obj.student_Name}<br/>
                {obj.reg_No}{' '}<b>(</b>{obj.discipline}-{obj.semester}{obj.section}<b>)</b>{''}<br/></Col>
                  </Row>
                   
                  
                    <Icon style={{color:'red',float:'right'}} type='delete' onClick={()=>{this.DeleteMember(obj.cnic)}} />
                    
                    <hr/>
                   
                  </>
                );
              })

          }

    </div>
      ) : (
      <div></div>
       
      )}





          </Modal>


          <Modal
            title={<center><b>Group Members</b></center>}
            visible={this.state.showmembers}
            onOk={this.handleCreate}
            onCancel={this.handleCancel}
            footer={[
              <Button key="Cancel" onClick={this.handleCancel}>
                Cancel
            </Button>
             
            ]}

          >

              {
                 this.state.gotResponse ? (

                
          <div>


            
                 <Row>
                  
                  <Col xs='1'><Avatar size={30} src={"http://localhost:51691/"+admin.new_Image}/></Col>
                  <Col> {admin.student_Name}{' '}<b>(Admin)</b><br/>
              {admin.reg_No}{' '}<b>(</b>{admin.discipline}-{admin.semester}{admin.section}<b>)</b>{''}<br/></Col>
                </Row><hr/>
          {
                  groupmembers.map((obj) => {
                    return (
                  <>
                  <div>
                    {
                      this.state.mycnic===obj.cnic?(<div>
                      <Row>
                    
                    <Col xs='1'><Avatar size={30} src={"http://localhost:51691/"+obj.new_Image}/></Col>
                    <Col> {obj.student_Name}<br/>
                {obj.reg_No}{' '}<b>(</b>{obj.discipline}-{obj.semester}{obj.section}<b>)</b>{''}<br/></Col>
                  </Row>
                      <Button style={{float:'right'}} type="danger" shape="round" onClick={()=>{this.LeaveGroup(obj.cnic)}}>Leave Group</Button>
                    
                    <hr/>

                      </div>):(<div>
                        <Avatar size={30} src={Old}/>{obj.stu_Name}
                    
                    <hr/>
                      </div>)
                    }
                  </div>
                    
                   
                  </>
                );
              })

          }
          

                


    </div>
      ) : (
      <div></div>
       
      )}





          </Modal>

          <Modal
          title='Event Details'
          visible={this.state.eventdetails}
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
          visible={this.state.jobDetails}
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
            title={<center><b>Add New Members</b></center>}
            visible={this.state.AddMember}
            onOk={this.handleCreate}
            onCancel={this.handleCancel}
            footer={[
              <Button key="Cancel" onClick={this.handleBack}>
                Back
            </Button>,
              <Button key="submit" type="primary" onClick={this.AddNewMembersInGroup}>
                Add
            </Button>
            ]}

          >
            {
              this.state.newmembersResponse?(
              <div>


{
              this.state.newmembers.map((obj) => {
                return (
                  <>
                   <Row>
                    <Col xs='1'><Checkbox onChange={this.onChange} value={obj.cnic}></Checkbox></Col>
                    <Col xs='1'><Avatar size={30} src={"http://localhost:51691/"+obj.new_Image}/></Col>
                    <Col> {obj.student_Name}<br/>
                {obj.reg_No}{' '}<b>(</b>{obj.discipline}-{obj.semester}{obj.section}<b>)</b>{''}<br/><hr/></Col>
                  </Row>
                    
                  </>
                );
              })

            }



              </div>):(<div>
                <center>No members</center>
              </div>)
            }
            

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
      )
    }
    
   
}

export default OpenGroup
