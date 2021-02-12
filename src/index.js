// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import '@progress/kendo-theme-default/dist/all.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { MyCommandCell } from "./myCommandCell.jsx";
import products from './products.json';


class DragCell extends React.Component {
    render() {
        return (
            <td onDragOver={(e) => {
                DragCell.reorder(this.props.dataItem);
                e.preventDefault();
                e.dataTransfer.dropEffect = "copy";
                }}>
                <span
                    className="k-icon k-i-reorder"
                    draggable="true"
                    style={{cursor: 'move'}}
                    onDragStart={(e) => {
                        DragCell.dragStart(this.props.dataItem);
                        e.dataTransfer.setData("dragging", "");
                    }}
                />
            </td>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: products,
            activeItem: null
        };
        DragCell.reorder = this.reorder.bind(this);
        DragCell.dragStart = this.dragStart.bind(this);
    }

    CommandCell = props => (
        <MyCommandCell
            {...props}
            edit={this.enterEdit}
            remove={this.remove}
            add={this.add}
            discard={this.discard}
            update={this.update}
            cancel={this.cancel}
            editField={this.editField}
        />
    );

    reorder(dataItem) {
        if (this.state.activeItem === dataItem) {
            return;
        }
        let reorderedData = this.state.gridData.slice();
        let prevIndex = reorderedData.findIndex(p => (p === this.state.activeItem));
        let nextIndex = reorderedData.findIndex(p => (p === dataItem));
        reorderedData.splice(prevIndex, 1);
        reorderedData.splice(nextIndex, 0, this.state.activeItem);

        this.setState({
            gridData: reorderedData,
            active: this.state.activeItem
        });
    }

    dragStart(dataItem) {
        this.setState({
            gridData: this.state.gridData,
            activeItem: dataItem
        });
    }

    render() {
        return (
            <Grid
                style={{ height: '400px' }}
                data={this.state.gridData}
            >
                <Column title="" width="80px" cell={DragCell} />
                <Column field="ProductID" title="ID" width="60px" />
                <Column field="ProductName" title="Name" width="250px" />
                <Column field="Category.CategoryName" title="CategoryName" />
                <Column field="UnitPrice" title="Price" width="80px" />
                <Column field="UnitsInStock" title="In stock" width="80px" />
                <Column cell={this.CommandCell} width="200px" />
            </Grid>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
    // document.querySelector('my-app')
);