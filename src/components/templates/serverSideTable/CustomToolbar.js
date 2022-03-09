import { Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid'
import React from 'react'

const CustomToolbar = ({refreshHandler,refreshText, customButton, setdialogOpen, deleteLabel, showDeleteButton, showToolbar}) => {
    if (!showToolbar) return false
    return (
        <GridToolbarContainer className="grid grid-cols-2 sm:block">
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
            {showDeleteButton &&
                <Button size="small" color="error" startIcon={<DeleteIcon/>} onClick={setdialogOpen}>
                    {deleteLabel}
                </Button>
            }
            {customButton}
        </GridToolbarContainer>
    )
}

export default CustomToolbar
