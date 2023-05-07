import React, { useContext, useEffect, useState } from 'react';
import Provider, { ProviderContext } from '../../context/Provider';
import './LeetcodeExtension.css'
import { Alert } from 'react-bootstrap';
function LeetcodeExtension({ questionId }) {
  const [question, setQuestion] = useState(null);
  const [questionName, setQuestionName] = useState("");
  const [questionHeading, setQuestionHeading] = useState("");
  const [input, setInput] = useState(null);
  const { sideBarVal } = useContext(ProviderContext)
  const [showAlert, setShowAlert] = useState(false);
  const [AlertText, setAlertText] = useState("")

  function handleShowAlert(alertMssg) {
    setAlertText(alertMssg)
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500); // Hide alert after 5 seconds
  }

  const fetchQuestion = () => {
    console.log(questionName)
    setQuestionHeading(questionName)
    fetch(`/graphql?query=query{question(titleSlug:"${questionName}"){questionId title content}}`)
      .then(response => response.json())
      .then(data => { setQuestion(data.data.question) })
      .catch(error => console.error(error));
    // setQuestionName(" ")
    setQuestionName('')
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
    <div className='leetcodeUi' style={{ display: `${sideBarVal == "Leetcode" ? 'block' : 'none'}`, width: '100% !important' }}>
      <Alert variant="primary" style={{ position: 'absolute', top: "-50px", left: '650px', width: 'fit-content', fontSize: '18px', color: 'black', fontFamily: 'Roboto' }} show={showAlert} onClose={() => setShowAlert(false)} >
        <span style={{ fontWeight: 'bold', letterSpacing: "1.5px" }}>{AlertText}</span>
      </Alert>
      <div className='l-container'>
        <div className='l-search'>
          <input className='le-inp' placeholder="Type to enter the question name" value={questionName} onChange={(e) => setQuestionName(e.target.value)} />
          <button className='q-button' onClick={(e)=>{fetchQuestion();handleShowAlert("Feteching the data")}}>Check</button>
        </div>
        <h4 style={{ color: 'white' }}>{questionHeading.toUpperCase()}</h4>
        {question && <p style={{ color: 'white', fontFamily: 'Roboto', fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: question['content'] }} ></p>}
        {question && <p>Input: {input}</p>}

        {!question && <div className='l-plain'>
          <img src="https://api.dicebear.com/5.x/fun-emoji/svg?seed=Annie&radius=20" width="100" />
          <p style={{ color: 'white' }}>Nothing show up type question above</p>
        </div>
        }
      </div>
    </div>

  );
}

export default LeetcodeExtension;
