import React, { Component } from 'react'
import YearPicker from "react-year-picker";
import Header from './Head'
import Index from './Index'
import pic1 from '../Images/Profile.jpg'
//import {Button } from 'reactstrap';
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import { Layout, Menu, Icon } from 'antd';
import { Upload, message, Button} from 'antd';
import { Card } from 'antd';
import { Modal } from 'antd';
import moment from 'moment';
import { Drawer, Col, Row, Select,Form ,DatePicker,Avatar} from 'antd';
const { Option } = Select;
const dateFormat = 'YYYY';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { Content, Footer, Sider } = Layout;
const cnic= window.localStorage.getItem("cnic");
    


class EditProfile extends Component{
 
  constructor(props){
    super(props)
    this.state = {
      gotResponse : false,
      InfoDrawer: false,
      EducationDrawer:false,
      JobDrawer:false,
      SkillsDrawer:false,
      FamilyDrawer:false,
      PublicationDrawer:false,
      GalleryDrawer:false,
      AttributeDrawer:false,
      gotattributeResponse:false,
      attributefield:'',
      user:{},
      CNIC:cnic,
    Stu_Name:'',Phone_Number:'',Office_Number:'',Secondary_Email:'',City:'',Marital_Status:'',
     Degree_name:'',Subjects:'',Institute_name:'',Completion_year:'',
     Relation:'',Name:'',
     Designation:'',Organization:'',Starting_Date:'',Ending_Date:'',
     Title:'',Publication_URL:'',Publisher:'',Publish_Date:'',Description:'',
     Field_Of_Interest:'',Skills:'',
     Attributes:'',
     isUploaded :false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
   this.handleEndDateChange=this.handleEndDateChange.bind(this);
   this.handleProfileChange=this.handleProfileChange.bind(this);
   this.AttributeOnChange=this.AttributeOnChange.bind(this);
   this.NameOnChange=this.NameOnChange.bind(this);
   this.PhoneChange=this.PhoneChange.bind();
   this.officeChange=this.officeChange.bind();
   this.EmailChange=this.EmailChange.bind();
   this.CityChange=this.CityChange.bind();
   this.Marital_StatusChange=this.Marital_StatusChange.bind();
  
   
  }

  handleFileUpload(e){
    message.loading("Uploading Picture");
    console.log(e.target.files)
      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    
    var formdata = new FormData();
   
    formdata.append("picture", e.target.files[0], e.target.files[0].name);
    formdata.append("cnic", this.state.CNIC);
    console.log(formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata
    };
    
    fetch("http://localhost:51691/api/AddDetail/UploadFile", requestOptions)
      .then(response => response.text())
      .then(result => {
        this.setState({isUploaded:true})
      })
      .catch(error => console.log('error', error));
    }
  handleStartDateChange(m){
    console.log("hsgdjshgd")
    console.log(m)
        this.state.Starting_Date = m
    //console.log(moment)
  }

  handleEndDateChange(m){
    this.state.Ending_Date = m
//console.log(moment)
}

handlePublishDateChange(m){
  this.state.Publish_Date = moment(m._d).format("YYYY/MM/DD");
//console.log(moment)
}

  handleOnChange(e){
    console.log(e.target.value)
    this.setState({
      [e.target.id]:e.target.Value
    })
  }

  handleProfileChange(e){
    this.setState({
      [e.target.id]:e.target.id == '' ? parseInt(e.target.value):e.target.value
    });
  }

 // someMethod() {
    // Force a render with a simulated state change
  
   // this.setState({ state: this.state });
//}
  componentDidMount= () =>{
  
    
    fetch(`http://localhost:51691/api/Students/GetAll/${cnic}`,{
     method:"GET",
     mode:"cors",
     headers:{
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
     }
 }).then(response => response.json().then
 (data => {
   console.log(data)
   this.setState({ user:data,
                   gotResponse:true,
                  Stu_Name:data.student.stu_Name ,
                  Phone_Number:data.student.phone_Number,
                  Office_Number:data.student.office_Number,
                  Secondary_Email:data.student.secondary_Email,
                  City:data.student.city,
                  Marital_Status:data.student.marital_Status,


                })
 
 }))

 fetch(`http://localhost:51691/api/Students/GetAttributes/${cnic}`,{
     method:"GET",
     mode:"cors",
     headers:{
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
     }
 }).then(response => response.json().then
 (data => {
   console.log(data)
   this.setState({ attribute:data,
                   gotattributeResponse:true,
                   Attributes:data,
                
                 

                })
 
 }))
 
   }

updateProfile=()=>{
    
 fetch(`http://localhost:51691/api/Students/Update/${cnic}`,{
  method:"Put",
  body:JSON.stringify(this.state),
  mode:"cors",
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
}).then(res => {
  if(res.ok){
    this.setState({
      InfoDrawer: false,
    });
    message.success("Updated");
  }
  else
  {
   
    this.setState({
      InfoDrawer: false,
    });
    message.error("Not Updated");
  }
})
  }


handleEducationDetail = () => {
    
    console.log(this.state)
    fetch(`http://localhost:51691/api/AddDetail/Education/${cnic}`,{
      method:"POST",
      body:JSON.stringify(this.state),
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){
        this.setState({
          EducationDrawer: false,
        });
        message.success("Record Saved");
      }
      else
      {
        this.setState({
          EducationDrawer: false,
        });
        message.error("Record not saved");
        
      }
    })
   
  };


handlejobDetail = () => {
    
    console.log(this.state)
    fetch(`http://localhost:51691/api/AddDetail/Job/${cnic}`,{
      method:"POST",
      body:JSON.stringify(this.state),
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){
        this.setState({
          JobDrawer: false,
        });
        message.success("Record Saved");
      }
      else
      {
        this.setState({
          JobDrawer: false,
        });
        message.error("Record not saved");
        
      }
    })
   
  };


