import React from 'react';
import './Login.css';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
const backgroundImage = `/images/background_login_first.png`;

function LoginFirst() {
  const navigation = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { username } = values;

    let data = {
      username: username,
    };

    axios
      .post(`/`, data)
      .then((res) => {
        console.log('response ', res.data);
        notification.success({
          message: 'Please login!',
          style: {
            borderRadius: 15,
            backgroundColor: '#b7eb8f',
          },
          duration: 2,
        });
        setTimeout(() => {
          navigation('/login', { state: { username: username } });
        }, 300);
      })
      .catch((err) => {
        notification.error({
          message: "Username isn't exist!",
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };

  return (
    <div
      className="wrap-container-login"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <Row>
        <Col span={8}></Col>
        <Col
          span={8}
          style={{
            marginTop: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10%',
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            style={{ minWidth: '300px', minHeight: '200px' }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              style={{ marginTop: '48px' }}
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default LoginFirst;
