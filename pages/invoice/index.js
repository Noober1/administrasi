import { useRouter } from 'next/router'
import { PageHead } from '../../src/components/atoms'
import { AdminInvoice, Panel, StudentInvoice } from '../../src/components/templates'
import fetchAPI from '../../src/lib/fetchApi'
import useProfile from '../../src/lib/useProfile'

const Invoice = ({code}) => {
    const profile = useProfile()
    const router = useRouter()

    return (
        <>
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
