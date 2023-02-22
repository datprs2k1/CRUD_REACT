import { Button, Col, Input, Row, Table, Space, Modal, Form, InputNumber, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '@services/api';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

function Home(props) {
  const [dataSource, setDataSource] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { confirm } = Modal;

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [keyword, setKeyword] = useState('');

  const handleOk = (data) => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const onAdd = async (data) => {
    try {
      const response = await api.post('/User/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      form.resetFields();

      handleOk();

      notification.open({
        message: 'Thành công.',
        description: 'Thêm mới thành công.',
      });

      await getData();
    } catch (error) {
      notification.error({
        message: 'Lỗi.',
        description: error.response.data.message,
      });
    }
  };

  const getUserByID = async (id) => {
    try {
      const response = await api.get(`/User/${id}`);

      form2.setFieldsValue({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
      });

      setIsEditModalOpen(true);
    } catch {
      notification.open({
        message: 'Lỗi.',
        description: 'Có lỗi xảy ra.',
      });
    }
  };

  const onUpdate = async (data) => {
    try {
      const result = await api.put(`/User/${data.id}`, {
        name: data.name,
        email: data.email,
      });

      form2.resetFields();

      handleOk();

      notification.open({
        message: 'Thành công.',
        description: 'Cập nhật thành công.',
      });

      await getData();
    } catch (error) {
      notification.open({
        message: 'Lỗi.',
        description: 'Có lỗi xảy ra.',
      });
    }
  };

  const onDelete = async (id) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          const response = await api.delete(`/User/${id}`);

          notification.open({
            message: 'Thành công.',
            description: 'Xóa thành công.',
          });

          await getData();
        } catch (error) {
          notification.open({
            message: 'Lỗi.',
            description: 'Có lỗi xảy ra.',
          });
        }
      },
    });
  };

  const onSearch = () => {
    return dataSource.filter((item) => item.name.includes(keyword) || item.email.includes(keyword));
  };

  const getData = async () => {
    const response = await api.get('/User');

    setDataSource(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined className="text-xl text-blue-500" onClick={() => getUserByID(record.id)} />
          <DeleteOutlined className="text-xl text-red-500" onClick={() => onDelete(record.id)} />
        </Space>
      ),
      align: 'center',
    },
  ];
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={16}>
          <Search allowClear type="text" className="w-72" onChange={(e) => setKeyword(e.target.value)} />
        </Col>
        <Col span={8} className="flex justify-end">
          <Button type="primary" className="bg-blue-500" onClick={() => setIsAddModalOpen(true)}>
            Thêm mới
          </Button>
        </Col>
      </Row>
      <Row className="mt-8">
        <Col span={24}>
          <Table
            dataSource={keyword != '' ? onSearch() : dataSource}
            columns={columns}
            rowKey="id"
            pagination={{ defaultPageSize: 10 }}
          />
        </Col>
      </Row>

      <Modal
        title="Thêm tài khoản"
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" className="bg-blue-500" onClick={form.submit}>
            Ok
          </Button>,
        ]}
      >
        <Form layout="vertical" autoComplete="on" onFinish={onAdd} form={form}>
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
        </Form>
      </Modal>

      <Modal
        title="Sửa tài khoản"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" className="bg-blue-500" onClick={form2.submit}>
            Ok
          </Button>,
        ]}
      >
        <Form layout="vertical" autoComplete="on" onFinish={onUpdate} form={form2}>
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
        </Form>
      </Modal>
    </>
  );
}

export default Home;
