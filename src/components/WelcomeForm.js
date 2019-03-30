import React from 'react';
import { Modal, Form, Input } from 'antd';

class WelcomeForm extends React.Component {
  render() {
    const { onOk, onCancel, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        centered={true}
        visible={true}
        closable={false}
        maskClosable={false}
        title="Welcome to Puzzle Game!"
        okText="Play Now!"
        cancelText="Play as Guest"
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Player's Name">
            {getFieldDecorator(`player`, {
              rules: [{ required: true, message: 'Player name is required!' }],
            })(
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WelcomeFormWrapper = Form.create({ name: 'welcome_form_in_modal' })(WelcomeForm);
export default WelcomeFormWrapper;