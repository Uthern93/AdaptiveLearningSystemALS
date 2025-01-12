import React from 'react';
import AlgebraQestions from '../components/AlgebraQuestions';
import AlgebraSolver from '../components/AlgebraSolver';
import CA from '../components/CA';
import CB from '../components/CB';

const Algebra = () => {


    return (
        <div style={{border: "10px solid black", maxWidth:"50vw", margin: "auto"}}>
            <h1 style={{textAlign: "Center"}}>Algebraic Problem Generator</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>

            <AlgebraQestions/>
            </div>
{/* 
            <div style={{ display: "flex", justifyContent: "center" }}>
                <AlgebraSolver/>
            </div> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <CA/>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <CB myString="test" myNum ={10} />
            </div>

        </div>
    );
};

export default Algebra;