handleFamilyDetail = () => {
    
    console.log(this.state)
    fetch(`http://localhost:51691/api/AddDetail/Family/${cnic}`,{
      method:"POST",
      body:JSON.stringify(this.state),
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){
        this.setState({
          FamilyDrawer: false,
        });
        message.success("Record Saved");
      }
      else
      {
        this.setState({
          FamilyDrawer: false,
        });
        message.error("Record not saved");
        
      }
    })
   
  };


  handlePublicationDetail = () => {
    
    console.log(this.state)
    fetch(`http://localhost:51691/api/AddDetail/Publication/${cnic}`,{
      method:"POST",
      body:JSON.stringify(this.state),
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){
        this.setState({
          PublicationDrawer: false,
        });
        message.success("Record Saved");
      }
      else
      {
        this.setState({
          PublicationDrawer: false,
        });
        message.error("Record not saved");
        
      }
    })
   
  };

  handleSkills = () => {
    
    console.log(this.state.s)
    fetch(`http://localhost:51691/api/AddDetail/Skills/${cnic}`,{
      method:"POST",
      body:JSON.stringify(this.state),
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){
        this.setState({
          SkillsDrawer: false,
        });
        message.success("Record Saved");
      }
      else
      {
        this.setState({
          SkillsDrawer: false,
        });
        message.error("Record not saved");
        
      }
    })
   
  };

  handleAttribute= () => {
    
    console.log(this.state.s)
    fetch(`http://localhost:51691/api/AddDetail/Attributes/${cnic}`,{
      method:"POST",
      body:JSON.stringify(this.state),
      mode:"cors",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if(res.ok){
        this.setState({
          AttributeDrawer: false,
        });
        message.success("Record Saved");
      }
      else
      {
        this.setState({
          AttributeDrawer: false,
        });
        message.error("Record not saved");
        
      }
    })
   
  };

  
AttributeOnChange(e){
  this.state.Attributes=e.target.value

}
  NameOnChange(e){
    this.state.Stu_Name=e.target.value
   }

   PhoneChange(e){
    this.state.Phone_Number=e.target.value
   }
   officeChange(e){
    this.state.office_Number=e.target.value
   }
   EmailChange(e){
    this.state.Secondary_Email=e.target.value
   }
   CityChange(e){
    this.state.City=e.target.value
   }
   Marital_StatusChange(e){
    this.state.Marital_Status=e.target.value
   }

showInfoDrawer = () => {
   
  this.setState({
  InfoDrawer: true,
  });
 };
infoDrawerClose = () => {
   this.setState({
   InfoDrawer: false,
  });
 };
                  
                  
showEducationDrawer=()=>{
   this.setState({
   EducationDrawer: true,
  });
 };
educationDrawerClose=()=> {
   this.setState({
   EducationDrawer: false,
  });
 };


showJobDrawer=()=>{
   this.setState({
   JobDrawer: true,
  });
 };
JobDrawerClose=()=>{
   this.setState({
   JobDrawer: false,
  });
 };


showFamilyDrawer = () => {
   this.setState({
   FamilyDrawer: true,
  });
 };
FamilyDrawerClose = () => {
   this.setState({
   FamilyDrawer: false,
  });
 };


 showPublicationDrawer = () => {
  this.setState({
  PublicationDrawer: true,
 });
};
PublicationDrawerClose = () => {
  this.setState({
  PublicationDrawer: false,
 });
};

showSkillsDrawer = () => {
  this.setState({
  SkillsDrawer: true,
 });
};
SkillsDrawerClose = () => {
  this.setState({
  SkillsDrawer: false,
 });
};

