import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

import { Link } from 'react-router-dom';

import styles from './HomePage.module.css'

const HomePage = () => {
    return (
        <>
            <Title level={1}>Home page</Title>
            <div className={styles.container} >
                <Paragraph className={styles.paragraph} strong>
                Welcome to the Home page! <br/> This is my test task for ArtMyWeb company. <br/> You can see the list of users on the page{' '}
                    <Link to={'/users'}>Users</Link>
                </Paragraph>
            </div>
        </>
    )
}



export default HomePage;
