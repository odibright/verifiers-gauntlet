// Sound System
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.enabled = true;
        this.initializeAudioContext();
        this.createSounds();
    }

    initializeAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Audio not supported in this browser');
        }
    }

    createSounds() {
        // Create different types of sounds using oscillators
        this.sounds = {
            correct: () => this.createTone([523.25, 659.25, 783.99], [0.1, 0.1, 0.2], 'sine', 0.3),
            wrong: () => this.createTone([220, 196], [0.15, 0.25], 'sawtooth', 0.4),
            levelStart: () => this.createTone([440, 554.37, 659.25], [0.1, 0.1, 0.3], 'triangle', 0.3),
            victory: () => this.createTone([523.25, 659.25, 783.99, 1046.5], [0.2, 0.2, 0.2, 0.4], 'sine', 0.5),
            defeat: () => this.createTone([330, 277.18, 246.94], [0.2, 0.2, 0.4], 'sawtooth', 0.3),
            powerUp: () => this.createTone([659.25, 783.99, 987.77, 1318.5], [0.1, 0.1, 0.1, 0.2], 'square', 0.4),
            timerWarning: () => this.createTone([880], [0.1], 'triangle', 0.2),
            tick: () => this.createTone([1000], [0.05], 'sine', 0.1)
        };
    }

    createTone(frequencies, durations, waveType = 'sine', volume = 0.3) {
        if (!this.audioContext || !this.enabled) return;

        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);

        let currentTime = this.audioContext.currentTime;

        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            oscillator.connect(gainNode);
            oscillator.frequency.setValueAtTime(freq, currentTime);
            oscillator.type = waveType;

            const duration = durations[index] || 0.1;
            
            // Smooth attack and release to prevent clicks
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(volume, currentTime + duration - 0.01);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);

            oscillator.start(currentTime);
            oscillator.stop(currentTime + duration);

            currentTime += duration;
        });
    }

    playSound(eventName) {
        if (!this.enabled || !this.audioContext) return;
        
        // Resume audio context if it's suspended (required by some browsers)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const soundFunction = this.sounds[eventName];
        if (soundFunction) {
            soundFunction();
        }
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }
}

// Dark Mode Manager
class ThemeManager {
    constructor() {
        this.isDarkMode = this.loadTheme();
        this.applyTheme();
    }

    loadTheme() {
        const saved = localStorage.getItem('verifierGauntletDarkMode');
        return saved ? JSON.parse(saved) : false;
    }

    saveTheme() {
        localStorage.setItem('verifierGauntletDarkMode', JSON.stringify(this.isDarkMode));
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
}

// Game State
class GameState {
    constructor() {
        this.currentScreen = 'home';
        this.gameActive = false;
        this.currentLevel = null; // 'easy', 'medium', 'hard'
        this.currentClaim = null;
        this.correctCount = 0;
        this.strikeCount = 0;
        this.shuffledClaims = [];
        this.currentClaimIndex = 0;
        this.timerInterval = null;
        this.warningInterval = null;
        this.settings = {
            doubleSpeed: false,
            soundEnabled: true
        };
        this.gameStartTime = 0;
        this.loadSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('verifierGauntletSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    saveSettings() {
        localStorage.setItem('verifierGauntletSettings', JSON.stringify(this.settings));
    }

    shuffleClaims() {
        if (!this.currentLevel) return;
        this.shuffledClaims = [...CLAIM_POOLS[this.currentLevel]].sort(() => Math.random() - 0.5);
        this.currentClaimIndex = 0;
    }

    getNextClaim() {
        if (this.currentClaimIndex >= this.shuffledClaims.length) {
            this.shuffleClaims();
        }
        return this.shuffledClaims[this.currentClaimIndex++];
    }

    getLevelConfig() {
        return LEVEL_CONFIG[this.currentLevel];
    }

    getTimerDuration() {
        const config = this.getLevelConfig();
        let duration = config.timerDuration;
        
        // Apply double speed setting
        if (this.settings.doubleSpeed) {
            duration *= 0.5;
        }
        
        return Math.max(1000, duration);
    }

    resetGame() {
        this.correctCount = 0;
        this.strikeCount = 0;
        this.currentClaimIndex = 0;
        this.gameStartTime = Date.now();
        this.shuffleClaims();
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        if (this.warningInterval) {
            clearInterval(this.warningInterval);
        }
    }

    isGameWon() {
        const config = this.getLevelConfig();
        return this.correctCount >= config.requiredCorrect;
    }

    isGameLost() {
        const config = this.getLevelConfig();
        return this.strikeCount >= config.maxStrikes;
    }
}

// Game Controller
class GameController {
    constructor() {
        this.state = new GameState();
        this.soundManager = new SoundManager();
        this.themeManager = new ThemeManager();
        this.initializeEventListeners();
        this.updateUI();
        this.loadLeaderboard();
    }

