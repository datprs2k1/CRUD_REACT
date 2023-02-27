import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { api } from '@/services';

function UserModal(props) {
  const { onSuccess, onError, onClose, selectedUser, isAdd } = props;

  useEffect(() => {
    form.setFieldsValue({
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
    });
  }, [selectedUser]);

  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    try {
      if (isAdd) {
        const response = await api.post('/User/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } else {
        const response = await api.put(`/User/${data.id}`, {
          name: data.name,
          email: data.email,
        });
      }

      form.resetFields();
      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return (
    <>
      <Modal title={isAdd ? 'Thêm tài khoản' : 'Sửa tài khoản'} open={true} onOk={form.submit} onCancel={onClose}>
        <Form layout="vertical" autoComplete="on" onFinish={onSubmit} form={form}>
          <Form.Item name="id" hidden>
            <Input hidden></Input>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          {isAdd && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters!',
                },
                {
                  max: 20,
                  message: 'Password must be at most 20 characters!',
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter and one number!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default UserModal;
