import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { NavLink, Route, Routes } from 'react-router-dom';

import Users from './components/Users';
import HomePage from './components/HomePage';
import EditUsers from './components/EditUsers';
import styles from './App.module.css';




function App() {
  return (
    <>
      <Layout>
        <Header>
          <NavLink className={styles.link} to="/" >Home</NavLink>
          <NavLink className={styles.link} to="/users" >Users</NavLink>
          <Routes>
            <Route path="/"  element={<HomePage />} />
            <Route path="/users"  element={<Users />} />
            <Route path="/edit/:userId" element={<EditUsers />} />
          </Routes>
        </Header>
      </Layout>
    </>
  );
}

export default App;
