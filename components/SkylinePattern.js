export default function SkylinePattern() {
    return (
        <svg
            className="tr-section__skyline"
            viewBox="0 0 1600 420"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
        >
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
                {/* Distant low skyline, left */}
                <path d="M0 420 L40 420 L40 380 L70 380 L70 420 L110 420 L110 360 L140 360 L140 420 L180 420 L180 390 L210 390 L210 420 L260 420" />
                <path d="M260 420 L260 340 L300 340 L300 420" />
                <path d="M320 420 L320 370 L350 370 L350 400 L380 400 L380 370 L410 370 L410 420" />

                {/* Burj-Khalifa-inspired tapering spire, center-left of main cluster */}
                <path d="M470 420 L470 240 L478 200 L486 160 L494 110 L500 60 L506 110 L514 160 L522 200 L530 240 L530 420" />
                <line x1="500" y1="60" x2="500" y2="20" />

                {/* Mid cluster, twin towers */}
                <path d="M560 420 L560 300 L580 280 L600 300 L600 420" />
                <path d="M620 420 L620 260 L645 260 L645 420" />
                <path d="M665 420 L665 310 L685 310 L685 420" />

                {/* Broad podium block */}
                <path d="M710 420 L710 350 L820 350 L820 420" />
                <line x1="740" y1="350" x2="740" y2="420" />
                <line x1="770" y1="350" x2="770" y2="420" />
                <line x1="800" y1="350" x2="800" y2="420" />

                {/* Tapered twisting tower, right of center */}
                <path d="M850 420 L855 260 L880 230 L905 260 L910 420" />

                {/* Sail-shaped tower (Burj-Al-Arab-inspired) */}
                <path d="M950 420 C950 320 970 240 1010 200 C1040 240 1050 320 1050 420" />

                {/* Right cluster, stepped low-rise */}
                <path d="M1080 420 L1080 380 L1110 380 L1110 340 L1150 340 L1150 420" />
                <path d="M1170 420 L1170 300 L1200 300 L1200 420" />
                <path d="M1220 420 L1220 350 L1245 350 L1245 420" />

                {/* Far right, low distant skyline */}
                <path d="M1280 420 L1280 390 L1310 390 L1310 410 L1340 410 L1340 380 L1370 380 L1370 420 L1420 420" />
                <path d="M1420 420 L1420 360 L1450 360 L1450 420" />
                <path d="M1470 420 L1470 400 L1600 400" />
            </g>

            {/* Ground line */}
            <line x1="0" y1="420" x2="1600" y2="420" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}