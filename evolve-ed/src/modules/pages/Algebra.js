import React from 'react';
import AlgebraQestions from '../components/AlgebraQuestions';
import AlgebraSolver from '../components/AlgebraSolver';

const Algebra = () => {


    return (
        <div>
            <h1>Algebraic Problem Generator</h1>
            <AlgebraQestions/>
            <AlgebraSolver/>
        </div>
    );
};

export default Algebra;
