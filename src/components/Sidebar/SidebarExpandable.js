import React, { useContext, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';

import './SidebarExpandable.css'
import { SideBarContext } from '../../context/SideBarProvider';
import FolderTree from '../Foldertree/FolderTree';
import { ProviderContext } from '../../context/Provider';
function SidebarExpandable() {
    const theme = useTheme();


    const {
        sideBarVal,
        setSideBarVal
    } = useContext(ProviderContext)
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const divE2 = document.querySelector('.SidebarExpUi');


        let cflag, dflag = false, temp;
        const lastPoint = { x: null, y: null }
        divE2.addEventListener('mousedown', (e) => {
            // 
            let temp1 = e.clientX
            
            temp = temp1
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left; //x position within the element.
            if (divE2.offsetWidth - 15 <= x) {
                document.body.setAttribute('style', 'cursor:e-resize !important');
                // document.body.style.cursor = "e-resize";
                
                dflag = true
            }
        })
        document.body.addEventListener('mouseup', (e) => {
            e.preventDefault()
            
            if (dflag) {
                document.body.setAttribute('style', 'cursor:default !important');
                dflag = false

            }
        })
        window.addEventListener('mousemove', (e) => {

            if (dflag) {
                // window.style.cursor = "grabbing"
                temp = temp+(e.clientX > lastPoint.x ? e.clientX - lastPoint.x : e.clientX < lastPoint.x ? e.clientX - lastPoint.x: 0)
                if (temp<150) temp=5;
                divE2.style.width = temp + "px"
                // 
                // temp += 1
                
            }
            lastPoint.x = e.clientX
            lastPoint.y = e.clientY
        });
        divE2.addEventListener('mouseover', (e) => {
            // 
            let temp1 = e.clientX
            temp = temp1
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left; //x position within the element.
            if (divE2.offsetWidth - 14 <= x) {
                document.body.setAttribute('style', 'cursor:e-resize !important');
                
            }
            else{
                document.body.setAttribute('style', 'cursor:default !important');
            }
        })
        

    }, [])
    useEffect(()=>{
        const divE2 = document.querySelector('.SidebarExpUi');
        if(sideBarVal=="FolderView"){
            divE2.style.width = "20%"
        }
    },[sideBarVal])
    return (
        <div className='SidebarExpUi' style={{ display: `${sideBarVal == "FolderView" ? 'block' : 'none'}`, width: '20% !important' }} >
            <div className='s-open' >
                <FolderTree />


            </div>
        </div>
    )
}

export default SidebarExpandable
