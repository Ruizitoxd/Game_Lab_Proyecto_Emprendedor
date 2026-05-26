// Leaderboard.jsx
export default function Leaderboard({
    players = [],
    totalQuestions = 1,
    onRestart,
}) {
    // =========================================
    // ORDENAR PLAYERS
    // =========================================

    const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

    // =========================================
    // PORCENTAJE
    // =========================================

    const getPercentage = (score) => {
        return Math.round((score / totalQuestions) * 100)
    }

    return (
        <div className="leaderboard-page">
            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="leaderboard-header">
                <h1>🏆 Resultados Finales</h1>

                <p>Ranking de jugadores según respuestas correctas</p>
            </div>

            {/* ================================= */}
            {/* LISTA */}
            {/* ================================= */}

            <div className="leaderboard-list">
                {sortedPlayers.map((player, index) => {
                    const percentage = getPercentage(player.score)

                    return (
                        <div key={player.id} className="leaderboard-item">
                            {/* POSICIÓN */}
                            <div className="player-rank">#{index + 1}</div>

                            {/* INFO */}
                            <div className="player-info">
                                <div className="player-name">
                                    Jugador {player.id}
                                </div>

                                {/* BARRA */}
                                <div className="score-bar-container">
                                    <div
                                        className="score-bar"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* SCORE */}
                            <div className="player-score">
                                {player.score}/{totalQuestions}
                            </div>

                            {/* PORCENTAJE */}
                            <div className="player-percent">{percentage}%</div>
                        </div>
                    )
                })}
            </div>

            {/* ================================= */}
            {/* BOTÓN */}
            {/* ================================= */}

            <button className="restart-btn" onClick={onRestart}>
                🔄 Reiniciar juego
            </button>
        </div>
    )
}
