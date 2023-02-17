import React from 'react'
import './Settings.css'

function FontAndStyles() {
    return (
        <div className='fs-container'>
            <div className='fs-section'>
                
                <p className='sub-name'>Font-Size</p>
                <p className='sub-desc'>Font size in pixels</p>
                <input type='number' className='fs-inp'/>

            </div>
            <div className='fs-section'>
                <p className='sub-name'>Font-Family</p>
                <p className='sub-desc'>Font family for editor</p>
                <input type='text' list="font_styles" className='fs-inp'/>
                <datalist id="font_styles">
                    <option>Volvo</option>
                    <option>Saab</option>
                    <option>Mercedes</option>
                    <option>Audi</option>
                </datalist>

            </div>

        </div>
    )
}

export default FontAndStyles