    playSound(eventName) {
        if (this.state.settings.soundEnabled) {
            this.soundManager.playSound(eventName);
        }
    }

    initializeEventListeners() {
        // Navigation buttons
        document.getElementById('start-btn').addEventListener('click', () => this.showScreen('level-select'));
        document.getElementById('tutorial-btn').addEventListener('click', () => this.showScreen('tutorial'));
        document.getElementById('leaderboard-btn').addEventListener('click', () => this.showScreen('leaderboard'));
        document.getElementById('settings-btn').addEventListener('click', () => this.showScreen('settings'));

        // Back buttons
        document.getElementById('back-from-tutorial').addEventListener('click', () => this.showScreen('home'));
        document.getElementById('back-from-settings').addEventListener('click', () => this.showScreen('home'));
        document.getElementById('back-from-leaderboard').addEventListener('click', () => this.showScreen('home'));
        document.getElementById('back-from-level-select').addEventListener('click', () => this.showScreen('home'));

        // Level selection
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = card.dataset.level;
                this.startGame(level);
            });
        });

        // Game buttons
        document.getElementById('valid-btn').addEventListener('click', () => this.answerClaim(true));
        document.getElementById('invalid-btn').addEventListener('click', () => this.answerClaim(false));

        // Victory screen buttons
        document.getElementById('retry-level-btn').addEventListener('click', () => this.startGame(this.state.currentLevel));
        document.getElementById('next-level-btn').addEventListener('click', () => this.nextLevel());
        document.getElementById('choose-level-btn').addEventListener('click', () => this.showScreen('level-select'));
        document.getElementById('share-victory-btn').addEventListener('click', () => this.shareScore(true));
        document.getElementById('victory-home-btn').addEventListener('click', () => this.showScreen('home'));

        // Game over buttons
        document.getElementById('retry-level-game-over-btn').addEventListener('click', () => this.startGame(this.state.currentLevel));
        document.getElementById('choose-level-game-over-btn').addEventListener('click', () => this.showScreen('level-select'));
        document.getElementById('share-defeat-btn').addEventListener('click', () => this.shareScore(false));
        document.getElementById('home-btn').addEventListener('click', () => this.showScreen('home'));

        // Settings
        document.getElementById('double-speed-toggle').addEventListener('change', (e) => {
            this.state.settings.doubleSpeed = e.target.checked;
            this.state.saveSettings();
        });

        document.getElementById('sound-toggle').addEventListener('change', (e) => {
            this.state.settings.soundEnabled = e.target.checked;
            this.soundManager.setEnabled(e.target.checked);
            this.state.saveSettings();
            
            // Play test sound when enabling
            if (e.target.checked) {
                this.playSound('correct');
            }
        });

        document.getElementById('dark-mode-toggle').addEventListener('change', (e) => {
            this.themeManager.toggleTheme();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.state.currentScreen === 'game' && this.state.gameActive) {
                if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                    this.answerClaim(false);
                } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                    this.answerClaim(true);
                }
            }
        });
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.state.currentScreen = screenName;

        // Update UI based on screen
        if (screenName === 'settings') {
            this.updateSettingsScreen();
        } else if (screenName === 'leaderboard') {
            this.updateLeaderboardScreen();
        }
    }

    updateSettingsScreen() {
        document.getElementById('double-speed-toggle').checked = this.state.settings.doubleSpeed;
        document.getElementById('sound-toggle').checked = this.state.settings.soundEnabled;
        document.getElementById('dark-mode-toggle').checked = this.themeManager.isDarkMode;
    }

    startGame(level) {
        this.state.currentLevel = level;
        this.state.resetGame();
        this.state.gameActive = true;
        this.showScreen('game');
        this.updateUI();
        this.playSound('levelStart');
        this.nextQuestion();
    }

    nextLevel() {
        const levels = ['easy', 'medium', 'hard'];
        const currentIndex = levels.indexOf(this.state.currentLevel);
        if (currentIndex < levels.length - 1) {
            const nextLevel = levels[currentIndex + 1];
            this.startGame(nextLevel);
        } else {
            // Already at hardest level
            this.showScreen('level-select');
        }
    }

    nextQuestion() {
        if (!this.state.gameActive) return;

        this.state.currentClaim = this.state.getNextClaim();
        this.updateGameDisplay();
        this.startTimer();
    }

    updateGameDisplay() {
        const claimText = document.getElementById('claim-text');
        const bossContainer = document.getElementById('boss-claims');
        
        claimText.classList.remove('hidden');
        bossContainer.classList.add('hidden');
        claimText.textContent = this.state.currentClaim.text;
        
        this.updateUI();
    }

    startTimer() {
        const duration = this.state.getTimerDuration();
        
        const timerBar = document.getElementById('timer-bar');
        const startTime = Date.now();
        let warningStarted = false;
        
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
        }
        if (this.state.warningInterval) {
            clearInterval(this.state.warningInterval);
        }
        
        this.state.timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);
            const percentage = (remaining / duration) * 100;
            
            timerBar.style.width = `${percentage}%`;
            
            // Change color as time runs out
            if (percentage < 25) {
                timerBar.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
                
                // Start warning sounds when less than 3 seconds remain
                if (!warningStarted && remaining <= 3000) {
                    warningStarted = true;
                    this.playSound('timerWarning');
                    
                    // Play tick sound every second for last 3 seconds
                    this.state.warningInterval = setInterval(() => {
                        if (this.state.gameActive) {
                            this.playSound('tick');
                        }
                    }, 1000);
                }
            } else if (percentage < 50) {
                timerBar.style.background = 'linear-gradient(45deg, #ff9800, #f57c00)';
            } else {
                timerBar.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            }
            
            if (remaining <= 0) {
                clearInterval(this.state.timerInterval);
                if (this.state.warningInterval) {
                    clearInterval(this.state.warningInterval);
                }
                this.timeUp();
            }
        }, 50);
    }

    timeUp() {
        this.showFeedback('⏰ Time\'s up!', false);
        this.handleIncorrectAnswer();
    }

    answerClaim(userAnswer) {
        if (!this.state.gameActive || this.state.timerInterval === null) return;
        
        clearInterval(this.state.timerInterval);
        if (this.state.warningInterval) {
            clearInterval(this.state.warningInterval);
        }
        
        const isCorrect = userAnswer === this.state.currentClaim.isValid;
        
        // Play sound effect
        this.playSound(isCorrect ? 'correct' : 'wrong');
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
        
        this.showFeedback(
            isCorrect ? '✅ Correct!' : '❌ Wrong!',
            isCorrect
        );
    }

    handleCorrectAnswer() {
        this.state.correctCount++;
        
        // Check for victory
        if (this.state.isGameWon()) {
            setTimeout(() => this.victory(), 1500);
        } else {
            setTimeout(() => this.nextQuestion(), 1500);
        }
    }

    handleIncorrectAnswer() {
        this.state.strikeCount++;
        
        // Check for game over
        if (this.state.isGameLost()) {
            setTimeout(() => this.gameOver(), 1500);
        } else {
            setTimeout(() => this.nextQuestion(), 1500);
        }
    }

    showFeedback(message, isCorrect, explanation = '') {
        const feedback = document.getElementById('feedback');
        const feedbackText = document.getElementById('feedback-text');
        
        let fullMessage = message;
        if (explanation) {
            fullMessage += `\n\n${explanation}`;
        }
        
        feedbackText.textContent = fullMessage;
        feedback.style.background = isCorrect ? 
            'rgba(76, 175, 80, 0.9)' : 
            'rgba(244, 67, 54, 0.9)';
        
        feedback.classList.remove('hidden');
        
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 1400);
    }

    updateUI() {
        if (this.state.currentLevel) {
            const config = this.state.getLevelConfig();
            
            // Update game stats
            document.getElementById('correct-count').textContent = this.state.correctCount;
            document.getElementById('required-count').textContent = config.requiredCorrect;
            document.getElementById('current-level').textContent = 
                this.state.currentLevel.charAt(0).toUpperCase() + this.state.currentLevel.slice(1);
            
            // Update strike display
            const strikesRemaining = config.maxStrikes - this.state.strikeCount;
            let strikeDisplay = '';
            for (let i = 0; i < strikesRemaining; i++) {
                strikeDisplay += '❤️';
            }
            for (let i = 0; i < this.state.strikeCount; i++) {
                strikeDisplay += '💔';
            }
            document.getElementById('strike-display').textContent = strikeDisplay;
        }
    }

    victory() {
        this.state.gameActive = false;
        clearInterval(this.state.timerInterval);
        if (this.state.warningInterval) {
            clearInterval(this.state.warningInterval);
        }
        
        // Play victory sound
        this.playSound('victory');
        
        // Save score to leaderboard
        this.saveScore(true);
        
        // Show victory screen
        document.getElementById('victory-message').textContent = VICTORY_MESSAGES[this.state.currentLevel];
        document.getElementById('victory-level').textContent = 
            this.state.currentLevel.charAt(0).toUpperCase() + this.state.currentLevel.slice(1);
        document.getElementById('victory-correct').textContent = this.state.correctCount;
        
        // Show/hide next level button
        const nextLevelBtn = document.getElementById('next-level-btn');
        const levels = ['easy', 'medium', 'hard'];
        const currentIndex = levels.indexOf(this.state.currentLevel);
        if (currentIndex < levels.length - 1) {
            nextLevelBtn.classList.remove('hidden');
            nextLevelBtn.textContent = `⬆️ Try ${levels[currentIndex + 1].charAt(0).toUpperCase() + levels[currentIndex + 1].slice(1)}`;
        } else {
            nextLevelBtn.classList.add('hidden');
        }
        
        this.showScreen('victory');
    }

    gameOver() {
        this.state.gameActive = false;
        clearInterval(this.state.timerInterval);
        if (this.state.warningInterval) {
            clearInterval(this.state.warningInterval);
        }
        
        // Play defeat sound
        this.playSound('defeat');
        
        // Save score to leaderboard
        this.saveScore(false);
        
        // Show game over screen
        document.getElementById('final-correct').textContent = this.state.correctCount;
        
        // Random game over message
        const randomMessage = GAME_OVER_MESSAGES[Math.floor(Math.random() * GAME_OVER_MESSAGES.length)];
        document.getElementById('game-over-message').textContent = randomMessage;
        
        this.showScreen('game-over');
    }

    saveScore(isVictory) {
        const leaderboard = this.loadLeaderboard();
        const gameTime = Date.now() - this.state.gameStartTime;
        
        const newEntry = {
            level: this.state.currentLevel,
            correctCount: this.state.correctCount,
            strikeCount: this.state.strikeCount,
            isVictory: isVictory,
            gameTime: gameTime,
            date: new Date().toISOString()
        };
        
        leaderboard.push(newEntry);
        leaderboard.sort((a, b) => {
            // Sort by victory first, then by level difficulty, then by correct count
            if (a.isVictory !== b.isVictory) return b.isVictory - a.isVictory;
            
            const levelOrder = { hard: 3, medium: 2, easy: 1 };
            if (levelOrder[a.level] !== levelOrder[b.level]) {
                return levelOrder[b.level] - levelOrder[a.level];
            }
            
            return b.correctCount - a.correctCount;
        });
        leaderboard.splice(10); // Keep only top 10
        
        localStorage.setItem('verifierGauntletLeaderboard', JSON.stringify(leaderboard));
    }

    loadLeaderboard() {
        const saved = localStorage.getItem('verifierGauntletLeaderboard');
        return saved ? JSON.parse(saved) : [];
    }

    updateLeaderboardScreen() {
        const leaderboard = this.loadLeaderboard();
        const container = document.getElementById('leaderboard-content');
        
        if (leaderboard.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666;">No scores yet. Be the first to play!</p>';
            return;
        }
        
        container.innerHTML = leaderboard.map((entry, index) => `
            <div class="leaderboard-entry">
                <div>
                    <span class="leaderboard-rank">#${index + 1}</span>
                    <span style="margin-left: 1rem;">
                        ${entry.level.charAt(0).toUpperCase() + entry.level.slice(1)} • 
                        ${entry.correctCount} correct • 
                        ${entry.strikeCount} strikes
                        ${entry.isVictory ? ' 🏆' : ' 💀'}
                    </span>
                </div>
                <div class="leaderboard-score">
                    ${entry.isVictory ? 'Victory!' : 'Defeated'}
                </div>
            </div>
        `).join('');
    }

    shareScore(isVictory) {
        const level = this.state.currentLevel.charAt(0).toUpperCase() + this.state.currentLevel.slice(1);
        const config = this.state.getLevelConfig();
        
        let shareText;
        let hashtags = 'computefi,zeroknowledge';
        
        if (isVictory) {
            shareText = `🎉 I just conquered ${level} level in Verifier's Gauntlet! ⚡\n\n` +
                       `✅ ${this.state.correctCount}/${config.requiredCorrect} correct answers\n` +
                       `💔 ${this.state.strikeCount}/${config.maxStrikes} strikes used\n\n` +
                       `Think you can verify better than me? 🤔\n\n` +
                       `Play at: ${window.location.href}\n\n` +
                       `#${hashtags.replace(/,/g, ' #')}`;
        } else {
            shareText = `💀 I got rugged in ${level} level of Verifier's Gauntlet! \n\n` +
                        `A cysic community game where you verify zk claims or get rugged tryin. \n\n` +
                       `✅ ${this.state.correctCount}/${config.requiredCorrect} correct answers\n` +
                       `💔 Used all ${config.maxStrikes} strikes\n\n` +
                       `Can you do better? 🔥\n\n` +
                       `Play at: ${window.location.href}\n\n` +
                       `#${hashtags.replace(/,/g, ' #')}`;
        }

        // Create Twitter/X share URL
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        
        // Open Twitter share dialog
        window.open(twitterUrl, '_blank', 'width=550,height=420,scrollbars=yes,resizable=yes');
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new GameController();
    
    // Make game globally accessible for debugging
    window.game = game;
});