export default function Navbar({ onOpenQuiz }) {
    return (
        <nav>
            <a href="#" className="logo">
                <div className="logo-icon">🎮</div>
                GameLab
            </a>

            <div className="nav-links">
                <a href="#juegos" className="hide-mobile">
                    Juegos
                </a>

                <a href="#como-funciona" className="hide-mobile">
                    ¿Cómo funciona?
                </a>

                <a href="#planes" className="hide-mobile">
                    Planes
                </a>

                <a href="#integracion" className="hide-mobile">
                    Integración
                </a>

                <a className="nav-cta" onClick={onOpenQuiz}>
                    Prueba Docente
                </a>
            </div>
        </nav>
    )
}
