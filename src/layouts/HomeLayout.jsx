import React, { Component } from 'react';
import { connect, history } from 'umi';
import { Layout } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import { fileThumbnailType, fileHost } from '@/utils/utils';
import styles from './Layout.less';

const { Header, Content } = Layout;

@connect(({ user }) => ({ user }))
class HomeLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getInfo',
    });
  }

  goHome = () => {
    history.replace('/');
  }

  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Header className="home-header">
          <div className={styles.logo} onClick={this.goHome}>
            <img src={`${fileHost}/shot_photo/easyaction/logo/LOGOFULLB260.png${fileThumbnailType}`} alt="easyaction" />
          </div>
          <RightContent className={styles.rightContent} />
        </Header>
        <Content className={styles.listContent}>
          {children}
        </Content>
      </Layout>
    )
  }
}

export default HomeLayout;
