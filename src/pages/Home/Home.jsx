import { Button, Col, Row, Table, Space, Modal, Form, notification } from 'antd';
import { useEffect, useState } from 'react';
import api from '@services/api';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { UserModal } from '@/containers';

function Home(props) {
  const [dataSource, setDataSource] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [isAdd, setIsAdd] = useState(false);

  const { confirm } = Modal;

  const [keyword, setKeyword] = useState('');

  const [selectedUser, setSelectedUser] = useState({});

  const onAdd = () => {
    setIsAdd(true);
    setIsOpen(true);
  };

  const onEdit = (user) => {
    setIsAdd(false);
    setSelectedUser(user);
    setIsOpen(true);
  };

  const onSuccess = async () => {
    onClose();

    await getData();

    notification.open({
      message: 'Thành công.',
      description: 'Thành công.',
    });
    await getData();
  };

  const onError = async () => {
    onClose();

    await getData();

    notification.open({
      message: 'Lỗi.',
      description: 'Có lỗi xảy ra.',
    });
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedUser({});
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

          setSelectedUser({});

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
          <EditOutlined className="text-xl text-blue-500" onClick={() => onEdit(record)} />
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
          <Search
            allowClear
            type="text"
            label="Search"
            className="w-36 md:w-72"
            enterButton
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col span={8} className="flex justify-end">
          <Button type="primary" className="bg-blue-500" onClick={() => onAdd()}>
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
            pagination={{ defaultPageSize: 5 }}
          />
        </Col>
      </Row>

      {isOpen && (
        <UserModal
          onSuccess={onSuccess}
          onError={onError}
          onClose={onClose}
          selectedUser={selectedUser}
          isAdd={isAdd}
        />
      )}
    </>
  );
}

export default Home;
