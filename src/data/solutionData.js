// solutionData.js - Editorial Image-Rich Version

import hotelImg from '../assets/solutions-assets/hotel.jpg';
import governmentImg from '../assets/solutions-assets/government.jpg';
import schoolImg from '../assets/solutions-assets/school.png';

export const solutionData = {
    "hospitality": {
        id: "hospitality",
        title: "Hotels & Hospitality",
        subtitle: "The Ultimate Guest Experience",
        heroImage: hotelImg,
        overview: "Modern hospitality relies on frictionless communication. Transtel delivers end-to-end infrastructure that seamlessly connects the front desk, back office, and guest rooms. By integrating high-speed GPON fiber networks with intelligent PABX platforms, hotels can offer premium high-bandwidth services while reducing physical cabling up to 80%.",
        architecturalHighlights: [
            {
                title: "GPON: Fiber-to-the-Room (FTTR)",
                description: "Gigabit Passive Optical Network (GPON) replaces traditional copper cabling with fiber optic lines directly to the guest room. This unified network carries IP Voice, high-speed internet (Wi-Fi), and Interactive TV (IPTV) over a single strand of fiber. By pushing optical splitters closer to the edge, GPON drastically reduces infrastructure costs, energy consumption, and maintenance complexity for multi-story hotel deployments.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "PMS Integration via PABX",
                description: "The core of our hospitality solution is the Enterprise PABX (like the VP-3000 or IPX-800), which directly integrates with world-leading Property Management Systems (PMS) such as Oracle Opera. This software-level integration enables automated guest check-in/out, personalized wake-up calls, room status updates from housekeeping, and accurate real-time billing for external calls directly from the guest room IP phone.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "Premium Endpoints",
                description: "The guest experience culminates at the hardware endpoint. We deploy highly customizable IP and Analog telephones specifically designed for hospitality environments. These endpoints feature programmable quick-dial keys for Room Service, Concierge, and Spa access. Furthermore, our waterproof bathroom pull-cord phones ensure guest safety and strict compliance with luxury 5-star hotel rating requirements.",
                image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80"
            }
        ],
        recommendedProducts: ["GPON", "PABX", "Telephone"]
    },
    "healthcare": {
        id: "healthcare",
        title: "Hospitals & Healthcare",
        subtitle: "Mission-Critical Clinical Communication",
        heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80",
        overview: "In healthcare, communication delays compromise patient safety. Transtel bridges the gap between patients and care teams with integrated Nurse Call and telephony systems. Our highly resilient architecture ensures that critical alerts are instantly routed to the correct nursing station, DECT phone, or pager, ensuring rapid response times.",
        architecturalHighlights: [
            {
                title: "Intelligent Nurse Call Systems",
                description: "Our Nurse Call architecture extends beyond simple bedside buttons. It features dedicated patient station units, waterproof bathroom pull cords, and multi-color corridor indicator lights that instantly communicate call priority (Routine vs. Code Blue). Crucially, all system events are logged to a central database with precise timestamps for strict regulatory compliance, staff auditing, and quality assurance.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "PABX Clinical Integration",
                description: "The Nurse Call system is intrinsically linked to the central Transtel PABX via high-speed SIP integration. Alarm events from a patient room can seamlessly trigger automated voice alerts or text messages to roaming healthcare staff on their wireless VoIP endpoints or smartphones. This mobility eliminates the need for nurses to physically return to the static nursing station to check call logs, drastically lowering incident response times.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "Resilient Voice Gateways",
                description: "Hospitals typically operate highly heterogeneous networks with a mix of legacy analog infrastructure (fax machines, elevator phones, legacy paging horns) and modern IP networks. Transtel Voice Gateways intelligently bridge these distinct worlds, ensuring fail-safe connectivity and allowing hospital IT departments to execute phased migrations to full IP without ever disrupting 24/7 patient care.",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
            }
        ],
        recommendedProducts: ["Nurse Call", "PABX", "Voice Gateway"]
    },
    "corporate": {
        id: "corporate",
        title: "Corporate Offices",
        subtitle: "Scalable Enterprise Connectivity",
        heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
        overview: "Modern corporate communication requires agility and reliability. Transtel provides the backbone that powers multi-site enterprises, call centers, and distributed teams through high-capacity unified communication platforms handling thousands of concurrent calls.",
        architecturalHighlights: [
            {
                title: "High-Capacity Enterprise PABX",
                description: "At the core of the corporate network lies the Transtel VP-3000 or IPX series. These are true enterprise-grade softswitches engineered to logically support from hundreds to thousands of SIP extensions across multiple physical sites. They natively provide intelligent inbound call routing, multi-level interactive voice response (IVR), multi-party conferencing bridges, and robust voicemail-to-email integration for a mobile workforce.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "Multi-Channel Voice Loggers",
                description: "For quality assurance, legal compliance, and corporate security, our standalone Voice Loggers invisibly record up to hundreds of simultaneous audio channels. Utilizing massive local storage arrays and secure web-based retrieval portals, department supervisors can quickly search, playback, and export call audio based on specific metadata like caller ID, exact call duration, or date/time windows.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "IP Trunking and Gateway Bridging",
                description: "To significantly slash operational telecom costs, Transtel systems natively support SIP Trunking for inexpensive IP-based international and local routing over the public internet. However, where secure digital ISDN (E1/T1) or traditional copper analog (FXO/FXS) lines are still required by local carriers, our dense Voice Gateways provide raw, reliable hardware connectivity back into the modern IP core.",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
            }
        ],
        recommendedProducts: ["PABX", "Voice Logger", "Voice Gateway"]
    },
    "government": {
        id: "government",
        title: "Government & Public Sector",
        subtitle: "Secure, Hardened Infrastructure",
        heroImage: governmentImg,
        overview: "Government institutions require unmatched security, auditing, and high availability. Transtel designs hardened, redundant communication architectures that operate independently of external cloud services, guaranteeing that internal communications remain strictly confidential and highly available during crises.",
        architecturalHighlights: [
            {
                title: "On-Premise Secure PABX",
                description: "Unlike multi-tenant public cloud VoIP solutions which present vast attack surfaces, Transtel's core voice servers can be deployed fully on-premise within isolated, air-gapped secure networks. With physical hardware redundancies and strict logical access control lists (ACLs) enforced at the switch level, the system inherently protects against remote eavesdropping, data exfiltration, and external denial-of-service (DoS) attacks.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "Auditable Voice Logging",
                description: "Compliance in the public sector is non-negotiable. Our enterprise Voice Loggers passively tap into digital communication trunks and analog lines using high-impedance hardware to prevent detection or physical line interference. Recorded audio is securely compressed and indexed with cryptographic hashes to ensure the resulting data files are immutable and admissible as evidence in legal contexts.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "Massive Campus GPON",
                description: "For sprawling government complexes, research labs, and military bases, GPON is the ideal deployment medium. Fiber optic links offer total physical immunity to electromagnetic interference (EMI) and cannot be easily wiretapped via induction like traditional copper lines. Furthermore, a single central Optical Line Terminal (OLT) can serve thousands of secure endpoints over distances extending up to 20 kilometers with zero signal degradation.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
            }
        ],
        recommendedProducts: ["PABX", "Voice Logger", "GPON"]
    },
    "education": {
        id: "education",
        title: "Education & Schools",
        subtitle: "Campus-Wide Coordination",
        heroImage: schoolImg,
        overview: "Managing an educational campus requires instant, reliable communication that spans from the principal's office to every single classroom. Transtel combines high-capacity telephony with IP paging and lockdown systems to ensure student safety and administrative efficiency.",
        architecturalHighlights: [
            {
                title: "Classroom Intercom & PABX",
                description: "Every individual classroom becomes a fully integrated communication node. Teachers utilize our cost-effective IP or robust Analog phones to quickly dial the front office, request immediate technical support, or handle internal department calls. The central IPX-series PABX manages hundreds of these distributed endpoints with ease, applying strict class-of-service (CoS) routing rules to heavily restrict students or unauthorized users from dialing external PSTN lines.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "Emergency IP Paging Architecture",
                description: "Through advanced SIP integrations, Transtel PABX systems seamlessly interface with third-party campus-wide IP paging horns and automated bell scheduling software. In critical emergency situations, an authorized administrator can pick up any configured endpoint on the network, dial a secure emergency short-code, and instantly broadcast a live lockdown message overriding all standard audio traffic across the entire IP network.",
                image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
            },
            {
                title: "Cost-Effective GPON Backbone",
                description: "Public school districts often suffer from limited IT deployment budgets and vast physical geographic areas. Upgrading antiquated copper infrastructure is prohibitively expensive. GPON utilizes passive optical splitters (which require zero electrical power) to efficiently push fiber networking into every remote building and floor. This single network carries VoIP phones, IP security cameras, and Wi-Fi data over paper-thin fiber strands, drastically cutting capital expenditure budgets.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
            }
        ],
        recommendedProducts: ["PABX", "Telephone", "GPON"]
    }
}
