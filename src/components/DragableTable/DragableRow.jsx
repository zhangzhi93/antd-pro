import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import styles from './index.less';

class DragableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log('tr', this.props);
    return (
      <tr {...this.props} index={this.props['data-row-key']} />
    )
  }
}

export default SortableElement(DragableRow);
