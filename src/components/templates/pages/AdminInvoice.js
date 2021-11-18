import React from 'react'
import PropTypes from 'prop-types'
import useLocalization from '../../../lib/useLocalization'

const AdminInvoice = props => {
    const {panel: {pages: { invoiceWithCode }}} = useLocalization()

    if (props.code) {
        return(
            <div>
                For Admin, Invoice Code:  {props.code}
            </div>
        )
    }
    
    return (
        <div>
            For Student, No invoice code
        </div>
    )
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
