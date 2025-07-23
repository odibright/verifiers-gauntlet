// Claim Pools by Difficulty Level
const CLAIM_POOLS = {
  easy: [
    { text: "Cysic builds zkVM-based ASICs to accelerate proof generation.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "Cysic's ASICs are designed for GPU-native execution.", isValid: false, difficulty: "easy", topic: "cysic" },
    { text: "Verifiable AI enables model inference without revealing weights or inputs.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "Proof recursion allows batching of multiple proofs into a single one.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Zero-knowledge proofs reveal part of the underlying data.", isValid: false, difficulty: "easy", topic: "proofs" },
    { text: "Cysic targets low-latency proving with hardware acceleration.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "In Computefi, model training happens on-chain.", isValid: false, difficulty: "easy", topic: "computefi" },
    { text: "Cysic supports proving for GPT-3 scale models.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "Proof systems like SNARKs and STARKs verify computation without re-executing it.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Computefi is a decentralized GPU-sharing marketplace.", isValid: false, difficulty: "easy", topic: "computefi" },
    { text: "Cysic's ASICs improve proof verification speed.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "Verifiable AI requires exposing model weights.", isValid: false, difficulty: "easy", topic: "ai" },
    { text: "Cysic's focus includes real-time proving for AI agents.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "Trusted setups are not needed for STARKs.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Cysic developed SP1 as a zero-knowledge virtual machine.", isValid: false, difficulty: "easy", topic: "cysic" },
    { text: "Proof systems can compress multiple computations into one proof.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "ZKPs make model inference verifiable without revealing data.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "GPU-native provers are standard in all proof systems.", isValid: false, difficulty: "easy", topic: "hardware" },
    { text: "Cysic contributes to Computefi by enabling verifiable model inference.", isValid: true, difficulty: "easy", topic: "computefi" },
    { text: "ZKPs can be used to compress large AI model checkpoints.", isValid: false, difficulty: "easy", topic: "ai" },
    { text: "Trusted setup vulnerabilities can compromise SNARK security.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Cysic ASICs are optimized for cryptographic proof acceleration.", isValid: true, difficulty: "easy", topic: "hardware" },
    { text: "Computefi does not involve on-chain model verification.", isValid: false, difficulty: "easy", topic: "computefi" },
    { text: "Cysic's ASICs do not support GPU-native execution.", isValid: true, difficulty: "easy", topic: "hardware" },
    { text: "ZKPs can verify computations without revealing inputs.", isValid: true, difficulty: "easy", topic: "proofs" },
    { text: "Cysic’s hardware architecture is specialized for zero-knowledge proof computations.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "Computefi integrates on-chain incentives for GPU resource providers.", isValid: true, difficulty: "easy", topic: "computefi" },
    { text: "Verifiable AI on Cysic ensures privacy-preserving inference without exposing model internals.", isValid: true, difficulty: "easy", topic: "ai" },
    { text: "Cysic’s platform supports programmable data to optimize proof generation workflows.", isValid: true, difficulty: "easy", topic: "cysic" },
    { text: "Cysic's ASICs accelerate both proof generation and verification processes.", isValid: true, difficulty: "easy", topic: "cysic" }
],
  medium: [
    { text: "Cysic targets low-latency proving with hardware acceleration.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "Cysic's zkVM can run on consumer laptops without performance issues.", isValid: false, difficulty: "medium", topic: "zkvm" },
    { text: "Cysic is building ASICs specifically optimized for zero-knowledge proofs.", isValid: true, difficulty: "medium", topic: "hardware" },
    { text: "AI model verification is impossible without revealing the model weights.", isValid: false, difficulty: "medium", topic: "ai" },
    { text: "Cysic aims to support GPU and ASIC provers across the same zkVM interface.", isValid: true, difficulty: "medium", topic: "zkvm" },
    { text: "Verifiable AI lets you prove an ML model ran correctly without seeing the data.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Computefi is a new layer for verifiable compute built by Cysic.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "Cysic's proof system eliminates the need for any cryptographic assumptions.", isValid: false, difficulty: "medium", topic: "cysic" },
    { text: "Zero-knowledge proofs can be used to verify AI inferences on-chain.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Cysic ASICs are open-source and can be modified by the public.", isValid: false, difficulty: "medium", topic: "hardware" },
    { text: "Computefi enables decentralized access to high-performance provers.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "The Cysic zkVM supports only arithmetic circuits and nothing else.", isValid: false, difficulty: "medium", topic: "zkvm" },
    { text: "Cysic contributes to the SP1 prover ecosystem.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "Running proofs on GPUs offers zero speed-up over CPUs.", isValid: false, difficulty: "medium", topic: "hardware" },
    { text: "AI verification via zk-proofs requires exposing private training data.", isValid: false, difficulty: "medium", topic: "ai" },
    { text: "Cysic integrates with zkVM projects like Risc Zero and SP1.", isValid: true, difficulty: "medium", topic: "zkvm" },
    { text: "Hardware acceleration is irrelevant for improving proof generation speed.", isValid: false, difficulty: "medium", topic: "hardware" },
    { text: "Cysic’s zkVM is built with performance and composability in mind.", isValid: true, difficulty: "medium", topic: "zkvm" },
    { text: "Computefi cannot be used for batching or parallelizing AI inference proofs.", isValid: false, difficulty: "medium", topic: "computefi" },
    { text: "Cysic ASICs are specifically optimized for zkSNARKs and zkSTARKs.", isValid: false, difficulty: "medium", topic: "hardware" },
    { text: "The goal of Computefi is to commoditize cryptographic compute.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "Cysic works on making zero-knowledge proofs both cheaper and faster.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "Every Cysic prover requires a trusted setup ceremony.", isValid: false, difficulty: "medium", topic: "cysic" },
    { text: "Verifiable AI will be a critical component in regulatory AI audits.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Cysic hardware can accelerate both general-purpose compute and proof generation.", isValid: true, difficulty: "medium", topic: "hardware" },
    { text: "zkVMs help make provers more hardware-independent.", isValid: true, difficulty: "medium", topic: "zkvm" },
    { text: "Cysic was founded to compete with ChatGPT in language modeling.", isValid: false, difficulty: "medium", topic: "ai" },
    { text: "The Cysic stack is designed to plug into existing ZK toolchains.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "Verifiable AI can reduce hallucination risks in LLM-based workflows.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Cysic zkVMs cannot verify computations from deep learning models.", isValid: false, difficulty: "medium", topic: "zkvm" },
    { text: "Computefi is unrelated to Cysic and built by a separate team.", isValid: false, difficulty: "medium", topic: "computefi" },
    { text: "Cysic aims to lower the cost barrier for provable machine learning.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Cysic uses zk-proofs to verify video game frame rendering in real-time.", isValid: false, difficulty: "medium", topic: "cysic" },
    { text: "Computefi provides scalable zk compute for developers and researchers.", isValid: true, difficulty: "medium", topic: "computefi" },
    { text: "Cysic’s hardware designs are optimized for proving matrix multiplications efficiently.", isValid: true, difficulty: "medium", topic: "hardware" },
    { text: "The Cysic zkVM can only handle Ethereum smart contracts.", isValid: false, difficulty: "medium", topic: "zkvm" },
    { text: "Verifiable AI can prove that a large language model output a specific response.", isValid: true, difficulty: "medium", topic: "ai" },
    { text: "Cysic is working to bridge the gap between cryptography and real-time AI systems.", isValid: true, difficulty: "medium", topic: "cysic" },
    { text: "AI models cannot be deployed within zero-knowledge environments.", isValid: false, difficulty: "medium", topic: "ai" },
    { text: "Cysic's zkVM supports real-world workloads beyond simple arithmetic circuits.", isValid: true, difficulty: "medium", topic: "zkvm" }
],
  hard: [
  { text: "SP1 uses a GPU-native prover optimized for STARK recursion.", isValid: false, difficulty: "hard", topic: "sp1" },
  { text: "Cysic's ASICs optimize recursive zero-knowledge proof generation.", isValid: true, difficulty: "hard", topic: "cysic" }, // replaced from STARK scale
  { text: "Cysic's ASICs optimize recursive SNARK proof generation.", isValid: true, difficulty: "hard", topic: "cysic" }, // original SP1 allowed here, keep
  { text: "Verifiable AI inference requires zero knowledge of model internals.", isValid: true, difficulty: "hard", topic: "ai" },
  { text: "Trusted setups are always required for zero-knowledge proofs.", isValid: false, difficulty: "hard", topic: "proofs" },
  { text: "SP1 is a zero-knowledge virtual machine designed for GPU acceleration.", isValid: false, difficulty: "hard", topic: "sp1" },
  { text: "Cysic's hardware supports real-time proving for AI agents.", isValid: true, difficulty: "hard", topic: "cysic" },
  { text: "ZKPs enable privacy-preserving computations in decentralized AI.", isValid: true, difficulty: "hard", topic: "ai" },
  { text: "Recursive proof composition reduces verification time exponentially.", isValid: true, difficulty: "hard", topic: "proofs" },
  { text: "GPU-native provers increase energy consumption significantly.", isValid: true, difficulty: "hard", topic: "hardware" },
  { text: "SP1 ASICs are optimized for SNARK proof systems.", isValid: true, difficulty: "hard", topic: "sp1" },
  { text: "Cysic's approach enables verifiable multi-agent AI inference.", isValid: true, difficulty: "hard", topic: "ai" },
  { text: "Zero-knowledge proofs improve trustworthiness of AI model outputs.", isValid: true, difficulty: "hard", topic: "ai" }, // replaced STARK quantum resistant
  { text: "Trusted setup ceremonies require multiple trusted parties.", isValid: true, difficulty: "hard", topic: "proofs" },
  { text: "Cysic hardware cannot run arbitrary code securely.", isValid: false, difficulty: "hard", topic: "hardware" },
  { text: "Verifiable AI proves model outputs without revealing inputs.", isValid: true, difficulty: "hard", topic: "ai" },
  { text: "ZKPs require interaction between prover and verifier.", isValid: false, difficulty: "hard", topic: "proofs" },
  { text: "SP1 supports recursive proof composition.", isValid: true, difficulty: "hard", topic: "sp1" },
  { text: "GPU acceleration is crucial for scaling ZK proof generation.", isValid: true, difficulty: "hard", topic: "hardware" },
  { text: "Cysic ASICs use custom silicon optimized for zero-knowledge computations.", isValid: true, difficulty: "hard", topic: "cysic" },
  { text: "Proof sizes in Cysic's ASIC-accelerated systems scale sublinearly.", isValid: false, difficulty: "hard", topic: "proofs" }, // replaced SNARK linear
  { text: "Verifiable AI requires trusted setup for all proof systems.", isValid: false, difficulty: "hard", topic: "ai" },
  { text: "SP1 is designed to be ASIC-resistant.", isValid: false, difficulty: "hard", topic: "sp1" },
  { text: "ZKPs can batch multiple AI model inferences efficiently.", isValid: true, difficulty: "hard", topic: "ai" },
  { text: "Cysic's zkVM ASICs enable programmable data execution.", isValid: true, difficulty: "hard", topic: "cysic" },
  { text: "Trusted setups are not required for transparent zero-knowledge proofs.", isValid: true, difficulty: "hard", topic: "proofs" }, // replaced STARKs not required
  { text: "GPU provers reduce latency but increase energy use.", isValid: true, difficulty: "hard", topic: "hardware" },
  { text: "Cysic supports training of AI models entirely on-chain.", isValid: false, difficulty: "hard", topic: "ai" },
  { text: "Recursive proofs enable scalable verification of complex AI computations.", isValid: true, difficulty: "hard", topic: "proofs" }, // replaced SNARK recursion
  { text: "SP1 uses a CPU-native prover optimized for SNARK recursion.", isValid: false, difficulty: "hard", topic: "sp1" },
  { text: "Verifiable AI enables zero-knowledge proof-based model inference.", isValid: true, difficulty: "hard", topic: "ai" },
  { text: "Cysic ASICs improve GPU-native proof system performance.", isValid: true, difficulty: "hard", topic: "hardware" },
  { text: "Trusted setup vulnerabilities can compromise zero-knowledge proof security.", isValid: true, difficulty: "hard", topic: "proofs" }, // replaced SNARK security
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
  { text: "Proof sizes of recursive zero-knowledge proofs remain small.", isValid: false, difficulty: "hard", topic: "proofs" } // replaced STARK smaller proof sizes
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