import React, { Component } from 'react';
import { Table } from 'antd';
import '../css/rank.css';

const columns = [{
  title: 'Name',
  dataIndex: 'player',
  key: 'player',
  align: 'center'
}, {
  title: 'Steps',
  dataIndex: 'steps',
  key: 'steps',
  align: 'center'
}];

class Rank extends Component {
  render() {
    const ranks = JSON.parse(window.localStorage.getItem('ranks'));
    return (
      <div className="wrapper">
        <h2 className="title">Rank</h2>
        <Table
          dataSource={ranks}
          columns={columns}
          bordered={true}
          rowKey={(ranks, index) => index}
          className="rank-table"
        />
      </div>
    );
  }
}

export default Rank;