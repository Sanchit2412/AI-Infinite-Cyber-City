// ============================================================
// AI INFINITE CYBER CITY
// MISSION SYSTEM
// ============================================================

import * as THREE from "../libs/three.module.js";


// ============================================================
// MISSION CLASS
// ============================================================

class Mission {

    constructor() {

        // ----------------------------------------------------
        // REFERENCES
        // ----------------------------------------------------

        this.scene = null;
        this.player = null;
        this.city = null;
        this.police = null;
        this.ui = null;


        // ----------------------------------------------------
        // STATE
        // ----------------------------------------------------

        this.initialized = false;

        this.active = false;

        this.completed = false;

        this.failed = false;

        this.stage = "idle";


        // ----------------------------------------------------
        // MISSION INFORMATION
        // ----------------------------------------------------

        this.name =
            "CYBER DATA HEIST";


        this.objective =
            "Reach the marked location.";


        this.statusMessage =
            "Mission ready.";


        // ----------------------------------------------------
        // POSITIONS
        // ----------------------------------------------------

        this.targetPosition =
            new THREE.Vector3(
                0,
                0,
                -35
            );


        this.escapePosition =
            new THREE.Vector3(
                0,
                0,
                35
            );


        // ----------------------------------------------------
        // MARKERS
        // ----------------------------------------------------

        this.marker = null;

        this.escapeMarker = null;


        // ----------------------------------------------------
        // DISTANCES
        // ----------------------------------------------------

        this.collectionDistance = 5;

        this.escapeDistance = 6;


        // ----------------------------------------------------
        // POLICE
        // ----------------------------------------------------

        this.policeSpawned = false;


        // ----------------------------------------------------
        // COINS
        // ----------------------------------------------------

        this.coinsCollected = 0;


        // ----------------------------------------------------
        // ANIMATION
        // ----------------------------------------------------

        this.markerTime = 0;

    }


    // ========================================================
    // INITIALIZE
    // ========================================================

    initialize(
        player = null,
        city = null,
        police = null,
        ui = null
    ) {

        this.player =
            player;

        this.city =
            city;

        this.police =
            police;

        this.ui =
            ui;


        // Get scene from player

        if (
            this.player &&
            this.player.scene
        ) {

            this.scene =
                this.player.scene;

        }


        this.initialized =
            true;


        console.log(
            "Mission system initialized."
        );

    }


    // ========================================================
    // START MISSION
    // ========================================================

    start() {

        if (!this.initialized) {

            console.warn(
                "Mission system is not initialized."
            );

            return;

        }


        // Reset old mission

        this.reset();


        // ----------------------------------------------------
        // ACTIVE STATE
        // ----------------------------------------------------

        this.active =
            true;

        this.completed =
            false;

        this.failed =
            false;


        // ----------------------------------------------------
        // FIRST STAGE
        // ----------------------------------------------------

        this.stage =
            "collect";


        // ----------------------------------------------------
        // MISSION NAME
        // ----------------------------------------------------

        this.name =
            "CYBER DATA HEIST";


        // ----------------------------------------------------
        // OBJECTIVE
        // ----------------------------------------------------

        this.objective =
            "Drive to the GREEN marker and collect the cyber data.";


        this.statusMessage =
            "MISSION STARTED — GO TO THE GREEN MARKER";


        // ----------------------------------------------------
        // CREATE TARGET
        // ----------------------------------------------------

        this.createDataMarker();


        // ----------------------------------------------------
        // UPDATE UI
        // ----------------------------------------------------

        this.updateUI();


        console.log(
            "CYBER DATA HEIST started."
        );

    }


    // ========================================================
    // CREATE DATA MARKER
    // ========================================================

