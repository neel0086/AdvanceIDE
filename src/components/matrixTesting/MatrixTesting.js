import React, { useContext, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ProviderContext } from "../../context/Provider";
import './style.css'
function MatrixTesting() {
    const [inpArray, setInpArray] = useState(String)
    const [levelView, setLevelView] = useState(true)
    const [inputMatrix, setInputMatrix] = useState(NaN)
    // const [matrix,setMatrix] = useState([[1, 2, 3], [1, 2, 3], [1, 2, 3]])
    const {
        sideBarVal,
        setSideBarVal
    } = useContext(ProviderContext)

    const setMatrix = async (temp) => {
        const canvas = document.getElementById('matrix-visualizer');
        const ctx = canvas.getContext('2d');
        let matrix = []
        console.log("Hello")
        try {
            console.log("Hello")
            // console.log(matrix)
            matrix = await JSON.parse(temp)
            if (matrix.length > 0) {
                console.log(matrix)
                drawMatrix();
            }
    
            
        }
        catch (e) { console.log(e); return; }
        function drawMatrix() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let cellSize = 20;
            let margin = 5;
            let numRows = matrix.length;
            let numCols = matrix[0].length;
            let totalWidth = numCols * cellSize + (numCols - 1) * margin;
            let totalHeight = numRows * cellSize + (numRows - 1) * margin;
            let x = (canvas.width - totalWidth) / 2;
            let y = (canvas.height - totalHeight) / 2;
            ctx.font = '10px arial';
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    let cellX = x + j * (cellSize + margin);
                    let cellY = y + i * (cellSize + margin);
                    ctx.fillStyle = 'white';
                    ctx.fillRect(cellX, cellY, cellSize, cellSize);
                    ctx.fillStyle = 'black';
                    ctx.fillText(matrix[i][j], cellX + cellSize / 2 - 4, cellY + cellSize / 2 + 4);
                    ctx.stroke();
                }
            }
        }
        if (matrix.length > 0) {
            console.log("Hy")
            drawMatrix();
        }
    };
    useEffect(() => {
        const divEl = document.querySelector('.treevis');
        let cflag, dflag = false, temp;
        const lastPoint = { x: null, y: null }
        divEl.addEventListener('mousedown', (e) => {
            let temp1 = e.clientX
            temp = temp1
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left; //x position within the element.
            if (divEl.offsetWidth - 15 <= x) {
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
                temp = temp + (e.clientX > lastPoint.x ? e.clientX - lastPoint.x : e.clientX < lastPoint.x ? e.clientX - lastPoint.x : 0)
                divEl.style.width = temp + "px"
            }
            lastPoint.x = e.clientX
            lastPoint.y = e.clientY
        });
    })
    useEffect(() => {
        const divEl = document.querySelector('.treevis');
        if (sideBarVal == "MatrixView") {
            divEl.style.width = "100%"
        }
    }, [sideBarVal])

    return (
        <div className="treevis" style={{ display: `${sideBarVal == "MatrixView" ? 'block' : 'none'}`, width: '100%' }}>
            <div className="m-container" >
                <div className="m-canvaOuter">
                    <canvas id="matrix-visualizer"></canvas>
                </div>
                <div className="screen">
                    <input
                        type="text"
                        className="userInp"
                        onChange={e => setMatrix(e.target.value)}
                        placeholder="Input a 2d array example: [[1,2,3],[1,2,3]]"
                    />
                    <button
                        type="text"
                        className="rootInp"
                        style={{ color: 'white' }}
                        placeholder="Genrate"
                    />

                </div>


            </div>
        </div>
    );
}

export default MatrixTesting