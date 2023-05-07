import React, { useState, useRef, useContext, useEffect } from 'react';
import { ProviderContext } from '../../context/Provider';
import './FileSlider.css'
import { FileIcons } from '../Foldertree/FileIcons';

function FileSlider() {

    //USESTATE
    const [filenum, setFilenum] = useState("");
    const [list, setList] = useState(Array);

    //CONTEXT PROVIDERS
    const { fileVal, setFileVal } = useContext(ProviderContext)

    //USEREF FOR HANDLING USER's PREVIOUS STATES
    const firstUpdate = useRef(true);
    const fileFirstUpdate = useRef(true)
    const dragItem = useRef();
    const dragOverItem = useRef();


    //CHECK IF FILE ALREADY EXIST IN THE LIST
    const checkfilepath = (obj) => {
        var flag = 1
        list.forEach((key, val) => {
            if (key["path"] == obj["path"]) {
                flag = 0
                return false
            }
        })
        if (!flag) return false
        return true
    }

    const getFileIcon = (fileName) => {
        if (fileName) {
            const extension = fileName.split('.').pop().toLowerCase()
            if (String(FileIcons[extension]) != "undefined") {
    
                return FileIcons[extension];
    
            }
            else {  return FileIcons["default"] }
        }
    }

    //ONCLICK ON FILE OF FILE SLIDER MAKE IT ACTIVE IF IT IS CLICKED ON CROSS REMOVE THAT FILE
    const setName = (e) => {
        e.stopPropagation()
        const filepath = e.target.id
        if (filepath[0] == '#') {
            let i = 0;
            for (i = 0; i < list.length; i++) {
                if (e.target.id.substring(1) == list[i]['path']) {
                    list.splice(i, 1)
                    break
                }
                else {
                }
            }
            setFileVal(list.length >= 0 ? list[0] : null)
            localStorage.setItem('activeFile', JSON.stringify(list[0]));

            localStorage.setItem('items', JSON.stringify(list));
        }
        else {
            setFileVal({ "path": filepath, "name": filepath.substring(filepath.lastIndexOf("\\") + 1) });
            setFilenum(e.target.id)
            localStorage.setItem('activeFile', JSON.stringify({ "path": filepath, "name": filepath.substring(filepath.lastIndexOf("\\") + 1) }));
        }
    }

    // FIRST UPDATE REGAINING USER STATE FOR FILES AND ACTIVE FILES
    useEffect(async () => {
        if (fileFirstUpdate.current) {
            if (localStorage.getItem('items') != null && localStorage.getItem('items').length > 0) {
                setList(await JSON.parse(localStorage.getItem('items')));
            }
            if (localStorage.getItem('activeFile') != "undefined" && localStorage.getItem('activeFile') != null) {
                console.log(localStorage.getItem('activeFile'))
                setFileVal(await JSON.parse(localStorage.getItem('activeFile')))
            }
            fileFirstUpdate.current = false
        }
    }, [fileVal]);

    //HANDLE ADDING OF FILES IN SLIDER
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        else {
            if (fileVal) {
                let obj = { "path": fileVal['path'], "name": fileVal['name'] }
                var val = checkfilepath(obj)
                if (val == true && obj['path'] != filenum) {
                    list.push(obj)
                    setList(list)
                    localStorage.setItem('items', JSON.stringify(list));

                }
                setFilenum(fileVal["path"]);
            }
        }
    }, [fileVal])

    // HANDLE DRAG AND DROP OF FILES
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

    return (
        <div className='f-slider'>
            {
                list != null &&
                list.map((item, index) => (
                    <div className="f-button" id={item["path"]} onClick={(e) => { setName(e); }}
                        style={{ backgroundColor: `${filenum == item["path"] ? '#000000cc' : ''}` }}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        key={index}
                        draggable>
                        <img src={getFileIcon(item['name'])} style={{paddingRight:'10px',width:'32px'}}/>
                        {item["name"]}
                        <span className='cross active'
                            id={'#' + item["path"]}
                            style={{ opacity: `${filenum == item["path"] ? 1 : 0}` }}>
                            x
                        </span>

                    </div>
                ))}
        </div>

    )
}

export default FileSlider
