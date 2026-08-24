// ============================================================
// AI INFINITE CYBER CITY
// Professional Lightweight UI System
// ============================================================

class UI {

    constructor() {

        this.initialized = false;

        this.callbacks = {};

        this.elements = {};

        this.policeAlertTimer = null;

        this.currentCoins = 0;

    }


    // ========================================================
    // INITIALIZE
    // ========================================================

    initialize() {

        if (this.initialized) {
            return;
        }

        this.cacheElements();

        this.createDynamicElements();

        this.setupButtons();

        this.resetHUD();

        this.hideResultScreens();

        this.hidePause();

        this.hidePoliceAlert();

        this.hideInteraction();

        this.initialized = true;

        console.log("Professional UI initialized.");

    }


    // ========================================================
    // CACHE HTML ELEMENTS
    // ========================================================

    cacheElements() {

        this.elements.canvas =
            document.getElementById("game-canvas");

        this.elements.mainMenu =
            document.getElementById("main-menu");

        this.elements.gameUI =
            document.getElementById("game-ui");

        this.elements.pauseScreen =
            document.getElementById("pause-screen");

        this.elements.resultScreen =
            document.getElementById("result-screen");

        this.elements.missionName =
            document.getElementById("mission-name");

        this.elements.missionObjective =
            document.getElementById("mission-objective");

        this.elements.missionDistance =
            document.getElementById("mission-distance");

        this.elements.missionStatus =
            document.getElementById("mission-status");

        this.elements.health =
            document.getElementById("health");

        this.elements.healthBar =
            document.getElementById("health-bar");

        this.elements.wanted =
            document.getElementById("wanted");

        this.elements.location =
            document.getElementById("location");

        this.elements.coins =
            document.getElementById("coins");

        this.elements.interaction =
            document.getElementById("interaction");

        this.elements.policeAlert =
            document.getElementById("police-alert");

        this.elements.resultTitle =
            document.getElementById("result-title");

        this.elements.resultMessage =
            document.getElementById("result-message");

        this.elements.resultCoins =
            document.getElementById("result-coins");

        this.elements.pauseTitle =
            document.getElementById("pause-title");

    }


    // ========================================================
    // CREATE DYNAMIC ELEMENTS
    // ========================================================

