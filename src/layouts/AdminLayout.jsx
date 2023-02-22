import React from 'react';
import {
  NotificationFilled,
  SmileOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, theme } from 'antd';
import './AdminLayout.css';
import user from '@assets/user.jpg';
import { deleteToken, deleteUser } from '@/services/auth';
import { deleteAuthenticated, getToken } from '@services/auth';
import { useNavigate } from 'react-router';
import api from '@services/api';

const { Header, Content, Footer, Sider } = Layout;

const MenuItem = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Quản trị hệ thống',
    children: [
      {
        key: '1_1',
        icon: <UserOutlined />,
        label: 'Tài khoản',
      },
    ],
  },
];

function AdminLayout(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const logout = async () => {
    const token = JSON.parse(getToken());
    await api.post('/User/logout', token);

    deleteToken();
    deleteUser();
    deleteAuthenticated();

    navigate('/login');
  };

  const items = [
    {
      key: '1',
      label: 'Đăng xuất',
      onClick: () => logout(),
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider breakpoint="lg" collapsedWidth="0" width={250}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1_1']} defaultOpenKeys={['1']} items={MenuItem} />
      </Sider>
      <Layout className="h-screen">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex item-center align-middle gap-10 mr-4 float-right">
            <div>
              <NotificationFilled className="text-xl text-gray-500" />
            </div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <div className="flex justify-center align-middle items-center">
                <img src={user} className="rounded-full object-fill w-10 h-auto mr-3" />
                <span className="text-base text-teal-400 font-semibold">Admin</span>
              </div>
            </Dropdown>
          </div>
          <div className="flex items-center justify-around text-center align-middle h-full overflow-hidden">
            <h1 className="invisible md:visible text-black font-bold text-xl">
              PHẦN MỀM QUẢN LÝ HỆ THỐNG BẢO ĐẢM VÀ KIỂM ĐỊNH CHẤT LƯỢNG GIÁO DỤC ĐẠI HỌC
            </h1>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
