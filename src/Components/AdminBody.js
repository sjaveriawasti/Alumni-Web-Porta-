import React ,{ useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { ButtonGroup ,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import { Layout, Menu, Icon} from 'antd';
import { Container, Row, Col } from 'reactstrap';
import Head from './AdminHead' 
const { Content, Footer, Sider } = Layout;
const AdminBody=()=> {
    const [activeTab, setActiveTab] = useState('1');
    const [numbers,setNumbers] = useState([]);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);

   
    }

  return (
    <Layout style={{ marginLeft: 200 }}>
<Head/>


<div className='container' style={{backgroundColor:'White',width:'1120px',textAlign:'center',marginTop:'40px',marginLeft:'15px',float:'left',height:'40px',marginBottom:'500px' }}>
<h3>Welcome to Dashboard! </h3>

</div>
        
        
            </Layout>
  )
}

export default AdminBody
