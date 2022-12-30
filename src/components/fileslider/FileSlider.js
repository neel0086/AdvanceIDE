import React, { useState, useRef } from 'react';
import './FileSlider.css'
function FileSlider() {
    const [filenum, setFilenum] = useState(-1);
    const setName = (e) => {
        setFilenum(e.target.id)
    }

    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6']);

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };
    return (
        // <div className='f-slider'>
        //     <button className='f-button' id='1' style={{ backgroundColor: `${filenum == '1' ? '#1E1E1E' : ''}` }} onClick={(e) => { setName(e); }}>
        //         <span class='f-name' onClick={(e) => { setName(e); }}> App.js </span>
        //         <span className="f-cross" style={{ display: `${filenum == '1' ? 'block' : 'none'}` }}>x</span>
        //     </button>
        <div className='f-slider'>
            {
                list &&
                list.map((item, index) => (
                    <div className="f-button" id={index} onClick={(e) => { setName(e); }}
                        style={{ backgroundColor: `${filenum == index ? '#1E1E1E' : ''}` }}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        key={index}
                        draggable>
                        {item}
                        <span className='cross active' style={{ display: `${filenum == index ? 'block' : 'none'}`}}>x</span>
                        
                    </div>
                ))}
        </div>


        // </div>
    )
}

export default FileSlider
