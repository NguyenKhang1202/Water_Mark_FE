import React, { useState } from 'react';
import './Login.css';
import { Form, Button, Row, Col, notification } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import { extractLSBFromImage } from '../../utils/water.mark.js';

const backgroundImage = `/images/background_login_first.png`;
const image1 = `image_1.png`;
const image2 = `image_2.png`;
const image3 = `image_3.png`;
const image4 = `image_4.png`;
const image5 = `image_5.png`;
const image6 = `image_6.png`;
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

function Login() {
  const navigation = useNavigate();
  const location = useLocation();
  const [max_images, setMaxImages] = useState(6);
  var usernameLogin = location.state.username;
  var list = location.state.list;
  const [setMaxMessages] = useState(6);
  var listImages = [];
  var listImagesDisplay = [];
  list.forEach((i) => {
    let image = i.image;
    let url = `http://localhost:5000/static/${image}`;
    listImages.push(image);
    listImagesDisplay.push({
      src: url,
      value: i.text,
    });
  });

  function onPickImagesWithLimit(max_images) {
    setMaxImages(max_images);
    console.log('max_images: ');
    console.log(max_images);
  }
  function onPickMaxImages(last_image) {
    let image = JSON.stringify(last_image);
    let max_message = `Max images reached. ${image}`;

    setMaxMessages(max_message);
  }
  const onClickSubmit = (values) => {
    let listTextRandomRSA = [];
    // max_images.forEach((element) => {
    //   extractLSBFromImage();
    //   listTextRandomRSA.push(element.value);
    // });

    for (let i = 0; i <= 5; i++) {
      let element = max_images[i];
      listTextRandomRSA[i] = extractLSBFromImage(element.src);
      console.log(listTextRandomRSA[i]);
    }

    console.log(listTextRandomRSA);
    let data = {
      username: usernameLogin,
      listTextRandomRSA: listTextRandomRSA,
    };
    axios
      .post(`/login`, data)
      .then((res) => {
        console.log('response ', res.data);
        notification.success({
          message: 'Login successfully!',
          style: {
            borderRadius: 15,
            backgroundColor: '#b7eb8f',
          },
          duration: 2,
        });
        setTimeout(() => {
          navigation('/home');
        }, 300);
      })
      .catch((err) => {
        notification.error({
          message: 'Log in fail!',
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
        <Col span={4}></Col>
        <Col
          span={16}
          style={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '10%',
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            style={{ minWidth: '300px' }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
              style={{ marginTop: '16px', marginLeft: '100px' }}
            >
              <h2> Username : {usernameLogin}</h2>
            </Form.Item>

            <ImagePicker
              images={listImagesDisplay.map((image, i) => ({ src: image.src, value: image.value }))}
              onPick={onPickImagesWithLimit}
              maxPicks={6}
              onMaxPicks={onPickMaxImages}
              multiple
            />
            <h3 style={{ marginTop: '10px', marginLeft: '28px' }}>Please select up to 6 photos to login</h3>

            <Form.Item style={{ marginTop: '32px', marginLeft: '32px' }}>
              <Button type="primary" onClick={onClickSubmit} className="login-form-button">
                Log in
              </Button>
              <Link to="/register">Register</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
