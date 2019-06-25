import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout, message, Tag } from 'antd';
import { PageTable } from 'antd-table-infinity';

@connect(({ session, loading }) => ({ session, loading }))
class SessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageIndex: 1,
      pageNum: 30,
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
    const recordList = ['charact2', 'charact4', 'property'];
    const fixedList = ['episodeNum', 'sceneNum'];
    const longTextList = ['summary', 'location'];

    return data.map(item => {
      let column = {
        title: item.name,
        dataIndex: item.oname,
        key: item.key,
      }
      if (fixedList.includes(item.key)) {
        column = {
          ...column,
          fixed: 'left',
          width: 50,
        }
      }
      if (longTextList.includes(item.key)) {
        column = {
          ...column,
          width: 350,
          render: (text, record) => (
            <p className="text-nowrap-320">{text}</p>
          ),
        }
      }
      if (recordList.includes(item.key)) {
        column = {
          ...column,
          width: 250,
          render: (text, record) => (
            <div>
              {
                text && text.map(obj => (<Tag>{obj.name}</Tag>))
              }
            </div>
          ),
        }
      }
      if (item.key.includes('character')) {
        column = {
          ...column,
          width: 30,
        }
      }
      return column;
    })
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
            pageIndex: page
          });
        } else {
          message.error(res.msg);
        }
      }
    })
  };

  render() {
    const { session: { getQueryTableHeadData, getQueryTableData: { recordList, recordCount } } } = this.props;
    console.log(this.props);
    const { loading, pageIndex, pageNum } = this.state;
    const TableData = this.renderColumns(getQueryTableHeadData);
    console.log(TableData);

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
              bidirectionalCachePages={1}
              total={recordCount}
              size="small"
              dataSource={[pageIndex, recordList]}
              columns={TableData}
              scroll={{ x: 3000, y: 400 }}
              bordered
            /> : null
        }
      </Layout>
    );
  }
}

SessionList.propTypes = {};

export default SessionList;
