import QRScannerModal from "./QRScannerModal"
import Leaderboard from "./Leaderboard"
import KahootGame from "./KahootGame"
import { useState } from "react"

export default function QuestionUploader({ onClose }) {
    const [finalResults, setFinalResults] = useState(null)
    const [gameStarted, setGameStarted] = useState(false)
    const [questions, setQuestions] = useState([])
    const [fileName, setFileName] = useState("")
    const [error, setError] = useState("")

    // Tiempo por pregunta
    const [questionTime, setQuestionTime] = useState(20)

    // Jugadores registrados
    const [players, setPlayers] = useState([])
    const [scannerOpen, setScannerOpen] = useState(false)

    // -----------------------------------------
    // PARSEADOR
    // -----------------------------------------
    const parseQuestions = (text) => {
        const lines = text.split("\n").map((line) => line.trim())

        const parsedQuestions = []
        let currentQuestion = null

        lines.forEach((line) => {
            // Nueva pregunta
            if (line.startsWith("#")) {
                // Guardar pregunta anterior
                if (currentQuestion) {
                    parsedQuestions.push(currentQuestion)
                }

                currentQuestion = {
                    question: line.replace("#", "").trim(),
                    answers: [],
                }
            }

            // Respuestas
            else if (line.startsWith("*")) {
                if (currentQuestion) {
                    currentQuestion.answers.push(line.replace("*", "").trim())
                }
            }
        })

        // Guardar última pregunta
        if (currentQuestion) {
            parsedQuestions.push(currentQuestion)
        }

        return parsedQuestions
    }

    // -----------------------------------------
    // CARGA TXT
    // -----------------------------------------
    const handleFileUpload = (e) => {
        const file = e.target.files[0]

        if (!file) return

        setFileName(file.name)

        const reader = new FileReader()

        reader.onload = (event) => {
            try {
                const content = event.target.result

                const parsed = parseQuestions(content)

                if (parsed.length === 0) {
                    setError("No se encontraron preguntas válidas.")
                    return
                }

                setQuestions(parsed)
                setError("")

                console.log("Preguntas cargadas:", parsed)

                /*
                    AQUÍ luego cambiarás la vista:
                    navigate("/usuarios")

                    o setCurrentView("usuarios")
                */
            } catch (err) {
                console.error(err)
                setError("Error procesando el archivo.")
            }
        }

        reader.readAsText(file)
    }

    // -----------------------------------------
    // ESCANEO QR
    // -----------------------------------------
    function handlePlayerDetected(playerId) {
        setPlayers((prev) => {
            // Evitar duplicados
            if (prev.includes(playerId)) return prev

            return [...prev, playerId]
        })
    }

    // -----------------------------------------
    // INICIAR JUEGO
    // -----------------------------------------
    const startGame = () => {
        setGameStarted(true)
    }

    if (finalResults) {
        return (
            <Leaderboard
                players={finalResults}
                totalQuestions={questions.length}
                onRestart={() => {
                    setFinalResults(null)
                    setGameStarted(false)
                    setPlayers([])
                }}
            />
        )
    }

    if (gameStarted) {
        return (
            <KahootGame
                questions={questions}
                players={players}
                questionTime={questionTime}
                onFinish={(results) => {
                    setFinalResults(results)
                }}
            />
        )
    }

    // -----------------------------------------
    // VISTA DE USUARIOS
    // -----------------------------------------
    if (questions.length > 0) {
        return (
            <div className="players-layout">
                {/* ========================= */}
                {/* TOP BAR */}
                {/* ========================= */}
                <div className="players-topbar">
                    <div className="topbar-card">
                        <span className="topbar-number">{players.length}</span>
                        <span className="topbar-label">Jugadores</span>
                    </div>

                    <div className="topbar-card topbar-card-time">
                        <span className="topbar-label">
                            Tiempo por pregunta
                        </span>

                        <select
                            value={questionTime}
                            onChange={(e) =>
                                setQuestionTime(Number(e.target.value))
                            }
                            className="time-select"
                        >
                            <option value={10}>10 segundos</option>
                            <option value={15}>15 segundos</option>
                            <option value={20}>20 segundos</option>
                            <option value={30}>30 segundos</option>
                            <option value={45}>45 segundos</option>
                            <option value={60}>60 segundos</option>
                        </select>
                    </div>

                    <div className="topbar-card">
                        <span className="topbar-number">
                            {questions.length}
                        </span>
                        <span className="topbar-label">Preguntas</span>
                    </div>
                </div>

                {/* ========================= */}
                {/* GRID CENTRADO */}
                {/* ========================= */}
                <div className="players-center">
                    <div className="players-grid">
                        {players.length === 0 ? (
                            <div className="empty-state">
                                Esperando jugadores...
                            </div>
                        ) : (
                            players.map((player) => (
                                <div key={player.id} className="player-card">
                                    <div className="player-avatar">😺</div>

                                    <div className="player-number">
                                        Jugador {player.id}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ========================= */}
                {/* FOOTER */}
                {/* ========================= */}
                <div className="players-footer">
                    <button className="scan-btn" onClick={setScannerOpen(true)}>
                        📷 Escanear QR
                    </button>

                    <button
                        className="start-btn"
                        onClick={startGame}
                        disabled={players.length === 0}
                    >
                        ▶ Iniciar juego
                    </button>
                </div>

                {/* ========================= */}
                {/* SCANER QR */}
                {/* ========================= */}
                {scannerOpen && (
                    <QRScannerModal
                        onClose={() => setScannerOpen(false)}
                        onPlayerDetected={handlePlayerDetected}
                    />
                )}
            </div>
        )
    }

    // -----------------------------------------
    // VISTA INICIAL
    // -----------------------------------------
    return (
        <div className="upload-container">
            <div className="upload-card">
                <div className="upload-header">
                    <h1>Sistema de Preguntas</h1>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <p className="upload-desc">
                    Carga un archivo .txt con el formato:
                </p>

                <div className="format-example">
                    <pre>
                        {`#¿Cuántos planetas existen?
*8
*7
*6
*9`}
                    </pre>
                </div>

                <label className="upload-btn">
                    Seleccionar archivo TXT
                    <input
                        type="file"
                        accept=".txt"
                        hidden
                        onChange={handleFileUpload}
                    />
                </label>

                {error && <div className="error-msg">{error}</div>}
            </div>
        </div>
    )
}
