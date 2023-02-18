import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LeetcodeExtension({ questionId }) {
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await axios.get(`https://leetcode.com/graphql?query={
          question(titleSlug: "${questionId}") {
            title
            content
            codeDefinition {
              text
              value
              defaultCode
            }
            sampleTestCase
          }
        }`);
        setQuestion(data.data.question);
        setInput(data.data.question.sampleTestCase);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestion();
  }, [questionId]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{question.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: question.content }}></p>
      <p>{console.log(input)}</p>
    </div>
  );
}

export default LeetcodeExtension;
