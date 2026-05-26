export default function Footer() {
    return (
        <footer>
            <div className="footer-grid">
                <div className="footer-brand">
                    <a
                        href="#"
                        className="logo"
                        style={{ fontSize: "1.2 rem" }}
                    >
                        <div
                            className="logo-icon"
                            style={{
                                width: 30,
                                height: 30,
                                fontSize: "0.9 rem",
                            }}
                        >
                            🎮
                        </div>
                        GameLab
                    </a>
                    <p>
                        Videojuegos educativos para niños de 4 a 16 años.
                        Aprende matemáticas, ciencias, historia y más jugando.
                    </p>
                </div>
                <div className="footer-col">
                    <h4>Plataforma</h4>
                    <ul>
                        <li>
                            <a href="#juegos">Catálogo</a>
                        </li>
                        <li>
                            <a href="#como-funciona">¿Cómo funciona?</a>
                        </li>
                        <li>
                            <a href="#planes">Precios</a>
                        </li>
                        <li>
                            <a href="#">Accesibilidad</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Desarrolladores</h4>
                    <ul>
                        <li>
                            <a href="#integracion">Unity WebGL</a>
                        </li>
                        <li>
                            <a href="#">API de suscripción</a>
                        </li>
                        <li>
                            <a href="#">Documentación</a>
                        </li>
                        <li>
                            <a href="#">SDK</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Compañía</h4>
                    <ul>
                        <li>
                            <a href="#">Sobre nosotros</a>
                        </li>
                        <li>
                            <a href="#">Blog</a>
                        </li>
                        <li>
                            <a href="#">Privacidad</a>
                        </li>
                        <li>
                            <a href="#">Términos</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 GameLab. Todos los derechos reservados.</p>
                <p>Hecho con ♥ en Colombia 🇨🇴</p>
            </div>
        </footer>
    )
}
