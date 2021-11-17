import { useRouter } from 'next/router'
import { PageHead } from '../../src/components/atoms'
import React from 'react'
import { Panel } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'

const Invoice = () => {
    const router = useRouter()
    const {panel: {pages: { invoiceWithCode }}} = useLocalization()
    const { code } = router.query

    if (code) {
        return(
            <>
                <PageHead
                    title={`${invoiceWithCode.titlePage} ${code}`}
                />
                <div>
                    Invoice Code: {code}
                </div>
            </>
        )
    }

    return (
        <div>
            Without Invoice
        </div>
    )
}

Invoice.getLayout = page => <Panel>{page}</Panel>

export default Invoice
