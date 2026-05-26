export default function IntegrationSection() {
    return (
        <section id="integracion">
            <span className="section-label">Tecnología</span>
            <h2 className="section-title">Integración con Unity WebGL</h2>
            <div className="integration-grid">
                <div className="integration-code-block">
                    <div className="code-header">
                        <div
                            className="code-dot"
                            style={{ background: "#ff5f57" }}
                        ></div>
                        <div
                            className="code-dot"
                            style={{ background: "#ffc12e" }}
                        ></div>
                        <div
                            className="code-dot"
                            style={{ background: "#28ca42" }}
                        ></div>
                        <span style={{ marginLeft: 8 }}>
                            index.html — Loader Unity
                        </span>
                    </div>
                    <div className="code-body">
                        <span className="c-cm">
                            // 1. Embed el canvas de Unity en tu página
                        </span>
                        {"\n"}
                        <span className="c-kw">const</span> canvas = document.
                        <span className="c-fn">getElementById</span>(
                        <span className="c-str">"unity-canvas"</span>);
                        {"\n\n"}
                        <span className="c-cm">
                            // 2. Carga el loader generado por Unity Build
                        </span>
                        {"\n"}
                        <span className="c-kw">const</span> script = document.
                        <span className="c-fn">createElement</span>(
                        <span className="c-str">"script"</span>);
                        {"\n"}
                        script.src ={" "}
                        <span className="c-str">"Build/MiJuego.loader.js"</span>
                        ;{"\n"}
                        document.body.
                        <span className="c-fn">appendChild</span>(script);
                        {"\n\n"}
                        <span className="c-cm">
                            // 3. Inicializa la instancia
                        </span>
                        {"\n"}
                        script.onload = <span className="c-kw">async</span> ()
                        =&gt; {"{"}
                        {"\n    "}
                        instance = <span className="c-kw">await</span>{" "}
                        <span className="c-fn">createUnityInstance</span>(
                        canvas,
                        {"{"}
                        {"\n        "}
                        dataUrl:{" "}
                        <span className="c-str">"Build/MiJuego.data"</span>,
                        {"\n        "}
                        frameworkUrl:
                        <span className="c-str">
                            "Build/MiJuego.framework.js"
                        </span>
                        ,{"\n        "}
                        codeUrl:{" "}
                        <span className="c-str">"Build/MiJuego.wasm"</span>,
                        {"\n        "}
                        streamingAssetsUrl:
                        <span className="c-str">"StreamingAssets"</span>,
                        {"\n    "}
                        {"}"}
                        );
                        {"\n\n    "}
                        <span className="c-cm">
                            // Verificar suscripción antes de cargar
                        </span>
                        {"\n    "}
                        <span className="c-fn">checkSubscription</span>
                        (instance);
                        {"\n"}
                        {"}"};
                    </div>
                </div>
                <ul className="integration-points">
                    <li>
                        <div
                            className="ip-icon"
                            style={{ background: "rgba(124,108,248,0.12)" }}
                        >
                            🌐
                        </div>

                        <div>
                            <div className="ip-title">
                                Exportación WebGL de Unity
                            </div>

                            <div className="ip-desc">
                                Exporta desde Unity con File → Build Settings →
                                WebGL. Los archivos .data, .framework.js y .wasm
                                van en la carpeta /Build de tu servidor.
                            </div>
                        </div>
                    </li>

                    <li>
                        <div
                            className="ip-icon"
                            style={{ background: "rgba(78,205,196,0.1)" }}
                        >
                            🔒
                        </div>

                        <div>
                            <div className="ip-title">
                                Verificación de suscripción
                            </div>

                            <div className="ip-desc">
                                El servidor verifica el token del usuario antes
                                de servir los archivos de la build. Sin
                                suscripción activa, el juego no carga.
                            </div>
                        </div>
                    </li>

                    <li>
                        <div
                            className="ip-icon"
                            style={{ background: "rgba(255,107,107,0.1)" }}
                        >
                            💾
                        </div>

                        <div>
                            <div className="ip-title">Descarga local</div>

                            <div className="ip-desc">
                                Para la versión descargable, Unity genera builds
                                para Windows (.exe), Mac (.app) o Android
                                (.apk). El servidor genera un link firmado de
                                descarga temporal.
                            </div>
                        </div>
                    </li>

                    <li>
                        <div
                            className="ip-icon"
                            style={{ background: "rgba(255,193,7,0.1)" }}
                        >
                            📡
                        </div>

                        <div>
                            <div className="ip-title">
                                Comunicación JS ↔ Unity
                            </div>

                            <div className="ip-desc">
                                Usa SendMessage() para pasar el token de sesión
                                a Unity y registrar eventos de progreso de
                                vuelta a la plataforma web.
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}
