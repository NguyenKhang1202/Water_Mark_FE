import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './layout.css';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutApp(props) {
  const navigation = useNavigate();
  const [current, setCurrent] = useState('mail');

  let keyMenu;
  let tmp = window.location.pathname;
  let tmpArr = tmp.split('/');
  keyMenu = `/${tmpArr[1]}`;
  console.log('key ', keyMenu, ', ', tmpArr);

  console.log('location ', [window.location.pathname]);
  const handleClick = (event) => {
    setCurrent(event.key);
  };
  const handleLogout = () => {
    navigation('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, position: 'sticky', top: 0, zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '20px',
              marginTop: '0px',
            }}
          >
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              <SubMenu
                key="SubMenu"
                icon={
                  <IconButton aria-label="settings" onClick={handleClick}>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </IconButton>
                }
                style={{ background: 'none !important' }}
              >
                <Menu.Item key="setting:1" onClick={handleLogout}>
                  Log out
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Header>
        <Footer style={{ textAlign: 'center' }}>
          <h1>WaterMark</h1>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
