import React, { useState } from "react";
import Challenge from "./Challenge";
import "./QuestionPage.css";

const QuestionPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  // Sample questions data
  const questions = [
    {
      id: 1,
      title: "Web Exploitation Challenge",
      description: "This is a web exploitation challenge where you need to find a vulnerability in the given web application. Look for common web vulnerabilities like SQL injection, XSS, or CSRF. The flag format is flag{...}",
      creator: "john_doe",
      points: 100,
      links: ["https://example.com/challenge1", "https://docs.example.com"],
      tags: ["web", "beginner", "sqli"]
    },
    {
      id: 2,
      title: "Cryptography Puzzle",
      description: "Decrypt the given cipher text using classical cryptographic techniques. The message has been encoded using a substitution cipher. Analyze the frequency of characters to break the code.",
      creator: "crypto_master",
      points: 200,
      links: ["https://example.com/crypto-challenge"],
      tags: ["crypto", "intermediate", "classical"]
    },
    {
      id: 3,
      title: "Reverse Engineering Binary",
      description: "Analyze the provided binary file to understand its functionality and extract the hidden flag. Use disassemblers and debuggers to reverse engineer the program logic.",
      creator: "rev_expert",
      points: 300,
      links: ["https://example.com/binary-download"],
      tags: ["reverse", "advanced", "binary"]
    }
  ];

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleCloseQuestion = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="question-page">
      {!selectedQuestion ? (
        <div className="questions-list">
          <h1 className="page-title">CTF Challenges</h1>
          <div className="questions-grid">
            {questions.map((question) => (
              <div
                key={question.id}
                className="question-card"
                onClick={() => handleQuestionClick(question)}
              >
                <div className="question-header">
                  <h3 className="question-title">{question.title}</h3>
                  <span className="question-points">{question.points} pts</span>
                </div>
                <div className="question-meta">
                  <span className="question-creator">by {question.creator}</span>
                  <div className="question-tags">
                    {question.tags.map((tag, index) => (
                      <span key={index} className="tag-badge">{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="question-preview">
                  {question.description.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="challenge-view">
          <button className="back-button" onClick={handleCloseQuestion}>
            ← Back to Questions
          </button>
          <Challenge
            title={selectedQuestion.title}
            description={selectedQuestion.description}
            creator={selectedQuestion.creator}
            points={selectedQuestion.points}
            links={selectedQuestion.links}
            tags={selectedQuestion.tags}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
