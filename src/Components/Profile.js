import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch,Avatar, message } from 'antd';
import { Tabs } from 'antd';
//import { ButtonGroup ,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import Header from './Head'
import Index from './Index'
import pic from '../Images/Profile.jpg'
import pic1 from '../Images/old.jpg'
import { Layout, Menu, Icon,Upload,Modal} from 'antd';
import { Container, Row, Col } from 'reactstrap';

const { Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

//For images/////
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
////////////////////////////////////////////////





class Profile extends Component {


  constructor(prop){
    super(prop)
    
    this.state = {
      user:{},
      attributes:[],
      gotResponse : false,
      gotattributeResponse:false,
profile:false,
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
       
       
      ],
      
    };

    }


//For Image Gallery/////////
   
  
    handleCancel = () => this.setState({ previewVisible: false });
  
    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };
  
    handleChange = ({ fileList }) => this.setState({ fileList });


////---------------------------------------------//////////////

DeleteEducationDetail=(id)=>{
  fetch(`http://localhost:51691/api/Students/DeleteEducationDetail/${id}`, {
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
        
message.success("Record Deleted")
      }
    })
}

DeleteJobDetail=(id)=>{
  fetch(`http://localhost:51691/api/Students/DeleteJobDetail/${id}`, {
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
        
          message.success("Record Deleted")
      }
    })
}

DeleteFamilyDetail=(id)=>{
  fetch(`http://localhost:51691/api/Students/DeleteFamilyDetail/${id}`, {
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
          message.success("Record Deleted")

      }
    })
}
DeletePublicationDetail=(id)=>{
  fetch(`http://localhost:51691/api/Students/DeletePublicationDetail/${id}`, {
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
        
          message.success("Record Deleted")
      }
    })
}
DeleteSkillDetail=(id)=>{
  fetch(`http://localhost:51691/api/Students/DeleteSkillDetail/${id}`, {
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
          message.success("Record Deleted")

      }
    })
}
    

   componentDidMount= () =>{
  
   const cnic= window.localStorage.getItem("cnic");
   fetch(`http://localhost:51691/api/Students/GetAll/${this.props && this.props.id ? this.props.id:cnic}`,{
    method:"GET",
    mode:"cors",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
}).then(response => response.json().then
(data => {
 
  this.setState({ user:data,gotResponse:true})

}))     

fetch(`http://localhost:51691/api/Students/GetAttributes/${this.props && this.props.id ? this.props.id:cnic}`,{
    method:"GET",
    mode:"cors",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
}).then(response => response.json().then
(data => {
  console.log("jgjhaabsjahjabsj")
 console.log(data)
  this.setState({ attributes:data.split(','),gotattributeResponse:true})
 

}))     
 }


  
