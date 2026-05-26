export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="hero-grid"></div>

            <div className="hero-content">
                <div className="hero-badge">
                    Plataforma de suscripción educativa
                </div>

                <h1 className="hero-title">
                    Aprender jugando
                    <br />
                    <span className="highlight">nunca fue tan épico</span>
                </h1>

                <p className="hero-sub">
                    Videojuegos educativos creados para mejorar el aprendizaje,
                    disponibles para jugar en el navegador o descargar.
                    Matemáticas, ciencias, historia y más.
                </p>

                <div className="hero-btns">
                    <a href="#juegos" className="btn-primary">
                        🕹 Explorar juegos
                    </a>

                    <a href="#planes" className="btn-outline">
                        Ver planes →
                    </a>
                </div>

                <div className="hero-stats">
                    <div className="stat-time">
                        <div className="stat-num">12+</div>
                        <div className="stat-label">JUEGOS</div>
                    </div>
                    <div className="stat-time">
                        <div className="stat-num">4–16</div>
                        <div className="stat-label">EDADES</div>
                    </div>
                    <div className="stat-time">
                        <div className="stat-num">5</div>
                        <div className="stat-label">MATERIAS</div>
                    </div>
                    <div className="stat-time">
                        <div className="stat-num">WebGL</div>
                        <div className="stat-label">TECNOLOGÍA</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
