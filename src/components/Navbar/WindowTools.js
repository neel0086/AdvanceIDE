import { Box } from '@mui/material'
import React from 'react'

import Close from '../../images/close.png'
import Minimise from '../../images/minimise.png'

function WindowTools() {
    return (
        <Box style={{ display: 'flex', justifyContent: 'space-between', width: "4%" }}>
            {/* <img src={Minimise} style={{ cursor: 'pointer' }} onClick={(e) => { window.self.resizeTo(0,0) }} /> */}

            <img src={Close} style={{ cursor: 'pointer' }} onClick={(e) => { window.close() }} />
        </Box>
    )
}

export default WindowTools