    createDataMarker() {

        if (!this.scene) {

            console.warn(
                "Mission marker cannot be created: scene missing."
            );

            return;

        }


        this.removeDataMarker();


        const group =
            new THREE.Group();


        group.name =
            "CyberDataMissionMarker";


        // ----------------------------------------------------
        // LARGE GROUND RING
        // ----------------------------------------------------

        const ringGeometry =
            new THREE.RingGeometry(
                2.5,
                3.2,
                32
            );


        const ringMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x00ff66,

                emissive:
                    0x00aa44,

                emissiveIntensity:
                    1.5,

                transparent:
                    true,

                opacity:
                    0.9,

                side:
                    THREE.DoubleSide

            });


        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );


        ring.rotation.x =
            -Math.PI / 2;


        ring.position.y =
            0.12;


        group.add(
            ring
        );


        // ----------------------------------------------------
        // INNER PLATFORM
        // ----------------------------------------------------

        const platformGeometry =
            new THREE.CylinderGeometry(
                2.2,
                2.2,
                0.18,
                32
            );


        const platformMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x00ff66,

                emissive:
                    0x007733,

                emissiveIntensity:
                    1.2,

                transparent:
                    true,

                opacity:
                    0.75

            });


        const platform =
            new THREE.Mesh(
                platformGeometry,
                platformMaterial
            );


        platform.position.y =
            0.12;


        group.add(
            platform
        );


        // ----------------------------------------------------
        // VERTICAL BEAM
        // ----------------------------------------------------

        const beamGeometry =
            new THREE.CylinderGeometry(
                0.18,
                0.18,
                7,
                12
            );


        const beamMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x00ff66,

                emissive:
                    0x00ff66,

                emissiveIntensity:
                    2,

                transparent:
                    true,

                opacity:
                    0.65

            });


        const beam =
            new THREE.Mesh(
                beamGeometry,
                beamMaterial
            );


        beam.position.y =
            3.5;


        group.add(
            beam
        );


        // ----------------------------------------------------
        // TOP BALL
        // ----------------------------------------------------

        const ballGeometry =
            new THREE.SphereGeometry(
                0.7,
                20,
                20
            );


        const ball =
            new THREE.Mesh(
                ballGeometry,
                beamMaterial
            );


        ball.position.y =
            7;


        group.add(
            ball
        );


        // ----------------------------------------------------
        // ARROW
        // ----------------------------------------------------

        const arrowGeometry =
            new THREE.ConeGeometry(
                0.8,
                2,
                4
            );


        const arrow =
            new THREE.Mesh(
                arrowGeometry,
                beamMaterial
            );


        arrow.position.y =
            8.5;


        group.add(
            arrow
        );


        // ----------------------------------------------------
        // POINT LIGHT
        // ----------------------------------------------------

        const light =
            new THREE.PointLight(
                0x00ff66,
                5,
                25
            );


        light.position.y =
            3;


        group.add(
            light
        );


        // ----------------------------------------------------
        // POSITION
        // ----------------------------------------------------

        group.position.copy(
            this.targetPosition
        );


        // ----------------------------------------------------
        // ADD TO SCENE
        // ----------------------------------------------------

        this.scene.add(
            group
        );


        this.marker =
            group;


        console.log(
            "GREEN mission marker created at:",
            this.targetPosition
        );

    }


    // ========================================================
    // REMOVE DATA MARKER
    // ========================================================

    removeDataMarker() {

        if (
            this.marker &&
            this.scene
        ) {

            this.scene.remove(
                this.marker
            );

        }


        this.marker =
            null;

    }


    // ========================================================
    // CREATE ESCAPE MARKER
    // ========================================================

    createEscapeMarker() {

        if (!this.scene) {

            return;

        }


        this.removeEscapeMarker();


        const group =
            new THREE.Group();


        group.name =
            "EscapeMissionMarker";


        // ----------------------------------------------------
        // GROUND RING
        // ----------------------------------------------------

        const ringGeometry =
            new THREE.RingGeometry(
                3,
                4,
                32
            );


        const ringMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0xffd000,

                emissive:
                    0xaa7700,

                emissiveIntensity:
                    1.5,

                transparent:
                    true,

                opacity:
                    0.95,

                side:
                    THREE.DoubleSide

            });


        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );


        ring.rotation.x =
            -Math.PI / 2;


        ring.position.y =
            0.12;


        group.add(
            ring
        );


        // ----------------------------------------------------
        // ESCAPE BEACON
        // ----------------------------------------------------

        const beaconGeometry =
            new THREE.CylinderGeometry(
                0.25,
                0.25,
                7,
                12
            );


        const beacon =
            new THREE.Mesh(
                beaconGeometry,
                ringMaterial
            );


        beacon.position.y =
            3.5;


        group.add(
            beacon
        );


        // ----------------------------------------------------
        // TOP
        // ----------------------------------------------------

        const topGeometry =
            new THREE.SphereGeometry(
                0.8,
                20,
                20
            );


        const top =
            new THREE.Mesh(
                topGeometry,
                ringMaterial
            );


        top.position.y =
            7;


        group.add(
            top
        );


        // ----------------------------------------------------
        // ARROW
        // ----------------------------------------------------

        const arrowGeometry =
            new THREE.ConeGeometry(
                0.9,
                2.2,
                4
            );


        const arrow =
            new THREE.Mesh(
                arrowGeometry,
                ringMaterial
            );


        arrow.position.y =
            8.5;


        group.add(
            arrow
        );


        // ----------------------------------------------------
        // LIGHT
        // ----------------------------------------------------

        const light =
            new THREE.PointLight(
                0xffd000,
                6,
                30
            );


        light.position.y =
            3;


        group.add(
            light
        );


        // ----------------------------------------------------
        // POSITION
        // ----------------------------------------------------

        group.position.copy(
            this.escapePosition
        );


        this.scene.add(
            group
        );


        this.escapeMarker =
            group;


        console.log(
            "YELLOW escape marker created."
        );

    }


    // ========================================================
    // REMOVE ESCAPE MARKER
    // ========================================================

    removeEscapeMarker() {

        if (
            this.escapeMarker &&
            this.scene
        ) {

            this.scene.remove(
                this.escapeMarker
            );

        }


        this.escapeMarker =
            null;

    }


    // ========================================================
    // UPDATE
    // ========================================================

    update(deltaTime = 0.016) {

        if (
            !this.initialized ||
            !this.active
        ) {

            return;

        }


        deltaTime =
            Math.min(
                Math.max(
                    deltaTime,
                    0
                ),
                0.05
            );


        this.markerTime +=
            deltaTime;


        // ----------------------------------------------------
        // ANIMATE MARKERS
        // ----------------------------------------------------

        this.animateMarkers(
            deltaTime
        );


        // ----------------------------------------------------
        // PLAYER
        // ----------------------------------------------------

        if (
            !this.player ||
            typeof this.player.getPosition !==
            "function"
        ) {

            return;

        }


        const playerPosition =
            this.player.getPosition();


        if (!playerPosition) {

            return;

        }


        // ----------------------------------------------------
        // COLLECT STAGE
        // ----------------------------------------------------

        if (
            this.stage ===
            "collect"
        ) {

            const distance =
                playerPosition.distanceTo(
                    this.targetPosition
                );


            // DO NOT AUTOMATICALLY COLLECT.
            // Player must press E.

            if (
                distance <=
                this.collectionDistance
            ) {

                this.statusMessage =
                    "PRESS E TO COLLECT CYBER DATA";

            } else {

                this.statusMessage =
                    "GO TO THE GREEN MARKER";

            }

        }


        // ----------------------------------------------------
        // ESCAPE STAGE
        // ----------------------------------------------------

        if (
            this.stage ===
            "escape"
        ) {

            const distance =
                playerPosition.distanceTo(
                    this.escapePosition
                );


            if (
                distance <=
                this.escapeDistance
            ) {

                this.complete();

                return;

            }

        }


        this.updateUI();

    }


    // ========================================================
    // ANIMATE MARKERS
    // ========================================================

    animateMarkers(
        deltaTime
    ) {

        const pulse =
            1 +
            Math.sin(
                this.markerTime * 4
            ) *
            0.15;


        // ----------------------------------------------------
        // GREEN MARKER
        // ----------------------------------------------------

        if (
            this.marker
        ) {

            this.marker.rotation.y +=
                deltaTime *
                1.5;


            this.marker.scale.set(
                pulse,
                pulse,
                pulse
            );

        }


        // ----------------------------------------------------
        // YELLOW MARKER
        // ----------------------------------------------------

        if (
            this.escapeMarker
        ) {

            this.escapeMarker.rotation.y +=
                deltaTime *
                1.5;


            this.escapeMarker.scale.set(
                pulse,
                pulse,
                pulse
            );

        }

    }


    // ========================================================
    // INTERACT
    // ========================================================

    interact() {

        if (
            !this.active
        ) {

            return;

        }


        if (
            this.stage !==
            "collect"
        ) {

            return;

        }


        if (
            !this.player
        ) {

            return;

        }


        const playerPosition =
            this.player.getPosition();


        const distance =
            playerPosition.distanceTo(
                this.targetPosition
            );


        // Player must actually reach marker

        if (
            distance >
            this.collectionDistance
        ) {

            return;

        }


        // ----------------------------------------------------
        // CHANGE STAGE
        // ----------------------------------------------------

        this.stage =
            "escape";


        this.objective =
            "ESCAPE THE POLICE and reach the YELLOW marker.";


        this.statusMessage =
            "CYBER DATA SECURED — POLICE ARE COMING!";


        // ----------------------------------------------------
        // REMOVE GREEN MARKER
        // ----------------------------------------------------

        this.removeDataMarker();


        // ----------------------------------------------------
        // CREATE ESCAPE MARKER
        // ----------------------------------------------------

        this.createEscapeMarker();


        // ----------------------------------------------------
        // SPAWN POLICE
        // ----------------------------------------------------

        if (
            this.police &&
            typeof this.police.spawnPolice ===
            "function"
        ) {

            const position =
                this.player.getPosition();


            this.police.spawnPolice(
                position
            );


            this.police.spawnPolice(
                position
            );


            this.policeSpawned =
                true;

        }


        // ----------------------------------------------------
        // POLICE ALERT
        // ----------------------------------------------------

        if (
            typeof window !==
            "undefined"
        ) {

            window.dispatchEvent(
                new CustomEvent(
                    "policeAlert",
                    {
                        detail: {

                            message:
                                "🚨 POLICE ALERT! ESCAPE NOW!",

                            duration:
                                5000

                        }
                    }
                )
            );

        }


        this.updateUI();


        console.log(
            "Cyber data collected. Police spawned."
        );

    }


    // ========================================================
    // SHOULD INTERACT
    // ========================================================

    shouldInteract() {

        return (
            this.active &&
            this.stage ===
            "collect"
        );

    }


    // ========================================================
    // TARGET DISTANCE
    // ========================================================

    getTargetDistance() {

        if (
            !this.player ||
            typeof this.player.getPosition !==
            "function"
        ) {

            return Infinity;

        }


        const playerPosition =
            this.player.getPosition();


        if (
            this.stage ===
            "collect"
        ) {

            return playerPosition.distanceTo(
                this.targetPosition
            );

        }


        if (
            this.stage ===
            "escape"
        ) {

            return playerPosition.distanceTo(
                this.escapePosition
            );

        }


        return 0;

    }


    // ========================================================
    // COMPLETE
    // ========================================================

    complete() {

        if (
            !this.active
        ) {

            return;

        }


        this.active =
            false;


        this.completed =
            true;


        this.stage =
            "completed";


        this.statusMessage =
            "MISSION COMPLETED!";


        this.objective =
            "Cyber Data Heist completed successfully.";


        // ----------------------------------------------------
        // REMOVE MARKERS
        // ----------------------------------------------------

        this.removeDataMarker();

        this.removeEscapeMarker();


        // ----------------------------------------------------
        // REMOVE POLICE
        // ----------------------------------------------------

        if (
            this.police &&
            typeof this.police.clearPolice ===
            "function"
        ) {

            this.police.clearPolice();

        }


        // ----------------------------------------------------
        // EVENT
        // ----------------------------------------------------

        if (
            typeof window !==
            "undefined"
        ) {

            window.dispatchEvent(
                new CustomEvent(
                    "missionComplete"
                )
            );

        }


        this.updateUI();


        console.log(
            "MISSION COMPLETED!"
        );

    }


    // ========================================================
    // FAIL
    // ========================================================

    fail(
        message =
            "Mission failed."
    ) {

        if (
            !this.active
        ) {

            return;

        }


        this.active =
            false;


        this.failed =
            true;


        this.stage =
            "failed";


        this.statusMessage =
            message;


        this.removeDataMarker();

        this.removeEscapeMarker();


        if (
            this.police &&
            typeof this.police.clearPolice ===
            "function"
        ) {

            this.police.clearPolice();

        }


        if (
            typeof window !==
            "undefined"
        ) {

            window.dispatchEvent(
                new CustomEvent(
                    "missionFailed",
                    {
                        detail: {

                            message:
                                message

                        }
                    }
                )
            );

        }


        this.updateUI();


        console.log(
            "MISSION FAILED:",
            message
        );

    }


    // ========================================================
    // UPDATE UI
    // ========================================================

    updateUI() {

        if (
            !this.ui ||
            typeof this.ui.updateMission !==
            "function"
        ) {

            return;

        }


        const distance =
            this.getTargetDistance();


        this.ui.updateMission(

            this.name,

            this.objective,

            distance,

            this.statusMessage

        );

    }


    // ========================================================
    // GET OBJECTIVE
    // ========================================================

    getObjective() {

        return this.objective;

    }


    // ========================================================
    // GET STATUS
    // ========================================================

    getStatusMessage() {

        return this.statusMessage;

    }


    // ========================================================
    // GET STAGE
    // ========================================================

    getStage() {

        return this.stage;

    }


    // ========================================================
    // IS ACTIVE
    // ========================================================

    isActive() {

        return this.active;

    }


    // ========================================================
    // IS COMPLETE
    // ========================================================

    isComplete() {

        return this.completed;

    }


    // ========================================================
    // IS FAILED
    // ========================================================

    isFailed() {

        return this.failed;

    }


    // ========================================================
    // GET COINS
    // ========================================================

    getCoinsCollected() {

        return this.coinsCollected;

    }


    // ========================================================
    // RESET
    // ========================================================

    reset() {

        this.active =
            false;


        this.completed =
            false;


        this.failed =
            false;


        this.stage =
            "idle";


        this.policeSpawned =
            false;


        this.coinsCollected =
            0;


        this.markerTime =
            0;


        this.name =
            "CYBER DATA HEIST";


        this.objective =
            "Reach the marked location.";


        this.statusMessage =
            "Mission ready.";


        this.removeDataMarker();

        this.removeEscapeMarker();


        if (
            this.police &&
            typeof this.police.clearPolice ===
            "function"
        ) {

            this.police.clearPolice();

        }

    }


    // ========================================================
    // DESTROY
    // ========================================================

    destroy() {

        this.removeDataMarker();

        this.removeEscapeMarker();


        if (
            this.police &&
            typeof this.police.clearPolice ===
            "function"
        ) {

            this.police.clearPolice();

        }


        this.scene =
            null;


        this.player =
            null;


        this.city =
            null;


        this.police =
            null;


        this.ui =
            null;


        this.initialized =
            false;


        this.active =
            false;

    }

}


// ============================================================
// SINGLE MISSION INSTANCE
// ============================================================

const mission =
    new Mission();


// ============================================================
// EXPORT
// ============================================================

export default mission;