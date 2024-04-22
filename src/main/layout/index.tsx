import React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Header from './Header';

const { Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content id="main">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AppLayout
