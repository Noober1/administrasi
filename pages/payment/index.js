import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonGroup } from '@mui/material'
import { Box } from '@mui/system'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization';
import { PanelContentHead } from '../../src/components/atoms/dashboard';

const Payment = (props) => {
    const strings = useLocalization()

    return (
        <Box>
            <PanelContentHead
                title={strings.panel.pages.payment.titlePage}
                buttonGroup={(
                    <ButtonGroup>
                        <Button variant="contained" color="primary" startIcon={<AddIcon/>}>
                            {strings.default.addText}
                        </Button>
                    </ButtonGroup>
                )}
                helpButtonHandler={event => console.log('hehe')}
            />
            {/* <ServerSideTable
                url='/class'
                columns={columns}
            /> */}
        </Box>
    )
}

Payment.getLayout = page => <Panel>{page}</Panel>

export default Payment
