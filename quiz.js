const vocabulary = {
    Orange: {
        es: { name: "Spanish", items: [
            [{ english: "the man", word: "el hombre" }, { english: "the woman", word: "la mujer" }, { english: "I am a man", word: "yo soy un hombre" }],
            [{ english: "the boy", word: "el niño" }, { english: "the girl", word: "la niña" }, { english: "I am a girl", word: "yo soy una niña" }],
            [{ english: "Hello", word: "hola" }, { english: "Goodbye", word: "adiós" }, { english: "Thank you", word: "gracias" }],
            [{ english: "Yes", word: "sí" }, { english: "No", word: "no" }, { english: "Please", word: "por favor" }],
            [{ english: "You are a woman", word: "tú eres una mujer" }, { english: "He is a boy", word: "él es un niño" }]
        ]},
        fr: { name: "French", items: [
            [{ english: "the man", word: "l'homme" }, { english: "the woman", word: "la femme" }, { english: "I am a man", word: "je suis un homme" }],
            [{ english: "the boy", word: "le garçon" }, { english: "the girl", word: "la fille" }, { english: "I am a girl", word: "je suis une fille" }],
            [{ english: "Hello", word: "bonjour" }, { english: "Goodbye", word: "au revoir" }, { english: "Thank you", word: "merci" }],
            [{ english: "Yes", word: "oui" }, { english: "No", word: "non" }, { english: "Please", word: "s'il vous plaît" }],
            [{ english: "You are a woman", word: "tu es une femme" }, { english: "He is a boy", word: "il est un garçon" }]
        ]},
        ja: { name: "Japanese", items: [
            [{ english: "Man", word: "男" }, { english: "Woman", word: "女" }, { english: "I am a man", word: "私は男です" }],
            [{ english: "Boy", word: "男の子" }, { english: "Girl", word: "女の子" }, { english: "I am a girl", word: "私は女の子です" }],
            [{ english: "Hello", word: "こんにちは" }, { english: "Goodbye", word: "さようなら" }, { english: "Thank you", word: "ありがとう" }],
            [{ english: "Yes", word: "はい" }, { english: "No", word: "いいえ" }, { english: "Please", word: "お願いします" }],
            [{ english: "You are a woman", word: "あなたは女です" }, { english: "He is a boy", word: "彼は男の子です" }]
        ]}
    },
    Green: { /* Planet 2: Food & Drink */
        es: { name: "Spanish", items: [
            [{ english: "the apple", word: "la manzana" }, { english: "the bread", word: "el pan" }, { english: "The man eats an apple", word: "el hombre come una manzana" }],
            [{ english: "water", word: "agua" }, { english: "milk", word: "leche" }, { english: "She drinks water", word: "ella bebe agua" }],
            [{ english: "I eat", word: "yo como" }, { english: "you drink", word: "tú bebes" }, { english: "I eat bread and you drink milk", word: "yo como pan y tú bebes leche" }],
            [{ english: "coffee", word: "café" }, { english: "sandwich", word: "sándwich" }, { english: "She eats a sandwich", word: "ella come un sándwich" }],
            [{ english: "Do you drink milk?", word: "tú bebes leche" }, { english: "He eats the apple", word: "él come la manzana" }]
        ]},
        fr: { name: "French", items: [ /* Similar structure for French */ ]},
        ja: { name: "Japanese", items: [ /* Similar structure for Japanese */ ]}
    },
    Red: { /* Planet 3: People & Possessions */
        es: { name: "Spanish", items: [ /* 5 sections of vocab & sentences */ ]},
        fr: { name: "French", items: [ /* 5 sections of vocab & sentences */ ]},
        ja: { name: "Japanese", items: [ /* 5 sections of vocab & sentences */ ]}
    },
    Pink: { /* Planet 4: Places & Navigation */
         es: { name: "Spanish", items: [ /* 5 sections of vocab & sentences */ ]},
        fr: { name: "French", items: [ /* 5 sections of vocab & sentences */ ]},
        ja: { name: "Japanese", items: [ /* 5 sections of vocab & sentences */ ]}
    },
    Blue: { /* Planet 5: Descriptions & Adjectives */
         es: { name: "Spanish", items: [ /* 5 sections of vocab & sentences */ ]},
        fr: { name: "French", items: [ /* 5 sections of vocab & sentences */ ]},
        ja: { name: "Japanese", items: [ /* 5 sections of vocab & sentences */ ]}
    },
    Purple: { /* Planet 6: Connecting Ideas */
         es: { name: "Spanish", items: [ /* 5 sections of vocab & sentences */ ]},
        fr: { name: "French", items: [ /* 5 sections of vocab & sentences */ ]},
        ja: { name: "Japanese", items: [ /* 5 sections of vocab & sentences */ ]}
    }
};


