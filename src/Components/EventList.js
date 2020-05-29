import React, { Component } from 'react'

import { List, Avatar, Icon ,Input} from 'antd';
const { Search } = Input;
const data = [
  
  {
    title: 'GDG Flagship Event : DevFest 2019',
  },
  
];


class EventList extends Component {
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
export default EventList


