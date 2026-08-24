// ============================================================
// AI INFINITE CYBER CITY
// Lightweight Player / Car System
// ============================================================
// Replaces the old moving bar with a lightweight 3D car.
// No external assets are required.
// ============================================================

import * as THREE from "../libs/three.module.js";


// ============================================================
// PLAYER CLASS
// ============================================================

class Player {

    constructor() {

        this.scene = null;
        this.camera = null;

        this.car = null;

        this.enabled = true;

        this.speed = 0;
        this.maxSpeed = 18;
        this.reverseSpeed = 7;

        this.acceleration = 20;
        this.braking = 28;
        this.friction = 10;

        this.turnSpeed = 2.2;

        this.keys = {

            forward: false,
            backward: false,
            left: false,
            right: false

        };

        this.position = new THREE.Vector3(
            0,
            0.65,
            8
        );

        this.rotationY = 0;

        this.startPosition = new THREE.Vector3(
            0,
            0.65,
            8
        );

        this.startRotation = 0;

        this.wheels = [];

        this.initialized = false;

        this.boundKeyDown =
            (event) => this.handleKeyDown(event);

        this.boundKeyUp =
            (event) => this.handleKeyUp(event);

    }


    // ========================================================
    // INITIALIZE
    // ========================================================

    initialize(scene = null, camera = null) {

        if (this.initialized) {

            return this.car;

        }

        this.scene = scene;
        this.camera = camera;

        this.createCar();

        this.setupKeyboard();

        this.initialized = true;

        console.log(
            "Lightweight player car initialized."
        );

        return this.car;

    }


    // ========================================================
    // CREATE CAR
    // ========================================================

