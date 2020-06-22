import React from 'react';
import { connect, history } from 'umi';
import { Card, Steps, Button, Upload, message, Input, Select, DatePicker, Form } from 'antd';
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
import EaImage from '@/components/EaImage';
import { fileHost, fileMiddleType } from '@/utils/utils';
import classNames from 'classnames';
import moment from 'moment';
import styles from './index.less';

const FormItem = Form.Item;
const step1FormLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    md: { span: 4 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 20 },
    lg: { span: 18 },
  },
};
const step2FormLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    md: { span: 4 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    md: { span: 20 },
    lg: { span: 20 },
  },
};
const productionName = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const productionType = ['文戏组', '动作组', '航拍组', 'VFX组'];
@connect(({ project }) => ({ project }))
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.id = null;
    this.payload = {};
    this.state = {
      step: 0,
      rangeDays: 0,
      project: {},
      loading: false,
      previewImage: null,
      imageUploadError: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/getProjectsAllTypes',
    });
    dispatch({
      type: 'project/getProjectsAllDepartments',
    });
  }

  beforeUpload(file) {
    const isLt = file.size / 1024 / 1024 < 10;
    if (!isLt) {
      message.error('图片不可大于2MB');
    }
    if (isLt) {
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => this.setState({ previewImage: reader.result });
    }
    if (this.id) this.uploadFile();
    return false;
  }

  uploadFile(cb) {
    const { dispatch } = this.props;
    const { project = {} } = this.state;
    if (!this.file) return cb();
    dispatch({
      type: 'base/uploadPhoto',
      payload: { projectId: this.id },
      file: this.file,
      success: res => {
        this.editProject({ projectId: this.id, name: project.name, pictureUrl: res.data.filename });
        cb();
      },
      fail: err => {
        this.setState({ imageUploadError: true });
        cb();
      },
    });
  }

  editProject(values) {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/editProject',
      payload: values,
      success: data => {
        const { project } = this.state;
        this.setState({ project: Object.assign(project, data), imageUploadError: false });
      },
      fail: err => { },
    });
  }

  nextStep1 = values => {
    const { step } = this.state;
    this.payload = Object.assign({}, this.payload, values);
    this.setState({ step: step + 1, loading: false });
  };

  next = (values) => {
    const { step } = this.state;
    this.setState({ step: step + 1, loading: false });
  }

  prev() {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  cancel = () => {
    history.goBack();
  }

  diffDays = (date, dateString) => {
    this.setState({
      rangeDays: moment(date[1]).diff(moment(date[0]), 'days')
    })
  }

  submit = (values) => {
    const { dispatch } = this.props;
    values.productions[0].openDate = values.productions[0].date[0].format('YYYY-MM-DD');
    values.productions[0].endDate = values.productions[0].date[1].format('YYYY-MM-DD');
    delete values.productions[0].date
    this.payload = Object.assign({}, this.payload, values);
    this.setState({ loading: true });
    dispatch({
      type: 'project/addProject',
      payload: this.payload,
      success: data => {
        this.id = data.projectId;
        this.setState({ project: data });
        this.uploadFile(() => {
          this.next();
        });
      },
      fail: err => {
        console.log(err)
      },
    });
  }

  render() {
    const { step } = this.state;
    return (
      <Card className={styles.create}>
        <div className="steps">
          <Steps size="small" current={step}>
            <Steps.Step title="填写项目信息" />
            <Steps.Step title="部门与组" />
            <Steps.Step title="完成" />
          </Steps>
        </div>
        {this.renderStep0()}
        {this.renderStep1()}
        {this.renderStep2()}
      </Card>
    );
  }

  renderStep0() {
    const {
      project: { projectTypesData },
    } = this.props;
    const { step, previewImage } = this.state;

    return (
      <div className={classNames('body', 'step-0', { show: step == 0 })}>
        <div className="layout">
          <Form
            {...step1FormLayout}
            onFinish={this.nextStep1}
          // onFinishFailed={this.onFinishFailed}
          >
            <div className="upload">
              <Upload.Dragger
                className="upload"
                showUploadList={false}
                beforeUpload={file => this.beforeUpload(file)}
              >
                {
                  previewImage ? (<img src={previewImage} />) : (
                    <>
                      <p className="ant-upload-text">
                        <PlusOutlined />
                      </p>
                      <p className="ant-upload-text">上传照片</p>
                    </>
                  )
                }
              </Upload.Dragger>
            </div>
            <div className="form">
              <FormItem
                label="项目类型"
                name="projectType"
                rules={
                  [{
                    required: true,
                    message: '请选择项目类型',
                  },]
                }
              >
                <Select placeholder="请选择项目类型">
                  {projectTypesData.map(type => {
                    return <Select.Option key={type.type_id}>{type.type_name}</Select.Option>;
                  })}
                </Select>
              </FormItem>
              <FormItem
                label="项目名称"
                name="name"
                rules={
                  [{
                    required: true,
                    message: '请输入项目名称',
                  },]
                }
              >
                <Input placeholder="请输入项目名称" />
              </FormItem>
              <FormItem
                label="项目概述"
                name="remark"
                rules={[{ max: 50, message: '项目概述不能超过50个字' }]}
              >
                <Input.TextArea rows={3} placeholder="请输入项目概述" />
              </FormItem>
            </div>
            <div className="btns">
              <Button onClick={this.cancel}>取消</Button>
              <Button type="primary" htmlType="submit">下一步</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  renderStep1() {
    const {
      project: { projectDepartmentsData },
    } = this.props;
    const { step, loading, rangeDays } = this.state;

    return (
      <div className={classNames('body', 'step-1', { show: step == 1 })}>
        <div className="layout">
          <Form
            {...step2FormLayout}
            onFinish={this.submit}
          >
            <div className="dash-border">
              <FormItem
                label="我的部门"
                extra="选择本人所在的部门"
                name="departId"
                rules={
                  [{
                    required: true,
                    message: '请选择部门',
                  },]
                }
              >
                <Select placeholder="请选择部门">
                  {
                    projectDepartmentsData.map(type => (<Select.Option key={type.id}>{type.name}</Select.Option>))
                  }
                </Select>
              </FormItem>
            </div>
            <FormItem
              label="第一摄制组"
              name={["productions", 0, "productionName"]}
              rules={
                [{
                  required: true,
                  message: '请选择摄制组',
                },]
              }
            >
              <Select placeholder="请选择摄制组">
                {
                  productionName.map(name => (
                    <Select.Option key={name}>
                      {name}组
                      </Select.Option>
                  ))
                }
              </Select>
            </FormItem>
            <FormItem
              label="组类型"
              name={["productions", 0, "productionType"]}
              rules={
                [{
                  required: true,
                  message: '请选择组类型',
                },]
              }
            >
              <Select placeholder="请选择组类型">
                {productionType.map(name => (<Select.Option key={name}>{name}</Select.Option>))}
              </Select>
            </FormItem>
            <div className={styles.rangePicker}>
              <FormItem
                label="拍摄日期"
                name={["productions", 0, "date"]}
                rules={
                  [{
                    required: true,
                    message: '请选择拍摄日期',
                  },]
                }
              >
                <DatePicker.RangePicker onChange={this.diffDays} />

              </FormItem>
              {rangeDays != 0 && <span className={styles.days}>{rangeDays}天</span>}
            </div>


            <p>更多摄制组稍后请至 项目设置 继续添加。</p>
            <div className="btns">
              <Button onClick={() => this.prev()}>上一步</Button>
              <Button loading={loading} type="primary" htmlType="submit">完成</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  renderStep2() {
    const { project, imageUploadError } = this.state;
    const {
      project: { projectDepartmentsData },
    } = this.props;
    const departmentMap = {};
    projectDepartmentsData.forEach(d => {
      departmentMap[d.id] = d.name;
    });
    const { step } = this.state;
    return (
      <div className={classNames('body', 'step-2', { show: step == 2 })}>
        <div className="info">
          <div className="icon">
            <CheckCircleFilled />
            <div className="text">创建成功</div>
          </div>
          <div className="detail">
            <div className="upload">
              {project.pictureUrl ? (
                <EaImage src={`${fileHost}/${project.pictureUrl}${fileMiddleType}`} preview={false} />
              ) : (
                  <Upload.Dragger
                    className="upload"
                    showUploadList={false}
                    beforeUpload={file => this.beforeUpload(file)}
                  >
                    <p className="ant-upload-text">
                      <PlusOutlined />
                    </p>
                    <p className="ant-upload-text">上传照片</p>
                    {!imageUploadError && <p className="empty">无图片</p>}
                    {imageUploadError && <p className="error">图片上传失败,请重新上传</p>}
                  </Upload.Dragger>
                )}
            </div>
            <div className="desc">
              <div className="t">
                项目名称: <span>《{project.name}》</span>
              </div>
              <div className="t">所在部门: {departmentMap[project.departId]}</div>
              {project.productions &&
                project.productions.map((item, index) => {
                  return (
                    <div className="text" key={index}>
                      {item.productionName}:<span>{item.productionType}</span>
                      <span>
                        {item.openDate} ~ {item.endDate}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="btns">
          <Button onClick={() => history.push(`/`)}>返回首页</Button>
          <Button type="primary" onClick={() => history.push(`/project/${project.projectId}`)}>
            进入项目
          </Button>
        </div>
      </div>
    );
  }
}
