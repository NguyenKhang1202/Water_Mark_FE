import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Tooltip, Button, notification, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { shuffle } from 'utils/utils';
import ImagePicker from 'react-image-picker';
import './register.css';
import 'react-image-picker/dist/index.css';
import axios from '../../api/axios';

const backgroundImage = `/images/background_login_first.png`;
const image1 = `image_01.png`;
const image2 = `image_02.png`;
const image3 = `image_03.png`;
const image4 = `image_04.png`;
const image5 = `image_05.png`;
const image6 = `image_06.png`;
const image7 = `image_07.png`;
const image8 = `image_08.png`;
const image9 = `image_09.png`;
const image10 = `image_10.png`;
const image11 = `image_11.png`;
const image12 = `image_12.png`;
const image13 = `image_13.png`;
const image14 = `image_14.png`;
const image15 = `image_15.png`;
const image16 = `image_16.png`;
const image17 = `image_17.png`;
const image18 = `image_18.png`;

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

var listImageDisplay = [];
imageList.forEach((image) => {
  listImageDisplay.push({
    src: `images/${image}`,
    value: image,
  });
  listImageDisplay = shuffle(listImageDisplay);
});
for (let i = 0; i <= 8; i++) {
  listImageDisplay.pop();
}
function UserRegister(props) {
  const navigation = useNavigate();
  const [max_images, setMaxImages] = useState(6);
  const [setMaxMessages] = useState(6);
  const [username, setUsername] = useState('');
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

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

  var listUrlImage = [];
  const onClickSubmit = (values) => {
    max_images.forEach((element) => {
      listUrlImage.push(element.value);
    });
    let data = {
      username: username,
      listUrlImage: listUrlImage,
      fullName: 'None',
    };
    console.log(data.listUrlImage);
    axios
      .post(`/register`, data)
      .then((res) => {
        console.log('response ', res.data);
        notification.success({
          message: 'Register successfully!',
          style: {
            borderRadius: 15,
            backgroundColor: '#b7eb8f',
          },
          duration: 2,
        });
        setTimeout(() => {
          navigation('/');
        }, 500);
      })
      .catch((err) => {
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
              name="username"
              className="register-username"
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="Username register">
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
              <input type="text" id="username" name="username" onChange={handleChangeUsername} value={username} />
            </Form.Item>

            <ImagePicker
              images={listImageDisplay.map((image, i) => ({ src: image.src, value: image.value }))}
              onPick={onPickImagesWithLimit}
              maxPicks={6}
              onMaxPicks={onPickMaxImages}
              multiple
            />
            <h3 style={{ marginTop: '10px', marginLeft: '28px' }}>Please select up to 6 photos to register</h3>

            <Form.Item style={{ marginTop: '32px', marginLeft: '32px' }}>
              <Button type="primary" onClick={onClickSubmit} className="login-form-button">
                Register
              </Button>
              <Link to="/register">Login</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default UserRegister;
