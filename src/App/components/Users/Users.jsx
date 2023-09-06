    import React, { useEffect, useState } from 'react';
    import { Table, Col, Row, } from 'antd';
    import { useNavigate } from 'react-router-dom';

    import { getApiResource, USERS_URL } from '../../utils/network';

    const Users = () => {
        const [pagination, setPagination] = useState({});
        const [userList, setUserList] = useState([]);
        const [error, setError] = useState(null);
        const [filterGender, setFilterGender] = useState('');
        const navigate = useNavigate();

        const getResource = async (url) => {
            try {
            setError(null);
            const response = await getApiResource(url);

            const list = response.users.map(({ id, name, email, gender, status }) => ({
                key: id,
                name,
                email,
                gender,
                status,
            }));

            setUserList(list);
            setPagination(response.pagination);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch data. Please try again.');
            }
        };

    const handleTableChange = (pagination, filters) => {
        const { current } = pagination;

        // Сохраняем значение фильтра в состоянии
        const filter = filters.gender && filters.gender[0];
        setFilterGender(filter);

        // Определяем URL для запроса с учетом фильтра гендера и страницы
        const url = filter ? `${USERS_URL}?gender=${filter}&page=${current}` 
                           : `${USERS_URL}?page=${current}`;

        getResource(url);
    };

    const handleRowClick = (record) => {
        navigate(`/edit/${record.key}`);
    };

    useEffect(() => {
        getResource(USERS_URL);
    }, []);

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
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Table
                dataSource={userList}
                columns={columns}
                pagination={{ ...pagination, showSizeChanger: false }}
                onChange={handleTableChange}
                onRow={(record) => ({
                onClick: () => handleRowClick(record),
                })}
            />
            </Col>
        </Row>
    </>
    );
};

export default Users;
