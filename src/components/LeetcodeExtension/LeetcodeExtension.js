import React, { useContext, useEffect, useState } from 'react';
import Provider, { ProviderContext } from '../../context/Provider';
import './LeetcodeExtension.css'
function LeetcodeExtension({ questionId }) {
  const [question, setQuestion] = useState(null);
  const [questionName, setQuestionName] = useState("");

  const [input, setInput] = useState(null);
  const { sideBarVal } = useContext(ProviderContext)
  useEffect(() => {
    fetch('/graphql?query=query{question(titleSlug:"two-sum"){questionId title content}}')
      .then(response => response.json())
      .then(data => { console.log(data.data.question['content']); setQuestion(data.data.question) })
      .catch(error => console.error(error));
  }, []);

  const fetchQuestion = () => {
    console.log(questionName)
    
    fetch(`/graphql?query=query{question(titleSlug:"${questionName}"){questionId title content}}`)
      .then(response => response.json())
      .then(data => { console.log(data.data.question['content']); setQuestion(data.data.question) })
      .catch(error => console.error(error));
      // setQuestionName(" ")
  }

  //PAGE SIZING
  useEffect(() => {
    const divE2 = document.querySelector('.leetcodeUi');


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
        temp = temp + (e.clientX > lastPoint.x ? e.clientX - lastPoint.x : e.clientX < lastPoint.x ? e.clientX - lastPoint.x : 0)
        if (temp < 150) temp = 5;
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
      else {
        document.body.setAttribute('style', 'cursor:default !important');
      }
    })


  }, [])
  useEffect(() => {
    const divE2 = document.querySelector('.leetcodeUi');
    if (sideBarVal == "Leetcode") {
      divE2.style.width = "100%"
    }
  }, [sideBarVal])

  return (
    <div className='leetcodeUi' style={{ display: `${sideBarVal == "Leetcode" ? 'block' : 'none'}`, width: '100%' }}>
      {/* <h2>{question.title}</h2> */}
      <div>
        <div>
          <input className='le-inp' placeholder="Type to enter the question name" value={questionName} onChange={(e)=>setQuestionName(e.target.value)}/>
          <button className='q-button' onClick={fetchQuestion}>Check</button>
        </div>
        {question && <p dangerouslySetInnerHTML={{ __html: question['content'] }} ></p>}
        {question && <p>Input: {input}</p>}
      </div>
    </div>
  );
}

export default LeetcodeExtension;
