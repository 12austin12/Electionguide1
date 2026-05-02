import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './EligibilityChecker.css';

const EligibilityChecker = () => {
  const { language, isFirstTimeVoter } = useContext(AppContext);
  const [step, setStep] = useState(0);
  
  const questions = [
    {
      q: { en: 'Are you an Indian citizen?', es: '¿Es usted ciudadano indio?' },
      desc: { en: 'You must be an Indian citizen to vote in federal elections.', es: 'Debe ser ciudadano indio para votar en elecciones federales.' },
      field: 'citizen'
    },
    {
      q: { en: 'Will you be 18 years old on or before Election Day?', es: '¿Tendrá 18 años de edad en o antes del Día de las Elecciones?' },
      desc: { en: 'You can pre-register at 16 or 17 in some states.', es: 'Puede preinscribirse a los 16 o 17 años en algunos estados.' },
      field: 'age'
    },
    {
      q: { en: 'Are you a resident of the state you plan to vote in?', es: '¿Es residente del estado en el que planea votar?' },
      desc: { en: 'Residency requirements vary by state.', es: 'Los requisitos de residencia varían según el estado.' },
      field: 'resident'
    }
  ];

  const [answers, setAnswers] = useState({
    citizen: null,
    age: null,
    resident: null
  });

  const handleAnswer = (val) => {
    const currentQ = questions[step];
    setAnswers({ ...answers, [currentQ.field]: val });
    
    if (step < questions.length) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const reset = () => {
    setAnswers({ citizen: null, age: null, resident: null });
    setStep(0);
  };

  const isEligible = answers.citizen && answers.age && answers.resident;
  const isRejected = answers.citizen === false || answers.age === false || answers.resident === false;

  return (
    <div className="eligibility-container">
      <h1 className="text-center section-title">{language === 'en' ? 'Eligibility Checker' : 'Verificador de Elegibilidad'}</h1>
      
      {isFirstTimeVoter && (
        <p className="text-center helper-text">
          {language === 'en' 
            ? 'Not sure if you can vote? Answer these 3 simple questions to find out.' 
            : '¿No está seguro si puede votar? Responda estas 3 preguntas simples para averiguarlo.'}
        </p>
      )}

      <div className="card checker-card">
        {step < questions.length && !isRejected ? (
          <div className="checker-step">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / questions.length) * 100}%` }}></div>
            </div>
            <h2 className="question-title">{questions[step].q[language]}</h2>
            {isFirstTimeVoter && <p className="question-desc">{questions[step].desc[language]}</p>}
            
            <div className="btn-group">
              <button className="btn btn-secondary btn-lg" onClick={() => handleAnswer(true)}>
                {language === 'en' ? 'Yes' : 'Sí'}
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => handleAnswer(false)}>
                {language === 'en' ? 'No' : 'No'}
              </button>
            </div>
          </div>
        ) : (
          <div className="checker-result" aria-live="polite">
            {isEligible ? (
              <div className="result-success">
                <div className="result-icon" aria-hidden="true">✅</div>
                <h2>{language === 'en' ? 'You are likely eligible to vote!' : '¡Es probable que sea elegible para votar!'}</h2>
                <p>{language === 'en' ? 'Next step: Make sure you are registered.' : 'Siguiente paso: Asegúrese de estar registrado.'}</p>
              </div>
            ) : (
              <div className="result-error">
                <div className="result-icon" aria-hidden="true">❌</div>
                <h2>{language === 'en' ? 'You might not be eligible.' : 'Es posible que no sea elegible.'}</h2>
                <p>{language === 'en' ? 'Based on your answers, you may not meet the federal requirements to vote.' : 'Según sus respuestas, es posible que no cumpla con los requisitos federales para votar.'}</p>
              </div>
            )}
            <button className="btn btn-primary mt-4" onClick={reset} aria-label={language === 'en' ? 'Start Over' : 'Comenzar de Nuevo'}>
              {language === 'en' ? 'Start Over' : 'Comenzar de Nuevo'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityChecker;
