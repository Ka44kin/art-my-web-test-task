import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Space } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USERS_URL } from '../../utils/network';

const { Option } = Select;
const ApiAccessToken = process.env.REACT_APP_API_ACCESS_TOKEN; //К сожалению с API взять токен нельзя(((

const EditUser = () => {
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({});



    useEffect(() => {
        // Запрос для получения данных пользователя
        fetch(`${USERS_URL}/${userId}`)
          .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
          })
          .then((data) => {
            setUserData(data.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
          });
    }, [userId]);

  const onFinish = (values) => {
    // Запрос для обновления данных пользователя
    const apiUrl = `${USERS_URL}/${userId}`;
    const accessToken = `Bearer ${ApiAccessToken}`;

    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": 'application/json',
        "Authorization": accessToken,
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        status: values.status,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user data');
        }
        toast.success('User data updated successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: "light",
        });

        // Задержка редиректа на 2 секунды
        setTimeout(() => {
          window.location.href = '/users';
        }, 2000);
      })
      .catch((err) => {
        toast.error('Failed to update user data');
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Form name="editUser" onFinish={onFinish} initialValues={userData}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name!',
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
              message: 'Please input the email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => (window.location.href = '/users')}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
