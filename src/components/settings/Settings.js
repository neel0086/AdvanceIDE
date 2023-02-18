import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import Setting from '../../images/settings.png'

import './Settings.css'
import KeyBoardShortcuts from './KeyBoardShortcuts';
import FontAndStyles from './FontAndStyles';
import Appearence from './Appearence';
import Privacy from './Privacy';
import { ProviderContext } from '../../context/Provider';
function Settings() {

    const [open, setOpen] = useState(false)
    const [option, setOption] = useState("")

    const {
        sideBarVal,
        setSideBarVal
    } = useContext(ProviderContext);
    useEffect(() => {
        if (sideBarVal == "Settings")
            setOpen(true)
    }, [sideBarVal])
    function closeModal() {
        setOpen(false)
    }
    function handleSubmit(e) {

        closeModal();
    }
    return (

        // <div>
            <Modal show={open} onHide={closeModal} size='xl'>
                <Modal.Header style={{ background: 'black',border:0 }} >

                    <div className='m-header'>
                        <img className="d-icons" src={Setting} />
                        Settings
                    </div>
                </Modal.Header>
                <Modal.Body style={{ background: '#000000e6',border:0 }}>
                    <div className="m-sidebar">
                        <div className='m-options'>
                            <p onClick={() => setOption("KeyBoard Shortcuts")}>KeyBoard Shortcuts</p>
                            <p onClick={() => setOption("Font and Styles")}>Font and Styles</p>
                            <p onClick={() => setOption("Appearence")}>Appearence</p>
                            <p onClick={() => setOption("Privacy")}>Privacy</p>

                        </div>
                        <div className='m-prefernce'>
                            {(option == "KeyBoard Shortcuts" && <KeyBoardShortcuts />) ||
                                (option == "Font and Styles" && <FontAndStyles />) ||
                                (option == "Appearence" && <Appearence />) ||
                                (option == "Privacy" && <Privacy />)
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: 'black',border:0 }}>
                    {/* <Button>Ok</Button> */}
                    <Button className='bg-dark border-0'>Apply</Button>

                </Modal.Footer>
            </Modal>
        // </div>
    )
}

export default Settings
