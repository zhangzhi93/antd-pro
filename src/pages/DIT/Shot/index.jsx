import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout, Button, Tag, Badge, Table, message } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import styles from './index.less';

// const SortableTable = SortableContainer(Table);
const SortableTable = SortableContainer(props => {
  console.log(props);
  const tbodyProps = {
    className:props.className,
    children:props.children
  }
  return (<tbody {...tbodyProps} />)
});

@connect(({ shot, loading }) => ({ shot, loading }))
class ShotList extends Component {
  SortableRow = SortableElement(props => (<tr {...props} index={props['data-row-key']} />));

  components = {
    body: {
      wrapper: (props) => (<SortableTable {...props} onSortEnd={this.sortEnd} helperClass={styles.dragTableRow} />),
      row: this.SortableRow,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pagination: {
        page: 1,
        pageSize: 30
      },
      data: [],
    };
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    const { pagination } = this.state;

    dispatch({
      type: 'shot/getDitShotQueryAll',
      payload: {
        projectId: id,
        pageIndex: pagination.page - 1,
        pageNum: pagination.pageSize
      },
      callback: res => {
        if (res.code === 0) {
          this.setState({
            data: res.data.recordList,
          })
        }
      }
    })
  }



  sortEnd = ({ oldIndex, newIndex }) => {
    console.log(`oldIndex:${oldIndex},newIndex:${newIndex}`);
    this.setState(({ data }) => ({
      data: arrayMove(data, oldIndex, newIndex),
    }));
  }

  moveRow = (dragIndex, hoverIndex) => {
    console.log(`1:${dragIndex},2:${hoverIndex}`);
  }

  handleTableChange = (pagination) => {
    const { pageSize, current } = pagination;
    const { dispatch, match: { params: { id } } } = this.props;
    this.setState({
      pagination: {
        page: current,
        pageSize,
      },
    });
    const query = {
      projectId: id,
      pageIndex: current - 1,
      pageNum: pageSize,
    };
    dispatch({
      type: 'shot/getDitShotQueryAll',
      payload: query,
    });
  }

  render() {
    const { shot: { getDitShotQueryAllData: { recordList, recordCount } } } = this.props;
    const { loading, pagination, data } = this.state;

    const columns = [{
      title: '组',
      dataIndex: 'unitName',
      key: 'unitName',
      width: 50,
    }, {
      title: '文件名',
      dataIndex: 'filePre',
      key: 'filePre',
      width: 100,
    }, {
      title: '机位',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    }, {
      title: '集',
      dataIndex: 'episodeNum',
      key: 'episodeNum',
      width: 50,
    }, {
      title: '场',
      dataIndex: 'sceneNum',
      key: 'sceneNum',
      width: 50,
    }, {
      title: '镜',
      dataIndex: 'shot',
      key: 'shot',
      width: 50,
    }, {
      title: '次',
      dataIndex: 'take',
      key: 'take',
      width: 50,
    }, {
      title: '概述',
      dataIndex: 'note0',
      key: 'note0',
      width: 200,
    }, {
      title: '角色',
      dataIndex: 'characterList',
      key: 'characterList',
      width: 600,
      render: (text, record) => (
        <div>
          {
            text && text.map(item => (<Tag>{item.fullName}</Tag>))
          }
        </div>
      ),
    }, {
      title: '景别',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    }, {
      title: '成绩',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    }, {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
      width: 150,
    }, {
      title: '提交时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 250,
    }, {
      title: '修改时间',
      dataIndex: 'modifyDate',
      key: 'modifyDate',
      width: 150,
    }, {
      title: 'TC_start',
      dataIndex: 'clipTCStart',
      key: 'clipTCStart',
      width: 150,
    }, {
      title: 'TC_end',
      dataIndex: 'clipTCEnd',
      key: 'clipTCEnd',
      width: 150,
    }, {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
    }];

    return (
      <Layout>
        <Table
          style={{ background: '#fff' }}
          loading={loading}
          rowKey="id"
          columns={columns}
          dataSource={data}
          onChange={this.handleTableChange}
          components={this.components}
          scroll={{ x: 3350, y: 400 }}
          bordered
          pagination={{
            ...pagination,
            total: recordCount,
            current: pagination.page,
            size: 'small',
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: totalData => (<div>共<span className="page-text">{totalData}</span>条数据</div>),
          }}
          onRow={(record, index) => ({
            index,
            // moveRow: this.moveRow,
          })}
        />
      </Layout>
    );
  }
}

ShotList.propTypes = {};

export default ShotList;
