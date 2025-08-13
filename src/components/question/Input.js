import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Input.css";

const Input = ({
  value,
  onChange,
  onKeyDown,
  mask,
  className = "",
  ...rest
}) => {
  const inputRef = useRef(null);
  const [caretX, setCaretX] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const updateCaretPosition = useCallback(() => {
    const input = inputRef.current;
    if (!input) return;

    const val = input.value;
    const selectionStart = input.selectionStart ?? val.length;

    const mirror = document.createElement("span");
    mirror.style.position = "absolute";
    mirror.style.visibility = "hidden";
    mirror.style.whiteSpace = "pre";
    mirror.style.font = getComputedStyle(input).font;
    mirror.style.padding = getComputedStyle(input).padding;
    mirror.textContent =
      (mask ? "*".repeat(val.length) : val).slice(0, selectionStart) ||
      "\u200B";

    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.left = "-9999px";
    wrapper.appendChild(mirror);
    document.body.appendChild(wrapper);

    const rect = mirror.getBoundingClientRect();
    setCaretX(rect.width + 8); // 8px padding

    document.body.removeChild(wrapper);
  }, [mask]);

  useEffect(() => {
    updateCaretPosition();
  }, [value, updateCaretPosition]);

  const handleFocus = () => {
    setIsFocused(true);
    updateCaretPosition();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isSmallText =
    className?.includes("text-sm") ||
    className?.includes("text-base") ||
    className?.includes("text-xl");

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        type="text"
        value={mask ? "*".repeat(value.length) : value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={updateCaretPosition}
        onKeyUp={updateCaretPosition}
        onInput={updateCaretPosition}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`input-field ${className}`}
        {...rest}
      />
      {isFocused && (
        <span
          className={`input-caret ${isSmallText ? "small-text" : "large-text"} ${isFocused ? "blink" : ""}`}
          style={{
            left: `${caretX}px`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          _
        </span>
      )}
    </div>
  );
};

export default Input;
