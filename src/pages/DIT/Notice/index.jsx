import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout, Button, Tag, Badge, Card, Form, Row, Col, Input, DatePicker, message, Modal, Select, InputNumber } from 'antd';
import PageTable from '@/components/PageTable';
import config from '../../../../config/defaultSettings';

const { confirm } = Modal;
const { Option } = Select;
const FormItem = Form.Item;
const { formItemLayout } = config;

@connect(({ notice, loading }) => ({ notice, loading }))
@Form.create()
class NoticeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageIndex: 1,
      pageNum: 30,
      dataList: [],
    };
  }

  handleTableChange = (pagination) => {
    const { pageSize, current } = pagination;
    const { dispatch } = this.props;
    const { payload } = this.state;
    this.setState({
      pagination: {
        page: current,
        pageSize,
      },
    });
    const query = {
      ...payload,
      page: current,
      rows: pageSize,
    };
    dispatch({
      type: 'memeberTag/getMemberTagList',
      payload: query,
    });
  }


  handleFetch = ({ page, pageSize }) => {
    const { dispatch, match: { params: { id } } } = this.props;
    const currentPage = page - 1;

    this.setState({ loading: true });

    dispatch({
      type: 'notice/getDitNotifyQueryAll',
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
            dataList: res.data.recordList,
          });
        } else {
          message.error(res.msg);
        }
      }
    })
  };

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
    const { form, notice: { getDitNotifyQueryAllData: { recordList, recordCount } } } = this.props;
    const { loading, pageIndex, pageNum, dataList } = this.state;
    const { getFieldDecorator } = form;

    const columns = [{
      title: '组',
      dataIndex: 'unitName',
      key: 'unitName',
      width: 50,
      fixed: 'left',
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
      width: 100,
    }, {
      title: '通告日期',
      dataIndex: 'planTime',
      key: 'planTime',
      width: 100,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => { this.clickCell(record, rowIndex, 3) }
        };
      }
    }, {
      title: '集',
      dataIndex: 'episodeNum',
      key: 'episodeNum',
      width: 100,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => { this.clickCell(record, rowIndex, 4) }
        };
      }
    }, {
      title: '场',
      dataIndex: 'sceneNum',
      key: 'sceneNum',
      width: 100,
      render: (text, record) => (
        <p className="text-nowrap-100">{text}</p>
      ),
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 50,
    }, {
      title: '空间',
      dataIndex: 'space',
      key: 'space',
      width: 50,
    }, {
      title: '实拍地',
      dataIndex: 'projectPlace',
      key: 'projectPlace',
      width: 150,
      render: (text, record) => (
        <p className="text-nowrap-150">{text}</p>
      ),
    }, {
      title: '场景',
      dataIndex: 'location',
      key: 'location',
      width: 150,
      render: (text, record) => (
        <p className="text-nowrap-150">{text}</p>
      ),
    }, {
      title: '文戏',
      dataIndex: 'wenPage',
      key: 'wenPage',
      width: 50,
    }, {
      title: '武戏',
      dataIndex: 'wuPage',
      key: 'wuPage',
      width: 50,
    }, {
      title: '内容提示',
      dataIndex: 'summary',
      key: 'summary',
      width: 100,
      // render: (text, record) => (
      //   <p className="text-nowrap-200">{text}</p>
      // ),
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
      <Layout>
        <div className="table-container">
          <PageTable
            key="key"
            onRow={(record, index) => {
              return {
                onClick: () => { this.clickRow(record, index) }
              };
            }}
            loading={loading}
            onFetch={this.handleFetch}
            pageSize={pageNum}
            bidirectionalCachePages={1}
            total={recordCount}
            size="small"
            dataSource={[pageIndex, dataList]}
            columns={columns}
            scroll={{ x: 2500, y: 600 }}
            bordered
            pagination={{
              position: 'bottom',
              size: 'small',
              className: 'custom-classname-pagination',
            }}
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
