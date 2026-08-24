// ============================================================
// AI INFINITE CYBER CITY
// GAME CONTROLLER
// ============================================================

import * as THREE from "../libs/three.module.js";

import input from "./input.js";
import player from "./player.js";

import {
    initialize as initializeCity,
    update as updateCity,
    getCoinCount,
    resetCoins,
    destroy as destroyCity
} from "./city.js";

import mission from "./mission.js";
import police from "./police.js";
import ui from "./ui.js";


// ============================================================
// CITY COMPATIBILITY OBJECT
// ============================================================

const city = {

    initialize: initializeCity,

    update: updateCity,

    getCoinCount: getCoinCount,

    resetCoins: resetCoins,

    destroy: destroyCity

};


// ============================================================
// GAME CLASS
// ============================================================

class Game {

    constructor() {

        this.scene = null;

        this.camera = null;

        this.renderer = null;

        this.canvas = null;

        this.clock = null;

        this.initialized = false;

        this.running = false;

        this.started = false;

        this.paused = false;

        this.animationFrame = null;

        this.lastTime = 0;

        this.deltaTime = 0;

        this.elapsedTime = 0;

        this.boundResize =
            () => this.resize();

        this.boundPoliceAlert =
            (event) => this.handlePoliceAlert(event);

        this.boundMissionComplete =
            () => this.handleMissionComplete();

        this.boundMissionFailed =
            (event) => this.handleMissionFailed(event);

        this.boundAnimation =
            (time) => this.gameLoop(time);

    }


    // ========================================================
    // INITIALIZE
    // ========================================================

