import React, { Component } from 'react';
import { Button, Card } from 'antd';

class ConsolePages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '搜索',
    };
  }

  render() {
    const { text } = this.state;
    return (
      <Card>
        <Button type="primary" htmlType="submit" ghost>{text}</Button>
      </Card>
    )
  }
}

export default ConsolePages;
