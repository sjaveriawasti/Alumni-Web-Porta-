import React, { Component } from 'react'
import pic from '../Images/BIIT.jpg'
import {Link} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

 class AdminLogin extends Component {

 
  render() {
    


    return (
      <div>
        <div><center><img src={pic} width="200px" length="100px"></img></center></div>
      
      <div style={{color: 'Green',marginLeft:'200px',marginRight:'200px'}}>
    <h1>Admin Login</h1>
    <Form  className="login-form">
        <Form.Item>
         
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
        
        </Form.Item>
        <Form.Item>
         
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
        
           </Form.Item>
        <Form.Item>
         <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">
            Forgot password
          </a><br/>
          <Link style={{textDecoration:'none',color:'White'}} to="/adminpage"> <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button></Link><br/>
          <Link style={{textDecoration:'none',color:'White'}} to="/register"> <a href="">register now!</a></Link>
        </Form.Item>
      </Form>



    </div>
      </div>
    )
  }
}

export default AdminLogin





