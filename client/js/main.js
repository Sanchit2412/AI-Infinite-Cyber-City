// =========================================================
// AI INFINITE CYBER CITY
// Lightweight Edition
// Application Entry Point
// =========================================================

import game from "./game.js";

import ui from "./ui.js";


// =========================================================
// APPLICATION
// =========================================================

class Application {

    constructor() {

        this.initialized =
            false;

        this.lastTime =
            0;

        this.animationFrame =
            null;

        this.boundLoop =
            (time) => this.loop(time);

    }


    // =====================================================
    // INITIALIZE
    // =====================================================

    initialize() {

        if (
            this.initialized
        ) {

            return;

        }


        console.log(
            "================================="
        );

        console.log(
            "AI INFINITE CYBER CITY"
        );

        console.log(
            "Lightweight Edition"
        );

        console.log(
            "Initializing..."
        );

        console.log(
            "================================="
        );


        try {

            // -------------------------------------------------
            // Initialize game
            // -------------------------------------------------

            game.initialize();


            // -------------------------------------------------
            // Show loading screen
            // -------------------------------------------------

            ui.showLoading();


            // -------------------------------------------------
            // Start lightweight loading sequence
            // -------------------------------------------------

            this.runLoading();


            // -------------------------------------------------
            // Start application loop
            // -------------------------------------------------

            this.initialized =
                true;


            this.lastTime =
                performance.now();


            this.animationFrame =
                requestAnimationFrame(
                    this.boundLoop
                );


            console.log(
                "Application initialized successfully."
            );

        }

        catch (error) {

            console.error(
                "Game initialization failed:",
                error
            );


            this.showError(
                error
            );

        }

    }


    // =====================================================
    // LOADING
    // =====================================================

    runLoading() {

        let progress =
            0;


        const loadingSteps = [

            10,

            25,

            40,

            55,

            70,

            85,

            100

        ];


        let step =
            0;


        const loadNext =
            () => {

                if (
                    step >=
                    loadingSteps.length
                ) {

                    ui.finishLoading();

                    return;

                }


                progress =
                    loadingSteps[
                        step
                    ];


                ui.updateLoading(
                    progress
                );


                step++;


                setTimeout(
                    loadNext,
                    100
                );

            };


        loadNext();

    }


    // =====================================================
    // MAIN LOOP
    // =====================================================

    loop(
        currentTime
    ) {

        if (
            !this.initialized
        ) {

            return;

        }


        // -------------------------------------------------
        // Calculate delta time
        // -------------------------------------------------

        let deltaTime =
            (
                currentTime -
                this.lastTime
            ) / 1000;


        this.lastTime =
            currentTime;


        // -------------------------------------------------
        // Prevent huge time jumps
        // -------------------------------------------------

        deltaTime =
            Math.min(
                Math.max(
                    deltaTime,
                    0
                ),
                0.05
            );


        // -------------------------------------------------
        // Update game
        // -------------------------------------------------

        if (
            game.isRunning() &&
            !game.isPaused()
        ) {

            game.update(
                deltaTime
            );

        }


        // -------------------------------------------------
        // Render continuously
        // -------------------------------------------------

        game.render();


        // -------------------------------------------------
        // Continue loop
        // -------------------------------------------------

        this.animationFrame =
            requestAnimationFrame(
                this.boundLoop
            );

    }


    // =====================================================
    // SHOW ERROR
    // =====================================================

    showError(
        error
    ) {

        console.error(
            error
        );


        const message =
            error &&
            error.message
                ? error.message
                : "Unknown error";


        // -------------------------------------------------
        // Display error in browser
        // -------------------------------------------------

        const errorBox =
            document.createElement(
                "div"
            );


        errorBox.style.position =
            "fixed";


        errorBox.style.left =
            "50%";


        errorBox.style.top =
            "50%";


        errorBox.style.transform =
            "translate(-50%, -50%)";


        errorBox.style.width =
            "min(90%, 600px)";


        errorBox.style.padding =
            "25px";


        errorBox.style.background =
            "#080d13";


        errorBox.style.border =
            "1px solid #ff4d5a";


        errorBox.style.color =
            "#ffffff";


        errorBox.style.fontFamily =
            "Arial, sans-serif";


        errorBox.style.zIndex =
            "99999";


        errorBox.innerHTML = `

            <h2
                style="
                    color:#ff4d5a;
                    margin-bottom:15px;
                "
            >
                Game Initialization Error
            </h2>

            <p
                style="
                    color:#b8cbd5;
                    line-height:1.6;
                "
            >
                ${this.escapeHTML(message)}
            </p>

            <p
                style="
                    color:#6e8796;
                    margin-top:15px;
                    font-size:12px;
                "
            >
                Check the browser console for more details.
            </p>

        `;


        document.body.appendChild(
            errorBox
        );

    }


    // =====================================================
    // ESCAPE HTML
    // =====================================================

    escapeHTML(
        text
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            String(text);


        return div.innerHTML;

    }


    // =====================================================
    // DESTROY
    // =====================================================

    destroy() {

        if (
            this.animationFrame !== null
        ) {

            cancelAnimationFrame(
                this.animationFrame
            );

        }


        this.animationFrame =
            null;


        game.destroy();


        this.initialized =
            false;

    }

}


// =========================================================
// CREATE APPLICATION
// =========================================================

const application =
    new Application();


// =========================================================
// START WHEN DOM IS READY
// =========================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            application.initialize();

        },
        {
            once: true
        }
    );

}

else {

    application.initialize();

}


// =========================================================
// GLOBAL ACCESS FOR DEBUGGING
// =========================================================

window.cyberCity =
    application;