    createDynamicElements() {

        // ----------------------------------------------------
        // COIN DISPLAY
        // ----------------------------------------------------

        if (!this.elements.coins) {

            const coin = document.createElement("div");

            coin.id = "coins";

            coin.innerHTML =
                `<span class="coin-icon">●</span>
                 <strong>0</strong>`;

            document.body.appendChild(coin);

            this.elements.coins = coin;

        }


        // ----------------------------------------------------
        // POLICE ALERT
        // ----------------------------------------------------

        if (!this.elements.policeAlert) {

            const alert = document.createElement("div");

            alert.id = "police-alert";

            alert.innerHTML = `
                <span class="alert-icon">!</span>
                <span class="alert-text">POLICE ALERT</span>
            `;

            document.body.appendChild(alert);

            this.elements.policeAlert = alert;

        }


        // ----------------------------------------------------
        // INTERACTION
        // ----------------------------------------------------

        if (!this.elements.interaction) {

            const interaction = document.createElement("div");

            interaction.id = "interaction";

            interaction.textContent =
                "PRESS E TO INTERACT";

            document.body.appendChild(interaction);

            this.elements.interaction = interaction;

        }


        // ----------------------------------------------------
        // RESULT SCREEN
        // ----------------------------------------------------

        if (!this.elements.resultScreen) {

            const screen =
                document.createElement("div");

            screen.id = "result-screen";

            screen.innerHTML = `

                <div class="result-panel">

                    <div class="result-icon" id="result-icon">
                        ✓
                    </div>

                    <div id="result-title">
                        MISSION COMPLETE
                    </div>

                    <div id="result-message">
                        Mission completed successfully.
                    </div>

                    <div id="result-coins">
                        COINS 0
                    </div>

                    <div class="result-buttons">

                        <button id="restart-button">
                            PLAY AGAIN
                        </button>

                        <button id="menu-button">
                            MAIN MENU
                        </button>

                    </div>

                </div>
            `;

            document.body.appendChild(screen);

            this.elements.resultScreen = screen;

            this.elements.resultTitle =
                document.getElementById("result-title");

            this.elements.resultMessage =
                document.getElementById("result-message");

            this.elements.resultCoins =
                document.getElementById("result-coins");

        }


        // ----------------------------------------------------
        // PAUSE SCREEN
        // ----------------------------------------------------

        if (!this.elements.pauseScreen) {

            const pause =
                document.createElement("div");

            pause.id = "pause-screen";

            pause.innerHTML = `

                <div class="pause-panel">

                    <div class="pause-icon">
                        ||
                    </div>

                    <div id="pause-title">
                        GAME PAUSED
                    </div>

                    <div class="pause-subtitle">
                        Take a break. Your mission is waiting.
                    </div>

                    <button id="resume-button">
                        RESUME MISSION
                    </button>

                    <button id="pause-menu-button">
                        MAIN MENU
                    </button>

                </div>

            `;

            document.body.appendChild(pause);

            this.elements.pauseScreen = pause;

        }


        // ----------------------------------------------------
        // CONTROLS MODAL
        // ----------------------------------------------------

        if (!document.getElementById("controls-modal")) {

            const controls =
                document.createElement("div");

            controls.id = "controls-modal";

            controls.innerHTML = `

                <div class="info-modal-panel">

                    <button class="modal-close"
                            id="controls-close">
                        ×
                    </button>

                    <div class="modal-label">
                        GAME GUIDE
                    </div>

                    <h2>CONTROLS</h2>

                    <p class="modal-description">
                        Use these controls to drive through the city,
                        avoid the police and collect cyber coins.
                    </p>

                    <div class="controls-grid">

                        <div class="control-item">
                            <span class="key">W</span>
                            <span>Move Forward</span>
                        </div>

                        <div class="control-item">
                            <span class="key">S</span>
                            <span>Move Backward</span>
                        </div>

                        <div class="control-item">
                            <span class="key">A</span>
                            <span>Move Left</span>
                        </div>

                        <div class="control-item">
                            <span class="key">D</span>
                            <span>Move Right</span>
                        </div>

                        <div class="control-item">
                            <span class="key wide">SHIFT</span>
                            <span>Boost / Run</span>
                        </div>

                        <div class="control-item">
                            <span class="key">E</span>
                            <span>Interact / Collect</span>
                        </div>

                        <div class="control-item">
                            <span class="key">ESC</span>
                            <span>Pause Game</span>
                        </div>

                        <div class="control-item">
                            <span class="key">MOUSE</span>
                            <span>Look Around</span>
                        </div>

                    </div>

                    <button class="modal-action"
                            id="controls-close-button">
                        BACK TO MENU
                    </button>

                </div>

            `;

            document.body.appendChild(controls);

        }


        // ----------------------------------------------------
        // ABOUT MODAL
        // ----------------------------------------------------

        if (!document.getElementById("about-modal")) {

            const about =
                document.createElement("div");

            about.id = "about-modal";

            about.innerHTML = `

                <div class="info-modal-panel about-panel">

                    <button class="modal-close"
                            id="about-close">
                        ×
                    </button>

                    <div class="modal-label">
                        PROJECT INFORMATION
                    </div>

                    <h2>AI INFINITE CYBER CITY</h2>

                    <p class="about-lead">
                        A lightweight browser-based 3D game
                        developed as a B.Tech CSE final year project.
                    </p>

                    <div class="about-section">

                        <h3>PROJECT CONCEPT</h3>

                        <p>
                            Explore a dynamic cyber city, drive through
                            the streets, collect coins, complete missions
                            and escape police pursuit.
                        </p>

                    </div>

                    <div class="about-section">

                        <h3>TECHNOLOGY</h3>

                        <div class="technology-list">

                            <span>HTML5</span>
                            <span>CSS3</span>
                            <span>JavaScript</span>
                            <span>Three.js</span>

                        </div>

                    </div>

                    <div class="about-section">

                        <h3>PROJECT FEATURES</h3>

                        <ul>

                            <li>3D city environment</li>

                            <li>Player vehicle movement</li>

                            <li>Police pursuit system</li>

                            <li>Mission system</li>

                            <li>Coin collection</li>

                            <li>Health and wanted system</li>

                            <li>Pause and game-over states</li>

                        </ul>

                    </div>

                    <div class="project-badge">
                        B.TECH CSE · FINAL YEAR PROJECT
                    </div>

                    <button class="modal-action"
                            id="about-close-button">
                        BACK TO MENU
                    </button>

                </div>

            `;

            document.body.appendChild(about);

        }

    }


