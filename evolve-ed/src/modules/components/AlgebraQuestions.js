import React, { useState, useEffect } from 'react';

const AlgebraQestions = () => {
    const [problem, setProblem] = useState('');

    const generateAlgebraicProblemLevel1 = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 10) + 1;
        const variables = ['w', 'k', 'y', 'z'];
        const variable = variables[Math.floor(Math.random() * variables.length)];
        const symbols = ['+', '-'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        const problemString = `${a}${variable} ${symbol} ${b} = ${c}${variable} ${symbol} ${d}`;
        return problemString;
    };

    const displayProblem = () => {
        const problem = generateAlgebraicProblemLevel1();
        setProblem(problem);
    };
    useEffect(() => {
        displayProblem();
    }, []);

    return (
        <div>
            <div id="problem">{problem}</div>
        </div>
    );
};

export default AlgebraQestions;
