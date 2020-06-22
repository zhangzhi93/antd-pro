import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Link } from 'umi';
import { Table } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import arrayMove from 'array-move';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import EaCard from '@/components/EaCard';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const tableData = [];
for (let i = 0; i < 46; i++) {
  tableData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default class SceneList extends Component {
  constructor(props) {
    super(props);
    this.protal = null;
    this.headProtal = null;
    this.state = {
      loading: false,
      data: tableData,
    };
  }

  setPortal = (protal) => {
    this.protal = protal;
  }

  setHeadPortal = (protal) => {
    this.headProtal = protal;
  }

  setHeadPortalNode = (node) => {
    return ReactDOM.createPortal(node, this.headProtal);
  }

  setPortalNode = (node) => {
    return ReactDOM.createPortal(node, this.protal);
  }

  tableBodyWrapper = (props) => {
    return (
      <Droppable droppableId="data" type="data" ignoreContainerClipping>
        {droppableProvided => (
          <tbody
            ref={ref => {
              droppableProvided.innerRef(ref);
            }}
            {...droppableProvided.droppableProps}
            className={props.className}
          >
            {props.children}
            {droppableProvided.placeholder}
          </tbody>
        )}
      </Droppable>
    );
  }

  tableBodyRow = (props) => {
    const key = props['data-row-key'];
    return (
      <Draggable draggableId={key.toString()} index={props.index} key={key}>
        {(provided, snapshot) => {
          const node = (
            <tr
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`${props.className} jz-table-body-row  ${snapshot.isDragging ? 'dragging' : ''}`}
            >
              {props.children}
            </tr>
          );
          return snapshot.isDragging ? this.setPortalNode(node) : node;
        }}
      </Draggable>
    );
  }

  // tableBodyCell = (props) => {
  //   return (
  //     <Draggable draggableId={key} index={props.index} key={key}>
  //       {(provided, snapshot) => {
  //         const node = (
  //           <tr
  //             ref={provided.innerRef}
  //             {...provided.draggableProps}
  //             {...provided.dragHandleProps}
  //             className={`${props.className} jz-table-body-row  ${snapshot.isDragging ? 'dragging' : ''}`}
  //           >
  //             {props.children}
  //           </tr>
  //         );
  //         return node;
  //       }}
  //     </Draggable>
  //   );
  // }

  onDragEnd = ({ destination, source }) => {
    this.setState(({ data }) => ({
      data: arrayMove(data, source.index, destination.index),
    }));
  }

  renderPortalTable = () => {
    return (
      <div className="ant-table-warpper portal">
        <div className="ant-table ant-table-small">
          <div className="ant-table-content">
            <div className="ant-table-body">
              <table style={{ tableLayout: 'auto' }}>
                <thead className="ant-table-thead">
                  {/* <tr ref={ref => this.setHeadPortal(ref)} /> */}
                  <tr>
                    <th className="ant-table-cell">Name</th>
                    <th className="ant-table-cell">Age</th>
                    <th className="ant-table-cell">Address</th>
                  </tr>
                </thead>
                <tbody ref={ref => this.setPortal(ref)} className="ant-table-tbody">
                  <tr className="ant-table-row ant-table-row-level-0">
                    <td>Edward King 3</td>
                    <td>32</td>
                    <td>London, Park Lane no. 3</td>
                  </tr>
                  <tr
                    data-rbd-draggable-context-id="4"
                    data-rbd-draggable-id="0"
                    tabIndex="0"
                    role="button"
                    aria-describedby="rbd-hidden-text-4-hidden-text-103"
                    data-rbd-drag-handle-draggable-id="0"
                    data-rbd-drag-handle-context-id="4"
                    draggable="false"
                    className="ant-table-row ant-table-row-level-0 jz-table-body-row"
                    style={{ position: 'fixed', top: 386, left: 250 }}
                  >
                    <td className="ant-table-cell">Edward King 0</td>
                    <td className="ant-table-cell">32</td>
                    <td className="ant-table-cell">London, Park Lane no. 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loading, data } = this.state;

    return (
      <PageHeaderWrapper>
        <EaCard
          title="场景表"
          className="card-wrapper"
          selectSize
        >
          <DragDropContext
            onDragEnd={this.onDragEnd}
          >
            <Table
              loading={loading}
              bordered
              size="small"
              columns={columns}
              dataSource={data}
              onRow={(record, index) => ({ record, index })}
              components={{
                body: {
                  wrapper: (props) => this.tableBodyWrapper(props),
                  row: (props) => this.tableBodyRow(props),
                  // cell: (props) => this.tableBodyCell(props),
                },
              }}
            />
          </DragDropContext>
          {this.renderPortalTable()}
        </EaCard>
      </PageHeaderWrapper >
    );
  }
}
