import React, { Component } from 'react'
import { FormGroup, Label, Input, FormText ,Col,Row} from 'reactstrap';
import { Layout, Menu, Icon } from 'antd';
import Index from './AdminIndex'
import Head from './AdminHead'
import { Upload, message, Button} from 'antd';
import { Card } from 'antd';
import { Modal } from 'antd';
import pic from '../Images/Profile.jpg'
import Joblist from './JobList'
import { Drawer,  Select,Form ,TimePicker,DatePicker} from 'antd';
import moment from 'moment';
import { List,Avatar} from 'antd';


const { Option } = Select;

const { Content, Footer, Sider } = Layout;


 class AdminRequest extends Component {
  constructor(props){
    super(props)
    this.state = {
    Approvals:[],
    gotResponse : false,
   detail:false,
   Details:[],
    };
  }




    componentDidMount = () => {

    
      fetch(`http://localhost:51691/api/Admin/Approvals/`, {
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
            this.setState({ Approvals: data, gotResponse: true })
          })
  
        }
       
      })
    
    }  

    Approved=(id)=> {
      
        
      fetch(`http://localhost:51691/api/Admin/Approved/${id}`,{
       method:"Put",
       mode:"cors",
       headers:{
         Accept: 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
       }
    })
    .then(response => {
      if(response.ok){
        this.setState({
          istrue: true,
          detail:false
        });
       
      }
    })
    
    
     }
     Reject=(id)=> {
      
        
      fetch(`http://localhost:51691/api/Admin/RejectApprovals/${id}`,{
       method:"Put",
       mode:"cors",
       headers:{
         Accept: 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
       }
    })
    .then(response => {
      if(response.ok){
        this.setState({
          istrue: true,
          detail:false
        });
       
      }
    })
    
    
     }

    ShowDetails = (id) => {

      fetch(`http://localhost:51691/api/Admin/GetDetails/${id}`, {
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
           
            this.setState({ Details:data, detail: true, })
          })
  
        }
       
      })
    
    };
  
    CloseDetail = () => {
      this.setState({
        detail: false,
  
      });
    };


  render() {
    if (this.state.gotResponse) {
      console.log("dgsud")
      console.log(this.state.Details)
    return (
        <Layout style={{ marginLeft: 200 }}>
<Index/>
<Head/>

<div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'30px',marginLeft:'15px',float:'left',marginBottom:'350px' }}>

<hr/>
<center><h3>Requests</h3></center>
<hr/>

{
              this.state.Approvals.map((obj) => {
                return (
                  <>


<Row>
<Col xs='1' ><Avatar size={30} src={"http://localhost:51691/"+obj.new_Image}/></Col>
                <Col xs='9'> {obj.student_Name}{' '}<b>({obj.sjE_Type})</b>
                <br/>
                {obj.reg_No}{' '}<b>(</b>{obj.discipline}-{obj.semester}{obj.section}<b>)</b>{''}<br/></Col>
<Col xs='2'> <div style={{float:'right'}}>
                    <Button onClick={()=>{this.ShowDetails(obj.sjE_Detail_Id)}}><Icon type='check'/>Open</Button>
                      </div></Col>
 </Row>      
              
              <hr />
                  </>
                );
              })

    }   
         
</div>

<Modal
          title={<b>Detail</b>}
          visible={this.state.detail}
          onOk={this.handleCreate}
          onCancel={this.CloseDetail}
          footer={[
            <Button key="back"  onClick={()=>{this.Reject(this.state.Details.sjE_Detail_Id)}}>
              Reject
            </Button>,
            <Button key="submit" type="primary"   onClick={()=>{this.Approved(this.state.Details.sjE_Detail_Id)}}>
              Approve
            </Button>
          ]}

        >

<Label ><b>Title</b></Label><br/>
       {this.state.Details.title}<hr/>
        
        
       <Label ><b>Venue</b></Label><br/>
       {this.state.Details.venue}<hr/>
       
       <Label ><b>Description</b></Label><br/>
       {this.state.Details.description}<hr/>
            


          
        
        </Modal>


            </Layout>
    )
  }
  else {
    return <></>
  }
  }
}

export default AdminRequest

