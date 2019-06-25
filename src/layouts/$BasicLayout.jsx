/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useState } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { BasicLayout as ProLayoutComponents } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import { isAntDesignPro } from '@/utils/utils';
// import logo from '../assets/logo.svg';


/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList => {
  return menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });
};

const headerRender = (props) => {
  const { logo } = props;
  return (
    <div>
      {logo}
    </div>
  )
};

const BasicLayout = props => {
  const { dispatch, children, settings, match: { params: { id } } } = props;
  /**
   * constructor
   */

  useState(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }
  });
  /**
   * init variables
   */

  return (
    <ProLayoutComponents
      logo={null}
      onCollapse={false}
      collapsed={false}
      siderWidth={200}
      menuItemRender={(menuItemProps, defaultDom) => {
        return <Link to={menuItemProps.path.replace(/:id/, id)}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => {
        return [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ];
      }}
      footerRender={false}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
      {children}
    </ProLayoutComponents>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
