import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout, Button, Tag, Card, Table, Pagination, message } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DragableTable from '@/components/DragableTable';
import styles from './index.less';

// const SortableTable = SortableContainer(Table);
const SortableTable = SortableContainer(props => {
  const tbodyProps = {
    className: props.className,
    children: props.children
  }
  return (<tbody {...tbodyProps} />)
});
const columns = [{
  title: '组',
  dataIndex: 'unitName',
  key: 'unitName',
}, {
  title: '文件名',
  dataIndex: 'filePre',
  key: 'filePre',
}, {
  title: '机位',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '集',
  dataIndex: 'episodeNum',
  key: 'episodeNum',
}, {
  title: '场',
  dataIndex: 'sceneNum',
  key: 'sceneNum',
}, {
  title: '镜',
  dataIndex: 'shot',
  key: 'shot',
}, {
  title: '次',
  dataIndex: 'take',
  key: 'take',
}, {
  title: '概述',
  dataIndex: 'note0',
  key: 'note0',
}, {
  title: '角色',
  dataIndex: 'characterList',
  key: 'characterList',
  render: (text, record) => (
    <div className="nowrap">{text && text.map(item => (<Tag>{item.fullName}</Tag>))}</div>
  ),
}, {
  title: '景别',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '成绩',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '备注',
  dataIndex: 'note',
  key: 'note',
}, {
  title: '提交时间',
  dataIndex: 'createDate',
  key: 'createDate',
}, {
  title: '修改时间',
  dataIndex: 'modifyDate',
  key: 'modifyDate',
}, {
  title: 'TC_start',
  dataIndex: 'clipTCStart',
  key: 'clipTCStart',
}, {
  title: 'TC_end',
  dataIndex: 'clipTCEnd',
  key: 'clipTCEnd',
}, {
  title: '时长',
  dataIndex: 'duration',
  key: 'duration',
}];

@connect(({ global, shot, loading }) => ({ global, shot, loading }))
class ShotList extends Component {
  // SortableRow = SortableElement(props => (<tr {...props} index={props['data-row-key']} />));

  // components = {
  //   body: {
  //     // wrapper: (props) => (<SortableTable {...props} onSortEnd={this.sortEnd} helperClass={styles.dragTableRow} />),
  //     row: this.SortableRow,
  //   },
  // };

  constructor(props) {
    super(props);
    this.state = {
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
    this.setState(({ data }) => ({
      data: arrayMove(data, oldIndex, newIndex),
    }));
  }

  handleTableChange = (current, pageSize) => {
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
      callback: res => {
        if (res.code === 0) {
          this.setState({
            data: res.data.recordList,
          })
        }
      }
    });
  }

  render() {
    const { global: { pageHeight }, loading: { effects }, shot: { getDitShotQueryAllData: { recordCount } } } = this.props;
    const { pagination, data } = this.state;
    const loading = effects['shot/getDitShotQueryAll'];



    return (
      <PageHeaderWrapper>
        <Card className="table-components" style={{ height: pageHeight - 112 }}>
          {/* <div className="table-container">
            <SortableTable
              loading={loading}
              rowKey="id"
              size="small"
              helperClass={styles.dragTableRow}
              onSortEnd={this.sortEnd}
              bordered
              columns={columns}
              components={this.components}
              dataSource={data}
              onRow={(record, index) => ({
                index,
              })}
              pagination={false}
            />
          </div>
          <Pagination
            {...pagination}
            size="small"
            total={recordCount}
            current={pagination.page}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => (<div>共<span>{total}</span>条数据</div>)}
            onChange={this.handleTableChange}
          /> */}
          <DragableTable
            loading={loading}
            rowKey="id"
            columns={columns}
            dataSource={data}
            total={recordCount}
            current={pagination.page}
            pageSize={50}
            onSortEnd={this.sortEnd}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

ShotList.propTypes = {};

export default ShotList;
