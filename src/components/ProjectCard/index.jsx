import React, { Component } from 'react';
import { history } from 'umi';
import { Card, Avatar } from 'antd';
import classNames from 'classnames';
import { PushpinFilled } from '@ant-design/icons';
import EaImage from '@/components/EaImage';
import { fileHost, fileMiddleType } from '@/utils/utils';
import styles from './index.less';

const { Meta } = Card;

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  jumpTo = to => {
    if (to) {
      history.push(`/${to}`);
    }
  };

  render() {
    const { projectInfo, to } = this.props;

    return (
      <Card
        hoverable
        className={styles.card}
        cover={
          <div className="image">
            <EaImage
              src={`${fileHost}/${projectInfo.pictureUrl}${fileMiddleType}`}
              preview={false}
              errorIcon={<span style={{ color: '#333' }}>{projectInfo.name.substring(0, 1)}</span>}
            />
          </div>
        }
        onClick={() => {
          this.jumpTo(to);
        }}
      >
        <PushpinFilled className={classNames('pushpin', { active: !!projectInfo.starFlag })} />
        <Meta title={projectInfo.name} description={projectInfo.remark} />
        <div className={styles.bottominfo}>
          <span>{projectInfo.createDate.split(' ')[0]}</span>
          <div>
            {projectInfo.memberList.splice(0, 5).map((item, index) => (
              <Avatar key={`Avatar${index}`} src={item.avatarUrl} />
            ))}
          </div>
        </div>
      </Card>
    );
  }
}

export default ProjectCard;
