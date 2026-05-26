export default function TeacherQuizModal({ onClose, openDemo }) {
    return (
        <div className="modal-overlay open">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title">Sistema Docente</div>

                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <h2>Quiz tipo Kahoot + Plickers</h2>

                    <p>Estás apunto de ingresar al modo docente.</p>
                    <p>
                        En este modo podrás crear un kahoot rápido a partir de
                        las preguntas que subas para tus clases interactivas
                    </p>
                    <ul>
                        <strong>
                            <p>Este modo incluye:</p>
                        </strong>
                        <li>Preguntas en tiempo real</li>
                        <li>Temporizador</li>
                        <li>Escáner QR</li>
                        <li>Leaderboard</li>
                        <li>Resultados</li>
                    </ul>

                    <button className="btn-primary" onClick={openDemo}>
                        Iniciar demo
                    </button>
                </div>
            </div>
        </div>
    )
}