    initialize() {

        if (this.initialized) {

            return;

        }


        // ----------------------------------------------------
        // CANVAS
        // ----------------------------------------------------

        this.canvas =
            document.getElementById(
                "game-canvas"
            );


        if (!this.canvas) {

            throw new Error(
                "Game canvas was not found."
            );

        }


        // ----------------------------------------------------
        // RENDERER
        // ----------------------------------------------------

        this.renderer =
            new THREE.WebGLRenderer({

                canvas:
                    this.canvas,

                antialias:
                    true,

                alpha:
                    false,

                powerPreference:
                    "high-performance"

            });


        this.renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                1.5
            )
        );


        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight,
            false
        );


        this.renderer.shadowMap.enabled =
            true;


        this.renderer.shadowMap.type =
            THREE.BasicShadowMap;


        // ----------------------------------------------------
        // SCENE
        // ----------------------------------------------------

        this.scene =
            new THREE.Scene();


        this.scene.background =
            new THREE.Color(
                0x071820
            );


        // ----------------------------------------------------
        // CAMERA
        // ----------------------------------------------------

        this.camera =
            new THREE.PerspectiveCamera(

                60,

                window.innerWidth /
                window.innerHeight,

                0.1,

                500

            );


        this.camera.position.set(
            0,
            6,
            12
        );


        this.camera.lookAt(
            0,
            1,
            0
        );


        // ----------------------------------------------------
        // CLOCK
        // ----------------------------------------------------

        this.clock =
            new THREE.Clock();


        // ----------------------------------------------------
        // CITY
        // ----------------------------------------------------

        city.initialize(
            this.scene
        );


        // ----------------------------------------------------
        // PLAYER
        // ----------------------------------------------------

        if (
            player &&
            typeof player.initialize ===
            "function"
        ) {

            player.initialize(
                this.scene,
                this.camera
            );

        } else {

            throw new Error(
                "player.initialize is not available. Check player.js."
            );

        }


        // ----------------------------------------------------
        // POLICE
        // ----------------------------------------------------

        if (
            police &&
            typeof police.initialize ===
            "function"
        ) {

            police.initialize(
                this.scene
            );

        } else {

            throw new Error(
                "police.initialize is not available. Check police.js."
            );

        }


        // ----------------------------------------------------
        // MISSION
        // ----------------------------------------------------

        if (
            mission &&
            typeof mission.initialize ===
            "function"
        ) {

            mission.initialize(
                player,
                city,
                police,
                ui
            );

        } else {

            throw new Error(
                "mission.initialize is not available. Check mission.js."
            );

        }


        // ----------------------------------------------------
        // INPUT
        // ----------------------------------------------------

        if (
            input &&
            typeof input.setCanvas ===
            "function"
        ) {

            input.setCanvas(
                this.canvas
            );

        }


        // ----------------------------------------------------
        // UI
        // ----------------------------------------------------

        this.setupUI();


        // ----------------------------------------------------
        // EVENTS
        // ----------------------------------------------------

        window.addEventListener(
            "resize",
            this.boundResize
        );


        window.addEventListener(
            "policeAlert",
            this.boundPoliceAlert
        );


        window.addEventListener(
            "missionComplete",
            this.boundMissionComplete
        );


        window.addEventListener(
            "missionFailed",
            this.boundMissionFailed
        );


        // ----------------------------------------------------
        // RESET SYSTEMS
        // ----------------------------------------------------

        if (
            player &&
            typeof player.reset ===
            "function"
        ) {

            player.reset();

        }


        if (
            mission &&
            typeof mission.reset ===
            "function"
        ) {

            mission.reset();

        }


        if (
            police &&
            typeof police.clearPolice ===
            "function"
        ) {

            police.clearPolice();

        }


        city.resetCoins();


        // ----------------------------------------------------
        // INITIAL HUD
        // ----------------------------------------------------

        if (
            ui &&
            typeof ui.resetHUD ===
            "function"
        ) {

            ui.resetHUD();

        }


        // ----------------------------------------------------
        // INITIAL UI STATE
        // ----------------------------------------------------

        if (
            ui &&
            typeof ui.showMainMenu ===
            "function"
        ) {

            ui.showMainMenu();

        }


        this.initialized =
            true;


        console.log(
            "AI Infinite Cyber City initialized successfully."
        );

    }


    // ========================================================
    // UI SETUP
    // ========================================================

    setupUI() {

        if (!ui) {

            return;

        }


        if (
            typeof ui.setCallbacks ===
            "function"
        ) {

            ui.setCallbacks({

                startGame:
                    () => this.startGame(),

                restartGame:
                    () => this.restartGame(),

                mainMenu:
                    () => this.returnToMainMenu(),

                pauseGame:
                    () => this.pause(),

                resumeGame:
                    () => this.resume()

            });

        }

    }


    // ========================================================
    // START GAME
    // ========================================================

    startGame() {

        if (!this.initialized) {

            this.initialize();

        }


        this.resetGame();


        this.started =
            true;

        this.running =
            true;

        this.paused =
            false;

        this.elapsedTime =
            0;


        // ----------------------------------------------------
        // UI
        // ----------------------------------------------------

        if (
            ui &&
            typeof ui.hideResultScreens ===
            "function"
        ) {

            ui.hideResultScreens();

        }


        if (
            ui &&
            typeof ui.hidePause ===
            "function"
        ) {

            ui.hidePause();

        }


        if (
            ui &&
            typeof ui.showGame ===
            "function"
        ) {

            ui.showGame();

        }


        if (
            ui &&
            typeof ui.enableGameUI ===
            "function"
        ) {

            ui.enableGameUI();

        }


        // ----------------------------------------------------
        // INPUT
        // ----------------------------------------------------

        if (
            input &&
            typeof input.enable ===
            "function"
        ) {

            input.enable();

        }


        // ----------------------------------------------------
        // START MISSION
        // ----------------------------------------------------

        if (
            mission &&
            typeof mission.start ===
            "function"
        ) {

            mission.start();

        }


        // ----------------------------------------------------
        // START CLOCK
        // ----------------------------------------------------

        if (this.clock) {

            this.clock.start();

        }


        this.lastTime =
            performance.now();


        // ----------------------------------------------------
        // START INTERNAL LOOP
        // ----------------------------------------------------

        if (!this.animationFrame) {

            this.animationFrame =
                requestAnimationFrame(
                    this.boundAnimation
                );

        }


        console.log(
            "Mission started."
        );

    }


    // ========================================================
    // RESET GAME
    // ========================================================

    resetGame() {

        this.elapsedTime =
            0;

        this.deltaTime =
            0;


        // ----------------------------------------------------
        // PLAYER
        // ----------------------------------------------------

        if (
            player &&
            typeof player.reset ===
            "function"
        ) {

            player.reset();

        }


        // ----------------------------------------------------
        // POLICE
        // ----------------------------------------------------

        if (
            police &&
            typeof police.clearPolice ===
            "function"
        ) {

            police.clearPolice();

        }


        // ----------------------------------------------------
        // MISSION
        // ----------------------------------------------------

        if (
            mission &&
            typeof mission.reset ===
            "function"
        ) {

            mission.reset();

        }


        // ----------------------------------------------------
        // COINS
        // ----------------------------------------------------

        city.resetCoins();


        // ----------------------------------------------------
        // HUD
        // ----------------------------------------------------

        if (
            ui &&
            typeof ui.resetHUD ===
            "function"
        ) {

            ui.resetHUD();

        }


        if (
            ui &&
            typeof ui.hideInteraction ===
            "function"
        ) {

            ui.hideInteraction();

        }


        if (
            ui &&
            typeof ui.hidePoliceAlert ===
            "function"
        ) {

            ui.hidePoliceAlert();

        }


        // ----------------------------------------------------
        // CAMERA
        // ----------------------------------------------------

        if (this.camera) {

            this.camera.position.set(
                0,
                6,
                12
            );

            this.camera.lookAt(
                0,
                1,
                0
            );

        }

    }


    // ========================================================
    // RESTART
    // ========================================================

    restartGame() {

        if (
            ui &&
            typeof ui.hideResultScreens ===
            "function"
        ) {

            ui.hideResultScreens();

        }


        if (
            ui &&
            typeof ui.hidePause ===
            "function"
        ) {

            ui.hidePause();

        }


        this.startGame();

    }


    // ========================================================
    // MAIN GAME LOOP
    // ========================================================

    gameLoop(time) {

        this.animationFrame =
            requestAnimationFrame(
                this.boundAnimation
            );


        if (!this.lastTime) {

            this.lastTime =
                time;

        }


        let delta =
            (
                time -
                this.lastTime
            ) / 1000;


        this.lastTime =
            time;


        delta =
            Math.min(
                Math.max(
                    delta,
                    0
                ),
                0.05
            );


        this.deltaTime =
            delta;


        if (
            this.running &&
            !this.paused
        ) {

            this.update(
                delta
            );

        }


        this.render();

    }


    // ========================================================
    // UPDATE
    // ========================================================

    update(
        deltaTime = 0.016
    ) {

        if (
            !this.running ||
            this.paused
        ) {

            return;

        }


        this.deltaTime =
            Math.min(
                Math.max(
                    deltaTime,
                    0
                ),
                0.05
            );


        this.elapsedTime +=
            this.deltaTime;


        // ----------------------------------------------------
        // PLAYER
        // ----------------------------------------------------

        if (
            player &&
            typeof player.update ===
            "function"
        ) {

            player.update(
                this.deltaTime
            );

        }


        // ----------------------------------------------------
        // PLAYER POSITION
        // ----------------------------------------------------

        let playerPosition =
            null;


        if (
            player &&
            typeof player.getPosition ===
            "function"
        ) {

            playerPosition =
                player.getPosition();

        }


        // ----------------------------------------------------
        // CITY
        // ----------------------------------------------------

        if (
            typeof city.update ===
            "function"
        ) {

            city.update(
                this.deltaTime,
                playerPosition
            );

        }


        // ----------------------------------------------------
        // POLICE
        // ----------------------------------------------------

        if (
            police &&
            typeof police.update ===
            "function"
        ) {

            police.update(
                this.deltaTime,
                playerPosition
            );

        }


        // ----------------------------------------------------
        // MISSION
        // ----------------------------------------------------

        if (
            mission &&
            typeof mission.update ===
            "function"
        ) {

            mission.update(
                this.deltaTime
            );

        }


        // ----------------------------------------------------
        // INTERACTION
        // ----------------------------------------------------

        this.updateInteraction();


        // ----------------------------------------------------
        // HUD
        // ----------------------------------------------------

        this.updateHUD();


        // ----------------------------------------------------
        // INPUT
        // ----------------------------------------------------

        this.handleInput();


        if (
            input &&
            typeof input.update ===
            "function"
        ) {

            input.update();

        }


        // ----------------------------------------------------
        // CAMERA
        // ----------------------------------------------------

        this.updateCamera();

    }


    // ========================================================
    // CAMERA
    // ========================================================

    updateCamera() {

        if (
            !this.camera ||
            !player ||
            typeof player.getPosition !==
            "function"
        ) {

            return;

        }


        const position =
            player.getPosition();


        if (!position) {

            return;

        }


        // Smooth third-person camera

        const desiredX =
            position.x;

        const desiredY =
            position.y +
            5.5;

        const desiredZ =
            position.z +
            10;


        this.camera.position.x +=
            (
                desiredX -
                this.camera.position.x
            ) * 0.08;


        this.camera.position.y +=
            (
                desiredY -
                this.camera.position.y
            ) * 0.08;


        this.camera.position.z +=
            (
                desiredZ -
                this.camera.position.z
            ) * 0.08;


        this.camera.lookAt(
            position.x,
            position.y + 1,
            position.z
        );

    }


    // ========================================================
    // INTERACTION
    // ========================================================

    updateInteraction() {

        if (
            !mission ||
            !ui
        ) {

            return;

        }


        if (
            typeof mission.isActive !==
            "function"
        ) {

            return;

        }


        if (
            !mission.isActive()
        ) {

            if (
                typeof ui.hideInteraction ===
                "function"
            ) {

                ui.hideInteraction();

            }

            return;

        }


        if (
            typeof mission.shouldInteract !==
            "function" ||
            typeof mission.getTargetDistance !==
            "function"
        ) {

            return;

        }


        const distance =
            mission.getTargetDistance();


        if (
            mission.shouldInteract() &&
            distance <= 5
        ) {

            if (
                typeof ui.showInteraction ===
                "function"
            ) {

                ui.showInteraction(
                    "PRESS E TO COLLECT CYBER DATA"
                );

            }

        } else {

            if (
                typeof ui.hideInteraction ===
                "function"
            ) {

                ui.hideInteraction();

            }

        }

    }


    // ========================================================
    // HUD
    // ========================================================

    updateHUD() {

        if (!ui) {

            return;

        }


        // ----------------------------------------------------
        // HEALTH
        // ----------------------------------------------------

        if (
            player &&
            typeof player.getHealth ===
            "function" &&
            typeof ui.updateHealth ===
            "function"
        ) {

            ui.updateHealth(
                player.getHealth(),
                100
            );

        }


        // ----------------------------------------------------
        // WANTED
        // ----------------------------------------------------

        let wanted =
            0;


        if (
            police &&
            typeof police.getPoliceCount ===
            "function"
        ) {

            wanted =
                Math.min(
                    police.getPoliceCount(),
                    5
                );

        }


        if (
            typeof ui.updateWanted ===
            "function"
        ) {

            ui.updateWanted(
                wanted
            );

        }


        // ----------------------------------------------------
        // LOCATION
        // ----------------------------------------------------

        if (
            typeof ui.updateLocation ===
            "function"
        ) {

            ui.updateLocation(
                "CENTRAL CITY"
            );

        }


        // ----------------------------------------------------
        // MISSION
        // ----------------------------------------------------

        if (
            mission &&
            typeof ui.updateMission ===
            "function"
        ) {

            const missionName =
                mission.name ||
                "Cyber Data Heist";


            const objective =
                typeof mission.getObjective ===
                "function"
                    ? mission.getObjective()
                    : "Complete the mission.";


            const distance =
                typeof mission.getTargetDistance ===
                "function"
                    ? mission.getTargetDistance()
                    : 0;


            const status =
                typeof mission.getStatusMessage ===
                "function"
                    ? mission.getStatusMessage()
                    : "Mission ready.";


            ui.updateMission(
                missionName,
                objective,
                distance,
                status
            );

        }


        // ----------------------------------------------------
        // COINS
        // ----------------------------------------------------

        if (
            typeof ui.updateCoins ===
            "function"
        ) {

            ui.updateCoins(
                city.getCoinCount()
            );

        }

    }


    // ========================================================
    // INPUT
    // ========================================================

    handleInput() {

        // ----------------------------------------------------
        // INTERACTION
        // ----------------------------------------------------

        if (
            input &&
            typeof input.wantsInteract ===
            "function" &&
            input.wantsInteract()
        ) {

            if (
                mission &&
                typeof mission.shouldInteract ===
                "function" &&
                typeof mission.getTargetDistance ===
                "function" &&
                typeof mission.interact ===
                "function"
            ) {

                if (
                    mission.shouldInteract() &&
                    mission.getTargetDistance() <= 5
                ) {

                    mission.interact();

                }

            }

        }


        // ----------------------------------------------------
        // PAUSE
        // ----------------------------------------------------

        if (
            input &&
            typeof input.wantsPause ===
            "function" &&
            input.wantsPause()
        ) {

            this.togglePause();

        }

    }


    // ========================================================
    // POLICE ALERT
    // ========================================================

    handlePoliceAlert(event) {

        const message =
            event &&
            event.detail &&
            event.detail.message
                ? event.detail.message
                : "POLICE ALERT!";


        if (
            ui &&
            typeof ui.showPoliceAlert ===
            "function"
        ) {

            ui.showPoliceAlert(
                message,
                4000
            );

        }

    }


    // ========================================================
    // MISSION COMPLETE
    // ========================================================

    handleMissionComplete() {

        this.running =
            false;

        this.started =
            false;


        if (
            input &&
            typeof input.disable ===
            "function"
        ) {

            input.disable();

        }


        if (
            ui &&
            typeof ui.showSuccess ===
            "function"
        ) {

            ui.showSuccess();

        }

    }


    // ========================================================
    // MISSION FAILED
    // ========================================================

    handleMissionFailed(event) {

        const message =
            event &&
            event.detail &&
            event.detail.message
                ? event.detail.message
                : "Mission failed.";


        this.running =
            false;

        this.started =
            false;


        if (
            input &&
            typeof input.disable ===
            "function"
        ) {

            input.disable();

        }


        if (
            ui &&
            typeof ui.showGameOver ===
            "function"
        ) {

            ui.showGameOver(
                message
            );

        }

    }


    // ========================================================
    // PAUSE
    // ========================================================

    pause() {

        if (
            !this.running ||
            this.paused
        ) {

            return;

        }


        this.paused =
            true;


        if (
            input &&
            typeof input.disable ===
            "function"
        ) {

            input.disable();

        }


        if (
            ui &&
            typeof ui.showPause ===
            "function"
        ) {

            ui.showPause();

        }

    }


    // ========================================================
    // RESUME
    // ========================================================

    resume() {

        if (
            !this.running ||
            !this.paused
        ) {

            return;

        }


        this.paused =
            false;


        if (
            input &&
            typeof input.enable ===
            "function"
        ) {

            input.enable();

        }


        if (
            ui &&
            typeof ui.hidePause ===
            "function"
        ) {

            ui.hidePause();

        }


        this.lastTime =
            performance.now();

    }


    // ========================================================
    // TOGGLE PAUSE
    // ========================================================

    togglePause() {

        if (this.paused) {

            this.resume();

        } else {

            this.pause();

        }

    }


    // ========================================================
    // RETURN TO MAIN MENU
    // ========================================================

    returnToMainMenu() {

        this.running =
            false;

        this.started =
            false;

        this.paused =
            false;


        if (
            input &&
            typeof input.disable ===
            "function"
        ) {

            input.disable();

        }


        if (
            mission &&
            typeof mission.reset ===
            "function"
        ) {

            mission.reset();

        }


        if (
            police &&
            typeof police.clearPolice ===
            "function"
        ) {

            police.clearPolice();

        }


        if (
            player &&
            typeof player.reset ===
            "function"
        ) {

            player.reset();

        }


        city.resetCoins();


        if (
            ui &&
            typeof ui.hidePause ===
            "function"
        ) {

            ui.hidePause();

        }


        if (
            ui &&
            typeof ui.hideResultScreens ===
            "function"
        ) {

            ui.hideResultScreens();

        }


        if (
            ui &&
            typeof ui.disableGameUI ===
            "function"
        ) {

            ui.disableGameUI();

        }


        if (
            ui &&
            typeof ui.showMainMenu ===
            "function"
        ) {

            ui.showMainMenu();

        }

    }


    // ========================================================
    // RENDER
    // ========================================================

    render() {

        if (
            !this.renderer ||
            !this.scene ||
            !this.camera
        ) {

            return;

        }


        this.renderer.render(
            this.scene,
            this.camera
        );

    }


    // ========================================================
    // RESIZE
    // ========================================================

    resize() {

        if (
            !this.camera ||
            !this.renderer
        ) {

            return;

        }


        const width =
            window.innerWidth;

        const height =
            window.innerHeight;


        this.camera.aspect =
            width /
            height;


        this.camera.updateProjectionMatrix();


        this.renderer.setSize(
            width,
            height,
            false
        );


        this.renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                1.5
            )
        );

    }


    // ========================================================
    // STATUS
    // ========================================================

    isRunning() {

        return this.running;

    }


    isPaused() {

        return this.paused;

    }


    // ========================================================
    // GETTERS
    // ========================================================

    getScene() {

        return this.scene;

    }


    getCamera() {

        return this.camera;

    }


    getRenderer() {

        return this.renderer;

    }


    // ========================================================
    // DESTROY
    // ========================================================

    destroy() {

        this.running =
            false;

        this.paused =
            false;

        this.started =
            false;


        if (this.animationFrame) {

            cancelAnimationFrame(
                this.animationFrame
            );

            this.animationFrame =
                null;

        }


        if (
            input &&
            typeof input.disable ===
            "function"
        ) {

            input.disable();

        }


        window.removeEventListener(
            "resize",
            this.boundResize
        );


        window.removeEventListener(
            "policeAlert",
            this.boundPoliceAlert
        );


        window.removeEventListener(
            "missionComplete",
            this.boundMissionComplete
        );


        window.removeEventListener(
            "missionFailed",
            this.boundMissionFailed
        );


        if (
            mission &&
            typeof mission.destroy ===
            "function"
        ) {

            mission.destroy();

        }


        if (
            police &&
            typeof police.destroy ===
            "function"
        ) {

            police.destroy();

        }


        if (
            player &&
            typeof player.destroy ===
            "function"
        ) {

            player.destroy();

        }


        if (
            typeof city.destroy ===
            "function"
        ) {

            city.destroy();

        }


        if (this.renderer) {

            this.renderer.dispose();

        }


        this.scene =
            null;

        this.camera =
            null;

        this.renderer =
            null;

        this.clock =
            null;

        this.canvas =
            null;

        this.initialized =
            false;

    }

}


// ============================================================
// SINGLE GAME INSTANCE
// ============================================================

const game =
    new Game();


// ============================================================
// EXPORT
// ============================================================

export default game;