const langCodes = {
    es: 'es-ES',
    fr: 'fr-FR',
    ja: 'ja-JP'
};

function QuizApp() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [theme, setTheme] = React.useState({ color: '#000', planetName: 'Space', lang: 'es' });
    const [isExiting, setIsExiting] = React.useState(false);
    const [lessonSteps, setLessonSteps] = React.useState([]);
    const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [quizFinished, setQuizFinished] = React.useState(false);
    const [answerStatus, setAnswerStatus] = React.useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0);

    const [isRecording, setIsRecording] = React.useState(false);
    const [userAnswer, setUserAnswer] = React.useState('');
    const [liveTranscript, setLiveTranscript] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
    const [answerSubmitted, setAnswerSubmitted] = React.useState(false);
    
    const [strikes, setStrikes] = React.useState(0);
    const [wrongAnswers, setWrongAnswers] = React.useState([]);
    const [animationSrc, setAnimationSrc] = React.useState('talk.json');
    const [startTime, setStartTime] = React.useState(null);
    const [lessonDuration, setLessonDuration] = React.useState(null);
    const [view, setView] = React.useState('lesson');

    const recognition = React.useRef(null);
    const lottiePlayerRef = React.useRef(null);
    
    const allAnswers = React.useMemo(() => {
        const answers = { es: [], fr: [], ja: [] };
        for (const planet in vocabulary) {
            for (const lang in vocabulary[planet]) {
                vocabulary[planet][lang].items.flat().forEach(item => {
                    if (!answers[lang].includes(item.word)) {
                        answers[lang].push(item.word);
                    }
                });
            }
        }
        return answers;
    }, []);

    React.useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = false; // Process single utterances
            recognition.current.interimResults = true;
            recognition.current.maxAlternatives = 1;

            recognition.current.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                
                const cleanedFinalTranscript = finalTranscript.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                const cleanedInterimTranscript = interimTranscript.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                
                setLiveTranscript(cleanedInterimTranscript || cleanedFinalTranscript);

                if(finalTranscript){
                    setUserAnswer(cleanedFinalTranscript)
                }
            };

            recognition.current.onend = () => setIsRecording(false);
            recognition.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setFeedback(event.error === 'no-speech' ? "I didn't hear anything. Please try again." : `Error: ${event.error}. Please allow microphone access.`);
                setIsRecording(false);
            };
        }
    }, []);

    React.useEffect(() => {
        if (lottiePlayerRef.current) {
            lottiePlayerRef.current.load(animationSrc);
        }
    }, [animationSrc]);
    
    const handleStartQuiz = (event) => {
        const { lang, planetName, sectionIndex, color } = event.detail;
        setTheme({lang, planetName, color});
        setStartTime(Date.now());
        setLessonDuration(null);
        setCurrentSectionIndex(sectionIndex);

        const lessonVocab = vocabulary[planetName][lang].items[sectionIndex];
        const steps = [];
        lessonVocab.forEach(item => {
            steps.push({ type: 'learn', ...item });
            steps.push({ type: 'practice', question: `How do you say "${item.english}"?`, correctAnswer: item.word, ...item });
        });

        setLessonSteps(steps);
        setCurrentStepIndex(0);
        setScore(0);
        setStrikes(0);
        setWrongAnswers([]);
        setQuizFinished(false);
        handleTryAgain();
        setAnimationSrc('talk.json');
        
        if(recognition.current) recognition.current.lang = langCodes[lang];
        setIsVisible(true);
        document.getElementById('react-root').style.display = 'flex';
    };

    React.useEffect(() => {
        window.addEventListener('startQuiz', handleStartQuiz);
        return () => window.removeEventListener('startQuiz', handleStartQuiz);
    }, []);

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space' && isVisible && !quizFinished && !isRecording && !answerSubmitted) {
                event.preventDefault();
                handleStartRecording();
            }
        };
        const handleKeyUp = (event) => {
             if (event.code === 'Space' && isVisible && !quizFinished && isRecording) {
                event.preventDefault();
                recognition.current.stop();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isVisible, quizFinished, isRecording, answerSubmitted]);

    React.useEffect(() => {
        if (strikes >= 3) {
            setQuizFinished(true);
        }
    }, [strikes]);

    React.useEffect(() => {
        if (quizFinished) {
            setLessonDuration(Date.now() - startTime);
            const victoryAnims = ['victory1.json', 'victory2.json', 'victory3.json'];
            const lossAnims = ['loss1.json', 'loss2.json', 'loss3.json'];
            if (strikes >= 3) {
                setAnimationSrc(lossAnims[Math.floor(Math.random() * lossAnims.length)]);
            } else {
                setAnimationSrc(victoryAnims[Math.floor(Math.random() * victoryAnims.length)]);
            }
            const wasPerfect = strikes === 0 && wrongAnswers.length === 0;
            window.dispatchEvent(new CustomEvent('lessonCompleted', { detail: { planetName: theme.planetName, sectionNumber: currentSectionIndex + 1, wasPerfect } }));
        }
    }, [quizFinished]);

    const handleBackClick = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            document.getElementById('react-root').style.display = 'none';
            window.dispatchEvent(new CustomEvent('endQuiz'));
            setIsExiting(false);
        }, 800);
    };

    const handleTryAgain = () => {
        setUserAnswer('');
        setFeedback('');
        setLiveTranscript('');
        setAnswerSubmitted(false);
        setAnswerStatus(null);
    };

    const handleNextStep = () => {
        handleTryAgain();
        const nextIndex = currentStepIndex + 1;

        if (nextIndex >= lessonSteps.length) {
            if (wrongAnswers.length > 0) {
                setLessonSteps(wrongAnswers);
                setWrongAnswers([]);
                setCurrentStepIndex(0);
            } else {
                setQuizFinished(true);
            }
        } else {
            setCurrentStepIndex(nextIndex);
        }
    };

    const handleSubmitAnswer = () => {
        const currentStep = lessonSteps[currentStepIndex];
        if (currentStep.type === 'learn') {
            handleNextStep();
            return;
        }

        if (userAnswer === '') return;
        setAnswerSubmitted(true);

        let isCorrect = userAnswer.includes(currentStep.correctAnswer);
        if (isCorrect) {
            setFeedback(`Correct!`);
            setScore(prev => prev + 1);
            setAnswerStatus('correct');
        } else {
            let wrongLanguage = null;
            for (const lang in allAnswers) {
                if (lang !== theme.lang && allAnswers[lang].includes(userAnswer)) {
                    wrongLanguage = window.languageNames[lang];
                    break;
                }
            }
            if (wrongLanguage) {
                setFeedback(`That sounds like ${wrongLanguage}. Please speak in ${window.languageNames[theme.lang]}.`);
            } else {
                setFeedback(`Not quite. The answer is "${currentStep.correctAnswer}".`);
            }
            setAnswerStatus('incorrect');
            setStrikes(prev => prev + 1);
            setWrongAnswers(prev => [...new Set([...prev, currentStep])]); // Avoid duplicates
        }
        setTimeout(handleNextStep, 2000);
    };

    const handleStartRecording = () => {
        if (!recognition.current) {
            setFeedback("Sorry, your browser doesn't support speech recognition.");
            return;
        }
        handleTryAgain(); 
        setIsRecording(true);
        recognition.current.start();
    };
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = langCodes[theme.lang];
            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Sorry, your browser doesn't support text-to-speech.");
        }
    };
    
    if (!isVisible) return null;
    
    const animationClass = (delay) => isExiting ? 'animate__fadeOutLeft' : 'animate__fadeInLeft';
    const currentStep = lessonSteps[currentStepIndex];
    const totalPracticeStepsInSection = lessonSteps.filter(step => step.type === 'practice').length;
    const progress = totalPracticeStepsInSection > 0 ? (score / totalPracticeStepsInSection) * 100 : 0;
    
    const formatDuration = (ms) => {
        if (!ms) return '00:00';
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    
    const renderQuizContent = () => {
        if (!currentStep || quizFinished) {
            const resultMessage = strikes >= 3 ? "You'll get it next time!" : "Lesson Complete!";
            return (
                <div className="quiz-results">
                    <div className="character-container" style={{width: '300px', height: '300px', margin: '0 auto'}}>
                        <lottie-player ref={lottiePlayerRef} src={animationSrc} background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                    <h2 className={`animate__animated ${animationClass()}`} style={{animationDelay: '0.2s'}}>{resultMessage}</h2>
                    {strikes < 3 && <p className={`animate__animated ${animationClass()}`} style={{animationDelay: '0.4s'}}>You scored {score} out of {totalPracticeStepsInSection}</p>}
                     <p className={`animate__animated ${animationClass()}`} style={{animationDelay: '0.6s'}}>Time: {formatDuration(lessonDuration)}</p>
                </div>
            );
        }

        let instructionText = "Hold Spacebar to speak.";
        if (isRecording) instructionText = "Listening...";
        else if (answerSubmitted) instructionText = ""; // Feedback is in banner
        else if (userAnswer) instructionText = "Ready to check!";
        
        return (
            <React.Fragment>
                <div className="quiz-body">
                    <div className="character-container">
                        <lottie-player ref={lottiePlayerRef} src={animationSrc} background="transparent" speed="1" style={{ width: '300px', height: '300px' }} loop autoplay></lottie-player>
                    </div>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        {currentStep.type === 'learn' ? (
                            <div className="learning-card">
                                <div className="number">{currentStep.english}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                                    <div className="word">{currentStep.word}</div>
                                    <button onClick={() => handleSpeak(currentStep.word)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: 0}}>
                                        <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <React.Fragment>
                                <div className="quiz-question">{currentStep.question}</div>
                                <div className="quiz-feedback-box">
                                   {isRecording ? liveTranscript || '...' : (userAnswer || instructionText) }
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    };
    
    return (
        <div className="quiz-container" style={{ backgroundColor: theme.color }}>
            <div className="quiz-header">
                <button className="back-button" onClick={handleBackClick}>✕</button>
                <div className="progress-bar">
                    <div className="progress-bar-inner" style={{width: `${progress}%`}}></div>
                </div>
                <div className="strikes-container">
                    {[...Array(3)].map((_, i) => (
                        <svg key={i} className={`strike ${i < strikes ? 'lost' : ''}`} viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    ))}
                </div>
            </div>
            <div className="quiz-main">
                {renderQuizContent()}
            </div>
            {!quizFinished && (
                 <div className="quiz-footer">
                    <div className="quiz-actions" style={{visibility: answerSubmitted ? 'hidden' : 'visible'}}>
                       {currentStep && currentStep.type === 'practice' && (
                            <button 
                                className="check-button try-again-button"
                                onClick={handleTryAgain}
                                disabled={isRecording}
                            >
                                TRY AGAIN
                            </button>
                       )}
                        <button 
                            className="check-button"
                            onClick={handleSubmitAnswer}
                            disabled={currentStep && currentStep.type === 'practice' && (!userAnswer || isRecording)}
                        >
                            {currentStep && currentStep.type === 'learn' ? 'Continue' : 'Check'}
                        </button>
                    </div>
                </div>
            )}
            <div className={`result-banner ${answerStatus} ${answerSubmitted ? 'visible' : ''}`}>
                {feedback}
            </div>
        </div>
    );
}

ReactDOM.render(<QuizApp />, document.getElementById('react-root'));