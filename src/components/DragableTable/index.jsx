import React, { Component } from 'react';
import { Table } from 'antd';
import arrayMove from 'array-move';
import DragableWrapper from './DragableWrapper.jsx';
import DragableRow from './DragableRow.jsx';
import styles from './index.less';

export default class Dragable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {
      loading,
      rowKey,
      rowClassName,
      columns,
      dataSource,
      current,
      pageSize = 10,
      total,
      pagination = true,
      onSortEnd,
    } = this.props;
    return (
      <Table
        className={styles.dragableTable}
        rowKey={rowKey}
        rowClassName={rowClassName}
        size="small"
        bordered={false}
        loading={loading}
        onRow={(record, index) => ({ record, index })}
        components={{
          body: {
            wrapper: (props) => (
              <DragableWrapper
                {...props}
                onSortEnd={onSortEnd}
                helperClass={styles.dragTableRow}
              />
            ),
            row: (props) => (<DragableRow {...props} />)
          },
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={
          pagination
            ? {
              size: 'small',
              current,
              pageSize,
              pageSizeOptions: ['10', '20', '30', '40'],
              total,
              showSizeChanger: true,
              showQuickJumper: true,
            }
            : false
        }
      />
    )
  }
}
