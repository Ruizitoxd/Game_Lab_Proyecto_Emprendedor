// QRScannerModal.jsx

import { useEffect, useRef, useState } from "react"
import { BrowserMultiFormatReader } from "@zxing/browser"

export default function QRScannerModal({ onClose, onPlayerDetected }) {
    const videoRef = useRef(null)
    const controlsRef = useRef(null)

    const [error, setError] = useState("")
    const [scanning, setScanning] = useState(true)

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader()

        async function startScanner() {
            try {
                const devices =
                    await BrowserMultiFormatReader.listVideoInputDevices()

                if (!devices.length) {
                    setError("No se encontró cámara")
                    return
                }

                const selectedDeviceId = devices[0].deviceId

                controlsRef.current = await codeReader.decodeFromVideoDevice(
                    selectedDeviceId,
                    videoRef.current,
                    (result, err) => {
                        console.log("Entré acá?", result)

                        if (result) {
                            const value = result.getText()
                            console.log(value)

                            const playerId = value.replace("PLAYER_", "")

                            onPlayerDetected(playerId)
                        }
                    },
                )
            } catch (err) {
                console.error(err)
                setError("Error iniciando cámara")
            }
        }

        if (scanning) {
            startScanner()
        }

        return () => {
            if (controlsRef.current) {
                controlsRef.current.stop()
            }
        }
    }, [scanning, onPlayerDetected])

    return (
        <div className="scanner-overlay">
            <div className="scanner-modal">
                <div className="scanner-header">
                    <h2>Escanear QR</h2>

                    <button className="scanner-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="scanner-body">
                    {error ? (
                        <div className="scanner-error">{error}</div>
                    ) : (
                        <video
                            ref={videoRef}
                            className="scanner-video"
                            autoPlay
                            muted
                            playsInline
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
