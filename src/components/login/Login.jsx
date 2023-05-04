import React, { useState } from 'react';
import './Login.css';
import { Form, Button, Row, Col, notification } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';

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
const imageList = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
// function getImage(username, fileName, listImages) {
//   axios.get(`/${username}/${fileName}`).then((res) => {});
// }

function Login() {
  const navigation = useNavigate();
  const location = useLocation();
  const [max_images, setMaxImages] = useState(9);
  var usernameLogin = location.state.username;
  const [setMaxMessages] = useState(6);
  var listImages = [];
  imageList.forEach((element) => {
    listImages.push(`http://localhost:5000/static/${element}`);
  });
  // imageList.forEach((element) => {
  //   setTimeout(getImage(usernameLogin, element, listImages), 10);
  // });

  console.log(listImages);
  var listImagesDisplay = [];
  for (let i = 0; i < 9; i++) {
    listImagesDisplay.push({
      src: listImages[i],
      value: i,
    });
  }
  console.log('listImagesDisplay');
  console.log(listImagesDisplay);
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
    let listImages = [];
    max_images.forEach((element) => {
      listImages.push(element.src);
    });
    console.log(listImages);
    let data = {
      username: usernameLogin,
      password: listImages,
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
