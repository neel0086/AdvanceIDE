import React, { useState, useRef, useContext, useEffect } from 'react';
import { FileContext } from '../../context/FileProvider';
import './FileSlider.css'

function FileSlider() {
    const [filenum, setFilenum] = useState("");
    const firstUpdate = useRef(true);
    const fileFirstUpdate = useRef(true)
    const { fileVal, setFileVal } = useContext(FileContext)
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(Array);

    const checkfilepath = (obj) => {

        var f = 1
        list.forEach((key, val) => {

            if (key["path"] == obj["path"]) {
                f = 0

                return false
            }
        })
        if (!f) return false
        return true
    }
    const setName = (e) => {
        const filepath = e.target.id
        setFileVal({ "path": filepath, "name": filepath.substring(filepath.lastIndexOf("\\") + 1) });
        setFilenum(e.target.id)
    }


    useEffect(async () => {
        if (fileFirstUpdate.current) {

            if (localStorage.getItem('items') != null && localStorage.getItem('items').length > 0) {
                setList(await JSON.parse(localStorage.getItem('items')));
                console.log(9)
            }
            fileFirstUpdate.current = false
        }
    }, [fileVal]);


    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // localStorage.setItem('activeFile', JSON.stringify(fileVal));
        console.log(fileVal)
        if (fileVal) {
            let obj = { "path": fileVal['path'], "name": fileVal['name'] }
            var val = checkfilepath(obj)
            if (val == true && obj['path']!=filenum) {
                list.push(obj)
                setList(list)
                localStorage.setItem('items', JSON.stringify(list));
                setFilenum(fileVal["path"]);
            }

            
        }
        else{
            fileVal()
        }

    }, [fileVal])

    const dragStart = (e, position) => {
        dragItem.current = position;

    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;

    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
        localStorage.setItem('items', JSON.stringify(copyListItems));
    };
    function myGreeting() {
        console.log("hello")
    }
    const removeElement = async (e) => {
        let i=0;
        for (i = 0; i < list.length; i++) {
            if (e.target.id == list[i]['path']) {
                list.splice(i, 1)
                
                
                break
            }
            else {

            }

        }
        console.log(list.length)
        setFilenum(list.length>=0 ? list[0]['path'] : null)
        localStorage.setItem('items', JSON.stringify(list));



    }
    return (
        // <div className='f-slider'>
        //     <button className='f-button' id='1' style={{ backgroundColor: `${filenum == '1' ? '#1E1E1E' : ''}` }} onClick={(e) => { setName(e); }}>
        //         <span class='f-name' onClick={(e) => { setName(e); }}> App.js </span>
        //         <span className="f-cross" style={{ display: `${filenum == '1' ? 'block' : 'none'}` }}>x</span>
        //     </button>
        <div className='f-slider'>
            {
                list != null &&
                list.map((item, index) => (
                    <div className="f-button" id={item["path"]} onClick={(e) => { setName(e); }}
                        style={{ backgroundColor: `${filenum == item["path"] ? '#1E1E1E' : ''}` }}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        key={index}
                        draggable>
                        {item["name"]}
                        <span className='cross active'
                            id={item["path"]}
                            onClick={(e) => { removeElement(e); }}
                            style={{ display: `${filenum == item["path"] ? 'block' : 'none'}` }}>
                            x
                        </span>

                    </div>
                ))}
        </div>


        // </div>
    )
}

export default FileSlider