showGalleryDrawer = () => {
  this.setState({
  GalleryDrawer: true,
 });
};
GalleryDrawerClose = () => {
  this.setState({
  GalleryDrawer: false,
 });
};
showAttributeDrawer = () => {
  this.setState({
  AttributeDrawer: true,
 });
};
AttributeDrawerClose = () => {
  this.setState({
  AttributeDrawer: false,
 });
};

 
  render()
  {
    if(this.state.gotResponse && this.state.gotattributeResponse){
      const{student,stuEducation,stuFamily,stuJob}  = this.state.user;
    console.log(student.stu_Name)
    

  
    return (
        
<Layout style={{ marginLeft: 200 }}>
    <Index/>
    <Header/>
    <Content>
      <div className='container'  style={{backgroundColor:'White',marginTop:'15px',marginLeft:'15px'}}>
        <Avatar size={200} src={"http://localhost:51691/"+student.new_Image}/>{"  "}
        <Upload name="picture" action={`http://localhost:51691/api/AddDetail/UploadFile/${cnic}`} > 
        <Icon type="upload"/> Click to change Profile 
        </Upload>
        
     
    
        
        <hr/>

        <Button onClick={this.showInfoDrawer}  style={{width:'500px',textAlign:'left',height:'50px'}}><Icon type="plus-circle" 
          style={{fontSize:'30px'}}/> {'   '}<b>Add Personal Details</b></Button><br/><br/>
        <Button onClick={this.showEducationDrawer} style={{width:'500px',textAlign:'left',height:'50px'}}><Icon type="plus-circle"  
          style={{fontSize:'30px'}}/> {'   '}<b>Add Education Details</b></Button><br/><br/>
        <Button onClick={this.showJobDrawer} style={{width:'500px',textAlign:'left',height:'50px'}}><Icon type="plus-circle" 
          style={{fontSize:'30px'}}/> {'   '}<b>Add Job Details</b></Button>  <br/><br/>  
        <Button  onClick={this.showFamilyDrawer} style={{width:'500px',textAlign:'left',height:'50px'}}><Icon type="plus-circle" 
          style={{fontSize:'30px'}}/> {'   '}<b>Add Family Details</b></Button><br/><br/>
       <Button  onClick={this.showPublicationDrawer} style={{width:'500px',textAlign:'left',height:'50px'}}><Icon type="plus-circle" 
          style={{fontSize:'30px'}}/> {'   '}<b>Add Publication Info</b></Button><br/><br/>
         <Button  onClick={this.showAttributeDrawer} style={{width:'500px',textAlign:'left',height:'50px'}}><Icon type="plus-circle" 
          style={{fontSize:'30px'}}/> {'   '}<b>Add Attributes</b></Button><br/><br/>   
      

      </div>
    </Content>

<Drawer
          title={<b>Personal Details</b>}
          width={720}
          onClose={this.infoDrawerClose}
          visible={this.state.InfoDrawer}
        >
        
        <Label ><b>Name</b></Label>
        <Input id="Stu_Name" defaultValue={this.state.Stu_Name}  onChange={this.NameOnChange}/><br/>
        <Label ><b>Phone Number</b></Label>
        <Input id="Phone_Number" defaultValue={this.state.Phone_Number}  onChange={this.PhoneChange}/><br/>
        <Label ><b>Office Number</b></Label>
        <Input  id="Office_Number" defaultValue={this.state.Office_Number}  onChange={this.officeChange}/><br/>
        <Label ><b>Email Address</b></Label>
        <Input  id="Secondary_Email" defaultValue={this.state.Secondary_Email}  onChange={this.EmailChange}/><br/>
        <Label ><b>City</b></Label>
        <Input  id="City" defaultValue={this.state.City}  onChange={this.CityChange}/><br/>
        <Label ><b>Marital_Status</b></Label>
        <Input  id="Marital_Satus" defaultValue={this.state.Marital_Status}  onChange={this.Marital_StatusChange}/><br/>
        
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.infoDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.updateProfile} type="primary">
              Update
            </Button>
          </div>
</Drawer>


<Drawer
          title={<b>Add Education</b>}
          width={720}
          onClose={this.educationDrawerClose}
          visible={this.state.EducationDrawer}
        >
      
      
        <Label ><b>Degree Name</b></Label>
        <Input id="Degree_name" placeholder=""  onChange={this.handleOnChange}/><br/>
        <Label ><b>Subjects/Group</b></Label>
        <Input id="Subjects" placeholder=""  onChange={this.handleOnChange}/><br/>
        <Label ><b>Institution</b></Label>
        <Input id="Institute_name" placeholder=""  onChange={this.handleOnChange}/><br/>
        <Label ><b>Completion Year</b></Label>
        <Input id="Completion_year" placeholder=""  onChange={this.handleOnChange}/><br/>
        
    <br />
        

          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.educationDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleEducationDetail} type="primary">
              Add
            </Button>
          </div>
</Drawer>

<Drawer
          title={<b>Add Job Details</b>}
          width={720}
          onClose={this.JobDrawerClose}
          visible={this.state.JobDrawer}
        >
        <Label ><b>Designation</b></Label>
        <Input id="Designation" placeholder=""  onChange={this.handleOnChange}/><br/>
        <Label ><b>Organization</b></Label>
        <Input id="Organization" placeholder=""  onChange={this.handleOnChange}/><br/>
        

        <Row>
        <Col span={12}><Label ><b>Starting Year</b></Label></Col>
        <Col span={12}> <YearPicker  onChange={this. handleStartDateChange} /></Col>            
       </Row> 

       
       <Row>
        <Col span={12}><Label ><b>Ending Year</b></Label></Col>
        <Col span={12}> <YearPicker  onChange={this. handleEndDateChange} /></Col>            
       </Row> 


          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.JobDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handlejobDetail} type="primary">
              Add
            </Button>
          </div>