    createCar() {

        this.car =
            new THREE.Group();

        this.car.name =
            "PlayerCar";


        // ----------------------------------------------------
        // CAR BODY
        // ----------------------------------------------------

        const bodyGeometry =
            new THREE.BoxGeometry(
                2.2,
                0.55,
                4.2
            );


        const bodyMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x1769aa,

                roughness: 0.55,

                metalness: 0.25

            });


        const body =
            new THREE.Mesh(
                bodyGeometry,
                bodyMaterial
            );


        body.position.y =
            0.65;


        body.castShadow = true;

        body.receiveShadow = true;


        this.car.add(body);


        // ----------------------------------------------------
        // LOWER BODY
        // ----------------------------------------------------

        const lowerGeometry =
            new THREE.BoxGeometry(
                2.35,
                0.28,
                3.9
            );


        const lowerMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x111820,

                roughness: 0.65,

                metalness: 0.2

            });


        const lowerBody =
            new THREE.Mesh(
                lowerGeometry,
                lowerMaterial
            );


        lowerBody.position.y =
            0.43;


        lowerBody.castShadow = true;


        this.car.add(lowerBody);


        // ----------------------------------------------------
        // ROOF / CABIN
        // ----------------------------------------------------

        const cabinGeometry =
            new THREE.BoxGeometry(
                1.65,
                0.7,
                2.15
            );


        const cabinMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x263746,

                roughness: 0.25,

                metalness: 0.35,

                transparent: true,

                opacity: 0.92

            });


        const cabin =
            new THREE.Mesh(
                cabinGeometry,
                cabinMaterial
            );


        cabin.position.set(
            0,
            1.12,
            0.05
        );


        cabin.castShadow = true;


        this.car.add(cabin);


        // ----------------------------------------------------
        // FRONT WINDSHIELD
        // ----------------------------------------------------

        const windshieldGeometry =
            new THREE.BoxGeometry(
                1.5,
                0.48,
                0.08
            );


        const glassMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x6f8794,

                roughness: 0.12,

                metalness: 0.45,

                transparent: true,

                opacity: 0.7

            });


        const frontGlass =
            new THREE.Mesh(
                windshieldGeometry,
                glassMaterial
            );


        frontGlass.position.set(
            0,
            1.15,
            -1.05
        );


        frontGlass.rotation.x =
            -0.12;


        this.car.add(frontGlass);


        // ----------------------------------------------------
        // REAR WINDOW
        // ----------------------------------------------------

        const rearGlass =
            new THREE.Mesh(
                windshieldGeometry,
                glassMaterial
            );


        rearGlass.position.set(
            0,
            1.15,
            1.1
        );


        rearGlass.rotation.x =
            0.12;


        this.car.add(rearGlass);


        // ----------------------------------------------------
        // HEADLIGHTS
        // ----------------------------------------------------

        const headlightGeometry =
            new THREE.BoxGeometry(
                0.38,
                0.18,
                0.08
            );


        const headlightMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xffffdd,

                emissive: 0xffffcc,

                emissiveIntensity: 1.5

            });


        const leftHeadlight =
            new THREE.Mesh(
                headlightGeometry,
                headlightMaterial
            );


        leftHeadlight.position.set(
            -0.72,
            0.7,
            -2.12
        );


        this.car.add(leftHeadlight);


        const rightHeadlight =
            leftHeadlight.clone();


        rightHeadlight.position.x =
            0.72;


        this.car.add(rightHeadlight);


        // ----------------------------------------------------
        // REAR LIGHTS
        // ----------------------------------------------------

        const rearLightMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xaa1111,

                emissive: 0x550000,

                emissiveIntensity: 1

            });


        const leftRearLight =
            new THREE.Mesh(
                headlightGeometry,
                rearLightMaterial
            );


        leftRearLight.position.set(
            -0.72,
            0.7,
            2.12
        );


        this.car.add(leftRearLight);


        const rightRearLight =
            leftRearLight.clone();


        rightRearLight.position.x =
            0.72;


        this.car.add(rightRearLight);


        // ----------------------------------------------------
        // WHEELS
        // ----------------------------------------------------

        this.createWheel(
            -1.08,
            0.38,
            -1.35
        );

        this.createWheel(
            1.08,
            0.38,
            -1.35
        );

        this.createWheel(
            -1.08,
            0.38,
            1.35
        );

        this.createWheel(
            1.08,
            0.38,
            1.35
        );


        // ----------------------------------------------------
        // BUMPERS
        // ----------------------------------------------------

        const bumperGeometry =
            new THREE.BoxGeometry(
                2.15,
                0.2,
                0.18
            );


        const bumperMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x20262b,

                roughness: 0.7,

                metalness: 0.3

            });


        const frontBumper =
            new THREE.Mesh(
                bumperGeometry,
                bumperMaterial
            );


        frontBumper.position.set(
            0,
            0.48,
            -2.13
        );


        this.car.add(frontBumper);


        const rearBumper =
            frontBumper.clone();


        rearBumper.position.z =
            2.13;


        this.car.add(rearBumper);


        // ----------------------------------------------------
        // FINAL POSITION
        // ----------------------------------------------------

        this.car.position.copy(
            this.position
        );


        this.car.rotation.y =
            this.rotationY;


        // ----------------------------------------------------
        // ADD TO SCENE
        // ----------------------------------------------------

        if (this.scene) {

            this.scene.add(
                this.car
            );

        }

    }


    // ========================================================
    // CREATE WHEEL
    // ========================================================

    createWheel(
        x,
        y,
        z
    ) {

        const geometry =
            new THREE.CylinderGeometry(
                0.38,
                0.38,
                0.28,
                16
            );


        const material =
            new THREE.MeshStandardMaterial({

                color: 0x101010,

                roughness: 0.85,

                metalness: 0.05

            });


        const wheel =
            new THREE.Mesh(
                geometry,
                material
            );


        wheel.rotation.z =
            Math.PI / 2;


        wheel.position.set(
            x,
            y,
            z
        );


        wheel.castShadow = true;


        this.car.add(wheel);

        this.wheels.push(
            wheel
        );

    }


    // ========================================================
    // KEYBOARD
    // ========================================================

    setupKeyboard() {

        window.addEventListener(
            "keydown",
            this.boundKeyDown
        );

        window.addEventListener(
            "keyup",
            this.boundKeyUp
        );

    }


    // ========================================================
    // KEY DOWN
    // ========================================================

    handleKeyDown(event) {

        switch (
            event.code
        ) {

            case "KeyW":
            case "ArrowUp":

                this.keys.forward =
                    true;

                break;


            case "KeyS":
            case "ArrowDown":

                this.keys.backward =
                    true;

                break;


            case "KeyA":
            case "ArrowLeft":

                this.keys.left =
                    true;

                break;


            case "KeyD":
            case "ArrowRight":

                this.keys.right =
                    true;

                break;

        }

    }


    // ========================================================
    // KEY UP
    // ========================================================

    handleKeyUp(event) {

        switch (
            event.code
        ) {

            case "KeyW":
            case "ArrowUp":

                this.keys.forward =
                    false;

                break;


            case "KeyS":
            case "ArrowDown":

                this.keys.backward =
                    false;

                break;


            case "KeyA":
            case "ArrowLeft":

                this.keys.left =
                    false;

                break;


            case "KeyD":
            case "ArrowRight":

                this.keys.right =
                    false;

                break;

        }

    }


    // ========================================================
    // UPDATE
    // ========================================================

    update(deltaTime = 0.016) {

        if (
            !this.initialized ||
            !this.enabled ||
            !this.car
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


        // ----------------------------------------------------
        // ACCELERATION
        // ----------------------------------------------------

        if (this.keys.forward) {

            this.speed +=
                this.acceleration *
                deltaTime;

        }

        else if (this.keys.backward) {

            this.speed -=
                this.acceleration *
                deltaTime;

        }

        else {

            // Natural friction

            if (this.speed > 0) {

                this.speed -=
                    this.friction *
                    deltaTime;

                this.speed =
                    Math.max(
                        this.speed,
                        0
                    );

            }

            else if (
                this.speed < 0
            ) {

                this.speed +=
                    this.friction *
                    deltaTime;

                this.speed =
                    Math.min(
                        this.speed,
                        0
                    );

            }

        }


        // ----------------------------------------------------
        // SPEED LIMIT
        // ----------------------------------------------------

        this.speed =
            Math.min(
                this.speed,
                this.maxSpeed
            );


        this.speed =
            Math.max(
                this.speed,
                -this.reverseSpeed
            );


        // ----------------------------------------------------
        // STEERING
        // ----------------------------------------------------

        const steeringAmount =
            this.turnSpeed *
            deltaTime *
            Math.min(
                Math.abs(this.speed) /
                this.maxSpeed,
                1
            );


        if (this.keys.left) {

            this.rotationY +=
                steeringAmount *
                (
                    this.speed >= 0
                        ? 1
                        : -1
                );

        }


        if (this.keys.right) {

            this.rotationY -=
                steeringAmount *
                (
                    this.speed >= 0
                        ? 1
                        : -1
                );

        }


        // ----------------------------------------------------
        // MOVEMENT
        // ----------------------------------------------------

        const direction =
            new THREE.Vector3(
                0,
                0,
                -1
            );


        direction.applyAxisAngle(
            new THREE.Vector3(
                0,
                1,
                0
            ),
            this.rotationY
        );


        this.position.addScaledVector(
            direction,
            this.speed *
            deltaTime
        );


        // ----------------------------------------------------
        // KEEP CAR ON GROUND
        // ----------------------------------------------------

        this.position.y =
            0.65;


        // ----------------------------------------------------
        // APPLY TRANSFORM
        // ----------------------------------------------------

        this.car.position.copy(
            this.position
        );


        this.car.rotation.y =
            this.rotationY;


        // ----------------------------------------------------
        // WHEEL ROTATION
        // ----------------------------------------------------

        const wheelRotation =
            this.speed *
            deltaTime *
            2.5;


        this.wheels.forEach(
            (wheel) => {

                wheel.rotation.x +=
                    wheelRotation;

            }
        );


        // ----------------------------------------------------
        // CAMERA FOLLOW
        // ----------------------------------------------------

        this.updateCamera(
            deltaTime
        );

    }


    // ========================================================
    // CAMERA FOLLOW
    // ========================================================

    updateCamera(deltaTime) {

        if (
            !this.camera ||
            !this.car
        ) {

            return;

        }


        const cameraOffset =
            new THREE.Vector3(
                0,
                5.5,
                9
            );


        cameraOffset.applyAxisAngle(
            new THREE.Vector3(
                0,
                1,
                0
            ),
            this.rotationY
        );


        const desiredPosition =
            this.position.clone().add(
                cameraOffset
            );


        const smooth =
            1 -
            Math.pow(
                0.001,
                deltaTime
            );


        this.camera.position.lerp(
            desiredPosition,
            smooth
        );


        const lookTarget =
            this.position.clone();


        lookTarget.y +=
            0.8;


        this.camera.lookAt(
            lookTarget
        );

    }


    // ========================================================
    // RESET
    // ========================================================

    reset() {

        this.position.copy(
            this.startPosition
        );

        this.rotationY =
            this.startRotation;

        this.speed =
            0;


        if (this.car) {

            this.car.position.copy(
                this.position
            );

            this.car.rotation.y =
                this.rotationY;

        }

    }


    // ========================================================
    // ENABLE
    // ========================================================

    enable() {

        this.enabled =
            true;

    }


    // ========================================================
    // DISABLE
    // ========================================================

    disable() {

        this.enabled =
            false;

        this.speed =
            0;

    }


    // ========================================================
    // GET OBJECT
    // ========================================================

    getObject() {

        return this.car;

    }


    // ========================================================
    // GET POSITION
    // ========================================================

    getPosition() {

        return this.position.clone();

    }


    // ========================================================
    // GET SPEED
    // ========================================================

    getSpeed() {

        return this.speed;

    }


    // ========================================================
    // IS MOVING
    // ========================================================

    isMoving() {

        return (
            Math.abs(
                this.speed
            ) > 0.05
        );

    }


    // ========================================================
    // DESTROY
    // ========================================================

    destroy() {

        window.removeEventListener(
            "keydown",
            this.boundKeyDown
        );

        window.removeEventListener(
            "keyup",
            this.boundKeyUp
        );


        if (
            this.scene &&
            this.car
        ) {

            this.scene.remove(
                this.car
            );

        }


        this.wheels = [];

        this.car = null;

        this.scene = null;

        this.camera = null;

        this.initialized =
            false;

    }

}


// ============================================================
// SINGLE PLAYER INSTANCE
// ============================================================

const player = new Player();


// ============================================================
// EXPORT
// ============================================================

export default player;