import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import products from './products.json';

function BhaTable() {
    return (
        <Grid
            style={{ height: '400px' }}
            data={[ ...products ]}
        >
            <Column field="ProductID" title="ID" width="40px" />
            <Column field="ProductName" title="Name" width="250px" />
            <Column field="Category.CategoryName" title="CategoryName" />
            <Column field="UnitPrice" title="Price" />
            <Column field="UnitsInStock" title="In stock" />
            <Column
                field="Discontinued"
                cell={props => (
                    <td>
                        <input disabled type="checkbox" checked={props.dataItem[props.field]} />
                    </td>
                )}
            />
        </Grid>
    );
}

export default BhaTable