import React from 'react';
import { connect, history } from 'umi';
import { DeleteFilled, ExclamationCircleFilled, LockFilled } from '@ant-design/icons';
import { Row, Col, Button, Input } from 'antd';
import ProjectCard from '@/components/ProjectCard';
import styles from './index.less';

@connect(({ project }) => ({ project }))
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      key: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/getCurrentProjects',
    });
    dispatch({
      type: 'project/getProjectsAllTypes',
    });
  }

  render() {
    const { search, key } = this.state;
    const {
      project: { projectListData },
    } = this.props;
    let list = projectListData;
    if (search) {
      list = projectListData.filter(project => project.name.indexOf(search) >= 0);
    }

    return (
      <div className={styles.projectList}>
        <Row gutter={24} className="top">
          <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={20}>
            <Row>
              <Col xs={0} sm={3} md={4} lg={8} xl={8} xxl={6} />
              <Col xs={24} sm={18} md={16} lg={16} xl={16} xxl={16}>
                <Input.Search
                  key={key}
                  className="search"
                  placeholder="请输入"
                  enterButton="搜索"
                  size="large"
                  onSearch={value => this.setState({ search: value })}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={4} className="right">
            <Button type="link" onClick={() => history.push(`/create`)}>
              新建项目
            </Button>
            <div className="action">
              <LockFilled />
              <DeleteFilled />
            </div>
          </Col>
        </Row>
        {search && (
          <div className="filter">
            <ExclamationCircleFilled />
            找到{list.length}个项目
            <Button type="link" onClick={() => this.setState({ search: '', key: key + 1 })}>
              重置
            </Button>
          </div>
        )}
        <Row gutter={24} className="list">
          {list.map(item => (
            <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6} key={item.projectId}>
              <div className="item">
                <ProjectCard key={item.projectId} projectInfo={item} to={`project/${item.projectId}`} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
