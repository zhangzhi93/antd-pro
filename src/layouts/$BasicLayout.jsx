/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Link, connect } from 'umi';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import movie from '../assets/movie.svg';

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });


@connect(({ global, settings, base, project, user }) => ({
  collapsed: global.collapsed,
  settings,
  base,
  project,
  currentUser: user.currentUser,
}))
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
      currentUser,
    } = this.props;
    dispatch({
      type: 'base/getMenu',
      payload: {
        projectId: id,
      },
    });
    // this.setState({ loading: true });
    // dispatch({
    //   type: 'project/getProjectDetail',
    //   payload: { projectId: id },
    //   success: () => {
    //     this.setState({ loading: false });
    //   },
    //   fail: () => {
    //     this.setState({ loading: false });
    //   }
    // });
    // dispatch({
    //   type: 'project/getProjectsAllTypes',
    // });
    // !currentUser.nickName && dispatch({
    //   type: 'user/getInfo',
    // });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'base/resetMenu',
    });
  }

  handleMenuCollapse = payload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });
  }

  render() {
    const {
      children,
      settings,
      match: {
        params: { id },
      },
      route,
      base,
      collapsed,
    } = this.props;
    const { menuData } = base;
    const _setting = route.settings ? Object.assign({}, settings, route.settings) : settings;
    const { loading } = this.state;

    return (
      <ProLayout
        loading={loading}
        logo={!collapsed ?
          <img src={movie} alt="movie" /> :
          <img src={movie} alt="movie" />
        }
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">{logoDom}</Link>
        )}
        siderWidth={200}
        onCollapse={this.handleMenuCollapse}
        collapsed={collapsed}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children) {
            return defaultDom;
          }
          return <Link to={`${menuItemProps.path.replace(/:id/, id)}`}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => {
          return [
            {
              path: '/',
              breadcrumbName: '首页',
            },
            ...routers
          ];
        }}
        itemRender={(itemRoute) => <span>{itemRoute.breadcrumbName}</span>}
        footerRender={() => null}
        menuDataRender={() => (route.routeLocal ? route.routes : menuData)}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {..._setting}
      >
        {route.hidePageHeader ? children : <PageHeaderWrapper>{children}</PageHeaderWrapper>}
      </ProLayout>
    )
  }
}

export default BasicLayout;
