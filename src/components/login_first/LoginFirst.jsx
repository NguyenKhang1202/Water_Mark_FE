import React from 'react';
import './Login.css';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';
import { shuffle } from 'utils/utils';
import { embedMessage } from 'utils/water.mark1';
const backgroundImage = `/images/background_login_first.png`;
const image1 = `image_1.jpg`;
const image2 = `image_2.jpg`;
const image3 = `image_3.jpg`;
const image4 = `image_4.jpg`;
const image5 = `image_5.jpg`;
const image6 = `image_6.jpg`;
const image7 = `image_7.jpg`;
const image8 = `image_8.jpg`;
const image9 = `image_9.jpg`;
const image10 = `image_11.jpg`;
const image11 = `image_11.jpg`;
const image12 = `image_12.jpg`;
const image13 = `image_13.jpg`;
const image14 = `image_14.jpg`;
const image15 = `image_15.jpg`;
const image16 = `image_16.jpg`;
const image17 = `image_17.jpg`;
const image18 = `image_18.jpg`;

const imageList = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
];

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

        // get url, text => water mark
        console.log(res.data.data.listUrlImages);
        console.log(res.data.data.listTextRandomRSA);
        var listUrlImages = res.data.data.listUrlImages;
        var listTextRandomRSA = res.data.data.listTextRandomRSA;
        var list = [];
        listUrlImages.forEach((element, index) => {
          list.push({ image: element, text: listTextRandomRSA[index] });
        });
        var array1 = imageList.filter((n) => !listUrlImages.includes(n));
        array1 = shuffle(array1);
        for (let i = 1; i <= 3; i++) {
          list.push({
            image: array1[i],
            text: Math.random().toString(36).substring(2, 7),
          });
        }

        var list1 = shuffle(list);
        setTimeout(() => {
          navigation('/login', {
            state: {
              username: username,
              list: list1,
            },
          });
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
