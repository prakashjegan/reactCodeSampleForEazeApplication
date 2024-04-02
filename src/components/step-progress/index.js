import React from "react";
import "./style.scss";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ steps, page, onPageNumberClick }) => {
    var stepPercentage = 0;
    if (page === 1) stepPercentage = 10;
    else if (page === 2) stepPercentage = 30;
    else if (page === 3) stepPercentage = 50;
    else if (page === 4) stepPercentage = 70;
    else if (page === 5) stepPercentage = 90;
    else if (page === 6) stepPercentage = 100;
    else stepPercentage = 0;

    return (
        <ProgressBar percent={stepPercentage}>
            {steps?.map((item, index) => {
                return (
                    <Step key={index}>
                        {({ accomplished }) => (
                            <div
                                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                onClick={() => onPageNumberClick(item.value)}
                            >
                                {item.value}
                                <div className={`step-text ${accomplished ? "done-text" : 'not-done-text'}`}>{item.label}</div>
                            </div>
                        )}
                    </Step>
                )
            })}
        </ProgressBar>
    );
};

export default MultiStepProgressBar;
