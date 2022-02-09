import React from 'react'
import PropTypes from 'prop-types'
import AdminWithoutInvoice from './AdminWithoutInvoice'
import AdminWithInvoice from './AdminWithInvoice'

const AdminInvoice = props => {
    
    if (!props.code) {
        return <AdminWithoutInvoice/>
    }
    
    return <AdminWithInvoice code={props.code}/>
}

AdminInvoice.propTypes = {
    code: null
}

AdminInvoice.propTypes = {
    code: PropTypes.oneOfType([
        PropTypes.string
    ])
}

export default AdminInvoice
