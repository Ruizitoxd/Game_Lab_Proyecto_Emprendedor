import useReveal from "../hooks/useReveal"
import { games } from "../data/games"
import { useState } from "react"

export default function GamesSection({ onOpenGame }) {
    const [filter, setFilter] = useState("todos")
    const [ref, visible] = useReveal()

    const filteredGames =
        filter === "todos" ? games : games.filter((g) => g.category === filter)

    return (
        <section
            id="juegos"
            ref={ref}
            className={`reveal ${visible ? "visible" : ""}`}
        >
            <div className={`games-header reveal ${visible ? "visible" : ""}`}>
                <div>
                    <span className="section-label">Catálogo</span>
                    <h2 className="section-title">Todos los juegos</h2>
                </div>

                <div className="filter-tabs">
                    <button
                        className={`tab ${filter === "todos" ? "active" : ""}`}
                        onClick={() => setFilter("todos")}
                    >
                        Todos
                    </button>

                    <button
                        className={`tab ${filter === "mate" ? "active" : ""}`}
                        onClick={() => setFilter("mate")}
                    >
                        Matemáticas
                    </button>

                    <button
                        className={`tab ${filter === "ciencias" ? "active" : ""}`}
                        onClick={() => setFilter("ciencias")}
                    >
                        Ciencias
                    </button>

                    <button
                        className={`tab ${filter === "historia" ? "active" : ""}`}
                        onClick={() => setFilter("historia")}
                    >
                        Historia
                    </button>

                    <button
                        className={`tab ${filter === "lenguaje" ? "active" : ""}`}
                        onClick={() => setFilter("lenguaje")}
                    >
                        Lenguaje
                    </button>
                </div>
            </div>

            <div className="gate-banner">
                <div className="gate-msg">
                    🔒 <strong>2 juegos gratuitos</strong> disponibles sin
                    cuenta.
                    <strong>Suscríbete</strong> para acceder a todo el catálogo
                    y descargas ilimitadas.
                </div>
                <a href="#planes" className="btn-primary">
                    Ver planes
                </a>
            </div>

            <div className="games-grid">
                {filteredGames.map((g) => (
                    <div
                        className="game-card"
                        key={g.id}
                        onClick={() => onOpenGame(g)}
                    >
                        <div
                            className="game-thumb"
                            style={{
                                background: `linear-gradient(135deg, ${g.color1}, ${g.color2})`,
                            }}
                        >
                            <div style={{ fontSize: "4rem" }}>{g.icon}</div>

                            <div className="game-age">{g.age} años</div>

                            <div className="game-badge">
                                {g.category === "mate"
                                    ? "Matemáticas"
                                    : g.category === "ciencias"
                                      ? "Ciencias"
                                      : g.category === "historia"
                                        ? "Historia"
                                        : "Lenguaje"}
                            </div>
                        </div>

                        <div className="game-info">
                            <div className="game-title">{g.title}</div>

                            <div className="game-desc">{g.desc}</div>

                            <div className="game-meta">
                                <div className="game-subjects">
                                    {g.subjects.map((s) => (
                                        <span className="subject-tag" key={s}>
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <div className="game-actions">
                                    {g.free ? (
                                        <button
                                            className="btn-play"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onOpenGame(g)
                                            }}
                                        >
                                            ▶ Jugar
                                        </button>
                                    ) : (
                                        <button className="btn-play">
                                            🔒 Premium
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
