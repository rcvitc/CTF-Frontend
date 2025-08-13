import React from "react";
import Input from "./Input";
import DOMPurify from "dompurify";
import "./Challenge.css";

const Challenge = ({
  title,
  description,
  creator,
  points,
  links,
  tags,
  ...rest
}) => {
  const [flag, setFlag] = React.useState("");
  const [submitMessage, setSubmitMessage] = React.useState("");

  const handleFlag = (e) => {
    setFlag(DOMPurify.sanitize(e.target.value)); // XSS sanitation
  };

  const handleSubmit = () => {
    if (!flag.trim()) {
      setSubmitMessage("Please enter a flag");
      setTimeout(() => setSubmitMessage(""), 3000);
      return;
    }

    // Here you would typically send the flag to your backend API
    console.log("Submitting flag:", flag);
    
    // For demo purposes, show a success/failure message
    if (flag.toLowerCase().includes("flag{") || flag.toLowerCase().includes("ctf{")) {
      setSubmitMessage("✅ Flag submitted successfully!");
    } else {
      setSubmitMessage("❌ Incorrect flag format");
    }
    
    // Clear the message after 3 seconds
    setTimeout(() => setSubmitMessage(""), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <div className="challenge-title">{title}</div>
        {/* <div className="challenge-info">
          <div className="challenge-creator">{creator}</div>
          <div className="challenge-separator">-</div>
          <div className="challenge-points">{points}</div>
        </div> */}
        {/* <div className="challenge-close">x</div> */}
      </div>
      <div className="challenge-content">
        <div className="challenge-description">
          {description}
        </div>
        <div className="challenge-sidebar">
          <div className="sidebar-top">
            <div className="tags-container">
              {tags &&
                tags.map((e, index) => (
                  <a
                    key={index}
                    href={e}
                    className="tag"
                  >
                    {e}
                  </a>
                ))}
            </div>
            <a href={"creator"} className="creator-link">
              Creator: <span className="creator-name">{creator}</span>
            </a>
            <br />
            <div className="points-display">
              Points:{" "}
              <span className="points-value">
                {points}
              </span>
            </div>
            <br />
          </div>
          <div className="links-container">
            {links &&
              links.length > 0 &&
              links.map((e, index) => (
                <a href={e} key={index} className="challenge-link">
                  {e}
                </a>
              ))}
          </div>
          <div className="flag-section">
            <div className="flag-label">enter the flag:</div>
            {submitMessage && (
              <div className="submit-message">{submitMessage}</div>
            )}
            <div className="flag-input-container">
              <div className="flag-input-wrapper">
                <div className="input-wrapper">
                  <Input
                    value={flag}
                    onChange={handleFlag}
                    onKeyDown={handleKeyDown}
                    className="flag-input"
                    placeholder="flag{...}"
                  />
                </div>
                <button className="submit-button" onClick={handleSubmit}>
                  <img
                    src="https://img.icons8.com/?size=100&id=121624&format=png&color=000000"
                    className="submit-icon"
                    alt="Submit"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