render(){
  const { previewVisible, previewImage, fileList } = this.state;
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );



  if(this.state.gotResponse && this.state.gotattributeResponse){
    const{student,stuEducation,stuFamily,stuJob,stuPublication,stuSkills}  = this.state.user;
  console.log(student)
return (
  <Layout style={{ marginLeft: 200 }}>
   <Index/>
   <Header/>
   <div> 
   <div className='container' style={{backgroundColor:'White',width:'250px',marginTop:'15px',marginLeft:'15px',float:'left',height:'700px' }}>
   
    <Row>
        <Col xs='2'></Col>
        <Col xs='4'><b></b></Col>
        <Col xs='4'><b></b></Col>
        <Col xs='2'></Col>
    </Row>
      <br/>
      
    <Row>
        <Col xs='2'></Col>
        <Col xs='4'> <Avatar size={80} src={pic1} /></Col>
        <Col xs='4'> <Avatar size={80} src={"http://localhost:51691/"+student.new_Image} /></Col>
        <Col xs='2'></Col>
    </Row>
      <br/>
      <center> 
      <label><b> {student.student_Name}</b></label>
      </center>
      <br/>
      <div className='container' style={{backgroundColor:'White', overflow: 'auto',
        height: '56vh', }}>
      <label><b>Arid-No</b></label><br/>
      <label>{student.reg_No}</label><br/>
      <label><b>Discipline</b></label><br/>
      <label>{student.discipline}</label><br/>
      <label><b>Degree Status</b></label><br/>
      <label>{student.degree_Completion}</label><br/>
      <label><b>Email Address</b></label><br/>
      <label>{student.primary_Email}</label><br/>
      <label hidden={student.secondary_Email != null?false:true}>{student.secondary_Email}<br/></label>
      <label><b>Mobile Number</b></label><br/>
      <label>{student.phone_No}</label><br/>
      <label  hidden={student.office_No != null?false:true}>{student.office_No}<br/></label>
      <label><b>City</b></label><br/>
      <label>{student.city}</label><br/>
     
      <label><b>Marital_Status</b></label><br/>
      <label>{student.marital_Status}</label><br/>
      <label><b>Date of Birth</b></label><br/>
      <label>{student.dob}</label><br/>
      </div>
     
     
       

    </div>
    <div className='container' style={{backgroundColor:'White',float:'left',marginTop:'15px',marginLeft:'15px',
         width:'740px',height:'700px'}}>
         
    <div className="card-container">
    <Tabs type="card">
      <TabPane tab="Educational Info" key="1">

          {
            stuEducation.map((obj)=>{
              return (<>
              <p><hr/><u><b>{obj.degree_name}</b></u><br/> <b>From :</b>{obj.institute_name} <br/>
            <b>  Major Subjects :</b>{obj.major_Subjects}<br/><b>Completion Year:</b>{obj.completion_year}
            <div style={{float:"right"}}>
              <Icon hidden={this.props && this.props.id ?true:false} type='delete' onClick={()=>{this.DeleteEducationDetail(obj.student_Edu_Id)}}></Icon>
              
            </div>
                   <hr/></p>
                   </>)
            })
          }
        
      </TabPane>
      <TabPane tab="Job Info" key="2">
     {
       stuJob.map((obj)=>{
         return (<> <p><hr/><h3>{obj.designation}</h3><br/> <b>{obj.organization}</b> <br/>
          Time Period<br/>{obj.starting_Year} To {obj.ending_Year}<br/>
          <div style={{float:"right"}}>
              <Icon hidden={this.props && this.props.id ?true:false} type='delete' onClick={()=>{this.DeleteJobDetail(obj.stu_Job_Id)}}></Icon>
              
            </div>
        </p><hr/></>)
       })
     }
       
      </TabPane>
      <TabPane tab="Family Info" key="3">
       {
         stuFamily.map((obj)=>{
           return(<> <hr/><p><center><Avatar size={100} src={"http://localhost:51691/"+obj.image} /><br/>
           {obj.name}<br/>
           {obj.relation}
           <div style={{float:"right"}}>
           <Icon hidden={this.props && this.props.id ?true:false} type='delete' onClick={()=>{this.DeleteFamilyDetail(obj.stu_Family_Id)}}></Icon>
              
            </div>
           </center> </p><hr/></>)
         })
       }
       
      </TabPane>

      <TabPane tab="Publication Info" key="4">
     {
       stuPublication.map((obj)=>{
         return(<> <p><hr/><h3>{obj.title}</h3><br/> <b>{obj.publisher}</b> <br/>
          Publish Date<br/>{obj.publication_Date} <br/> {obj.publication_URL}<br/>

          <div style={{float:"right"}}>
          <Icon hidden={this.props && this.props.id ?true:false} type='delete' onClick={()=>{this.DeletePublicationDetail(obj.student_Pub_Id)}}></Icon>
              
            </div>
        </p><hr/></>)
       })
     }
       
      </TabPane>

      
      <TabPane tab="Attributes" key="5">

       {
         this.state.attributes.map((obj)=>{
           return(
           <> 
           <hr/>
           <b>{obj}</b>
             
           
           </>)
         })
       }
       
      </TabPane>
     

      
<TabPane tab="Photos" key="6">
<hr/>
<center>
       
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
            
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </center>
 
</TabPane>

    </Tabs>
  </div>

    
</div>
    
    </div>
    </Layout>
   
  
  

  )
  }else{
    return <></>
  }
}
}


export default Profile




