import React, {Component}from 'react'
import Index from './AdminIndex'
import Header from './AdminHead'
import New from '../Images/new.png'
import Old from '../Images/old.jpg'
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button,Label,Input } from 'reactstrap';
import { Layout, Menu, Tabs,Icon,message,label,Select} from 'antd'
import { Chart } from "react-google-charts";
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;
const { Option } = Select;
const InputGroup = Input.Group;

class AdminSurveyReport extends Component {

  constructor(props){
    super(props)
    this.state = {
    surveys:'',
    getresponse:false,
    getReportResponse:false,
    sje_Id:'',
    report:[]
     
    };
    this.handleGetReport=this.handleGetReport.bind(this)
  }

 

handleGetReport(e){
    
    this.state.sje_Id=e.target.value
    fetch(`http://localhost:51691/api/SurveyReports/GetReport/${this.state.sje_Id}`,{
        method:"GET",
        mode:"cors",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
    })
    .then(res => {
      res.json()
      .then(data => {
        this.setState({
          report:data,
          getReportResponse:true
        })
      })
    })
}

  

  componentDidMount=()=>{
    const  cnic=window.localStorage.getItem("cnic")
    fetch(`http://localhost:51691/api/Search/GetSurvey/${cnic}`,{
        method:"GET",
        mode:"cors",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
    })
    .then(res => {
        if(res.ok){
         res.json().then(data => {
           console.log(data)
           this.setState({surveys:data,
            getresponse:true})
          
        })
    
    
        }
        else{

        }
    })
}
    
    
    
    
    
    
      

  





  render(){
   
    console.log(this.state.Friends)
  return (
    <Layout style={{ marginLeft: 200 }}>
        <Index/>
   <Header/>
   <Content>
   <div className='container' style={{backgroundColor:'White',width:'1000px',marginTop:'15px',marginLeft:'15px',float:'left',height:'700px'}}>
  <hr/>
  <center><h3>Reports</h3></center>
  <hr/>
  {
      this.state.getresponse?(<div className='container'>
 <Row>
          <Col xs='0'><Label><b>Select Survey</b></Label></Col>
          <Col><Input type="select"  id="survey" onChange={this.handleGetReport}>
          <option>-- Select Survey --</option>
         {
           this.state.surveys.map((value,key)=>{
             return (<>
              <option value={value.sjE_Detail_Id}>{value.title}</option>
              
             </>)
           })
         }
          
        </Input></Col>
        </Row>
      </div>):(<div>
          <center>No Reports</center>
      </div>)
  }
  
{
  this.state.getReportResponse ? (
     <div>
       {
         this.state.report.map(r => {
            return <>
              <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={r.graphData}
  options={{
    title:  `${r.question.question_No} ${r.question.question}`,
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
            </>
         })
       }
     </div>
  ): (<div></div>)
}
   
   
</div>
   </Content>
   </Layout>
  );
    }
}


export default AdminSurveyReport
