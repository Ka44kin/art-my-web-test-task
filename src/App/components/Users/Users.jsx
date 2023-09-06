import React, { useEffect, useState } from 'react';
import { Table, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getApiResource, GOREST_ROOT } from '../../utils/network';

const Users = () => {
    const [pagination, setPagination] = useState({});
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    const getResource = async (url) => {
        try {
            const response = await getApiResource(url);
            console.log(response);

            const list = response.users.map(({ id, name, email, gender, status }) => ({
                key: id,
                name,
                email,
                gender,
                status,
            }));
            setUserList(list);

            // Устанавливаем информацию о пагинации
            setPagination(response.pagination);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTableChange = (pagination) => {
        // Обработчик смены страницы
        const { current } = pagination;
        getResource(`${GOREST_ROOT}?page=${current}`);
    };

    useEffect(() => {
        getResource(GOREST_ROOT);
    }, []);

    const handleRowClick = (record) => {
        // Обработчик клика на строку пользователя
        navigate(`/edit/${record.key}`); // Переход на страницу редактирования с id пользователя
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                {
                    text: 'female',
                    value: 'female',
                },
                 {
                    text: 'male',
                    value: 'male',
                },
            ],
            onFilter: (value, item) => item.gender === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <>
            <Row>
                <Col xs={24}>
                <Table
                    dataSource={userList}
                    columns={columns}
                    pagination={{...pagination, showSizeChanger: false}}
                    onChange={handleTableChange}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record), // Привязываем обработчик к клику на строку
                    })}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Users;

