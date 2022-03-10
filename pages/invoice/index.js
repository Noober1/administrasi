import { PageHead } from '../../src/components/atoms'
import { Panel, StudentInvoice } from '../../src/components/templates'
import AdminInvoice from '../../src/components/templates/pages/AdminInvoice'
import useLocalization from '../../src/lib/useLocalization'
import useProfile from '../../src/lib/useProfile'

const Invoice = ({code}) => {
    const profile = useProfile()
    const { panel: {pages: {invoice:{titlePage}}} } = useLocalization()

    return (
        <>
            <PageHead
                title={titlePage}
            />
            {profile.accountType == 'admin' ?
                <AdminInvoice
                    code={code}
                />
            :
                <StudentInvoice
                    code={code}
                />
            }
        </>
    )
}

Invoice.getLayout = page => <Panel>{page}</Panel>

export const getServerSideProps = async({query}) => {
    try {
        if (query?.code) {
            return {
                props: {
                    code: query.code || null
                }
            }
        } else {
            return {
                props:{}
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}

export default Invoice
