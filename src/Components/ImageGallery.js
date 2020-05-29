import React, { Component } from 'react'
import Header from './Head'
import Index from './Index'
import { Layout, Menu} from 'antd';
import { Upload, Icon, Modal } from 'antd';
import groupimg from '../Images/Group.png'
const { Content, Footer, Sider } = Layout;


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


class ImageGallery extends Component {
  
        state = {
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
    render() 
  {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
        <Layout style={{ marginLeft: 200 }}>
        <Index/>
        <Header/>
    <div  style={{backgroundColor:'White',marginTop:'15px',marginLeft:'20px',height:'600px',width:'1110px'}}>
        <div  className='container' style={{backgroundColor:'White',marginTop:'15px',marginLeft:'250px',height:'600px',width:'500px'}}>
    
<br/>
        <h2>Photos</h2><br/>
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
      
        
        </div>
    </div>
        </Layout>
    )
  }
}

export default ImageGallery
