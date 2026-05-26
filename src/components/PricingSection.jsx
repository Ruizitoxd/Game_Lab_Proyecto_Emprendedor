export default function PricingSection() {
    return (
        <section id="planes">
            <div className="pricing-header">
                <span className="section-label">Precios</span>

                <h2 className="section-title">
                    Planes simples y transparentes
                </h2>
            </div>

            <div className="pricing-grid">
                <div className="plan-card">
                    <div className="plan-name">GRATIS</div>

                    <div className="plan-price">
                        <span className="plan-amount">0</span>
                    </div>
                </div>

                <div className="plan-card featured">
                    <div className="plan-name">FAMILIA</div>

                    <div className="plan-price">
                        <span className="plan-amount">9</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
