import React, { useReducer, useState, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '../ImgClass.css';

const stateMachine = {
    initial: "initial",
    states: {
      initial: { on: { next: "loadingModel" } },
      loadingModel: { on: { next: "awaitingUpload" } },
      awaitingUpload: { on: { next: "ready" } },
      ready: { on: { next: "classifying" }, showImage: true },
      classifying: { on: { next: "complete" } },
      complete: { on: { next: "awaitingUpload" }, showImage: true, showResults: true }
    }
  };

const reducer = (currentState, event) => stateMachine.states[currentState].on[event] || stateMachine.initial;

const formatResult = ({ className, probability}) => (
    <li key={className}>
        {`${className}: %${(probability * 100).toFixed(2)}`}
    </li>
);

function ImageClassifier(){

    const [state, dispatch] = useReducer(reducer, stateMachine.initial);
    const [model, setModel] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [results, setResults] = useState({});
    const [topResult, setTopResult] = useState(null);

    const inputRef = useRef();
    const imgRef = useRef();

    const next = () => dispatch('next');

    const loadModel = async () => {
        next();
        const mobilenetModel = await mobilenet.load();
        setModel(mobilenetModel);
        next();
    }
    
    const handleUpload = (e) => {
        const { files } = e.target;
        if(files.length > 0){
            const url = URL.createObjectURL(files[0]);
            setImageUrl(url);
            next();
        }
    }

    const identify = async () => {
        next();
        const classificationResults = await model.classify(imgRef.current);
        setResults(classificationResults);
        setTopResult(classificationResults[0].className);
        next();
    }
    
    const reset = () => {
        setResults({});
        setImageUrl(null);
        next();
    }

    const buttonProps = {
        initial: {text: 'Add photo' , action: loadModel },
        loadingModel: {text: 'Add photo' , action: () => {}},
        awaitingUpload: {text: 'Upload photo' , action: () => inputRef.current.click()},
        ready: {text: 'Submit' , action: identify},
        classifying: {text: 'Identifying' , action: () => {}},
        complete: {text: 'Reset' , action: reset}
    }

    const { showImage=false, showResults=false } = stateMachine.states[state];

    return(
        <div>
            {showImage && <img src={imageUrl} alt="upload-preview" ref={imgRef} className="class_img"/>}
            { showResults && <ul className="class_res">
                {results.map(formatResult)}
            </ul>}
            <input type="file" accept="image/*" capture="camera" ref={inputRef} onChange={handleUpload} className="class_input"/>
            <button onClick={buttonProps[state].action} className="class_button">{buttonProps[state].text}</button>
        </div>
    );

}

export default ImageClassifier;