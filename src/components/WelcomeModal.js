import React from 'react';
import WelcomeForm from './WelcomeForm';
import { Redirect } from "react-router-dom";

class WelcomeModal extends React.Component {
  handleOk = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.handleStorePlayerName(values.player);
      this.handleRedirectToGame();
    });
  }

  handleCancel = () => {
    this.handleStorePlayerName();
    this.handleRedirectToGame();
  }

  handleStorePlayerName = (player = 'Guest') => {
    window.localStorage.setItem('player', player);
  }

  handleRedirectToGame = () => {
    this.props.history.push('/');
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      window.localStorage.getItem('player') ?
        <Redirect to="/" /> :
        <WelcomeForm
          wrappedComponentRef={this.saveFormRef}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
    );
  }
}

export default WelcomeModal;