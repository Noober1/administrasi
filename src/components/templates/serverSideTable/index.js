import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import { useFetchApi } from '../../../lib'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { Typography, Button, CircularProgress, Skeleton, useTheme } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const ServerSideTable = forwardRef((props, ref) => {
    let { url, perPage, columns, placeholder } = props
    const [page, setpage] = useState(0)

    const urlParam = new URLSearchParams()
    urlParam.append('limit', perPage || "10")
    urlParam.append('page', (page + 1).toString())

    const [data,loading,isError,errorMessage] = useFetchApi(`${url}?${urlParam.toString()}`)

    const [completeInit, setcompleteInit] = useState(false)
    const [paginationData, setpaginationData] = useState({})
    const [rows, setRows] = useState([]);
    const [selections, setSelections] = useState([])
    const [searchOnChange, setsearchOnChange] = useState('')
    const [searchText, setSearchText] = useState('');

    const theme = useTheme()

    useUpdateEffect(() => {
        if (!loading && data !== null) {
            setRows(data.data)
            if (!completeInit) {
                setpaginationData(data.pagination)
                setcompleteInit(true)
            }
        }
    }, [loading])

    if (process.env.NODE_ENV === 'development') {
        useUpdateEffect(() => {
            console.log('Component > ServerSideTable: fetching data',data,loading,isError,errorMessage)
        }, [data,loading,isError,errorMessage])
    
        useUpdateEffect(() => {
            console.log('Component > ServerSideTable: table page', page)
        }, [page])
    }

    const InitView = () => (
        <div className="relative w-full h-80 py-12 overflow-hidden rounded-md">
            {!isError ?
                <div className="flex items-center w-full h-full">
                    <Skeleton variant="rect" className="w-full h-full absolute top-0 left-0 right-0 bottom-0"/>
                    <div className="mx-auto">
                        <CircularProgress size={60}/>
                    </div>
                </div> :
                <div className="w-full mx-auto text-center">
                    <img src="/error.png" alt="Error" className="w-32 mx-auto mb-2"/>
                    <Typography variant="h6" gutterBottom>
                        Terjadi kesalahan: {errorMessage}
                    </Typography>
                    <Button
                        variant="contained"
                        className="bg-blue-500 text-white"
                        // onClick={() => refreshTable(true)}
                        startIcon={<ReplayIcon/>}
                    >
                        Coba lagi
                    </Button>
                </div>
            }
        </div>
    )

    if (!completeInit) {
        return(
            <InitView/>
        )
    }

    return (
        <DataGrid
            style={{
                backgroundColor:theme.palette.background.paper
            }}
            checkboxSelection
            autoHeight
            pagination
            headerHeight={40}
            rowHeight={40}
            pageSize={paginationData.perPage}
            onPageChange={page=>setpage(page)}
            rowCount={paginationData.total}
            rowsPerPageOptions={[5,10,15,20]}
            disableSelectionOnClick
            paginationMode="server"
            columns={columns}
            rows={rows}
            loading={loading}
        />
    )
})

ServerSideTable.propTypes = {
    url: PropTypes.string.isRequired,
    perPage: PropTypes.string,
    columns: PropTypes.array.isRequired,
    placeholder: PropTypes.string
}

export default ServerSideTable
