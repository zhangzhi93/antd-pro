import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import Link from 'umi/link';
import config from '../../config/defaultSettings';
import styles from './UserLayout.less';
// import logo from '../assets/logo.svg';

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
          <Link to="/">
            <div className={styles.logo}>{config.title}</div>
          </Link>
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    )
  }
}

export default DashboardLayout;
