import { Alert, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'

const columns = [
    {
        field:'code',
        headerName:'Kode',
        flex:1
    },
    {
        field: 'name',
        headerName: 'Nama',
        width: 120
    },
    {
        field: 'brand',
        headerName: 'Merek',
        flex:1
    },
    {
        field: 'model',
        headerName: 'Model',
        flex:1
    },
    {
        field:'id',
        flex: 1,
        minWidth: 250,
        headerName:'Aksi',
        sortable:false,
        disableHide:true,
        filterable: false,
        disableMenu:true,
        headerAlign:'center',
        align:'center',
        renderCell: params => (
            <>
                <Button
                    size="small"
                    variant="outlined"
                    className="bg-blue-500 text-white mr-1"
                    onClick={() => handleEditItem(params.row)}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    className="bg-green-500 text-white mr-1"
                    onClick={() => router.push('/transaksi/' + params.row.id)}
                >
                    Transaksi
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    className="bg-red-500 text-white mr-1"
                    onClick={() => handleDeleteItem(params.row.id)}
                >
                    Hapus
                </Button>
            </>
        )
    }
];

const Student = () => {

    return (
        <Box>
            <PanelContentTitle title="Daftar Mahasiswa"/>
            <Alert severity="info">
                Berikut adalah data mahasiswa
            </Alert>
            <ServerSideTable
                url='/inventaris/item/3/input'
                columns={columns}
            />
        </Box>
    )
}

Student.getLayout = page => (
    <Panel>
        {page}
    </Panel>
)

export default Student
