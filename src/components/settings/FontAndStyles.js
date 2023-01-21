import React from 'react'
import './Settings.css'

function FontAndStyles() {
    return (
        <div>
            <div className='f-row'>
                <span className='sub-name'>Font-Size</span>
                <span class="font_size">
                    <input type='number' />
                </span>

            </div>
            <div className='f-row'>
                <span className='sub-name'>Font-Family</span>
                <span class="font_family">
                    <input type='text' list="font_styles"/>
                    <datalist id="font_styles">
                        <option>Volvo</option>
                        <option>Saab</option>
                        <option>Mercedes</option>
                        <option>Audi</option>
                    </datalist>
                </span>

            </div>
        </div>
    )
}

export default FontAndStyles
