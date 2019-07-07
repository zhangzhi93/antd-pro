import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Layout, Row, Col, Button, Modal, Form, Select, Input } from 'antd';
import Card from '@/components/ProjectCard';
import config from '../../../config/defaultSettings';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const { formItemLayout } = config;

@connect(({ dashboard }) => ({ dashboard }))
@Form.create()
class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list: [{ "projectId": "63c32030bc3241fea59db259ee913fb9", "name": "这个是好的", "projectType": "1", "pictureUrl": ["https://easyaction.cn/upload/project/bec247049d1f4c30badaaba5fba4c838_big.jpg", "https://easyaction.cn/upload/project/bec247049d1f4c30badaaba5fba4c838_mid.jpg", "https://easyaction.cn/upload/project/bec247049d1f4c30badaaba5fba4c838_sml.jpg"], "remark": "测试待办和照片", "createDate": "2019-02-17 13:20:02", "starFlag": 1, "isOwner": 0, "memberList": [{ "userId": "5fc610868f404689b55be4ec17736d5e", "nickName": null, "loginName": null, "userName": null, "mobile": null, "emailAddr": null, "address": null, "avatarUrl": null }, { "userId": "5", "nickName": "卢凯", "loginName": "ludaokai", "userName": null, "mobile": "13366812716", "emailAddr": null, "address": null, "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOhsI73nTvsUiaph3NKAPSAhIqnaQYhuEtVy42LcozcJDPFCssINL9xeSV5ZloYEullGBcpfMJJBw/132" }, { "userId": "6343195228004410b05651bf792d7073", "nickName": "魏燕顺", "loginName": "weiyanshun", "userName": null, "mobile": "18654560989", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/LOHuzoOCOOJkPtj18t2JjkhkAmIu3Lornm30hKTFCf24O1ft7HXK98enYh4OIDJC6V25t9VtiajBibj44NibQY4Dg/132" }, { "userId": "9dbcfa79d8934cb099ce90078729432a", "nickName": "EASYNC", "loginName": "EASYNC", "userName": null, "mobile": "1654875412", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL1ZbVchSwE56SF3FuDCNCLOpoUpsopia1X97ODO63kGFoyWbGjEr36dibEBqPHGscBVTrwsqMSfQzQ/132" }] }, { "projectId": "973489b9eadc4447a6001efaa27e3e82", "name": "长安少年行", "projectType": "1", "pictureUrl": ["https://easyaction.cn/upload/project/e7933423f1234d04b663ac4ceb10e3cc_big.jpg", "https://easyaction.cn/upload/project/e7933423f1234d04b663ac4ceb10e3cc_mid.jpg", "https://easyaction.cn/upload/project/e7933423f1234d04b663ac4ceb10e3cc_sml.jpg"], "remark": "该剧讲述了市井厨娘沈依依为报答好友相知之恩，替嫁长安履行婚约，误打误撞进入尚艺馆，开启了一段破奇案、打贪官、寻真爱的青春之旅的故事", "createDate": "2019-04-11 10:46:44", "starFlag": 1, "isOwner": 1, "memberList": [{ "userId": "5", "nickName": "卢凯", "loginName": "ludaokai", "userName": null, "mobile": "13366812716", "emailAddr": null, "address": null, "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOhsI73nTvsUiaph3NKAPSAhIqnaQYhuEtVy42LcozcJDPFCssINL9xeSV5ZloYEullGBcpfMJJBw/132" }, { "userId": "6343195228004410b05651bf792d7073", "nickName": "魏燕顺", "loginName": "weiyanshun", "userName": null, "mobile": "18654560989", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/LOHuzoOCOOJkPtj18t2JjkhkAmIu3Lornm30hKTFCf24O1ft7HXK98enYh4OIDJC6V25t9VtiajBibj44NibQY4Dg/132" }] }, { "projectId": "2facc298dc7246e89c65ad426b2b4195", "name": "水墨人生", "projectType": "1", "pictureUrl": ["https://easyaction.cn/upload/project/f7851c611a334b49adb54ea602dfcb60_big.jpg", "https://easyaction.cn/upload/project/f7851c611a334b49adb54ea602dfcb60_mid.jpg", "https://easyaction.cn/upload/project/f7851c611a334b49adb54ea602dfcb60_sml.jpg"], "remark": "民国言情", "createDate": "2019-03-25 15:09:52", "starFlag": 0, "isOwner": 1, "memberList": [{ "userId": "5", "nickName": "卢凯", "loginName": "ludaokai", "userName": null, "mobile": "13366812716", "emailAddr": null, "address": null, "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOhsI73nTvsUiaph3NKAPSAhIqnaQYhuEtVy42LcozcJDPFCssINL9xeSV5ZloYEullGBcpfMJJBw/132" }, { "userId": "50e9f3a8644f48439ba7ab61aeb4abd8", "nickName": "华子", "loginName": "顾建华", "userName": null, "mobile": "13011083257", "emailAddr": null, "address": null, "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTItaLVdBADzqmpkgYtic1yVChCMBlenAorLsXbllwvwZ2wfAQzpbSWicZajibkPYC9QYB3nSnibtxByYA/132" }, { "userId": "c2806b341e1346b69400e03d4b77ccc6", "nickName": "W", "loginName": null, "userName": null, "mobile": null, "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIuz4OmU7eotpsmzCXH34MBNzWdVpTSIdMGwhVnZVKoJWqicqWqHmStQvG1sc2micx3BwJsSDDI01mQ/132" }, { "userId": "4222e58aad7849f0ab927f4e49391966", "nickName": "耗昊", "loginName": null, "userName": null, "mobile": null, "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIl1LoVo2C1lGQdk49g9Pjfia6PBtiauGqjc6QzZjZB9iaOMcNfHhf7HfbhWaEbNvibOlR6woHVYFbYPQ/132" }, { "userId": "fa3c9cd8509e41e4a2df66ea8de07e86", "nickName": "我就是小丸子呀", "loginName": null, "userName": null, "mobile": null, "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJn8GOtyhibpyvlbOvib0DTBr0Kia2tvMzvskQBa9X9dATXIMuxnTotvbwPhfA8djEVnKkicQmlytc1zw/132" }, { "userId": "6343195228004410b05651bf792d7073", "nickName": "魏燕顺", "loginName": "weiyanshun", "userName": null, "mobile": "18654560989", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/LOHuzoOCOOJkPtj18t2JjkhkAmIu3Lornm30hKTFCf24O1ft7HXK98enYh4OIDJC6V25t9VtiajBibj44NibQY4Dg/132" }] }, { "projectId": "eb69ef69108c48c6b98647100e128821", "name": "狄仁杰之幻涅魔蛾", "projectType": "2", "pictureUrl": ["https://easyaction.cn/upload/project/1f8e680a99334405aac444f762d8fdba_big.jpg", "https://easyaction.cn/upload/project/1f8e680a99334405aac444f762d8fdba_mid.jpg", "https://easyaction.cn/upload/project/1f8e680a99334405aac444f762d8fdba_sml.jpg"], "remark": "神都洛阳发生一起凶杀案", "createDate": "2019-04-15 19:30:52", "starFlag": 0, "isOwner": 1, "memberList": [{ "userId": "5", "nickName": "卢凯", "loginName": "ludaokai", "userName": null, "mobile": "13366812716", "emailAddr": null, "address": null, "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOhsI73nTvsUiaph3NKAPSAhIqnaQYhuEtVy42LcozcJDPFCssINL9xeSV5ZloYEullGBcpfMJJBw/132" }, { "userId": "b5b141d033144787abc99c536082ded6", "nickName": "Principe_王俊熙", "loginName": "王俊熙", "userName": null, "mobile": "15933259259", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJaJy7yK2wgWmhY23wZ7QD1FYNCctc9Be3hY5CFibTB18coD1ibKff1EyfqTbibMzicb95fzfniajiaugdA/132" }, { "userId": "2c46f288cacf4be7b8315169c4c44dec", "nickName": "高俊", "loginName": "tutu", "userName": null, "mobile": "13641941295", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epP5Dice9jZ9KpppuUZrMp73oBpAQAibseiaqRs5Dwp3YTc6Pyeg10UQZJAicPibia8faMpah0eSoodBULw/132" }, { "userId": "8342e91acd4b484bad42d01f139236b2", "nickName": "啊！飘（七柒）", "loginName": null, "userName": null, "mobile": null, "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIY9rQde2Cu2plQ2TjLkc0MSzqutAZsOGEhFXA6lPTD230xG2ziaOzCBtrXqnFaMyHxp2MNSxw9Slg/132" }, { "userId": "f3823dc77db24f508f75fbe8a1a22a4e", "nickName": "孙", "loginName": "孙哲涵", "userName": null, "mobile": "13355715708", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLnr1jHbBVG9ibrWH7icseXoiavEktKwuJW6nANpX36prKNeA2k44j7kJicx7XpmwyQqO46x5RRMzGzbQ/132" }] }, { "projectId": "0ac1aa918b8241a8b0e56a13952d26ff", "name": "测试一点零", "projectType": "1", "pictureUrl": ["https://easyaction.cn/upload/project/project-default-pictrue_big.jpg", "https://easyaction.cn/upload/project/project-default-pictrue_mid.jpg", "https://easyaction.cn/upload/project/project-default-pictrue_sml.jpg"], "remark": "66666", "createDate": "2019-04-24 18:00:15", "starFlag": 0, "isOwner": 1, "memberList": [{ "userId": "5", "nickName": "卢凯", "loginName": "ludaokai", "userName": null, "mobile": "13366812716", "emailAddr": null, "address": null, "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOhsI73nTvsUiaph3NKAPSAhIqnaQYhuEtVy42LcozcJDPFCssINL9xeSV5ZloYEullGBcpfMJJBw/132" }, { "userId": "2c46f288cacf4be7b8315169c4c44dec", "nickName": "高俊", "loginName": "tutu", "userName": null, "mobile": "13641941295", "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epP5Dice9jZ9KpppuUZrMp73oBpAQAibseiaqRs5Dwp3YTc6Pyeg10UQZJAicPibia8faMpah0eSoodBULw/132" }, { "userId": "fa3c9cd8509e41e4a2df66ea8de07e86", "nickName": "我就是小丸子呀", "loginName": null, "userName": null, "mobile": null, "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJn8GOtyhibpyvlbOvib0DTBr0Kia2tvMzvskQBa9X9dATXIMuxnTotvbwPhfA8djEVnKkicQmlytc1zw/132" }] }, { "projectId": "31f606695e72431982129ad690f05494", "name": "产品测试", "projectType": "1", "pictureUrl": ["https://easyaction.cn/upload/project/project-default-pictrue_big.jpg", "https://easyaction.cn/upload/project/project-default-pictrue_mid.jpg", "https://easyaction.cn/upload/project/project-default-pictrue_sml.jpg"], "remark": "梳理产品", "createDate": "2019-05-05 22:12:56", "starFlag": 0, "isOwner": 1, "memberList": [{ "userId": "5", "nickName": "卢凯", "loginName": "ludaokai", "userName": null, "mobile": "13366812716", "emailAddr": null, "address": null, "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqOhsI73nTvsUiaph3NKAPSAhIqnaQYhuEtVy42LcozcJDPFCssINL9xeSV5ZloYEullGBcpfMJJBw/132" }, { "userId": "c9b03e36e4584c00ac32d7fdecd027fb", "nickName": "杰克史派罗", "loginName": null, "userName": null, "mobile": null, "emailAddr": null, "address": null, "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJFDlZ1wsoTibSf8BibET41GiaNZcRMY4ghSkML5EX6WxvVdEuQASlSBtc6QFPGsRaswJibdmkognFAYQ/132" }] }]
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/getCurrentProjects',
    });
    dispatch({
      type: 'dashboard/getProjectsAllTypes',
    });
  }

  renderRow = (list, n) => {
    const len = list.length;
    const lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
    const res = [];
    for (let i = 0; i < lineNum; i++) {
      const temp = list.slice(i * n, i * n + n);
      res.push(temp);
    }
    return res;
  }

  render() {
    const { visible } = this.state;
    const { dashboard: { projectListData, projectTypesData }, loading, form } = this.props;
    const { getFieldDecorator } = form;
    const renderList = this.renderRow(projectListData, 4);

    return (
      <Layout>
        <div className={styles.projectAddBar}>
          <p>项目</p>
          <Button type="link" onClick={() => this.setState({ visible: true })}>新建项目</Button>
        </div>
        {
          renderList.map((col,index) => (
            <Row gutter={16} className={styles.rowCard} key={`${col.length}-${index}`}>
              {
                col.map(item => (
                  <Col span={6} key={item.projectId}>
                    <Card projectInfo={item} to={item.projectId} />
                  </Col>
                ))
              }
            </Row>
          ))
        }
        <Modal
          title="创建项目"
          centered
          visible={visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setState({ visible: false })}
        >
          <Form>
            <FormItem label="项目类型" {...formItemLayout}>
              {getFieldDecorator('projectType', {
                rules: [{ type: 'number', required: true, message: '项目类型不能为空' }]
              })(
                <Select placeholder='请输入项目类型' style={{ width: '80%' }}>
                  {projectTypesData.map(item => {
                    return <Option value={item.type_id} key={item.type_id}>{item.type_name}</Option>
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='项目名称'>
              {getFieldDecorator('name', {
                rules: [{ type: 'string', required: true, message: '项目名称不能为空' }],
                validateFirst: true,
                validateTrigger: 'onChange'
              })(
                <Input placeholder='请输入项目名称' style={{ width: '80%' }} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='项目概述'>
              {getFieldDecorator('remark', {
                rules: [{ type: 'string', required: true, message: '项目描述不能为空' }],
                validateFirst: true,
                validateTrigger: 'onChange'
              })(
                <TextArea placeholder='请输入项目概述' style={{ width: '80%' }} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </Layout>
    )
  }
}

export default DashboardContent;