    // ========================================================
    // CALLBACKS
    // ========================================================

    setCallbacks(callbacks = {}) {

        this.callbacks = callbacks || {};

        this.setupButtons();

    }


    // ========================================================
    // BUTTON SETUP
    // ========================================================

    setupButtons() {

        // ----------------------------------------------------
        // START
        // ----------------------------------------------------

        const startButton =
            document.getElementById("start-button");

        if (startButton) {

            startButton.onclick = () => {

                this.hideInfoModals();

                if (
                    typeof this.callbacks.startGame ===
                    "function"
                ) {

                    this.callbacks.startGame();

                }

            };

        }


        // ----------------------------------------------------
        // CONTROLS
        // ----------------------------------------------------

        const controlsButton =
            document.getElementById("controls-button");

        if (controlsButton) {

            controlsButton.onclick = () => {

                this.showControls();

            };

        }


        // ----------------------------------------------------
        // ABOUT
        // ----------------------------------------------------

        const aboutButton =
            document.getElementById("about-button");

        if (aboutButton) {

            aboutButton.onclick = () => {

                this.showAbout();

            };

        }


        // ----------------------------------------------------
        // CONTROLS CLOSE
        // ----------------------------------------------------

        const controlsClose =
            document.getElementById("controls-close");

        if (controlsClose) {

            controlsClose.onclick = () => {

                this.hideControls();

            };

        }


        const controlsCloseButton =
            document.getElementById(
                "controls-close-button"
            );

        if (controlsCloseButton) {

            controlsCloseButton.onclick = () => {

                this.hideControls();

            };

        }


        // ----------------------------------------------------
        // ABOUT CLOSE
        // ----------------------------------------------------

        const aboutClose =
            document.getElementById("about-close");

        if (aboutClose) {

            aboutClose.onclick = () => {

                this.hideAbout();

            };

        }


        const aboutCloseButton =
            document.getElementById(
                "about-close-button"
            );

        if (aboutCloseButton) {

            aboutCloseButton.onclick = () => {

                this.hideAbout();

            };

        }


        // ----------------------------------------------------
        // RESTART
        // ----------------------------------------------------

        const restartButton =
            document.getElementById("restart-button");

        if (restartButton) {

            restartButton.onclick = () => {

                this.hideResultScreens();

                if (
                    typeof this.callbacks.restartGame ===
                    "function"
                ) {

                    this.callbacks.restartGame();

                }

            };

        }


        // ----------------------------------------------------
        // MAIN MENU
        // ----------------------------------------------------

        const menuButton =
            document.getElementById("menu-button");

        if (menuButton) {

            menuButton.onclick = () => {

                this.hideResultScreens();

                if (
                    typeof this.callbacks.mainMenu ===
                    "function"
                ) {

                    this.callbacks.mainMenu();

                }

            };

        }


        // ----------------------------------------------------
        // RESUME
        // ----------------------------------------------------

        const resumeButton =
            document.getElementById("resume-button");

        if (resumeButton) {

            resumeButton.onclick = () => {

                this.hidePause();

                if (
                    typeof this.callbacks.resumeGame ===
                    "function"
                ) {

                    this.callbacks.resumeGame();

                }

            };

        }


        // ----------------------------------------------------
        // PAUSE MENU
        // ----------------------------------------------------

        const pauseMenuButton =
            document.getElementById(
                "pause-menu-button"
            );

        if (pauseMenuButton) {

            pauseMenuButton.onclick = () => {

                this.hidePause();

                if (
                    typeof this.callbacks.mainMenu ===
                    "function"
                ) {

                    this.callbacks.mainMenu();

                }

            };

        }


        // ----------------------------------------------------
        // ESCAPE CLOSES MODALS
        // ----------------------------------------------------

        if (!this.escapeListenerAdded) {

            document.addEventListener(
                "keydown",
                (event) => {

                    if (event.key === "Escape") {

                        if (
                            this.isModalVisible(
                                "controls-modal"
                            )
                        ) {

                            this.hideControls();

                            return;

                        }

                        if (
                            this.isModalVisible(
                                "about-modal"
                            )
                        ) {

                            this.hideAbout();

                            return;

                        }

                    }

                }
            );

            this.escapeListenerAdded = true;

        }

    }


