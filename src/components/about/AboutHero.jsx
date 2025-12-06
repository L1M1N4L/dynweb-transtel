import pabxImage from '../../assets/pabxwhite.jpg';

export default function AboutHero() {
    return (
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0 select-none">
                <img
                    src={pabxImage}
                    alt="Modern Office Technology"
                    className="w-full h-full object-cover scale-105" // Slight scale for effect
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in-up">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-gray-200 text-sm font-medium mb-4 uppercase tracking-wider backdrop-blur-sm">
                    Est. 2005
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Connecting <span className="text-white">Global</span> Horizons
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light">
                    For over two decades, Transtel Communications has pioneered resilient telecommunication solutions that empower businesses to thrive in a connected world.
                </p>
            </div>
        </section>
    );
}
