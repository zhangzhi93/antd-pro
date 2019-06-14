import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card } from 'antd';
import styles from './index.less';

const { Meta } = Card;

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { projectInfo } = this.props;
    return (
      <Card
        hoverable
        className={styles.card}
        cover={<img alt={projectInfo.name} src={projectInfo.pictureUrl[0]} />}
      >
        <Meta title={projectInfo.name} description={projectInfo.remark} />
        <div>dfdfsdf</div>
      </Card>
    )
  }
}

export default ProjectCard;
