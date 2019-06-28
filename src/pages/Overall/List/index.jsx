import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout, message, Tag } from 'antd';
import { PageTable } from 'antd-table-infinity';

const extendColumnParams = {
  projectId: {
    width: 50,
  },
  sceneId: {
    width: 50,
  },
  projectPlace: {
    width: 100,
  },
  episodeNum: {
    fixed: 'left',
    width: 50,
  },
  sceneNum: {
    fixed: 'left',
    width: 100,
  },
  location: {
    width: 350,
    render: (text, record) => (
      <p className="text-nowrap-350">{text}</p>
    ),
  },
  summary: {
    width: 350,
    render: (text, record) => (
      <p className="text-nowrap-350">{text}</p>
    ),
  },
  content: {
    width: 350,
    render: (text, record) => (
      <p className="text-nowrap-350">{text}</p>
    ),
  },
  pages: {
    width: 50,
  },
  wenPage: {
    width: 100,
  },
  wuPage: {
    width: 100,
  },
  season: {
    width: 100,
  },
  time: {
    width: 100,
  },
  space: {
    width: 100,
  },
  weather: {

  },
  status: {
    width: 100,
  },
  linkCode: {
    width: 50,
  },
  isLink: {
    width: 50,
  },
  character: {
    width: 32,
  },
  charact2: {
    width: 300,
    render: (text, record) => (
      <div>
        {
          text && text.map(obj => (<Tag>{obj.name}</Tag>))
        }
      </div>
    ),
  },
  charact4: {
    width: 300,
    render: (text, record) => (
      <div>
        {
          text && text.map(obj => (<Tag>{obj.name}</Tag>))
        }
      </div>
    ),
  },
  property: {
    render: (text, record) => (
      <div>
        {
          text && text.map(obj => (<Tag>{obj.name}</Tag>))
        }
      </div>
    ),
  },
}

@connect(({ session, loading }) => ({ session, loading }))
class SessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageIndex: 1,
      pageNum: 30,
      data: []
    };
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;

    dispatch({
      type: 'session/getQueryTableHead',
      payload: {
        projectId: id
      }
    })
  }

  renderColumns = (data) => {
    const columnsKeys = Object.keys(extendColumnParams);
    const columnsData = [];
    columnsKeys.forEach(key => {
      const columnArray = data.filter(item => item.key.includes(key));
      columnsData.push(...columnArray);
    });
    return columnsData.map(item => {
      let column = {
        title: item.name,
        dataIndex: item.oname,
        key: item.key,
      }
      if (item.key.includes('character')) {
        column = {
          ...column,
          ...extendColumnParams.character
        }
      } else {
        column = {
          ...column,
          ...extendColumnParams[item.key]
        }
      }
      return column;
    });
  }

  handleFetch = ({ page, pageSize }) => {
    const { dispatch, match: { params: { id } } } = this.props;
    const currentPage = page - 1;
    this.setState({ loading: true });

    dispatch({
      type: 'session/getQueryTable',
      payload: {
        projectId: id,
        pageIndex: currentPage,
        pageNum: pageSize
      },
      callback: res => {
        if (res.code === 0) {
          this.setState({
            loading: false,
            pageIndex: page,
            data: res.data.recordList,
          });
        } else {
          message.error(res.msg);
        }
      }
    })
  };

  render() {
    const { session: { getQueryTableHeadData, getQueryTableData: { recordList, totalCount } } } = this.props;
    console.log(this.props);
    const { loading, pageIndex, pageNum, data } = this.state;
    const TableData = this.renderColumns(getQueryTableHeadData);

    return (
      <Layout>
        {
          TableData.length > 0 ?
            <PageTable
              pagination={{
                position: 'bottom',
                size: 'small',
                className: 'custom-classname-pagination',
              }}
              loading={loading}
              onFetch={this.handleFetch}
              pageSize={pageNum}
              bidirectionalCachePages={3}
              total={totalCount}
              size="small"
              dataSource={[pageIndex, recordList]}
              columns={TableData}
              scroll={{ x: 4200, y: 400 }}
              bordered
              debug
            /> : null
        }
      </Layout>
    );
  }
}

SessionList.propTypes = {};

export default SessionList;
