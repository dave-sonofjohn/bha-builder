import '@progress/kendo-theme-default/dist/all.css';
import * as React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { MyCommandCell } from "./myCommandCell.jsx";
import { insertItem, getItems, updateItem, deleteItem } from "./services.js";


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

export class App extends React.Component {

    editField = "inEdit";

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeItem: null
        };
        DragCell.reorder = this.reorder.bind(this);
        DragCell.dragStart = this.dragStart.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: getItems(),
        });
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

    remove = dataItem => {
        const data = deleteItem(dataItem);
        this.setState({ data });
    };

    add = dataItem => {
        dataItem.inEdit = true;

        const data = insertItem(dataItem);
        this.setState({
            data: data
        });
    };

    update = dataItem => {
        dataItem.inEdit = false;
        const data = updateItem(dataItem);
        this.setState({ data });
    };

    // Local state operations
    discard = dataItem => {
        const data = [...this.state.data];
        data.splice(0, 1)
        this.setState({ data });
    };

    cancel = dataItem => {
        const originalItem = getItems().find(
            p => p.ProductID === dataItem.ProductID
        );
        const data = this.state.data.map(item =>
            item.ProductID === originalItem.ProductID ? originalItem : item
        );

        this.setState({ data });
    };

    enterEdit = dataItem => {
        this.setState({
            data: this.state.data.map(item =>
                item.ProductID === dataItem.ProductID ? { ...item, inEdit: true } : item
            )
        });
    };

    itemChange = event => {
        const data = this.state.data.map(item =>
            item.ProductID === event.dataItem.ProductID
                ? { ...item, [event.field]: event.value }
                : item
        );

        this.setState({ data });
    };

    addNew = () => {
        const newDataItem = { inEdit: true, Discontinued: false };

        this.setState({
            data: [newDataItem, ...this.state.data]
        });
    };    

    reorder(dataItem) {
        if (this.state.activeItem === dataItem) {
            return;
        }
        let reorderedData = this.state.data.slice();
        let prevIndex = reorderedData.findIndex(p => (p === this.state.activeItem));
        let nextIndex = reorderedData.findIndex(p => (p === dataItem));
        reorderedData.splice(prevIndex, 1);
        reorderedData.splice(nextIndex, 0, this.state.activeItem);

        this.setState({
            data: reorderedData,
            active: this.state.activeItem
        });
    }

    dragStart(dataItem) {
        this.setState({
            data: this.state.data,
            activeItem: dataItem
        });
    }

    render() {
        return (
            <Grid
                style={{ height: '400px' }}
                data={this.state.data}
                onItemChange={this.itemChange}
                editField={this.editField}
            >

                <GridToolbar>
                    <button
                        title="Add new"
                        className="k-button k-primary"
                        onClick={this.addNew}
                    >
                        Add new
                    </button>
                </GridToolbar>

                <Column title="" width="80px" cell={DragCell} />
                <Column field="ProductID" title="ID" width="0px" editable={false} show={false} />
                <Column field="comp" title="Component" width="200px" />
                <Column field="sn" title="Serial #" width="150px" />
                <Column field="length" title="Length (m)" editor="numeric" width="100px" />
                <Column field="od" title="OD (mm)" editor="numeric" width="100px" />
                <Column field="id" title="ID (mm)" editor="numeric" width="100px" />
                <Column field="descrip" title="Description" />  
                <Column cell={this.CommandCell} width="200px" />
            </Grid>
        );
    }
}


