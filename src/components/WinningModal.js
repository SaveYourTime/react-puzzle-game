import React, { Component } from 'react';
import { Modal } from 'antd';
import { Redirect } from "react-router-dom";

class WinningModal extends Component {
  handleOk = () => {
    this.props.history.push('/');
  }

  handleCancel = () => {
    this.props.history.push('/rank');
  }

  render() {
    const { state } = this.props.location;
    if (!state) {
      return (
        <Redirect to='/' />
      );
    }
    const { player, steps } = state;
    return (
      <Modal
        title="Congratulations! You won the puzzle."
        centered={true}
        visible={true}
        closable={false}
        maskClosable={false}
        okText="Play Again!"
        cancelText="Rank"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <h3 className="player">Player: {player}</h3>
        <h4 className="steps">Steps: {steps}</h4>
      </Modal>
    );
  }
}

export default WinningModal;