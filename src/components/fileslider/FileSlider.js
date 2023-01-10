import React, { useState, useRef, useContext, useEffect } from 'react';
import { FileContext } from '../../context/FileProvider';
import './FileSlider.css'
function FileSlider() {
    const [filenum, setFilenum] = useState("");
    const firstUpdate = useRef(true);
    const {fileVal,setFileVal}= useContext(FileContext)
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(Array);
    const checkfilepath =(obj)=>{
        console.log(list,obj)
        var f=1
        list.forEach((key,val)=>{
            
            if(key["path"]==obj["path"]) {
                f=0
                console.log(key["path"].length,obj["path"].length)
                return false
            }
        })
        if(!f) return false
        return true
    }
    const setName = (e) => {
        // setFileVal();
        setFilenum(e.target.id)
    }
    useEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
          }
        let obj = {"path":fileVal['path'],"name":fileVal['name']}
        var val = checkfilepath(obj)
        if(val==true){
            console.log("I am in",val)
            list.push(obj)
            setList(list)
        }
        
        setFilenum(fileVal["path"]);
        console.log(list)
    },[fileVal])

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
                list.length &&
                list.map((item, index) => (
                    <div className="f-button" id={item["path"]} onClick={(e) => { setName(e); }}
                        style={{ backgroundColor: `${filenum == item["path"] ? '#1E1E1E' : ''}` }}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        key={index}
                        draggable>
                        {item["name"]}
                        <span className='cross active' style={{ display: `${filenum == item["path"] ? 'block' : 'none'}`}}>x</span>
                        
                    </div>
                ))}
        </div>


        // </div>
    )
}

export default FileSlider
