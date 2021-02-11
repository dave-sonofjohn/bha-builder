import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import products from './products.json';

function BhaTable() {
    return (
        <Grid
            style={{ height: '400px' }}
            data={[ ...products ]}
        >
            <Column field="ProductID" title="ID" width="0px" editable={false} show={false} />
            <Column field="comp" title="Component" width="200px" />
            <Column field="sn" title="Serial #" width="150px" />
            <Column field="length" title="Length (m)" editor="numeric" width="100px" />
            <Column field="od" title="OD (mm)" editor="numeric" width="100px" />
            <Column field="id" title="ID (mm)" editor="numeric" width="100px" />
            <Column field="descrip" title="Description" />
            {/* <Column cell={this.CommandCell} width="100px" /> */}
        </Grid>
    );
}

export default BhaTable