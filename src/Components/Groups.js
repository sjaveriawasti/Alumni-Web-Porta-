import React, { Component } from 'react'
import Index from './Index'
import Header from './Head'
import groupimg from '../Images/Group.png'
import New from '../Images/new.png'
import Old from '../Images/old.jpg'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Label } from 'reactstrap';
import { Layout, Menu, Tabs, Icon, message, Button, Avatar, List, Modal, Input, Checkbox, Dropdown ,Select} from 'antd'
const { SubMenu } = Menu;
const {option}=Select;
const { Content, Footer, Sider } = Layout
const { TabPane } = Tabs;


class Groups extends Component {

  constructor(props) {
    super(props)
    this.state = {
      group: {
        groupName: '',
        members: [],
        cnic : localStorage.getItem("cnic")
      },
      gotFriendsResponse:false,
      gotResponse: false,
      NewGroup: false,
      Friends: [],
      dataToReturn:[],
      admin:false,
      mycnic : window.localStorage.getItem("cnic")

    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onChange = this.onChange.bind(this);
   
  }

  showNewGroup = () => {
    this.setState({
      NewGroup: true,

    });
  };
  handleCreate = () => {
    console.log(this.state.group)

    fetch(`http://localhost:51691/api/FriendAndGroup/CreateGroup`, {
      method: "POST",
      body:JSON.stringify(this.state.group),
      mode: "cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if (res.ok) {
       
        this.setState({ NewGroup: false })
      message.success("Group Created")

    }
    })
  };

  DeleteGroup = (id) => {
    fetch(`http://localhost:51691/api/FriendAndGroup/DeleteGroup/${id}`, {
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

  closeNewGroup = () => {

    this.setState({
      NewGroup: false,
    });
  };
  onChange(e) {
    if(e.target.checked){
      this.state.group.members.push(e.target.value)
    }else{
      this.state.group.members =this.state.group.members.filter(m =>m !== e.target.value) 
    }
    //console.log(`${e.target.value}`,e.target.checked);
  }

 

  onTextChange(e) {
    this.state.group.groupName = e.target.value
  }
  componentDidMount = () => {

    const cnic = window.localStorage.getItem("cnic");
    fetch(`http://localhost:51691/api/FriendAndGroup/GetFriends/${cnic}`, {
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
          this.setState({ Friends: data, gotFriendsResponse: true })
        })

      }
      else {
        message.error("No Friends");
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
    
     
    this.setState({ dataToReturn:data,gotResponse : true})
   })
    
  }
else{

}
})
  }


  

  
  
   

  render() {
    
    if (this.state.gotResponse && this.state.gotFriendsResponse) {
      const { Friends} = this.state;
      console.log(Friends)
      console.log(this.state.dataToReturn)
     



     
      return (

      
        <Layout style={{ marginLeft: 200 }}>
          <Index />
          <Header />
          <Content>
            <div className='container' style={{ backgroundColor: 'White', width: '1000px', marginTop: '15px', marginLeft: '15px', float: 'left', height: '700px' }}>


              <center>
                <h3>Create Group </h3>

                <Button type="primary" onClick={this.showNewGroup}>New</Button>
              </center>
              <hr />
            


{
              this.state.dataToReturn.map((obj) => {
                return (
                  <>

             {
               this.state.mycnic===obj.cnic?(<div>
                     <Avatar size={30} src={groupimg}/>
                     <label><Link style={{textDecoration:'none',color:'Black'}} to={`openGroup/${obj.group_Id}/${obj.group_Name}/${obj.cnic}`}><b>{obj.group_Name} </b></Link></label>
                       
                     
                  

                    <div style={{float:'right'}}>
                   
                    <Icon style={{color:'red'}} type='delete' onClick={()=>{this.DeleteGroup(obj.group_Id)}}/>
                      
                      </div>
              
              <hr />      

               </div>):(<div>

                <Avatar size={30} src={groupimg}/>
                     <label><Link style={{textDecoration:'none',color:'Black'}} to={`openGroup/${obj.group_Id}/${obj.group_Name}/${obj.cnic}`}><b>{obj.group_Name} </b></Link></label>
                     
                    
                    <hr/>
               </div>)

             }

                   
                  </>
                );
              })

        


}
             

            </div>
          </Content>

          <Modal
            title={<center><b>New Group</b></center>}
            visible={this.state.NewGroup}
            onOk={this.handleCreate}
            onCancel={this.closeNewGroup}
            footer={[
             
              <Button key="submit" type="primary" onClick={this.handleCreate}>
                Create
            </Button>
            ]}

          >

            <Label > <b>Group Name</b></Label>{' '}<br />
            <Input id="groupName" onChange={this.onTextChange}></Input><br /><br />
            <Label ><b>Select Members</b></Label>{' '}<br />
           
            {
              Friends.value.map((value, key) => {
                return (
                  <>
                  <Row>
                    <Col xs='1'><Checkbox onChange={this.onChange} value={value.cnic}></Checkbox></Col>
                    <Col xs='1'><Avatar size={30} src={"http://localhost:51691/"+value.new_Image}/></Col>
                    <Col> {value.student_Name}<br/>
                {value.reg_No}{' '}<b>(</b>{value.discipline}-{value.semester}{value.section}<b>)</b>{''}<br/><hr/></Col>
                  </Row>
                    
                   
                  </>
                );
              })

            }


          </Modal>



         

         

         

        </Layout>
      )
    }
    else {
      return <></>
    }
  }
}

export default Groups
