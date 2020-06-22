import React, { Component } from 'react'
import { connect } from 'umi'
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Select, Card, List, Spin, Empty } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less'

@connect(({ script }) => ({ script }))
export default class Script extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <PageHeaderWrapper>
        剧本
      </PageHeaderWrapper>
    );
  }
}
