// ============================================================
// AI INFINITE CYBER CITY
// Lightweight Police System
// ============================================================

import * as THREE from "../libs/three.module.js";


// ============================================================
// POLICE SYSTEM
// ============================================================

class Police {

    constructor() {

        this.scene = null;

        this.cityGroup = null;

        this.policeCars = [];

        this.playerPosition = null;

        this.initialized = false;

        this.time = 0;

        this.alert = false;

        this.alertTimer = 0;

        this.spawnDistance = 18;

        this.chaseSpeed = 4.5;

        this.maxPoliceCars = 2;

    }


    // ========================================================
    // INITIALIZE
    // ========================================================

    initialize(scene = null) {

        if (this.initialized) {

            return;

        }

        this.scene = scene;

        if (!this.scene) {

            console.warn(
                "Police system requires a Three.js scene."
            );

            return;

        }


        this.cityGroup =
            new THREE.Group();

        this.cityGroup.name =
            "PoliceSystem";


        this.scene.add(
            this.cityGroup
        );


        this.initialized =
            true;


        console.log(
            "Lightweight police system initialized."
        );

    }


    // ========================================================
    // UPDATE
    // ========================================================

    update(
        deltaTime = 0.016,
        playerPosition = null
    ) {

        if (!this.initialized) {

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


        this.time +=
            deltaTime;


        if (playerPosition) {

            this.playerPosition =
                playerPosition;

        }


        // ----------------------------------------------------
        // FLASH POLICE LIGHTS
        // ----------------------------------------------------

        this.updateLights();


        // ----------------------------------------------------
        // CHASE PLAYER
        // ----------------------------------------------------

        if (
            this.playerPosition
        ) {

            this.updatePoliceCars(
                deltaTime
            );

        }


        // ----------------------------------------------------
        // ALERT TIMER
        // ----------------------------------------------------

        if (
            this.alert
        ) {

            this.alertTimer -=
                deltaTime;


            if (
                this.alertTimer <= 0
            ) {

                this.alert =
                    false;

            }

        }

    }


    // ========================================================
    // CREATE POLICE CAR
    // ========================================================

    createPoliceCar(
        position = new THREE.Vector3()
    ) {

        if (
            !this.initialized
        ) {

            return null;

        }


        if (
            this.policeCars.length >=
            this.maxPoliceCars
        ) {

            return this.policeCars[0];

        }


        const car =
            new THREE.Group();


        car.name =
            "PoliceCar";


        // ----------------------------------------------------
        // BODY
        // ----------------------------------------------------

        const bodyGeometry =
            new THREE.BoxGeometry(
                2.1,
                0.55,
                4.0
            );


        const bodyMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xf1f1f1,

                roughness: 0.65,

                metalness: 0.2

            });


        const body =
            new THREE.Mesh(
                bodyGeometry,
                bodyMaterial
            );


        body.position.y =
            0.55;


        body.castShadow =
            true;


        body.receiveShadow =
            true;


        car.add(
            body
        );


        // ----------------------------------------------------
        // BLACK LOWER BODY
        // ----------------------------------------------------

        const lowerGeometry =
            new THREE.BoxGeometry(
                2.15,
                0.25,
                3.9
            );


        const lowerMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x15191c,

                roughness: 0.7,

