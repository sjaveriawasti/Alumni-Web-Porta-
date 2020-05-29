import React, {Component}from 'react'
import Index from './Index'
import Header from './Head'
import New from '../Images/Profile.jpg'
import Old from '../Images/old.jpg'
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { Layout, Menu, Tabs,Icon,message} from 'antd'
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;


class Friends extends Component {

  constructor(props){
    super(props)
    this.state = {
    Friends:[],
    Requests:[],
    gotResponse : false,
    gotFriendsResponse:false,
    istrue:false,
    bit:false
     
    };
  }

  AcceptRequest=(cnic)=> {
    console.log('shgdhjs',cnic)
      
    fetch(`http://localhost:51691/api/FriendAndGroup/AddFriend/${cnic}`,{
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

      });
     message.success("Request Accepted")
    }
  })
  
  
   }

   RejectRequest=(cnic)=> {
    console.log('shgdhjs',cnic)
      
    fetch(`http://localhost:51691/api/FriendAndGroup/DeleteFriend/${cnic}`,{
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
      });
     message.success("Request Rejected")
    }
  })
  
   }


   UnFriend=(fcnic)=> {
    console.log(fcnic)
    const mycnic= window.localStorage.getItem("cnic");
      
    fetch(`http://localhost:51691/api/FriendAndGroup/UnFriend/${mycnic}/${fcnic}`,{
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
      });
     
    }
  })
  
   }
  

  componentDidMount=()=>{

    const cnic= window.localStorage.getItem("cnic");
    fetch(`http://localhost:51691/api/FriendAndGroup/GetFriends/${cnic}`,{
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
      this.setState({ Friends:data,gotFriendsResponse : true})
     })
      
    }

})

fetch(`http://localhost:51691/api/FriendAndGroup/GetRequest/${cnic}`,{
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
      this.setState({ Requests:data ,
         gotResponse : true,
        istrue:true})

     })
      
    }

})

}



  render(){
    if(this.state.gotResponse && this.state.gotFriendsResponse){
    const{Friends,Requests}  = this.state;
   
    console.log(this.state.Friends)
  return (
    <Layout style={{ marginLeft: 200 }}>
        <Index/>
   <Header/>
   <Content>
   <div className='container' style={{backgroundColor:'White',width:'800px',marginTop:'15px',marginLeft:'15px',float:'left',height:'700px'}}>
  
   
   <Tabs defaultActiveKey="1" >
    
    <TabPane 
    
      tab={
        <span>
           <Icon type="team" />
         Friends List         
        </span>
      }
      key="1"
    >
       
      {
        
         Friends.value.map((value,key)=>{
             return (
               <>
          <Row>
          
            <Col xs='3'><img src={Old} width='80px' height='100px'></img></Col>
            <Col xs='3'> <img src={New} width='80px' height='100px'></img></Col>
            <Col xs='5'>{value.student_Name}<br/>{value.reg_No}<br/><br/>
            <button><Link style={{textDecoration:'none',color:'green'}} to={`friendProfile/${value.cnic}`}>View Profile</Link></button>
          {' '}  <button onClick={()=>{this.UnFriend(value.cnic)}}><Link style={{textDecoration:'none',color:'green'}} >UnFriend</Link></button>
            </Col>
            
          </Row>
          <hr/>
          </>
           );
          })
      
        }
      
    </TabPane>
<TabPane
      tab={
        <span>
          <Icon type="profile" />
         Friend Requests
        </span>
      }
      key="2"
    >


{
   this.state.istrue? (
    <div>
  {
       Requests.value.map((value,key)=>{
             return (
               <>
      <Row>
        <Col xs='3'><img src={New} width='100px' height='100px'></img></Col>
        <Col xs='3'><img src={Old} width='100px' height='100px'></img></Col>
        <Col xs='5'>{value.student_Name}<br/>{value.reg_No}<br/><br/>
        <button onClick={()=>{this.AcceptRequest(value.cnic)}}>Accept</button>{' '}
        <button  onClick={()=>{this.RejectRequest(value.cnic)}}>Reject</button>
        </Col>
        
      </Row>
      <hr/>
      </>
           );
          })
      }
        </div>
      ) : (
        <div>
       <center>No Friends</center>
      </div>
      
       
      )}
                 
<hr/>





    
    </TabPane>
  </Tabs>,
  
  </div>
   </Content>
   </Layout>
  )
}
  else{
    return <></>
  }
}
}

export default Friends