</Drawer>
        
     
<Drawer
          title={<b>Add Family Details</b>}
          width={720}
          onClose={this.FamilyDrawerClose}
          visible={this.state.FamilyDrawer}
        >

        <Avatar size={200} src={pic1}/>{"  "}
        <Upload name="picture" > 
        <Icon type="upload"/> Click to add Image
        </Upload><br/>
        <Label > <b>Name</b></Label>
        <Input  id='Name'placeholder="Enter Name"  onChange={this.handleOnChange}/><br/>
        <Label > <b>Relation</b></Label>
        <Input id='Relation'placeholder="Enter Name"  onChange={this.handleOnChange}/><br/>
        
        
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.FamilyDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleFamilyDetail} type="primary">
              Add
            </Button>
          </div>
</Drawer>


<Drawer
          title={<b>Add Publication Details</b>}
          width={720}
          onClose={this.PublicationDrawerClose}
          visible={this.state.PublicationDrawer}
        >
         <Label> <b>Title</b></Label>
         <Input  id='Title'placeholder="Enter Name"  onChange={this.handleOnChange}/><br/>
         <Label> <b>Publication/Publisher</b></Label>
         <Input id='Publisher'placeholder="Enter Name"  onChange={this.handleOnChange}/><br/>
         <Label> <b>Select Date</b></Label><br/>
         <DatePicker id="Publish_Date"  defaultValue={moment('01/01/2015', dateFormatList[0])} onChange={this.handleOnChange}></DatePicker><br/><br/>
         <Label> <b>Publication URL</b></Label>
         <Input id='Publication_URL' placeholder="URL"  onChange={this.handleOnChange}/><br/>
         <Label> <b>Description</b></Label>
         <Input  id='Description' placeholder="" type="textarea"  onChange={this.handleOnChange}/><br/>
        
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.PublicationDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handlePublicationDetail} type="primary">
              Add
            </Button>
          </div>
</Drawer>

<Drawer
          title={<b>Add Professional Skills</b>}
          width={720}
          onClose={this.SkillsDrawerClose}
          visible={this.state.SkillsDrawer}
        >

      
        <Label > <b>Feild of Interest</b></Label>
        <Input  id='Field_Of_Interest'placeholder=""  onChange={this.handleOnChange}/><br/>
        <Label > <b>Skills</b></Label>
        <Input type='textarea' id='Skills' placeholder=""  onChange={this.handleOnChange}/><br/>
        
        
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.SkillsDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleSkills} type="primary">
              Add
            </Button>
          </div>
</Drawer>

<Drawer
          title={<b>Add Photos</b>}
          width={720}
          onClose={this.Gallery1DrawerClose}
          visible={this.state.GalleryDrawer}
        >

      
        <Label> <b>Select Photo</b></Label>
        <Upload name="picture" > 
        <Icon type="upload"/> Click to add Image
        </Upload><br/>
        
        
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.GalleryDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.GalleryDrawerClose} type="primary">
              Add
            </Button>
          </div>
</Drawer>

<Drawer
          title={<b>Add Attributes</b>}
          width={720}
          onClose={this.AttributeDrawerClose}
          visible={this.state.AttributeDrawer}
        >

      
        <Label ><b>Attributes</b></Label>
        <Input id="Attributes"  defaultValue={this.state.Attributes}  onChange={this.AttributeOnChange}/><br/>
        
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.AttributeDrawerClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.handleAttribute} type="primary">
              Save
            </Button>
          </div>
</Drawer>

</Layout>
);
}
  else{
    return <></>
      }
}
}


export default EditProfile