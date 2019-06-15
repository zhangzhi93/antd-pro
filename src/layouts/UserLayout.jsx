import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout } from 'antd';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

const { Header, Content } = Layout;

@connect(({ global, settings }) => ({ global, settings }))
class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Header className={styles.header}>
          <div className={styles.logo}>易制片</div>
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    )
  }
}

export default DashboardLayout;
