import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Tooltip, Checkbox, Button, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Container } from '@material-ui/core';
import './register.css';
import Axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function UserRegister(props) {
  const [form] = Form.useForm();
  const navigation = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let body = {
      username: values.username,
      password: values.password,
      fullName: values.fullName,
    };
    console.log('body ', body);
    Axios.post(`/register`, body)
      .then((res) => {
        console.log('res ', res.data);
        notification.success({
          message: 'Register successfully!',
          style: {
            borderRadius: 15,
            backgroundColor: '#b7eb8f',
          },
          duration: 2,
        });
        setTimeout(() => {
          navigation('/login');
        }, 500);
      })
      .catch((err) => {
        console.log('err ', err);
        notification.error({
          message: 'Register fail!',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className="register">
        <div className="title-register">Register user</div>
        <div className="form">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            style={{ paddingRight: 136 }}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="Username login">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
                {
                  max: 50,
                  message: 'The length should not exceed 50 characters!',
                },
                {
                  min: 6,
                  message: 'The length must not be less than 6 characters!',
                },
              ]}
            >
              <Input />
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
                  min: 8,
                  message: 'The length must not be less than 8 characters!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your full name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>You must comply with our rules</Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default UserRegister;
