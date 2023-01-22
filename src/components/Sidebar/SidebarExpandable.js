import React, { useContext, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Back from '../../images/back.png'
import Folder from '../../images/folder.png'
import Tree from '../../images/tree.png'
import Setting from '../../images/settings.png'
import './SidebarExpandable.css'
import { SideBarContext } from '../../context/SideBarProvider';
import FolderTree from '../Foldertree/FolderTree';
function SidebarExpandable() {
    const theme = useTheme();

    const { sideBarVal, setSideBarVal } = useContext(SideBarContext)
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const divEl = document.querySelector('.SidebarExpUi');


        let cflag, dflag = false, temp;
        const lastPoint = { x: null, y: null }
        divEl.addEventListener('mousedown', (e) => {
            // console.log("Mosedrag")
            let temp1 = e.clientX
            console.log(temp1)
            temp = temp1
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left; //x position within the element.
            if (divEl.offsetWidth - 15 <= x) {
                document.body.setAttribute('style', 'cursor:e-resize !important');
                // document.body.style.cursor = "e-resize";
                console.log(99)
                dflag = true
            }
        })
        document.body.addEventListener('mouseup', (e) => {
            e.preventDefault()
            console.log(cflag)
            if (dflag) {
                document.body.setAttribute('style', 'cursor:default !important');
                dflag = false

            }
        })
        window.addEventListener('mousemove', (e) => {
            console.log("moving")

            if (dflag) {
                // window.style.cursor = "grabbing"
                temp = temp+(e.clientX > lastPoint.x ? e.clientX - lastPoint.x : e.clientX < lastPoint.x ? e.clientX - lastPoint.x: 0)
                divEl.style.width = temp + "px"
                // console.log(temp + "%")
                // temp += 1
                
            }
            lastPoint.x = e.clientX
            lastPoint.y = e.clientY
        });
        

    }, [])
    useEffect(()=>{
        const divEl = document.querySelector('.SidebarExpUi');
        if(sideBarVal=="FolderView"){
            divEl.style.width = "20%"
        }
    },[sideBarVal])
    return (
        <div className='SidebarExpUi' style={{ display: `${sideBarVal == "FolderView" ? 'block' : 'none'}`, width: '20%' }} >
            <div className='s-open' style={{ width: '100%' }}>
                <FolderTree />


            </div>
        </div>
    )
}

export default SidebarExpandable
