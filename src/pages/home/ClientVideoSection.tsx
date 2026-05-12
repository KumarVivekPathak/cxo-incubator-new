import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useInView } from "../../hooks/useInView";
import RadhikaVideo from "../../assets/radhika-cxo-story.mp4";
import RadhikaImage from "../../assets/radhika.jpeg";

type ClientVideoSectionProps = {
  /** Video URL — MP4 path, YouTube, Vimeo, etc. */
  src?: string;
  /** Optional poster image (used as light prop or wrapper) */
  poster?: string;
  /** Eyebrow text above heading */
  eyebrow?: string;
  /** Main heading */
  heading?: string;
  /** Short paragraph */
  subheading?: string;
  /** Caption below video */
  caption?: string;
};

export default function ClientVideoSection({
  src = RadhikaVideo,
  poster = RadhikaImage,
  eyebrow = "A Word From Radhika Balakrishnan",
  heading = "Why This Program Exists",
  subheading = "In her own words — the conversations she has had with hundreds of senior leaders, and the gap that this program was built to close.",
  caption = "Radhika Balakrishnan · Founder, CXO Incubator",
}: ClientVideoSectionProps) {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.15);
  const [videoRef, videoInView] = useInView<HTMLDivElement>(0.4);
  const playerRef = useRef<ReactPlayer>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  // Auto play/pause based on viewport
  useEffect(() => {
    setIsPlaying(videoInView);
  }, [videoInView]);

  // Show "tap for sound" hint when video starts playing muted
  useEffect(() => {
    if (isPlaying && isMuted) {
      setShowSoundHint(true);
      const timer = setTimeout(() => setShowSoundHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, isMuted]);

  const handleVideoClick = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    console.log("[Video Debug]", {
      src,
      videoInView,
      sectionInView,
      isPlaying,
      isMuted,
      hasError,
      playerRefExists: !!playerRef.current,
    });
  }, [src, videoInView, sectionInView, isPlaying, hasError]);

  return (
    <section
      ref={sectionRef}
      className="bg-cream px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <p
          className={`text-[10px] sm:text-[11px] font-bold tracking-[2.5px] uppercase text-gold mb-3 sm:mb-4 text-center ${fadeUp(
            sectionInView
          )}`}
          style={{ animationDelay: sectionInView ? "80ms" : undefined }}
        >
          {eyebrow}
        </p>

        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-maroon text-center leading-snug mb-4 sm:mb-5 ${fadeUp(
            sectionInView
          )}`}
          style={{ animationDelay: sectionInView ? "180ms" : undefined }}
        >
          {heading}
        </h2>

        <p
          className={`text-sm sm:text-base text-black/75 leading-relaxed text-center max-w-2xl mx-auto mb-10 sm:mb-12 ${fadeUp(
            sectionInView
          )}`}
          style={{ animationDelay: sectionInView ? "280ms" : undefined }}
        >
          {subheading}
        </p>

        <div
          ref={videoRef}
          className={`relative w-full aspect-video bg-maroon rounded-md overflow-hidden shadow-2xl border border-maroon group cursor-pointer
                      ${sectionInView ? "animate-fade-in-scale" : "opacity-0"}`}
          style={{ animationDelay: sectionInView ? "420ms" : undefined }}
          onClick={handleVideoClick}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold z-10" />
          {!hasError ? (
           <video
           src={src}
           poster={poster}
           autoPlay
           muted
           playsInline
           controls
           style={{ width: "100%", height: "100%", objectFit: "cover" }}
           onError={(e) => {
             console.error("Native video error:", e);
             setHasError(true);
           }}
           onPlay={() => setIsPlaying(true)}
           onPause={() => setIsPlaying(false)}
         >
         </video>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <div>
                <p className="text-gold text-xs tracking-[2px] font-bold uppercase mb-2">
                  Video unavailable
                </p>
                <p className="text-white/60 text-sm">
                  The video could not be loaded right now.
                </p>
              </div>
            </div>
          )}

          {!isPlaying && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-maroon/80 backdrop-blur-sm flex items-center justify-center border-2 border-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-maroon">
                <div
                  className="w-0 h-0 ml-2"
                  style={{
                    borderLeft: "20px solid #C49A3C",
                    borderTop: "14px solid transparent",
                    borderBottom: "14px solid transparent",
                  }}
                />
              </div>
            </div>
          )}

         
        </div>

        {caption && (
          <p
            className={`text-[11px] sm:text-xs font-bold tracking-[2px] uppercase text-maroon/70 text-center mt-5 sm:mt-6 ${fadeUp(
              sectionInView
            )}`}
            style={{ animationDelay: sectionInView ? "600ms" : undefined }}
          >
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
