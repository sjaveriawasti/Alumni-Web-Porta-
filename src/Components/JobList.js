import React, { Component } from 'react'
import { List,Icon} from 'antd';

const data = [
  {
    title: 'Software Developer',
  },
  {
    title: 'Associate Software Engineer',
  },
  {
    title: 'Data Scientist',
  },
  
];


class JobList extends Component {
  render() {
    return (
      
      <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          
          title={<b>{item.title}</b>}
          description=""
        />

        <div>
        <button><Icon type='edit'/></button>{'   '}
          <button><Icon type='delete'/></button></div>
      </List.Item>
    )}
  />

    )
  }
}
export default JobList


