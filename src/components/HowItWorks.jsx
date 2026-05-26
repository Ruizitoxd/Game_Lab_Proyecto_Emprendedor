export default function HowItWorks() {
    return (
        <section id="como-funciona">
            <div style={{ textAlign: "center" }}>
                <span className="section-label">Proceso</span>
                <h2 className="section-title">¿Cómo funciona?</h2>
            </div>

            <div className="steps-grid">
                <div className="step-card">
                    <div className="step-num">01</div>
                    <div className="step-icon">🎯</div>
                    <div className="step-title">Elige tu plan</div>
                    <div className="step-desc">
                        Selecciona entre el plan Familia, Escuela o Gratis según
                        tus necesidades de acceso y descargas.
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-num">02</div>
                    <div className="step-icon">🌐</div>
                    <div className="step-title">Juega en el navegador</div>
                    <div className="step-desc">
                        Los juegos corren en WebGL directamente en Chrome,
                        Firefox o Edge. Sin instalación, sin esperas.
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-num">03</div>
                    <div className="step-icon">💾</div>
                    <div className="step-title">Descarga para offline</div>
                    <div className="step-desc">
                        Con suscripción activa, descarga la versión de
                        escritorio para Windows, Mac o Android y juega sin
                        internet.
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-num">04</div>
                    <div className="step-icon">📊</div>
                    <div className="step-title">Sigue el progreso</div>
                    <div className="step-desc">
                        Panel de padres y docentes con métricas de aprendizaje,
                        logros y tiempo de juego por estudiante.
                    </div>
                </div>
            </div>
        </section>
    )
}
