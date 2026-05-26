import { useEffect, useRef, useState } from "react"

export default function GameModal({ game, onClose }) {
    const canvasRef = useRef(null)
    const engineRef = useRef(null)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!game?.free) return

        let cancelled = false

        async function loadGame() {
            try {
                // Evitar cargar el script múltiples veces
                if (!window.__godotScriptLoaded) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement("script")

                        script.src = `/Games/${game.buildFolder}/Build/index.js`

                        script.onload = () => {
                            window.__godotScriptLoaded = true
                            resolve()
                        }

                        script.onerror = reject

                        document.body.appendChild(script)
                    })
                }

                if (cancelled) return

                if (!window.Engine) {
                    console.error("Godot Engine no encontrado")
                    return
                }

                // Crear ID único para el canvas
                const canvas = canvasRef.current

                canvas.id = "godot-canvas"

                const engine = new window.Engine({
                    canvas,
                    executable: `/Games/${game.buildFolder}/Build/index`,
                })

                engineRef.current = engine

                await engine.startGame()

                if (!cancelled) {
                    setLoaded(true)
                }
            } catch (err) {
                console.error("Error cargando juego:", err)
            }
        }

        loadGame()

        return async () => {
            cancelled = true

            try {
                if (engineRef.current) {
                    await engineRef.current.quit()
                    engineRef.current = null
                }
            } catch (err) {
                console.error(err)
            }
        }
    }, [game])

    return (
        <div className="modal-overlay open">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title">{game.title}</div>

                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    {game.free ? (
                        <>
                            {!loaded && (
                                <div className="loading-game">
                                    Cargando juego...
                                </div>
                            )}

                            <canvas
                                ref={canvasRef}
                                className="unity-canvas-area"
                            />
                        </>
                    ) : (
                        <div className="locked-overlay">
                            <div className="lock-icon">🔒</div>

                            <div className="lock-msg">
                                Necesitas suscripción
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
