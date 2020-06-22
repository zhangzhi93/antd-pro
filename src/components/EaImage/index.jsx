import React, { Component } from 'react';
import { Spin } from 'antd';
import Zmage from 'react-zmage';
import Icon from '@ant-design/icons';
import styles from './index.less';

const failSvg = () => (
  <svg t="1580874077776" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1537" width="36" height="36">
    <path fill="#909398" d="M776 328m-72 0a72 72 0 1 0 144 0 72 72 0 1 0-144 0Z" p-id="1538" />
    <path fill="#909398" d="M999.904 116.608a32 32 0 0 0-21.952-10.912l-456.192-31.904a31.552 31.552 0 0 0-27.2 11.904l-92.192 114.848a32 32 0 0 0 0.672 40.896l146.144 169.952-147.456 194.656 36.48-173.376a32 32 0 0 0-11.136-31.424L235.616 245.504l79.616-125.696a32 32 0 0 0-29.28-49.024l-240.192 16.768a32 32 0 0 0-29.696 34.176l55.808 798.016a32.064 32.064 0 0 0 34.304 29.696l176.512-13.184c17.632-1.312 30.848-16.672 29.504-34.272s-16.576-31.04-34.304-29.536l-144.448 10.784-6.432-92.512 125.312-12.576a32 32 0 0 0 28.672-35.04 32.16 32.16 0 0 0-35.04-28.672l-123.392 12.416L82.144 149.184l145.152-10.144-60.96 96.224a32 32 0 0 0 6.848 41.952l198.4 161.344-58.752 279.296a30.912 30.912 0 0 0 0.736 14.752 31.68 31.68 0 0 0 1.408 11.04l51.52 154.56a31.968 31.968 0 0 0 27.456 21.76l523.104 47.552a32.064 32.064 0 0 0 34.848-29.632L1007.68 139.84a32.064 32.064 0 0 0-7.776-23.232z m-98.912 630.848l-412.576-39.648a31.52 31.52 0 0 0-34.912 28.768 32 32 0 0 0 28.8 34.912l414.24 39.808-6.272 89.536-469.728-42.72-39.584-118.72 234.816-310.016a31.936 31.936 0 0 0-1.248-40.192L468.896 219.84l65.088-81.056 407.584 28.48-40.576 580.192z" p-id="1539" />
  </svg>
);
const FailIcon = props => <Icon component={failSvg} {...props} />;
export default class EaImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      fail: false,
    };
  }

  componentDidMount() {
    const { src } = this.props;
    const image = new Image()
    image.src = src;
    image.onload = () => {
      this.setState({
        loaded: true,
      });
    }
    image.onerror = () => {
      this.setState({
        fail: true,
      });
    }
  }

  render() {
    const { loaded, fail } = this.state;
    const { src, preview = true, set, defaultPage, className, errorIcon } = this.props;
    return (
      <div className={`${styles.imgContainer} ${className}`}>
        {
          loaded ?
            (preview ?
              <Zmage
                src={src}
                set={set}
                defaultPage={defaultPage}
              /> :
              <img src={src} alt={src} />
            ) :
            (fail ? (errorIcon || <FailIcon style={{ color: '#efefef' }} />) : <Spin />)
        }
      </div>
    );
  }
}
