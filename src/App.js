import React, { useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import {
  numbers,
  uppercaseLetters,
  lowercaseLetters,
  specialCharacters,
} from "./Characters";
import "react-toastify/dist/ReactToastify.css";
import { COPY_SUCEESS } from "./message";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(14);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePasssword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("You Must Select one option", true);
    }

    let characterList = "";

    if (includeLowercase) {
      characterList = characterList + lowercaseLetters;
    }
    if (includeUppercase) {
      characterList = characterList + uppercaseLetters;
    }
    if (includeNumbers) {
      characterList = characterList + numbers;
    }
    if (includeSymbols) {
      characterList = characterList + specialCharacters;
    }

    setPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = (e) => {
    if (password === "") {
      notify("Nothing to copy", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCEESS);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">Password Generator</h2>
          <div className="generator_passwords">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy_btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlfor="password-strength">Password Length</label>
            <input
              placeholder="8-14"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="14"
              min="8"
            />
          </div>
          <div className="form-group">
            <label htmlfor="uppercase-letters">Include Uppercase letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlfor="lowercase-letters">Include Lowercase letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>
          <div className="form-group">
            <label htmlfor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>
          <div className="form-group">
            <label htmlfor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>
          <button onClick={handleGeneratePasssword} className="generator_btn">
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;