                metalness: 0.2

            });


        const lower =
            new THREE.Mesh(
                lowerGeometry,
                lowerMaterial
            );


        lower.position.y =
            0.35;


        car.add(
            lower
        );


        // ----------------------------------------------------
        // ROOF / CABIN
        // ----------------------------------------------------

        const cabinGeometry =
            new THREE.BoxGeometry(
                1.65,
                0.65,
                1.9
            );


        const cabinMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x202b31,

                roughness: 0.3,

                metalness: 0.35

            });


        const cabin =
            new THREE.Mesh(
                cabinGeometry,
                cabinMaterial
            );


        cabin.position.y =
            1.05;


        cabin.position.z =
            0.05;


        cabin.castShadow =
            true;


        car.add(
            cabin
        );


        // ----------------------------------------------------
        // WINDSHIELD
        // ----------------------------------------------------

        const windshieldGeometry =
            new THREE.BoxGeometry(
                1.35,
                0.42,
                0.05
            );


        const windshieldMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x5c8290,

                roughness: 0.2,

                metalness: 0.45,

                transparent: true,

                opacity: 0.85

            });


        const windshield =
            new THREE.Mesh(
                windshieldGeometry,
                windshieldMaterial
            );


        windshield.position.set(
            0,
            1.08,
            -0.92
        );


        windshield.rotation.x =
            -0.05;


        car.add(
            windshield
        );


        // ----------------------------------------------------
        // REAR WINDOW
        // ----------------------------------------------------

        const rearWindow =
            windshield.clone();


        rearWindow.position.z =
            0.98;


        rearWindow.rotation.x =
            0.05;


        car.add(
            rearWindow
        );


        // ----------------------------------------------------
        // BLUE POLICE STRIPE
        // ----------------------------------------------------

        const stripeGeometry =
            new THREE.BoxGeometry(
                2.16,
                0.12,
                3.1
            );


        const stripeMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x173d66,

                roughness: 0.55,

                metalness: 0.15

            });


        const stripe =
            new THREE.Mesh(
                stripeGeometry,
                stripeMaterial
            );


        stripe.position.y =
            0.64;


        car.add(
            stripe
        );


        // ----------------------------------------------------
        // POLICE TEXT PANEL
        // ----------------------------------------------------

        const panelGeometry =
            new THREE.BoxGeometry(
                1.35,
                0.3,
                0.05
            );


        const panelMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xeeeeee,

                roughness: 0.8

            });


        const panel =
            new THREE.Mesh(
                panelGeometry,
                panelMaterial
            );


        panel.position.set(
            0,
            0.76,
            -2.01
        );


        car.add(
            panel
        );


        // ----------------------------------------------------
        // WHEELS
        // ----------------------------------------------------

        this.createWheels(
            car
        );


        // ----------------------------------------------------
        // HEADLIGHTS
        // ----------------------------------------------------

        this.createHeadlights(
            car
        );


        // ----------------------------------------------------
        // TAIL LIGHTS
        // ----------------------------------------------------

        this.createTailLights(
            car
        );


        // ----------------------------------------------------
        // POLICE LIGHT BAR
        // ----------------------------------------------------

        const lightBar =
            this.createLightBar();


        lightBar.position.y =
            1.55;


        car.add(
            lightBar
        );


        car.userData = {

            speed:
                this.chaseSpeed,

            target:
                null,

            active:
                true,

            lights:
                lightBar.userData

        };


        car.position.copy(
            position
        );


        this.cityGroup.add(
            car
        );


        this.policeCars.push(
            car
        );


        return car;

    }


    // ========================================================
    // WHEELS
    // ========================================================

    createWheels(car) {

        const wheelGeometry =
            new THREE.CylinderGeometry(
                0.38,
                0.38,
                0.25,
                12
            );


        const wheelMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x111315,

                roughness: 0.9,

                metalness: 0.05

            });


        const wheelPositions = [

            [-1.05, 0.4, -1.25],

            [1.05, 0.4, -1.25],

            [-1.05, 0.4, 1.25],

            [1.05, 0.4, 1.25]

        ];


        wheelPositions.forEach(
            (position) => {

                const wheel =
                    new THREE.Mesh(
                        wheelGeometry,
                        wheelMaterial
                    );


                wheel.rotation.z =
                    Math.PI / 2;


                wheel.position.set(
                    position[0],
                    position[1],
                    position[2]
                );


                wheel.castShadow =
                    true;


                car.add(
                    wheel
                );

            }
        );

    }


    // ========================================================
    // HEADLIGHTS
    // ========================================================

    createHeadlights(car) {

        const geometry =
            new THREE.BoxGeometry(
                0.38,
                0.18,
                0.08
            );


        const material =
            new THREE.MeshStandardMaterial({

                color: 0xffffff,

                emissive: 0xffffff,

                emissiveIntensity: 1.4

            });


        const left =
            new THREE.Mesh(
                geometry,
                material
            );


        left.position.set(
            -0.68,
            0.68,
            -2.04
        );


        car.add(
            left
        );


        const right =
            left.clone();


        right.position.x =
            0.68;


        car.add(
            right
        );

    }


    // ========================================================
    // TAIL LIGHTS
    // ========================================================

    createTailLights(car) {

        const geometry =
            new THREE.BoxGeometry(
                0.4,
                0.18,
                0.08
            );


        const material =
            new THREE.MeshStandardMaterial({

                color: 0xc91616,

                emissive: 0x8b0000,

                emissiveIntensity: 0.7

            });


        const left =
            new THREE.Mesh(
                geometry,
                material
            );


        left.position.set(
            -0.68,
            0.68,
            2.04
        );


        car.add(
            left
        );


        const right =
            left.clone();


        right.position.x =
            0.68;


        car.add(
            right
        );

    }


    // ========================================================
    // LIGHT BAR
    // ========================================================

    createLightBar() {

        const group =
            new THREE.Group();


        const baseGeometry =
            new THREE.BoxGeometry(
                1.15,
                0.12,
                0.3
            );


        const baseMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x202326,

                roughness: 0.55,

                metalness: 0.5

            });


        const base =
            new THREE.Mesh(
                baseGeometry,
                baseMaterial
            );


        group.add(
            base
        );


        // ----------------------------------------------------
        // RED LIGHT
        // ----------------------------------------------------

        const redGeometry =
            new THREE.BoxGeometry(
                0.5,
                0.18,
                0.28
            );


        const redMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xff1717,

                emissive: 0xff0000,

                emissiveIntensity: 1.5

            });


        const red =
            new THREE.Mesh(
                redGeometry,
                redMaterial
            );


        red.position.x =
            -0.29;


        red.userData.isRedLight =
            true;


        group.add(
            red
        );


        // ----------------------------------------------------
        // BLUE LIGHT
        // ----------------------------------------------------

        const blueGeometry =
            new THREE.BoxGeometry(
                0.5,
                0.18,
                0.28
            );


        const blueMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x176dff,

                emissive: 0x0055ff,

                emissiveIntensity: 1.5

            });


        const blue =
            new THREE.Mesh(
                blueGeometry,
                blueMaterial
            );


        blue.position.x =
            0.29;


        blue.userData.isBlueLight =
            true;


        group.add(
            blue
        );


        group.userData = {

            redLight:
                red,

            blueLight:
                blue

        };


        return group;

    }


    // ========================================================
    // UPDATE LIGHTS
    // ========================================================

    updateLights() {

        this.policeCars.forEach(
            (car) => {

                const lights =
                    car.userData.lights;


                if (!lights) {

                    return;

                }


                const phase =
                    Math.floor(
                        this.time * 8
                    ) % 2;


                if (
                    phase === 0
                ) {

                    lights.redLight.visible =
                        true;

                    lights.blueLight.visible =
                        false;

                } else {

                    lights.redLight.visible =
                        false;

                    lights.blueLight.visible =
                        true;

                }

            }
        );

    }


    // ========================================================
    // UPDATE POLICE CARS
    // ========================================================

    updatePoliceCars(
        deltaTime
    ) {

        this.policeCars.forEach(
            (car) => {

                if (
                    !car.userData.active
                ) {

                    return;

                }


                if (
                    !this.playerPosition
                ) {

                    return;

                }


                const target =
                    this.playerPosition;


                const direction =
                    new THREE.Vector3();


                direction.subVectors(
                    target,
                    car.position
                );


                direction.y =
                    0;


                const distance =
                    direction.length();


                if (
                    distance < 0.01
                ) {

                    return;

                }


                direction.normalize();


                // ------------------------------------------------
                // TURN TOWARDS PLAYER
                // ------------------------------------------------

                const targetRotation =
                    Math.atan2(
                        direction.x,
                        direction.z
                    );


                let rotationDifference =
                    targetRotation -
                    car.rotation.y;


                while (
                    rotationDifference >
                    Math.PI
                ) {

                    rotationDifference -=
                        Math.PI * 2;

                }


                while (
                    rotationDifference <
                    -Math.PI
                ) {

                    rotationDifference +=
                        Math.PI * 2;

                }


                car.rotation.y +=
                    rotationDifference *
                    Math.min(
                        deltaTime * 3,
                        1
                    );


                // ------------------------------------------------
                // CHASE
                // ------------------------------------------------

                if (
                    distance >
                    5
                ) {

                    const speed =
                        car.userData.speed;


                    car.position.x +=
                        direction.x *
                        speed *
                        deltaTime;


                    car.position.z +=
                        direction.z *
                        speed *
                        deltaTime;

                }


                // ------------------------------------------------
                // ALERT
                // ------------------------------------------------

                if (
                    distance <
                    12
                ) {

                    this.triggerAlert();

                }

            }
        );

    }


    // ========================================================
    // SPAWN POLICE
    // ========================================================

    spawnPolice(
        playerPosition = null
    ) {

        if (
            !this.initialized
        ) {

            return null;

        }


        if (
            this.policeCars.length >=
            this.maxPoliceCars
        ) {

            return null;

        }


        const position =
            new THREE.Vector3();


        if (
            playerPosition
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            position.x =
                playerPosition.x +
                Math.cos(angle) *
                this.spawnDistance;


            position.z =
                playerPosition.z +
                Math.sin(angle) *
                this.spawnDistance;


        } else {

            position.set(
                15,
                0,
                15
            );

        }


        position.y =
            0;


        return this.createPoliceCar(
            position
        );

    }


    // ========================================================
    // REMOVE POLICE
    // ========================================================

    removePolice(
        car
    ) {

        if (!car) {

            return;

        }


        const index =
            this.policeCars.indexOf(
                car
            );


        if (
            index === -1
        ) {

            return;

        }


        this.cityGroup.remove(
            car
        );


        this.policeCars.splice(
            index,
            1
        );

    }


    // ========================================================
    // ALERT
    // ========================================================

    triggerAlert() {

        this.alert =
            true;

        this.alertTimer =
            3;


        // ----------------------------------------------------
        // Browser event for UI popup
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
                                "POLICE APPROACHING!",
                            duration:
                                3000
                        }
                    }
                )
            );

        }

    }


    // ========================================================
    // IS ALERT ACTIVE
    // ========================================================

    isAlertActive() {

        return this.alert;

    }


    // ========================================================
    // GET POLICE COUNT
    // ========================================================

    getPoliceCount() {

        return this.policeCars.length;

    }


    // ========================================================
    // GET POLICE CARS
    // ========================================================

    getPoliceCars() {

        return this.policeCars;

    }


    // ========================================================
    // CLEAR ALL POLICE
    // ========================================================

    clearPolice() {

        this.policeCars.forEach(
            (car) => {

                this.cityGroup.remove(
                    car
                );

            }
        );


        this.policeCars =
            [];

        this.alert =
            false;

        this.alertTimer =
            0;

    }


    // ========================================================
    // DESTROY
    // ========================================================

    destroy() {

        this.clearPolice();


        if (
            this.scene &&
            this.cityGroup
        ) {

            this.scene.remove(
                this.cityGroup
            );

        }


        this.cityGroup =
            null;

        this.scene =
            null;

        this.playerPosition =
            null;

        this.initialized =
            false;

        this.time =
            0;

    }

}


// ============================================================
// SINGLE POLICE INSTANCE
// ============================================================

const police =
    new Police();


// ============================================================
// EXPORT
// ============================================================

export default police;