    // ========================================================
    // SHOW CONTROLS
    // ========================================================

    showControls() {

        const modal =
            document.getElementById(
                "controls-modal"
            );

        if (!modal) {
            return;
        }

        modal.style.display = "flex";

        requestAnimationFrame(() => {

            modal.classList.add("modal-visible");

        });

    }


    // ========================================================
    // HIDE CONTROLS
    // ========================================================

    hideControls() {

        const modal =
            document.getElementById(
                "controls-modal"
            );

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "modal-visible"
        );

        setTimeout(() => {

            modal.style.display = "none";

        }, 180);

    }


    // ========================================================
    // SHOW ABOUT
    // ========================================================

    showAbout() {

        const modal =
            document.getElementById(
                "about-modal"
            );

        if (!modal) {
            return;
        }

        modal.style.display = "flex";

        requestAnimationFrame(() => {

            modal.classList.add("modal-visible");

        });

    }


    // ========================================================
    // HIDE ABOUT
    // ========================================================

    hideAbout() {

        const modal =
            document.getElementById(
                "about-modal"
            );

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "modal-visible"
        );

        setTimeout(() => {

            modal.style.display = "none";

        }, 180);

    }


    // ========================================================
    // HIDE ALL MODALS
    // ========================================================

    hideInfoModals() {

        this.hideControls();

        this.hideAbout();

    }


    // ========================================================
    // CHECK MODAL
    // ========================================================

    isModalVisible(id) {

        const element =
            document.getElementById(id);

        return (
            element &&
            element.style.display === "flex"
        );

    }


    // ========================================================
    // SHOW GAME
    // ========================================================

    showGame() {

        this.hideInfoModals();

        if (this.elements.mainMenu) {

            this.elements.mainMenu.style.display =
                "none";

        }

        if (this.elements.gameUI) {

            this.elements.gameUI.style.display =
                "block";

        }

        if (this.elements.canvas) {

            this.elements.canvas.style.display =
                "block";

        }

        document.body.classList.add(
            "game-running"
        );

        this.hideResultScreens();

    }


    // ========================================================
    // SHOW MAIN MENU
    // ========================================================

    showMainMenu() {

        this.hideInfoModals();

        if (this.elements.mainMenu) {

            this.elements.mainMenu.style.display =
                "flex";

        }

        if (this.elements.gameUI) {

            this.elements.gameUI.style.display =
                "none";

        }

        if (this.elements.canvas) {

            this.elements.canvas.style.display =
                "none";

        }

        document.body.classList.remove(
            "game-running"
        );

        this.hidePoliceAlert();

        this.hideInteraction();

        this.hideResultScreens();

        this.hidePause();

    }


    // ========================================================
    // GAME UI
    // ========================================================

    enableGameUI() {

        if (this.elements.gameUI) {

            this.elements.gameUI.style.display =
                "block";

        }

    }


    disableGameUI() {

        if (this.elements.gameUI) {

            this.elements.gameUI.style.display =
                "none";

        }

    }


    // ========================================================
    // MISSION
    // ========================================================

    updateMission(
        name,
        objective,
        distance,
        status
    ) {

        if (this.elements.missionName) {

            this.elements.missionName.textContent =
                name || "Mission";

        }

        if (this.elements.missionObjective) {

            this.elements.missionObjective.textContent =
                objective || "";

        }

        if (this.elements.missionDistance) {

            if (typeof distance === "number") {

                this.elements.missionDistance.textContent =
                    `${Math.round(distance)} m`;

            } else {

                this.elements.missionDistance.textContent =
                    "";

            }

        }

        if (this.elements.missionStatus) {

            this.elements.missionStatus.textContent =
                status || "";

        }

    }


    // ========================================================
    // HEALTH
    // ========================================================

    updateHealth(
        current,
        maximum = 100
    ) {

        const safeMaximum =
            Math.max(
                Number(maximum) || 100,
                1
            );

        const safeCurrent =
            Math.max(
                0,
                Math.min(
                    safeMaximum,
                    Number(current) || 0
                )
            );

        const percentage =
            (safeCurrent / safeMaximum) * 100;

        if (this.elements.health) {

            this.elements.health.textContent =
                `${Math.round(safeCurrent)} / ${safeMaximum}`;

        }

        if (this.elements.healthBar) {

            this.elements.healthBar.style.width =
                `${percentage}%`;

            this.elements.healthBar.style.background =
                percentage <= 25
                    ? "#ef4444"
                    : percentage <= 50
                        ? "#f59e0b"
                        : "#22c55e";

        }

    }


    // ========================================================
    // WANTED
    // ========================================================

    updateWanted(level) {

        if (!this.elements.wanted) {
            return;
        }

        const safeLevel =
            Math.max(
                0,
                Math.min(
                    5,
                    Number(level) || 0
                )
            );

        let stars = "";

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            stars +=
                i < safeLevel
                    ? "★"
                    : "☆";

        }

        this.elements.wanted.textContent =
            stars;

    }


    // ========================================================
    // LOCATION
    // ========================================================

    updateLocation(location) {

        if (this.elements.location) {

            this.elements.location.textContent =
                location || "CENTRAL CITY";

        }

    }


    // ========================================================
    // COINS
    // ========================================================

    updateCoins(amount) {

        const safeAmount =
            Math.max(
                0,
                Number(amount) || 0
            );

        this.currentCoins =
            safeAmount;

        if (!this.elements.coins) {
            return;
        }

        this.elements.coins.innerHTML = `
            <span class="coin-icon">●</span>
            <strong>${safeAmount}</strong>
        `;

    }


    // ========================================================
    // INTERACTION
    // ========================================================

    showInteraction(
        message = "PRESS E TO INTERACT"
    ) {

        if (!this.elements.interaction) {
            return;
        }

        this.elements.interaction.textContent =
            message;

        this.elements.interaction.style.display =
            "flex";

    }


    hideInteraction() {

        if (this.elements.interaction) {

            this.elements.interaction.style.display =
                "none";

        }

    }


    // ========================================================
    // POLICE ALERT
    // ========================================================

    showPoliceAlert(
        message = "POLICE ALERT",
        duration = 4000
    ) {

        if (!this.elements.policeAlert) {
            return;
        }

        if (this.policeAlertTimer) {

            clearTimeout(
                this.policeAlertTimer
            );

        }

        this.elements.policeAlert.innerHTML = `
            <span class="alert-icon">!</span>
            <span>${message}</span>
        `;

        this.elements.policeAlert.style.display =
            "flex";

        this.elements.policeAlert.classList.remove(
            "police-alert-active"
        );

        void this.elements.policeAlert.offsetWidth;

        this.elements.policeAlert.classList.add(
            "police-alert-active"
        );

        this.policeAlertTimer =
            setTimeout(() => {

                this.hidePoliceAlert();

            }, duration);

    }


    // ========================================================
    // HIDE POLICE ALERT
    // ========================================================

    hidePoliceAlert() {

        if (this.policeAlertTimer) {

            clearTimeout(
                this.policeAlertTimer
            );

            this.policeAlertTimer = null;

        }

        if (this.elements.policeAlert) {

            this.elements.policeAlert.style.display =
                "none";

        }

    }


    // ========================================================
    // SUCCESS
    // ========================================================

    showSuccess() {

        this.showResult(
            "MISSION COMPLETE",
            "Cyber data secured successfully. The Cyber District has been breached.",
            true
        );

    }


    // ========================================================
    // GAME OVER
    // ========================================================

    showGameOver(
        message = "Mission failed."
    ) {

        this.showResult(
            "GAME OVER",
            message,
            false
        );

    }


    // ========================================================
    // RESULT
    // ========================================================

    showResult(
        title,
        message,
        success
    ) {

        if (!this.elements.resultScreen) {
            return;
        }

        if (this.elements.resultTitle) {

            this.elements.resultTitle.textContent =
                title;

        }

        if (this.elements.resultMessage) {

            this.elements.resultMessage.textContent =
                message;

        }

        if (this.elements.resultCoins) {

            this.elements.resultCoins.textContent =
                `COINS  ${this.currentCoins}`;

        }

        const icon =
            document.getElementById(
                "result-icon"
            );

        if (icon) {

            icon.textContent =
                success
                    ? "✓"
                    : "×";

        }

        this.elements.resultScreen.dataset.result =
            success
                ? "success"
                : "failed";

        this.elements.resultScreen.style.display =
            "flex";

    }


    // ========================================================
    // HIDE RESULT
    // ========================================================

    hideResultScreens() {

        if (this.elements.resultScreen) {

            this.elements.resultScreen.style.display =
                "none";

        }

    }


    // ========================================================
    // PAUSE
    // ========================================================

    showPause() {

        if (this.elements.pauseScreen) {

            this.elements.pauseScreen.style.display =
                "flex";

        }

    }


    hidePause() {

        if (this.elements.pauseScreen) {

            this.elements.pauseScreen.style.display =
                "none";

        }

    }


    // ========================================================
    // RESET HUD
    // ========================================================

    resetHUD() {

        this.updateHealth(
            100,
            100
        );

        this.updateWanted(0);

        this.updateCoins(0);

        this.updateLocation(
            "CENTRAL CITY"
        );

        this.updateMission(
            "Cyber Data Heist",
            "Drive to the marked location and collect the cyber data.",
            0,
            "Mission ready."
        );

        this.hideInteraction();

        this.hidePoliceAlert();

    }
    // ========================================================
    // SHOW LOADING
    // ========================================================

    showLoading(
        message = "Initializing Cyber District...",
        progress = 0
    ) {

        let loadingScreen =
            document.getElementById(
                "loading-screen"
            );

        // Create loading screen if it does not exist
        if (!loadingScreen) {

            loadingScreen =
                document.createElement("div");

            loadingScreen.id =
                "loading-screen";

            loadingScreen.innerHTML = `

                <div class="loading-container">

                    <div class="loading-title">
                        AI INFINITE CYBER CITY
                    </div>

                    <div
                        id="loading-message"
                        class="loading-message"
                    >
                        Initializing Cyber District...
                    </div>

                    <div class="loading-bar-container">

                        <div
                            id="loading-bar"
                        ></div>

                    </div>

                    <div
                        id="loading-progress"
                    >
                        0%
                    </div>

                </div>

            `;

            document.body.appendChild(
                loadingScreen
            );

        }

        const messageElement =
            document.getElementById(
                "loading-message"
            );

        const progressBar =
            document.getElementById(
                "loading-bar"
            );

        const progressText =
            document.getElementById(
                "loading-progress"
            );

        if (messageElement) {

            messageElement.textContent =
                message;

        }

        const safeProgress =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(progress) || 0
                )
            );

        if (progressBar) {

            progressBar.style.width =
                `${safeProgress}%`;

        }

        if (progressText) {

            progressText.textContent =
                `${Math.round(safeProgress)}%`;

        }

        loadingScreen.style.display =
            "flex";

        loadingScreen.style.opacity =
            "1";

    }


    // ========================================================
    // UPDATE LOADING
    // ========================================================

    updateLoading(
        message = "",
        progress = 0
    ) {

        const loadingScreen =
            document.getElementById(
                "loading-screen"
            );

        if (!loadingScreen) {

            this.showLoading(
                message,
                progress
            );

            return;

        }

        const messageElement =
            document.getElementById(
                "loading-message"
            );

        const progressBar =
            document.getElementById(
                "loading-bar"
            );

        const progressText =
            document.getElementById(
                "loading-progress"
            );

        if (messageElement && message) {

            messageElement.textContent =
                message;

        }

        const safeProgress =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(progress) || 0
                )
            );

        if (progressBar) {

            progressBar.style.width =
                `${safeProgress}%`;

        }

        if (progressText) {

            progressText.textContent =
                `${Math.round(safeProgress)}%`;

        }

    }


    // ========================================================
    // FINISH LOADING
    // ========================================================

    finishLoading() {

        const loadingScreen =
            document.getElementById(
                "loading-screen"
            );

        if (!loadingScreen) {

            return;

        }

        loadingScreen.style.opacity =
            "0";

        loadingScreen.style.pointerEvents =
            "none";

        setTimeout(() => {

            loadingScreen.style.display =
                "none";

        }, 350);

    }

    // ========================================================
    // DESTROY
    // ========================================================

    destroy() {

        if (this.policeAlertTimer) {

            clearTimeout(
                this.policeAlertTimer
            );

        }

        this.elements = {};

        this.callbacks = {};

        this.initialized = false;

    }

}


// ============================================================
// SINGLE INSTANCE
// ============================================================

const ui =
    new UI();


// ============================================================
// AUTO INITIALIZE
// ============================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            ui.initialize();

        }
    );

} else {

    ui.initialize();

}


// ============================================================
// EXPORT
// ============================================================

export default ui;