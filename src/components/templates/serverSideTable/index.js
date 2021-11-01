import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes, { string } from 'prop-types'
import { DataGrid, useGridApiContext, useGridState } from '@mui/x-data-grid'
import { useFetchApi } from '../../../lib'
import { useEffectOnce, useUpdate, useUpdateEffect } from 'react-use'
import { Typography, Button, CircularProgress, Skeleton, useTheme, Pagination } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import useLocalization from '../../../lib/useLocalization'
import { tableLocalization } from '../../../constants'
import CustomToolbar from './CustomToolbar'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../lib/redux/slices/authSlice'

const ServerSideTable = forwardRef((props, ref) => {
    const strings = useLocalization()
    const auth = useSelector(selectAuth)
    const localeText = tableLocalization(strings.languange.initial)
    let { url, perPage, columns, placeholder } = props
    const [page, setpage] = useState(0)
    const [refreshCount, setrefreshCount] = useState(0)

    const urlParam = new URLSearchParams()
    urlParam.append('limit', perPage || "10")
    urlParam.append('page', (page + 1).toString())
    urlParam.append('refresh', refreshCount)

    const [data,loading,isError,errorMessage] = useFetchApi(`${url}?${urlParam.toString()}`, {
        url: `${url}?${urlParam.toString()}`,
        headers: {
            Authorization: `Bearer ${auth.authToken}`
        }
    })

    const [completeInit, setcompleteInit] = useState(false)
    const [fetchFailed, setfetchFailed] = useState(false)
    const [paginationData, setpaginationData] = useState({})
    const [rows, setRows] = useState([]);
    const [selections, setSelections] = useState([])
    const [searchOnChange, setsearchOnChange] = useState('')
    const [searchText, setSearchText] = useState('')

    const refreshTable = (forceRefresh = false) => {
        if (!forceRefresh) {
            if (loading) return
        } else {
            if (isError) {
                setfetchFailed(false)
                setcompleteInit(false)
            }
        }
        setrefreshCount(refreshCount + 1)
    }

    useImperativeHandle(ref, () => ({
        refresh: refreshTable,
        getSelection: () => selections
    }));

    const theme = useTheme()

    useUpdateEffect(() => {
        if (!loading && data !== null) {
            setRows(data.data)
            if (!completeInit) {
                setpaginationData(data.pagination)
                setcompleteInit(true)
            }
        }
        if (isError) {
            setfetchFailed(true)
            setcompleteInit(false)
        }
    }, [loading])

    if (process.env.NODE_ENV === 'development') {
        useUpdateEffect(() => {
            console.log('Component > ServerSideTable: fetching data',data,loading,isError,errorMessage)
        }, [data,loading,isError,errorMessage])
    
        useUpdateEffect(() => {
            console.log('Component > ServerSideTable: table page', page)
        }, [page])
        useUpdateEffect(() => {
            console.log('Component > ServerSideTable: table localization strings', localeText)
        }, [localeText])
    }

    const InitView = () => (
        <div className="relative w-full h-80 py-12 overflow-hidden rounded-md">
            {!fetchFailed ?
                <div className="flex items-center w-full h-full">
                    <Skeleton variant="rect" className="w-full h-full absolute top-0 left-0 right-0 bottom-0"/>
                    <div className="mx-auto">
                        <CircularProgress size={60}/>
                    </div>
                </div> :
                <div
                    className="w-full mx-auto p-5 text-center rounded-md"
                    style={{
                        backgroundColor:theme.palette.background.paper
                    }}
                >
                    <img src="/error.png" alt="Error" className="w-32 mx-auto mb-2"/>
                    <Typography variant="h6" gutterBottom>
                        {strings.default.anErrorOccured}: {errorMessage}
                    </Typography>
                    <Button
                        variant="contained"
                        className="bg-blue-500 text-white"
                        onClick={() => refreshTable(true)}
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

    const CustomPagination = () => {
        const apiRef = useGridApiContext();
        const [state] = useGridState(apiRef);
      
        return (
            <Pagination
                className="flex"
                color="primary"
                count={state.pagination.pageCount}
                page={state.pagination.page + 1}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        );
    }

    return (
        <div className="w-full" style={{ height: 400 }}>
            <div className="flex h-full">
                <div className="flex-1">
                    <DataGrid
                        localeText={localeText}
                        style={{
                            backgroundColor:theme.palette.background.paper
                        }}
                        components={{
                            Toolbar: CustomToolbar,
                            Pagination: CustomPagination,
                        }}
                        componentsProps={{
                            toolbar: {
                                refreshHandler: refreshTable,
                                refreshText: strings.table.refresh
                            }
                        }}
                        checkboxSelection
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
                </div>
            </div>
        </div>
    )
})

ServerSideTable.propTypes = {
    url: PropTypes.string.isRequired,
    perPage: PropTypes.string,
    columns: PropTypes.array.isRequired,
    placeholder: PropTypes.string
}

export default ServerSideTable
