import React from 'react';
import { connect, history } from 'umi';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { parse, stringify } from 'qs';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {

  getPageQuery = () => {
    return parse(window.location.href.split('?')[1]);
  }

  onMenuClick = event => {
    const { key } = event;
    if (key === 'logout') {
      const { redirect } = this.getPageQuery(); // redirect
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userName');
      if (window.location.pathname !== '/login' && !redirect) {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      return;
    }
    history.push(`/account/${key}`);
  };

  render() {
    const { currentUser = { avatar: '', name: '' }, menu } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            <span>account center</span>
          </Menu.Item>
        )}

        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            <span>account settings</span>
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />登出
        </Menu.Item>
      </Menu>
    );

    return currentUser && currentUser.nickName ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatarUrl} alt="avatar" />
          <span className={styles.name}>{currentUser.nickName}</span>
        </span>
      </HeaderDropdown>
    ) : (
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
