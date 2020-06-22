import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import styles from './index.less';

class DragableWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log('tbody', this.props);
    const { className, children } = this.props;
    return (
      <tbody className={className}>{children}</tbody>
    )
  }
}

export default SortableContainer(DragableWrapper);
