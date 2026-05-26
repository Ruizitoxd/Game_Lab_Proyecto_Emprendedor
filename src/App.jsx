import IntegrationSection from "./components/IntegrationSection"
import QuestionUploader from "./components/QuestionUploader"
import TeacherQuizModal from "./components/TeacherQuizModal"
import PricingSection from "./components/PricingSection"
import GamesSection from "./components/GamesSection"
import HowItWorks from "./components/HowItWorks"
import GameModal from "./components/GameModal"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import { useState } from "react"

function App() {
    const [selectedGame, setSelectedGame] = useState(null)
    const [quizOpen, setQuizOpen] = useState(false)
    const [demoOpen, setDemoOpen] = useState(false)

    return !demoOpen ? (
        <>
            <Navbar onOpenQuiz={() => setQuizOpen(true)} />

            <Hero />

            <GamesSection onOpenGame={setSelectedGame} />

            <HowItWorks />

            <PricingSection />

            <IntegrationSection />

            <Footer />

            {selectedGame && (
                <GameModal
                    game={selectedGame}
                    onClose={() => setSelectedGame(null)}
                />
            )}

            {quizOpen && (
                <TeacherQuizModal
                    onClose={() => setQuizOpen(false)}
                    openDemo={() => setDemoOpen(true)}
                />
            )}
        </>
    ) : (
        <QuestionUploader
            onClose={() => {
                setQuizOpen(false)
                setDemoOpen(false)
            }}
        />
    )
}

export default App
