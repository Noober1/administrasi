import { Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import React from 'react'

const CustomToolbar = ({refreshHandler,refreshText}) => {
    return (
        <GridToolbarContainer>
            <Button
                size="small"
                startIcon={<RefreshIcon/>}
                onClick={refreshHandler}
            >
                {refreshText}
            </Button>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
        </GridToolbarContainer>
    )
}

export default CustomToolbar
