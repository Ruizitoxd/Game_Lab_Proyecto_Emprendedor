import React, { useEffect, useMemo, useState } from "react"

export default function KahootGame({
    questions = [],
    players = [],
    questionTime = 20,
    onFinish,
}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [timeLeft, setTimeLeft] = useState(questionTime)

    const [phase, setPhase] = useState("question")

    // =========================================
    // SCORES
    // =========================================

    const [gamePlayers, setGamePlayers] = useState(
        players.map((p) => ({
            ...p,
            score: 0,
        })),
    )

    // =========================================
    // PREGUNTA ACTUAL
    // =========================================

    const currentQuestion = useMemo(() => {
        return questions[currentQuestionIndex]
    }, [questions, currentQuestionIndex])

    // =========================================
    // SIMULAR RESPUESTAS
    // =========================================

    const simulateAnswers = () => {
        setGamePlayers((prevPlayers) =>
            prevPlayers.map((player) => {
                // 70% probabilidad de acertar
                const correct = Math.random() > 0.3

                return {
                    ...player,
                    score: correct ? player.score + 1 : player.score,
                }
            }),
        )
    }

    // =========================================
    // TIMER
    // =========================================

    useEffect(() => {
        if (!currentQuestion) return

        // -------------------------------------
        // QUESTION
        // -------------------------------------

        if (phase === "question") {
            if (timeLeft <= 0) {
                simulateAnswers()

                setPhase("answer")

                return
            }

            const interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(interval)
        }

        // -------------------------------------
        // ANSWER
        // -------------------------------------

        if (phase === "answer") {
            const timeout = setTimeout(() => {
                // FIN
                if (currentQuestionIndex >= questions.length - 1) {
                    onFinish(gamePlayers)
                    return
                }

                // NEXT
                setCurrentQuestionIndex((prev) => prev + 1)

                setTimeLeft(questionTime)

                setPhase("question")
            }, 5000)

            return () => clearTimeout(timeout)
        }
    }, [
        phase,
        timeLeft,
        currentQuestion,
        currentQuestionIndex,
        questions.length,
        questionTime,
        gamePlayers,
        onFinish,
    ])

    // =========================================
    // LETRAS
    // =========================================

    const getLetter = (index) => {
        return ["A", "B", "C", "D"][index]
    }

    const answerClasses = [
        "answer-card red",
        "answer-card blue",
        "answer-card yellow",
        "answer-card green",
    ]

    // =========================================
    // RENDER
    // =========================================

    return (
        <div className="kahoot-game">
            {/* TOPBAR */}

            <div className="game-topbar">
                <div className="game-counter">
                    Pregunta <strong>{currentQuestionIndex + 1}</strong>/
                    {questions.length}
                </div>

                <div className="game-timer">{timeLeft}</div>

                <div className="game-players">👥 {players.length}</div>
            </div>

            {/* QUESTION */}

            <div className="question-container">
                <div className="question-box">{currentQuestion.question}</div>
            </div>

            {/* ANSWERS */}

            <div className="answers-grid">
                {currentQuestion.answers.map((answer, index) => (
                    <div key={index} className={answerClasses[index]}>
                        <div className="answer-letter">{getLetter(index)}</div>

                        <div className="answer-text">{answer}</div>
                    </div>
                ))}
            </div>

            {/* CORRECT */}

            {phase === "answer" && (
                <div className="correct-answer-banner">
                    ✅ Respuesta correcta:
                    <strong> {currentQuestion.answers[0]}</strong>
                </div>
            )}
        </div>
    )
}
