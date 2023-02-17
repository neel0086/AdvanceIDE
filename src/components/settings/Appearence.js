import React from 'react'

function Appearence() {
  return (
    <div className='ap-container'>
            <div className='ap-section'>
                
                <p className='sub-name'>Font-Size</p>
                <p className='sub-desc'>Font size in pixels</p>
                <input type='number' className='ap-inp'/>

            </div>
            <div className='ap-section'>
                <p className='sub-name'>Font-Family</p>
                <p className='sub-desc'>Font family for editor</p>
                <input type='text' list="font_styles" className='ap-inp'/>
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

export default Appearence
