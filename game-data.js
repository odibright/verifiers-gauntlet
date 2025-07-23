// Claim Pools by Difficulty Level
const CLAIM_POOLS = {
  easy: [
    { text: "Cysic builds zkVM-based ASICs to accelerate proof generation.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "Cysic's ASICs are designed for GPU-native execution.", isValid: false, difficulty: "easy", topic: "cysic" },
    { text: "Verifiable AI enables model inference without revealing weights or inputs.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "Proof recursion allows batching of multiple proofs into a single one.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Zero-knowledge proofs reveal part of the underlying data.", isValid: false, difficulty: "easy", topic: "proofs" },
    { text: "SNARKs are always faster than STARKs.", isValid: false, difficulty: "easy", topic: "proofs" },
    { text: "Trusted setups are required for SNARKs.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Cysic targets low-latency proving with hardware acceleration.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "In Computefi, model training happens on-chain.", isValid: false, difficulty: "easy", topic: "computefi" },
    { text: "Cysic supports proving for GPT-3 scale models.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "STARKs require a trusted setup.", isValid: false, difficulty: "easy", topic: "proofs" },
    { text: "Proof systems like SNARKs and STARKs verify computation without re-executing it.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Computefi is a decentralized GPU-sharing marketplace.", isValid: false, difficulty: "easy", topic: "computefi" },
    { text: "Cysic's ASICs improve proof verification speed.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "Verifiable AI requires exposing model weights.", isValid: false, difficulty: "easy", topic: "ai" },
    { text: "Cysic's focus includes real-time proving for AI agents.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "Trusted setups are not needed for STARKs.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "SNARK proofs are generally smaller than STARK proofs.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Cysic developed SP1 as a zero-knowledge virtual machine.", isValid: false, difficulty: "easy", topic: "cysic" },
    { text: "Proof systems can compress multiple computations into one proof.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "ZKPs make model inference verifiable without revealing data.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "GPU-native provers are standard in all proof systems.", isValid: false, difficulty: "easy", topic: "hardware" },
    { text: "Cysic contributes to Computefi by enabling verifiable model inference.", isValid: true, difficulty: "easy", topic: "computefi" },
    { text: "ZKPs can be used to compress large AI model checkpoints.", isValid: false, difficulty: "easy", topic: "ai" },
    { text: "Trusted setup vulnerabilities can compromise SNARK security.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Cysic ASICs are optimized for cryptographic proof acceleration.", isValid: true, difficulty: "easy", topic: "hardware" },
    { text: "STARK proofs are transparent and require no trusted setup.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Computefi does not involve on-chain model verification.", isValid: false, difficulty: "easy", topic: "computefi" },
    { text: "Cysic's ASICs do not support GPU-native execution.", isValid: true, difficulty: "easy", topic: "hardware" },
    { text: "ZKPs can verify computations without revealing inputs.", isValid: true, difficulty: "easy", topic: "proofs" }
  ],
  medium: [
    { text: "Cysic targets low-latency proving with hardware acceleration.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "SP1 is a GPU-native proof system developed by Cysic.", isValid: false, difficulty: "medium", topic: "cysic" },
    { text: "Cysic's zkVM ASICs support arbitrary code execution.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "Trusted setups are required for STARK-based proof systems.", isValid: false, difficulty: "medium", topic: "proofs" },
    { text: "SNARKs are inherently post-quantum secure.", isValid: false, difficulty: "medium", topic: "proofs" },
    { text: "Cysic's focus includes real-time proving for AI agents.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Verifiable inference proves outputs without accessing the model itself.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Proof systems like SNARKs and STARKs are used to verify computation without re-executing it.", isValid: true, difficulty: "medium", topic: "proofs" },
    { text: "Computefi is a decentralized GPU-sharing marketplace.", isValid: false, difficulty: "medium", topic: "computefi" },
    { text: "In Computefi, model training is always performed off-chain.", isValid: false, difficulty: "medium", topic: "computefi" },
    { text: "ZKPs are used in Computefi to verify model predictions on-chain.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "Cysic hardware is optimized for video rendering tasks.", isValid: false, difficulty: "medium", topic: "hardware" },
    { text: "SP1 uses a CPU-native prover optimized for SNARK recursion.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "ZKPs enable privacy-preserving AI computations.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Proof recursion allows efficient batching of proofs.", isValid: true, difficulty: "medium", topic: "proofs" },
    { text: "GPU-native provers are standard in many modern proof systems.", isValid: true, difficulty: "medium", topic: "hardware" },
    { text: "Cysic ASICs contribute to Computefi's GPU marketplace.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "STARKs scale logarithmically with circuit size.", isValid: false, difficulty: "medium", topic: "proofs" },
    { text: "Verifiable AI models can be trained off-chain and verified on-chain.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "ZKPs compress large neural network checkpoints effectively.", isValid: false, difficulty: "medium", topic: "ai" },
    { text: "Trusted setups can be a security risk if compromised.", isValid: true, difficulty: "medium", topic: "proofs" },
    { text: "SP1 is based on SNARK recursion rather than STARKs.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "Computefi model inference happens entirely on-chain.", isValid: false, difficulty: "medium", topic: "computefi" },
    { text: "Cysic zkVM ASICs allow programmable data execution.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "ZKPs reveal the entire computation to the verifier.", isValid: false, difficulty: "medium", topic: "proofs" },
    { text: "GPU acceleration can significantly reduce proof generation time.", isValid: true, difficulty: "medium", topic: "hardware" },
    { text: "Cysic ASICs do not support arbitrary code execution.", isValid: false, difficulty: "medium", topic: "cysic" },
    { text: "STARK proofs are transparent and scalable.", isValid: true, difficulty: "medium", topic: "proofs" },
    { text: "Verifiable AI can prove model predictions without revealing data.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Computefi enables decentralized GPU sharing for AI tasks.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "Cysic ASICs support GPU-native execution.", isValid: false, difficulty: "medium", topic: "hardware" },
    { text: "Proof systems require zero knowledge to function.", isValid: false, difficulty: "medium", topic: "proofs" },
    { text: "Trusted setup ceremonies are critical for SNARK security.", isValid: true, difficulty: "medium", topic: "proofs" },
    { text: "ZKPs allow batch verification of multiple proofs.", isValid: true, difficulty: "medium", topic: "proofs" },
    { text: "SP1 is designed to run on specialized ASIC hardware.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "GPU provers are less energy efficient than CPU provers.", isValid: false, difficulty: "medium", topic: "hardware" },
    { text: "Cysic contributes to Computefi by enabling verifiable proof generation.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "ZKPs guarantee privacy while enabling verification.", isValid: true, difficulty: "medium", topic: "proofs" }
  ],
  hard: [
    { text: "SP1 uses a GPU-native prover optimized for STARK recursion.", isValid: false, difficulty: "hard", topic: "sp1" },
    { text: "STARKs scale logarithmically with circuit size.", isValid: false, difficulty: "hard", topic: "proofs" },
    { text: "Cysic's ASICs optimize recursive SNARK proof generation.", isValid: true, difficulty: "hard", topic: "cysic" },
    { text: "Verifiable AI inference requires zero knowledge of model internals.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "Trusted setups are always required for zero-knowledge proofs.", isValid: false, difficulty: "hard", topic: "proofs" },
    { text: "SP1 is a zero-knowledge virtual machine designed for GPU acceleration.", isValid: false, difficulty: "hard", topic: "sp1" },
    { text: "Cysic's hardware supports real-time proving for AI agents.", isValid: true, difficulty: "hard", topic: "cysic" },
    { text: "ZKPs enable privacy-preserving computations in decentralized AI.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "Recursive proof composition reduces verification time exponentially.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "GPU-native provers increase energy consumption significantly.", isValid: true, difficulty: "hard", topic: "hardware" },
    { text: "SP1 ASICs are optimized for SNARK proof systems.", isValid: true, difficulty: "hard", topic: "sp1" },
    { text: "Cysic's approach enables verifiable multi-agent AI inference.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "STARKs are quantum resistant proof systems.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "Trusted setup ceremonies require multiple trusted parties.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "Cysic hardware cannot run arbitrary code securely.", isValid: false, difficulty: "hard", topic: "hardware" },
    { text: "Verifiable AI proves model outputs without revealing inputs.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "ZKPs require interaction between prover and verifier.", isValid: false, difficulty: "hard", topic: "proofs" },
    { text: "SP1 supports recursive proof composition.", isValid: true, difficulty: "hard", topic: "sp1" },
    { text: "GPU acceleration is crucial for scaling ZK proof generation.", isValid: true, difficulty: "hard", topic: "hardware" },
    { text: "Cysic ASICs use custom silicon optimized for zero-knowledge computations.", isValid: true, difficulty: "hard", topic: "cysic" },
    { text: "Proof size grows linearly with computation complexity in SNARKs.", isValid: false, difficulty: "hard", topic: "proofs" },
    { text: "Verifiable AI requires trusted setup for all proof systems.", isValid: false, difficulty: "hard", topic: "ai" },
    { text: "SP1 is designed to be ASIC-resistant.", isValid: false, difficulty: "hard", topic: "sp1" },
    { text: "ZKPs can batch multiple AI model inferences efficiently.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "Cysic's zkVM ASICs enable programmable data execution.", isValid: true, difficulty: "hard", topic: "cysic" },
    { text: "Trusted setups are not required for STARK proofs.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "GPU provers reduce latency but increase energy use.", isValid: true, difficulty: "hard", topic: "hardware" },
    { text: "Cysic supports training of AI models entirely on-chain.", isValid: false, difficulty: "hard", topic: "ai" },
    { text: "Recursive SNARK proofs enable scalable verification.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "SP1 uses a CPU-native prover optimized for SNARK recursion.", isValid: false, difficulty: "hard", topic: "sp1" },
    { text: "Verifiable AI enables zero-knowledge proof-based model inference.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "Cysic ASICs improve GPU-native proof system performance.", isValid: true, difficulty: "hard", topic: "hardware" },
    { text: "Trusted setup vulnerabilities can compromise SNARK security.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "ZKPs reveal part of the underlying computation to the verifier.", isValid: false, difficulty: "hard", topic: "proofs" },
    { text: "SP1 is optimized for STARK-based proof systems.", isValid: false, difficulty: "hard", topic: "sp1" },
    { text: "Cysic hardware enables verifiable AI model inference.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "GPU-native provers are not widely supported in all proof systems.", isValid: true, difficulty: "hard", topic: "hardware" },
    { text: "Proof recursion enables batching proofs into a single verification.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "Cysic ASICs support real-time AI agent proving.", isValid: true, difficulty: "hard", topic: "cysic" },
    { text: "ZKPs cannot prove computation correctness without interaction.", isValid: false, difficulty: "hard", topic: "proofs" },
    { text: "Verifiable AI does not reveal model internals during inference.", isValid: true, difficulty: "hard", topic: "ai" },
    { text: "SP1 proof system is fully open source and community-driven.", isValid: false, difficulty: "hard", topic: "sp1" },
    { text: "Trusted setup ceremonies are vulnerable if trust assumptions fail.", isValid: true, difficulty: "hard", topic: "proofs" },
    { text: "GPU provers can significantly accelerate proof generation.", isValid: true, difficulty: "hard", topic: "hardware" },
    { text: "Cysic's zkVM ASICs enable programmable data and code execution.", isValid: true, difficulty: "hard", topic: "cysic" },
    { text: "STARK proofs have smaller proof sizes than SNARKs.", isValid: false, difficulty: "hard", topic: "proofs" }
  ]
};

// Game Over Messages
const GAME_OVER_MESSAGES = [
    "Rugged by a fake Halo2 claim! 💀",
    "Your zkVM crashed harder than FTX! 🔥",
    "Even a STARK couldn't save you from that! ⚡",
    "You got snarked by misinformation! 🐍",
    "That claim folded you like Nova! 📁",
    "Your proof verification failed catastrophically! ❌",
    "Even Vitalik would be disappointed! 😢",
    "You trusted a claim without doing DYOR! 🤦",
    "Your streak got rugged by bad intel! 💸",
    "That's what happens when you don't verify! 🚫",
    "Your knowledge got zero-knowledge'd! 🧠",
    "Even a GPU farm couldn't save that performance! 💻",
    "You fell for crypto Twitter misinformation! 🐦",
    "Your circuits are more broken than Terra Luna! 🌙",
    "That claim was faker than a rug pull! 🪤"
];

// Victory Messages by Level
const VICTORY_MESSAGES = {
    easy: "You survived the verifier warm-up. Onward.",
    medium: "You're now a true zk interrogator.",
    hard: "Verifier Supreme. Touch grass?"
};

// Level Configuration
const LEVEL_CONFIG = {
    easy: {
        requiredCorrect: 20,
        maxStrikes: 3,
        timerDuration: 25000
    },
    medium: {
        requiredCorrect: 30,
        maxStrikes: 3,
        timerDuration: 25000
    },
    hard: {
        requiredCorrect: 50,
        maxStrikes: 3,
        timerDuration: 25000
    }
};

// XP Values by difficulty (kept for compatibility)
const XP_VALUES = {
    easy: 10,
    medium: 20,
    hard: 30
};

// Timer durations by difficulty (updated for new system)
const TIMER_DURATIONS = {
    easy: 25000,
    medium: 25000,
    hard: 25000
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLAIM_POOLS, GAME_OVER_MESSAGES, VICTORY_MESSAGES, LEVEL_CONFIG, XP_VALUES, TIMER_DURATIONS };
}