import { useEffect, useRef, useState } from "react"

export default function QRScannerModal({
    onClose,
    onPlayerDetected,
}) {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const [error, setError] = useState("")

    const animationRef = useRef(null)

    const lastRotationRef = useRef(0)
    const stableCountRef = useRef(0)
    const lastMarkerRef = useRef(null)
    const detectionCooldownRef = useRef(false)

    useEffect(() => {
        let stream = null

        start()

        async function start() {
            console.log("Función start iniciada");
            
            try {
                // Esperar OpenCV
                await waitForOpenCV()

                stream =
                    await navigator.mediaDevices.getUserMedia(
                        {
                            video: {
                                facingMode:
                                    "environment",
                            },
                        },
                    )

                const video =
                    videoRef.current

                video.srcObject = stream

                video.onloadedmetadata = async () => {
                    const canvas = canvasRef.current

                    const waitReady = () => {
                        if (video.videoWidth === 0) {
                            requestAnimationFrame(waitReady)
                            return
                        }

                        canvas.width = video.videoWidth
                        canvas.height = video.videoHeight

                        video.play()
                        scanFrame()
                    }

                    waitReady()
                }
            } catch (err) {
                console.error(err)
                
                setError(
                    "Error iniciando cámara",
                )
            }
        }

        // =========================
        // ESPERAR OPENCV
        // =========================

        function waitForOpenCV() {
            console.log("Función waitForOpenCV iniciada...");
            
            return new Promise((resolve, reject) => {
                const maxWait = 10000
                const start = Date.now()

                const check = () => {
                    console.log("checking cv...")

                    if (!window.cv) {
                        if (Date.now() - start > maxWait) {
                            reject("OpenCV no cargó")
                            return
                        }

                        setTimeout(check, 100)
                        return
                    }

                    // OpenCV ya terminó de inicializar
                    if (window.cv.Mat) {
                        console.log("cv ready")
                        resolve()
                        return
                    }

                    // Esperar runtime WASM
                    window.cv.onRuntimeInitialized = () => {
                        console.log("cv runtime initialized")
                        resolve()
                    }
                }

                check()
            })
        }

        // =========================
        // SCAN
        // =========================

        function scanFrame() {
            const video = videoRef.current
            const canvas = canvasRef.current

            if (!video || !canvas) {
                animationRef.current =
                    requestAnimationFrame(scanFrame)

                return
            }

            const ctx = canvas.getContext("2d")

            ctx.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height,
            )

            try {
                detectMarkers(ctx)
            } catch (err) {
                console.error("detectMarkers error:", err)
            }

            animationRef.current =
                requestAnimationFrame(scanFrame)
        }

        // =========================
        // DETECTAR ARUCO
        // =========================

        function detectMarkers(ctx) {
            const cv = window.cv

            const canvas = canvasRef.current

            const src = cv.imread(canvas)

            const gray = new cv.Mat()

            cv.cvtColor(
                src,
                gray,
                cv.COLOR_RGBA2GRAY,
            )

            console.log("detectMarkers", cv.detectMarkers)
            console.log("ArucoDetector", cv.ArucoDetector)
            console.log("getPredefinedDictionary", cv.getPredefinedDictionary)

            const dictionary =
                cv.getPredefinedDictionary(
                    cv.DICT_4X4_50,
                )

            const corners =
                new cv.MatVector()

            const ids = new cv.Mat()

            cv.detectMarkers(
                gray,
                dictionary,
                corners,
                ids,
            )

            if (!ids.empty()) {
                console.log("marker detectado")
            }

            src.delete()
            gray.delete()
            corners.delete()
            ids.delete()
        }

        // =========================
        // DIBUJAR
        // =========================

        function drawMarker(
            ctx,
            id,
            corners,
        ) {
            ctx.strokeStyle = "lime"

            ctx.lineWidth = 4

            ctx.beginPath()

            corners.forEach(
                (corner, index) => {
                    if (index === 0) {
                        ctx.moveTo(
                            corner.x,
                            corner.y,
                        )
                    } else {
                        ctx.lineTo(
                            corner.x,
                            corner.y,
                        )
                    }
                },
            )

            ctx.closePath()
            ctx.stroke()

            const centerX =
                corners.reduce(
                    (sum, c) =>
                        sum + c.x,
                    0,
                ) / 4

            const centerY =
                corners.reduce(
                    (sum, c) =>
                        sum + c.y,
                    0,
                ) / 4

            const rawRotation =
                getRotation(corners)

            const stableRotation =
                stabilizeRotation(
                    rawRotation,
                )

            ctx.fillStyle = "red"

            ctx.font = "24px Arial"

            ctx.fillText(
                `ID: ${id}`,
                centerX,
                centerY,
            )

            ctx.fillText(
                `${stableRotation}°`,
                centerX,
                centerY + 30,
            )

            const currentMarker = {
                value: id,
                rotation: stableRotation,
            }

            const hasChanged =
                !lastMarkerRef.current ||
                lastMarkerRef.current.value !==
                    currentMarker.value ||
                lastMarkerRef.current
                    .rotation !==
                    currentMarker.rotation

            if (hasChanged && !detectionCooldownRef.current) {
                detectionCooldownRef.current = true

                lastMarkerRef.current = currentMarker

                onPlayerDetected(currentMarker)

                setTimeout(() => {
                    detectionCooldownRef.current =
                        false
                }, 300)
            }
        }

        // =========================
        // ROTACIÓN
        // =========================

        function getRotation(corners) {
            const topLeft =
                corners[0]

            const topRight =
                corners[1]

            const dx =
                topRight.x - topLeft.x

            const dy =
                topRight.y - topLeft.y

            let angle =
                Math.atan2(dy, dx) *
                (180 / Math.PI)

            if (angle < 0) {
                angle += 360
            }

            if (
                angle >= 315 ||
                angle < 45
            ) {
                return 0
            }

            if (
                angle >= 45 &&
                angle < 135
            ) {
                return 90
            }

            if (
                angle >= 135 &&
                angle < 225
            ) {
                return 180
            }

            return 270
        }

        // =========================
        // ESTABILIZADOR
        // =========================

        function stabilizeRotation(
            rotation,
        ) {
            if (
                rotation ===
                lastRotationRef.current
            ) {
                stableCountRef.current++
            } else {
                stableCountRef.current = 0
            }

            if (
                stableCountRef.current >= 2
            ) {
                lastRotationRef.current =
                    rotation
            }

            return lastRotationRef.current
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(
                    animationRef.current,
                )
            }

            if (stream) {
                stream
                    .getTracks()
                    .forEach((track) =>
                        track.stop(),
                    )
            }
        }
    }, [onPlayerDetected])

    return (
        <div className="scanner-overlay">
            <div className="scanner-modal">
                <div className="scanner-header">
                    <h2>
                        Escanear ArUco
                    </h2>

                    <button
                        className="scanner-close"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="scanner-body">
                    {error ? (
                        <div className="scanner-error">
                            {error}
                        </div>
                    ) : (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                style={{
                                    position: "absolute",
                                    opacity: 0,
                                    pointerEvents: "none",
                                    width: "1px",
                                    height: "1px",
                                }}
                            />

                            <canvas
                                ref={canvasRef}
                                className="scanner-video"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}