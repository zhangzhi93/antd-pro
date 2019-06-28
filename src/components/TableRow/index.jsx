import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shot: { getDitShotQueryAllData: { recordList, recordCount } } } = this.props;

    return (
      
    );
  }
}

export default TableRow;
