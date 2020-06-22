import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom'
import { Select, Card, Slider } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined, FilterFilled, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Option } = Select;

export default class EaCard extends Component {
  constructor(props) {
    super(props);
    this.switchFullAction = false;
    this.fullElement = undefined;
    this.state = {
      full: false,
      size: 10,
      zoom: 1,
    };
  }

  componentDidUpdate() {
    const { onFullScreen } = this.props;
    if (this.switchFullAction) {
      onFullScreen && setTimeout(() => {
        onFullScreen();
      }, 500);
      this.switchFullAction = false;
    }
  }

  getTable() {
    const { fullId } = this.props;
    const element = fullId ? document.getElementById(fullId) : findDOMNode(this);
    return element && element.getElementsByTagName('table')[0];
  }

  getCard(obj) {
    // ant-card-body
    const { fullId } = this.props;
    const element = fullId ? document.getElementById(fullId) : findDOMNode(this);
    return element && element.getElementsByClassName(obj)[0];
  }

  fullScreen = (element, system = false) => {
    if (system) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }
    } else {
      this.setState({ full: true });
    }
  }

  // 退出全屏
  exitFullscreen = (element, system = false) => {
    if (system) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
      this.setState({ full: false });
    }
  }

  switchFull = () => {
    this.switchFullAction = true;
    const { full } = this.state;
    const { fullId } = this.props;
    const element = fullId ? document.getElementById(fullId) : findDOMNode(this);
    if (full) {
      this.exitFullscreen(element);
    } else {
      this.fullScreen(element);
    }
  }

  onChangeSize = (size) => {
    let table;
    if (this.props.type !== undefined) {
      table = this.getCard(this.props.type);
      table.style.height = `${(10 / size) * 100}%`;
    } else {
      table = this.getTable();
      table.parentNode.style.height = `${table.offsetHeight * size * 0.1}px`;
    }

    table.style.width = `${(10 / size) * 100}%`;
    this.setState({ size });
  }

  onChangeZoom = (zoom) => {
    const { onSlider } = this.props;
    const arrow = zoom > this.state.zoom ? 'in' : 'out';
    onSlider && onSlider(zoom, arrow);
    this.setState({ zoom });
  }

  changeSlider = (type) => {
    const { zoom } = this.state;
    this.onChangeZoom(type === 'in' ? zoom >= 5 ? 5 : zoom + 1 : zoom <= 1 ? 1 : zoom - 1);
  }

  openFilter = () => {
    const { onOpenFilter } = this.props;
    onOpenFilter && onOpenFilter();
  }

  render() {
    const { title, extra, children, selectSize, className, slider, filter, isFilter, bodyStyle, loading } = this.props;
    const { full, size, zoom } = this.state;
    return (
      <Card
        // ref={ref => this.fullElement = ref}
        title={title}
        className={`ea-card ${className} ${full ? 'full-screen' : ''} scale-${size}`}
        bodyStyle={bodyStyle}
        loading={loading}
        extra={
          <>
            {extra ? <div className={styles.actions}>{extra}</div> : null}
            {filter && (
              <span
                onClick={this.openFilter}
                className={`${styles.actions} ${styles.filterBtn}`}
              >
                <FilterFilled className={isFilter ? styles.filtered : ''} />
              </span>
            )}
            <div className={styles.zoom}>
              {selectSize && (
                <>
                  <span
                    onClick={() => this.switchFull()}
                    className={styles.fullBtn}
                  >
                    {full ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                  </span>
                  {
                    slider ?
                      <div className={styles.sliderAction}>
                        <ZoomOutOutlined onClick={() => this.changeSlider('out')} />
                        <Slider
                          value={zoom}
                          tipFormatter={null}
                          max={5}
                          min={1}
                          onChange={value => this.onChangeZoom(value)}
                        />
                        <ZoomInOutlined onClick={() => this.changeSlider('in')} />
                      </div> :
                      <Select value={size} onChange={value => this.onChangeSize(value)}>
                        <Option value={10}>100%</Option>
                        <Option value={9}>90%</Option>
                        <Option value={8}>80%</Option>
                        <Option value={7}>70%</Option>
                      </Select>
                  }

                </>
              )}
            </div>
          </>
        }
      >
        {children}
      </Card>
    );
  }
}
