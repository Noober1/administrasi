import Head from 'next/head'
import PropTypes from 'prop-types'

const PageHead = props => {
    return (
        <Head>
            <title>{props.title && props.title + ' - '}Administrasi {process.env.NEXT_PUBLIC_COMPANY_NAME}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
    )
}

PageHead.defaultProps = {
    title: null
}

PageHead.propTypes = {
    title: PropTypes.string
}

export default PageHead
