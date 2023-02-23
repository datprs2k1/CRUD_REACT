import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import api from '@/services/api';
import { setAuthenticated, setToken, setUser } from '@/services/auth';
import { useNavigate } from 'react-router';

function Login(props) {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/User/login', {
        email: data.email,
        password: data.password,
      });

      setToken(response.data.token);

      setUser(response.data.user);

      setAuthenticated(true);

      navigate('/admin');
    } catch (error) {}

    setLoading(false);
  };

  const [form] = useForm();

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex justify-center items-center bg-white h-screen w-screen">
        <div className="bg-gray-400 rounded-lg shadow-xl p-10 w-10/12 h-auto md:w-4/12">
          <h1 className="text-2xl text-center mb-4 font-bold">Login</h1>
          <Row justify="center" align="middle">
            <Col span={24}>
              <Form
                className=""
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="on"
                form={form}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    { type: 'email', message: 'Please input a valid email!' },
                  ]}
                >
                  <Input type="email" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
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
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{6,})/,
                      message:
                        'Password must contain at least one uppercase letter, one lowercase letter and one number!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                  <Button type="primary" htmlType="submit" className="bg-blue-600">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  );
}

export default Login;
