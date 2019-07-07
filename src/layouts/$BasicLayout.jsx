/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { BasicLayout as ProLayoutComponents } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/logo.svg';



@connect(({ global, settings }) => ({ global, settings }))
class BasicLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    window.addEventListener('resize', this.resize);
    dispatch({
      type: 'settings/getSetting',
    });
    dispatch({
      type: 'global/queryProjectDetail',
      payload: {
        projectId: id
      }
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    window.removeEventListener('resize', this.resize);
    dispatch({
      type: 'global/save',
      payload: {
        queryProjectDetailData: {
          departments: []
        }
      }
    })
  }

  resize = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeScreen'
    })
  }

  menuDataRender = (menuList, ischild) => {
    const { global: { queryProjectDetailData: { departments } } } = this.props;
    const departmentsName = departments.map(item => item.name);
    return menuList.map(item => {
      if (departmentsName.includes(item.name) || ischild) {
        return { ...item, children: item.children ? this.menuDataRender(item.children, true) : [] }
      }
    });
  };

  headerRender = (props) => {
    return (
      <div>
        {logo}
      </div>
    )
  };


  render() {
    const { children, settings, match: { params: { id } } } = this.props;

    return (
      <ProLayoutComponents
        logo={() => (<Link to="/"><img src={logo} alt="易制片" /></Link>)}
        onCollapse={false}
        collapsed={false}
        menuItemRender={(menuItemProps, defaultDom) => {
          return <Link to={menuItemProps.path.replace(/:id/, id)}>{defaultDom}</Link>;
        }}
        breadcrumbRender={false}
        footerRender={false}
        menuDataRender={this.menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...this.props}
        {...settings}
      >
        {children}
      </ProLayoutComponents>
    )
  }
}

export default BasicLayout;
