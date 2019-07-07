import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout, Button, Table, Pagination, Tag, Badge, Card, Form, Row, Col, Input, DatePicker, message, Modal, Select, InputNumber } from 'antd';
import config from '../../../../config/defaultSettings';

const { confirm } = Modal;
const { Option } = Select;
const FormItem = Form.Item;
const { formItemLayout } = config;

@connect(({ global, notice, loading }) => ({ global, notice, loading }))
@Form.create()
class NoticeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 1,
        pageSize: 30,
      },
    };
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'notice/getDitNotifyQueryAll',
      payload: {
        projectId: id,
        pageIndex: pagination.page - 1,
        pageNum: pagination.pageSize
      }
    })
  }

  handleTableChange = (current, pageSize) => {
    const { dispatch, match: { params: { id } } } = this.props;
    // const { payload } = this.state;
    this.setState({
      pagination: {
        page: current,
        pageSize,
      },
    });
    dispatch({
      type: 'notice/getDitNotifyQueryAll',
      payload: {
        projectId: id,
        pageIndex: current - 1,
        pageNum: pageSize,
      },
    });
  }

  clickRow = (record, index) => {
    // message.success(`点击行数据：${JSON.stringify(record)},点击行索引：${index}`);
  }

  clickCell = (record, index, col) => {
    message.success(`点击单元格数据：${JSON.stringify(record)},点击单元格索引：${index}-${col}`);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    const { pagination } = this.state;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({
        pagination: {
          ...pagination,
          page: 1
        },
        // searchParams: values
      });
      const payload = {
        ...values,
        page: 1,
        rows: pagination.pageSize,
      };
      dispatch({
        type: 'memeberTag/getMemberTagList',
        payload,
      });
    });
  }

  render() {
    const { form, loading: { effects }, global: { pageHeight, pageWidth }, notice: { getDitNotifyQueryAllData: { recordList, recordCount } } } = this.props;
    const { pagination } = this.state;
    // const { getFieldDecorator } = form;
    const loading = effects['notice/getDitNotifyQueryAll'];

    const columns = [{
      title: '组',
      dataIndex: 'unitName',
      key: 'unitName',
      onCell: (record, rowIndex) => {
        return {
          onClick: () => { this.clickCell(record, rowIndex, 1) }
        };
      },
    }, {
      title: '镜次数',
      dataIndex: 'isShotExist',
      key: 'isShotExist',
      render: (text, record) => (
        <Badge count={text} />
      ),
      onCell: (record, rowIndex) => {
        return {
          onClick: () => { this.clickCell(record, rowIndex, 2) }
        };
      },
    }, {
      title: '通告日期',
      dataIndex: 'planTime',
      key: 'planTime',
      onCell: (record, rowIndex) => {
        return {
          onClick: () => { this.clickCell(record, rowIndex, 3) }
        };
      }
    }, {
      title: '集',
      dataIndex: 'episodeNum',
      key: 'episodeNum',
      onCell: (record, rowIndex) => {
        return {
          onClick: () => { this.clickCell(record, rowIndex, 4) }
        };
      }
    }, {
      title: '场',
      dataIndex: 'sceneNum',
      key: 'sceneNum',
      render: (text, record) => (
        <p className="text-nowrap-100">{text}</p>
      ),
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '空间',
      dataIndex: 'space',
      key: 'space',
    }, {
      title: '实拍地',
      dataIndex: 'projectPlace',
      key: 'projectPlace',
      render: (text, record) => (
        <p className="text-nowrap-150">{text}</p>
      ),
    }, {
      title: '场景',
      dataIndex: 'location',
      key: 'location',
      render: (text, record) => (
        <p className="text-nowrap-150">{text}</p>
      ),
    }, {
      title: '文戏',
      dataIndex: 'wenPage',
      key: 'wenPage',
    }, {
      title: '武戏',
      dataIndex: 'wuPage',
      key: 'wuPage',
    }, {
      title: '内容提示',
      dataIndex: 'summary',
      key: 'summary',
    }, {
      title: '主演',
      dataIndex: 'charact1',
      key: 'charact1',
      render: (text, record) => (
        <div>
          {
            text && text.map(item => (<Tag>{item.name}</Tag>))
          }
        </div>
      ),
    }];

    return (
      <Layout style={{ height: pageHeight - 112 }}>
        <div className="table-components">
          <div className="table-container">
            <Table
              loading={loading}
              rowKey="id"
              size="small"
              bordered
              columns={columns}
              dataSource={recordList}
              // scroll={{ x: 2250, y: 300 }}
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
          />
        </div>
      </Layout>
    );
  }
}

NoticeList.propTypes = {};

export default NoticeList;

{/* <Card className="search-card">
  <Form onSubmit={this.handleSubmit} size="small">
    <Row>
      <Col span={6}>
        <FormItem label="通告日期" {...formItemLayout}>
          {getFieldDecorator('planDate', {
            rules: []
          })(
            <DatePicker
              format='YYYY-MM-DD'
              style={{ width: '100%' }}
              getCalendarContainer={trigger => trigger.parentNode}
            />,
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem label="场景" {...formItemLayout}>
          {getFieldDecorator('location', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem label="实拍地" {...formItemLayout}>
          {getFieldDecorator('projectPlace', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem label="内容提示" {...formItemLayout}>
          {getFieldDecorator('summary', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={6}>
        <FormItem label="组" {...formItemLayout}>
          {getFieldDecorator('unitId', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem label="角色" {...formItemLayout}>
          {getFieldDecorator('characters1', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem label="特约" {...formItemLayout}>
          {getFieldDecorator('characters4', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem label="群演" {...formItemLayout}>
          {getFieldDecorator('characters2', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <FormItem label="集" {...formItemLayout}>
          {getFieldDecorator('episodeNum', {
            rules: []
          })(
            <Input maxLength="15" placeholder="请输入" />,
          )}
        </FormItem>
      </Col>
      <Col span={4}>
        <FormItem label="场" {...formItemLayout}>
          {getFieldDecorator('sceneNum', {
            rules: []
          })(
            <Input maxLength="15" placeholder="请输入" />,
          )}
        </FormItem>
      </Col>
      <Col span={4}>
        <FormItem label="时间" {...formItemLayout}>
          {getFieldDecorator('time', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col span={4}>
        <FormItem label="空间" {...formItemLayout}>
          {getFieldDecorator('space', {
            rules: []
          })(
            <Select
              placeholder="请选择"
              getPopupContainer={trigger => trigger.parentNode}
            >
              <Option value="">请选择</Option>
            </Select>,
          )}
        </FormItem>
      </Col>
      <Col span={4}>
        <FormItem label="文戏" {...formItemLayout}>
          {getFieldDecorator('wenPage', {
            rules: []
          })(
            <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />,
          )}
        </FormItem>
      </Col>
      <Col span={4}>
        <FormItem label="武戏" {...formItemLayout}>
          {getFieldDecorator('wuPage', {
            rules: []
          })(
            <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />,
          )}
        </FormItem>
      </Col>
    </Row>
  </Form>
</Card> */}
