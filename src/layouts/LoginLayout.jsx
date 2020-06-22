import React, { Component } from 'react';
import { connect, history } from 'umi';
import { Input, Button, Checkbox, Tabs, Form, Spin, Result, Icon } from 'antd';
import { LockOutlined, UserOutlined, CopyrightCircleOutlined } from '@ant-design/icons';
import defaultSettings from '../../config/defaultSettings';
import styles from './Layout.less';
import scanSuccess from '../assets/scan_success.svg';

const FormItem = Form.Item;
const TabsTabPane = Tabs.TabPane;
const BetaSvg = () => (
  <svg t="1590501299396" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3144" width="48" height="48">
    <path d="M664.99758194 738.00446462l-193.45982154 163.85323606L412.8896017 738.00446462H392.66220203a169.50334788 169.50334788 0 0 1-169.50334788-169.50334865V285.99553538a169.50334788 169.50334788 0 0 1 169.50334788-169.50334788h1130.02232154a169.50334788 169.50334788 0 0 1 169.50334866 169.50334788v282.50558058a169.50334788 169.50334788 0 0 1-169.50334866 169.50334865H664.99758194zM334.0140441 222.20577588V625.00223192H536.17503752c53.11104933 0 94.18736061-10.50920726 123.17243259-31.47112132 28.98507277-20.90541284 43.44935815-50.56849877 43.44935815-88.81975491 0-26.83803003-8.75767311-48.92996631-26.21651731-66.21930759-17.51534619-17.2893413-40.90680836-26.83803003-70.34389017-28.7025674l1.13002298-1.6385317c21.47042433-4.97209788 38.42075904-15.08579811 50.85100414-30.34109989 12.43024586-15.25530101 18.64536841-33.8441682 18.64536841-55.71010033 0-20.22739966-5.48060814-38.30775659-16.38532399-54.24107155a91.36230469 91.36230469 0 0 0-44.57938036-34.35267845 179.67354933 179.67354933 0 0 0-42.20633348-8.5316682 624.2808318 624.2808318 0 0 0-63.45075369-2.76855469h-176.28348192z m705.98144532 292.167271c0-1.6950337 0.11300245-3.95507813 0.28250535-6.89313649l0.28250537-6.328125c0-46.55691942-13.67326975-83.05664063-40.96330883-109.66866575-27.34654029-26.55552466-64.91978247-39.88978783-112.71972655-39.88978783-46.33091529 0-83.84765625 12.99525658-112.43722121 38.92926853-28.58956495 25.93401195-42.94084789 59.89118337-42.94084788 101.75851027 0 42.37583717 14.1252788 76.84151808 42.26283471 103.45354319 28.13755591 26.66852711 64.80678002 40.00279029 110.06417433 40.00279029 38.25125536 0 70.40039063-7.96665748 96.44740502-23.9564729 25.99051317-16.04631664 43.78836473-38.53376149 53.39355469-67.63183593h-99.32896216a48.47795726 48.47795726 0 0 1-17.96735524 21.52692479 48.4214568 48.4214568 0 0 1-26.72502758 7.45814721c-16.95033472 0-30.51060279-5.02859911-40.85030714-15.02929687-10.28320313-10.00069777-16.83733226-24.5779856-19.60588695-43.73186352h210.74916284z m60.68219822-235.60965381v83.62165135h-34.46568092v67.57533472h34.46568092V543.07561351c0 37.68624463 5.65011183 62.54673561 16.95033471 74.58147366 11.30022289 12.09123851 33.73116652 18.08035692 67.23632813 18.08035692 12.82575368 0 25.53850414-0.84751685 38.02525123-2.59905101 12.54324755-1.6950337 24.91699219-4.46358839 37.29073681-8.13616115V558.78292433a214.70424097 214.70424097 0 0 1-15.4813059 3.44656786 68.42285156 68.42285156 0 0 1-11.86523438 1.24302467c-10.67871094 0-17.91085401-3.1640625-21.80943091-9.4921875-3.84207568-6.38462623-5.76311351-23.33496094-5.76311351-50.90750536V429.96037914h61.52971506V362.38504443h-61.58621629v-83.62165135h-104.52706496z m480.03348269 198.65792357c0-23.56096508-1.52553002-41.1328125-4.52008962-52.71554076a80.51409007 80.51409007 0 0 0-15.59430836-30.90611059 105.65708717 105.65708717 0 0 0-47.4609375-31.58412378c-20.05789598-7.06263939-44.07087086-10.62220971-71.98242188-10.6222097-42.37583717 0-75.88099877 7.34514476-100.74148973 22.03543505-24.86049097 14.74679151-39.04227099 35.82170726-42.71484375 63.22474876h103.39704274a35.82170726 35.82170726 0 0 1 13.67326976-23.8434712 45.31389476 45.31389476 0 0 1 28.81556908-9.04017845c11.30022289 0 20.34040211 2.93805836 27.3465403 8.75767309a27.85505055 27.85505055 0 0 1 10.4527068 22.48744409 23.39146217 23.39146217 0 0 1-10.33970435 20.39690335c-6.8931365 4.80259497-17.96735524 7.91015625-33.22265625 9.37918504a958.99344286 958.99344286 0 0 0-52.43303616 4.68959252c-34.57868336 4.06808058-59.32617188 12.20424096-74.18596507 24.57798561-14.91629443 12.31724341-22.37444164 30.22809743-22.37444163 53.7890625 0 27.40304152 8.58816942 48.87346507 25.65150658 64.4112722 17.11983839 15.53780714 40.73730469 23.27845972 70.90890012 23.27845972 20.96191406 0 39.72028493-4.18108225 56.27511183-12.54324755 16.55482689-8.36216528 29.9455913-20.34040211 40.28529564-35.99121093 1.6950337 9.77469287 3.1640625 17.34584253 4.40708717 22.76994944 1.29952588 5.42410692 2.71205347 10.4527068 4.18108303 15.02929687h106.22209788a104.07505592 104.07505592 0 0 1-12.14773973-31.0756135 182.21609911 182.21609911 0 0 1-3.8985769-39.55078125V477.42131664zM444.07821765 455.046875h91.02329812c17.11983839 0 30.34109911 3.84207568 39.60728246 11.46972656 9.26618336 7.62765089 13.95577589 18.41936351 13.95577589 32.43164063 0 14.52078662-4.52008961 25.42550245-13.56026808 32.65764476-9.04017846 7.28864431-22.31794117 10.90471507-40.00279027 10.90471584H444.07821765V455.046875z m0-151.42299097h67.85784085c19.66238818 0 34.12667433 2.93805836 43.33635571 8.92717602 9.15318092 5.98911842 13.78627221 15.42480469 13.78627219 28.25055836 0 12.54324755-4.74609375 21.86593214-14.23828125 28.02455347-9.43568628 6.21512256-23.73046875 9.26618336-42.88434665 9.26618336H444.07821765V303.62388403z m496.87081496 153.68303539h-111.75920726c3.33356618-16.04631664 10.22670189-28.64606618 20.73590917-37.85574754a55.71010033 55.71010033 0 0 1 38.02525121-13.78627222c14.18178002 0 25.65150659 4.29408471 34.35267848 12.82575291 8.75767311 8.58816942 14.97279565 21.47042433 18.6453684 38.75976562z m539.35965379 31.640625l0.84751687 12.31724341c0.16950368 2.82505591 0.22600413 5.31110525 0.2260049 7.34514553 0 23.50446461-4.18108225 41.24581495-12.65625 53.22405102-8.47516774 11.92173561-20.96191406 17.91085401-37.51674097 17.910854a40.96330882 40.96330882 0 0 1-27.57254518-8.92717677 29.83258961 29.83258961 0 0 1-10.50920727-23.89997166c0-8.47516774 2.48604933-15.36830347 7.45814721-20.79241115 4.97209788-5.48060814 12.76925245-9.83119408 23.44796339-13.10825905 2.03404029-0.56501149 5.25460402-1.4690288 9.60518918-2.82505514 23.05245558-6.55412913 38.59026195-13.67326975 46.66992187-21.18791897z" p-id="3145" fill="#d81e06" />
  </svg>
);
@connect(({ loading }) => ({ loading }))
class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.stopCircle = false;
    this.state = {
      scanQrCode: false,
      loginSuccess: false,
      loginFail: false,
      Qrcode: ''
    };
  }

  // 切换tab页面
  changeTab = key => {
    if (key === '2') {
      this.readyWechatLogin();
    } else {
      this.stopCircle = true;
    }
  };

  readyWechatLogin = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/wechatQrcode',
      success: data => {
        this.setState({
          scanQrCode: false,
          loginSuccess: false,
          loginFail: false,
          Qrcode: data.image
        });
        this.stopCircle = false;
        this.isScanQrcode(data.code);
      }
    })
  }

  isScanQrcode = (code) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/isScanQrcode',
      payload: {
        loginCode: code
      },
      success: ({ status, token }) => {
        if (status === 0) {
          !this.stopCircle && setTimeout(() => {
            this.isScanQrcode(code);
          }, 800);
        } else if (status === 1) {
          !this.stopCircle && setTimeout(() => {
            this.isScanQrcode(code);
          }, 800);
          this.setState({ scanQrCode: true });
        } else if (status === 2) {
          this.setState({
            loginSuccess: true,
            scanQrCode: false
          }, () => {
            setTimeout(() => {
              window.localStorage.setItem('token', token);
              history.replace('/');
            }, 1000)
          });
        } else if (status === 3) {
          this.setState({
            loginFail: true,
            scanQrCode: false
          });
        }
      }
    })
  }

  // 提交登陆
  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/login',
      payload: {
        appId: 2,
        loginName: values.name,
        password: values.password,
      },
      success: (data) => {
        window.localStorage.setItem('token', data.token);
        history.replace('/');
      }
    });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { Qrcode, scanQrCode, loginSuccess, loginFail } = this.state;
    const { loading: { effects } } = this.props;

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginLogo}>
          <div className="logo-image">
            <img src="https://file.easyaction.cn/shot_photo/easyaction/logo/LOGOb.png" alt={defaultSettings.title} />
            <span className="logo-beta"><BetaSvg /></span>
          </div>
          <p className="logo-desc">简单、高效的影视制片流程管理平台</p>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabsTabPane tab="账号密码登录" key="1">
            <Form onFinish={this.handleSubmit} initialValues={{ remember: true }} className={styles.loginForm}>
              <FormItem name="name" rules={[{ required: true, message: '请输入用户名!' }]} hasFeedback>
                <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
              </FormItem>
              <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]} hasFeedback>
                <Input size="large" prefix={<LockOutlined />} type="password" placeholder="密码" />
              </FormItem>
              <FormItem name="remember" className="remember">
                <Checkbox>记住我</Checkbox>
              </FormItem>
              <FormItem>
                <Button type="primary" size="large" block htmlType="submit">
                  登录
                </Button>
              </FormItem>
            </Form>
          </TabsTabPane>
          <TabsTabPane tab="微信登录" key="2">
            <h2 style={{ fontSize: 20 }}>微信登录</h2>
            <div className={styles.qrcode}>
              <Spin spinning={effects['user/wechatQrcode']}>
                {
                  (!scanQrCode && !loginSuccess && !loginFail && Qrcode) && <img src={Qrcode} alt="二维码" />
                }
                {
                  scanQrCode && (
                    <Result
                      icon={<img src={scanSuccess} alt="扫码成功" width="120" height="120" />}
                      title="扫码成功"
                      subTitle="请在手机端确认登陆..."
                    />
                  )
                }
                {
                  loginSuccess && (
                    <Result
                      status="success"
                      title="登陆成功"
                    />
                  )
                }
                {
                  loginFail && (
                    <Result
                      status="error"
                      title="登陆失败"
                      subTitle={<p>点击<Button size="small" type="link" onClick={this.readyWechatLogin}>刷新</Button>重新扫码</p>}
                    />
                  )
                }
              </Spin>
            </div>
          </TabsTabPane>
        </Tabs>
        <div className={styles.footer}>
          <p>易制片</p>
          <p>copyright <CopyrightCircleOutlined /> 2020 吾一影业出品</p>
        </div>
      </div>
    );
  }
}

export default LoginLayout;
