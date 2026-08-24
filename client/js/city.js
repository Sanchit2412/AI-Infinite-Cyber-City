// ============================================================
// AI INFINITE CYBER CITY
// Lightweight Realistic City
// ============================================================

import * as THREE from "../libs/three.module.js";


// ============================================================
// CITY CLASS
// ============================================================

class City {

    constructor() {

        this.scene = null;

        this.cityGroup = null;

        this.buildings = [];

        this.roads = [];

        this.coins = [];

        this.streetLights = [];

        this.initialized = false;

        this.coinCount = 0;

        this.coinCollectionDistance = 1.8;

        this.coinRotationSpeed = 2.5;

        this.time = 0;
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
                "City requires a Three.js scene."
            );

            return;
        }

        this.cityGroup = new THREE.Group();

        this.cityGroup.name = "CyberCity";

        this.scene.add(this.cityGroup);

        this.createEnvironment();

        this.createGround();

        this.createRoadNetwork();

        this.createBuildings();

        this.createStreetLights();

        this.createCoins();

        this.initialized = true;

        console.log(
            "Realistic lightweight city initialized."
        );
    }


    // ========================================================
    // ENVIRONMENT
    // ========================================================

    createEnvironment() {

        this.scene.background =
            new THREE.Color(0x8fb4c8);

        this.scene.fog =
            new THREE.Fog(
                0x8fb4c8,
                45,
                150
            );

        const hemisphere =
            new THREE.HemisphereLight(
                0xddeeff,
                0x506050,
                2.0
            );

        this.scene.add(hemisphere);

        const sun =
            new THREE.DirectionalLight(
                0xfff3dc,
                3.0
            );

        sun.position.set(
            35,
            60,
            25
        );

        sun.castShadow = true;

        sun.shadow.mapSize.width = 1024;

        sun.shadow.mapSize.height = 1024;

        sun.shadow.camera.left = -70;

        sun.shadow.camera.right = 70;

        sun.shadow.camera.top = 70;

        sun.shadow.camera.bottom = -70;

        this.scene.add(sun);
    }


    // ========================================================
    // GROUND
    // ========================================================

    createGround() {

        const groundGeometry =
            new THREE.PlaneGeometry(
                180,
                180
            );

        const groundMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x60745b,

                roughness: 0.95,

                metalness: 0.0
            });

        const ground =
            new THREE.Mesh(
                groundGeometry,
                groundMaterial
            );

        ground.rotation.x =
            -Math.PI / 2;

        ground.position.y = -0.02;

        ground.receiveShadow = true;

        this.cityGroup.add(ground);


        // CITY EDGE

        const edgeGeometry =
            new THREE.BoxGeometry(
                180,
                0.2,
                180
            );

        const edgeMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x4e6150,

                roughness: 1
            });

        const edge =
            new THREE.Mesh(
                edgeGeometry,
                edgeMaterial
            );

        edge.position.y = -0.15;

        this.cityGroup.add(edge);
    }


    // ========================================================
    // ROAD NETWORK
    // ========================================================

    createRoadNetwork() {

        const roadColor = 0x363b3e;

        // MAIN HORIZONTAL ROAD

        this.createRoad(
            0,
            0,
            120,
            9,
            roadColor
        );


        // MAIN VERTICAL ROAD

        this.createRoad(
            0,
            0,
            9,
            120,
            roadColor
        );


        // SECONDARY HORIZONTAL ROADS

        this.createRoad(
            0,
            -30,
            120,
            7,
            roadColor
        );

        this.createRoad(
            0,
            30,
            120,
            7,
            roadColor
        );


        // SECONDARY VERTICAL ROADS

        this.createRoad(
            -30,
            0,
            7,
            120,
            roadColor
        );

        this.createRoad(
            30,
            0,
            7,
            120,
            roadColor
        );


        // SIDEWALKS

        this.createSidewalk(
            0,
            -5.7,
            120,
            2.2
        );

        this.createSidewalk(
            0,
            5.7,
            120,
            2.2
        );

        this.createSidewalk(
            -5.7,
            0,
            2.2,
            120
        );

        this.createSidewalk(
            5.7,
            0,
            2.2,
            120
        );

        this.createSidewalk(
            0,
            -34.7,
            120,
            1.8
        );

        this.createSidewalk(
            0,
            -25.3,
            120,
            1.8
        );

        this.createSidewalk(
            0,
            25.3,
            120,
            1.8
        );

        this.createSidewalk(
            0,
            34.7,
            120,
            1.8
        );

        this.createSidewalk(
            -34.7,
            0,
            1.8,
            120
        );

        this.createSidewalk(
            -25.3,
            0,
            1.8,
            120
        );

        this.createSidewalk(
            25.3,
            0,
            1.8,
            120
        );

        this.createSidewalk(
            34.7,
            0,
            1.8,
            120
        );


        // ROAD MARKINGS

        this.createRoadMarkings();
    }


    // ========================================================
    // CREATE ROAD
    // ========================================================

    createRoad(
        x,
        z,
        width,
        depth,
        color
    ) {

        const geometry =
            new THREE.BoxGeometry(
                width,
                0.08,
                depth
            );

        const material =
            new THREE.MeshStandardMaterial({

                color: color,

                roughness: 0.92,

                metalness: 0.0
            });

        const road =
            new THREE.Mesh(
                geometry,
                material
            );

        road.position.set(
            x,
            0.02,
            z
        );

        road.receiveShadow = true;

        this.cityGroup.add(road);

        this.roads.push(road);
    }


    // ========================================================
    // SIDEWALK
    // ========================================================

    createSidewalk(
        x,
        z,
        width,
        depth
    ) {

        const geometry =
            new THREE.BoxGeometry(
                width,
                0.16,
                depth
            );

        const material =
            new THREE.MeshStandardMaterial({

                color: 0xb1aea3,

                roughness: 0.9
            });

        const sidewalk =
            new THREE.Mesh(
                geometry,
                material
            );

        sidewalk.position.set(
            x,
            0.09,
            z
        );

        sidewalk.receiveShadow = true;

        this.cityGroup.add(sidewalk);
    }


    // ========================================================
    // ROAD MARKINGS
    // ========================================================

    createRoadMarkings() {

        const markingMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xe5d98b,

                roughness: 0.8
            });


        // HORIZONTAL

        for (
            let x = -55;
            x <= 55;
            x += 8
        ) {

            this.createMarking(
                x,
                0,
                4,
                0.12,
                markingMaterial
            );
        }


        // VERTICAL

        for (
            let z = -55;
            z <= 55;
            z += 8
        ) {

            this.createMarking(
                0,
                z,
                0.12,
                4,
                markingMaterial
            );
        }


        // SECONDARY HORIZONTAL

        for (
            let x = -55;
            x <= 55;
            x += 8
        ) {

            this.createMarking(
                x,
                -30,
                4,
                0.10,
                markingMaterial
            );

            this.createMarking(
                x,
                30,
                4,
                0.10,
                markingMaterial
            );
        }


        // SECONDARY VERTICAL

        for (
            let z = -55;
            z <= 55;
            z += 8
        ) {

            this.createMarking(
                -30,
                z,
                0.10,
                4,
                markingMaterial
            );

            this.createMarking(
                30,
                z,
                0.10,
                4,
                markingMaterial
            );
        }
    }


    // ========================================================
    // MARKING
    // ========================================================

    createMarking(
        x,
        z,
        width,
        depth,
        material
    ) {

        const geometry =
            new THREE.BoxGeometry(
                width,
                0.025,
                depth
            );

        const marking =
            new THREE.Mesh(
                geometry,
                material
            );

        marking.position.set(
            x,
            0.075,
            z
        );

        this.cityGroup.add(marking);
    }


    // ========================================================
    // BUILDINGS
    // ========================================================

    createBuildings() {

        const positions = [

            [-18, -18],
            [-9, -18],
            [9, -18],
            [18, -18],

            [-18, -9],
            [-9, -9],
            [9, -9],
            [18, -9],

            [-18, 9],
            [-9, 9],
            [9, 9],
            [18, 9],

            [-18, 18],
            [-9, 18],
            [9, 18],
            [18, 18],

            [-42, -18],
            [-42, 0],
            [-42, 18],

            [42, -18],
            [42, 0],
            [42, 18],

            [-18, -42],
            [0, -42],
            [18, -42],

            [-18, 42],
            [0, 42],
            [18, 42]
        ];


        positions.forEach(
            (position, index) => {

                const x = position[0];

                const z = position[1];

                const width =
                    5 +
                    (index % 3) *
                    0.7;

                const depth =
                    5 +
                    (index % 2) *
                    0.8;

                const height =
                    5 +
                    (index % 5) *
                    2.2;

                this.createBuilding(
                    x,
                    z,
                    width,
                    depth,
                    height,
                    index
                );
            }
        );
    }


    // ========================================================
    // CREATE BUILDING
    // ========================================================

    createBuilding(
        x,
        z,
        width,
        depth,
        height,
        index
    ) {

        const colors = [

            0x8a8d8c,
            0x72787b,
            0x9a9186,
            0x6e777a,
            0x857d72,
            0x777c80
        ];

        const color =
            colors[
                index % colors.length
            ];


        // BUILDING

        const geometry =
            new THREE.BoxGeometry(
                width,
                height,
                depth
            );

        const material =
            new THREE.MeshStandardMaterial({

                color: color,

                roughness: 0.82,

                metalness: 0.08
            });

        const building =
            new THREE.Mesh(
                geometry,
                material
            );

        building.position.set(
            x,
            height / 2,
            z
        );

        building.castShadow = true;

        building.receiveShadow = true;

        this.cityGroup.add(building);

        this.buildings.push(building);


        // ROOF

        const roofGeometry =
            new THREE.BoxGeometry(
                width + 0.15,
                0.18,
                depth + 0.15
            );

        const roofMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x4a4d4e,

                roughness: 0.9
            });

        const roof =
            new THREE.Mesh(
                roofGeometry,
                roofMaterial
            );

        roof.position.set(
            x,
            height + 0.09,
            z
        );

        this.cityGroup.add(roof);


        // WINDOWS

        this.createWindows(
            x,
            z,
            width,
            depth,
            height,
            index
        );


        // ENTRANCE

        this.createEntrance(
            x,
            z,
            width,
            height
        );


        // ROOFTOP UNIT

        if (index % 2 === 0) {

            this.createRoofUnit(
                x,
                z,
                width,
                depth,
                height
            );
        }
    }


    // ========================================================
    // WINDOWS
    // ========================================================

    createWindows(
        x,
        z,
        width,
        depth,
        height,
        index
    ) {

        const windowMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x496b78,

                roughness: 0.25,

                metalness: 0.35
            });

        const windowWidth = 0.55;

        const windowHeight = 0.42;

        const spacing = 1.35;


        // FRONT / BACK

        for (
            let y = 1.2;
            y < height - 0.5;
            y += 1.25
        ) {

            for (
                let wx =
                    -width / 2 + 0.75;

                wx < width / 2;

                wx += spacing
            ) {

                const geometry =
                    new THREE.BoxGeometry(
                        windowWidth,
                        windowHeight,
                        0.05
                    );

                const frontWindow =
                    new THREE.Mesh(
                        geometry,
                        windowMaterial
                    );

                frontWindow.position.set(
                    x + wx,
                    y,
                    z - depth / 2 - 0.03
                );

                this.cityGroup.add(
                    frontWindow
                );


                const rearWindow =
                    frontWindow.clone();

                rearWindow.position.z =
                    z +
                    depth / 2 +
                    0.03;

                this.cityGroup.add(
                    rearWindow
                );
            }
        }


        // LEFT / RIGHT

        for (
            let y = 1.2;
            y < height - 0.5;
            y += 1.25
        ) {

            for (
                let wz =
                    -depth / 2 + 0.75;

                wz < depth / 2;

                wz += spacing
            ) {

                const geometry =
                    new THREE.BoxGeometry(
                        0.05,
                        windowHeight,
                        windowWidth
                    );

                const leftWindow =
                    new THREE.Mesh(
                        geometry,
                        windowMaterial
                    );

                leftWindow.position.set(
                    x - width / 2 - 0.03,
                    y,
                    z + wz
                );

                this.cityGroup.add(
                    leftWindow
                );


                const rightWindow =
                    leftWindow.clone();

                rightWindow.position.x =
                    x +
                    width / 2 +
                    0.03;

                this.cityGroup.add(
                    rightWindow
                );
            }
        }
    }


    // ========================================================
    // ENTRANCE
    // ========================================================

    createEntrance(
        x,
        z,
        width,
        height
    ) {

        const doorGeometry =
            new THREE.BoxGeometry(
                0.9,
                1.5,
                0.08
            );

        const doorMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x26383e,

                roughness: 0.35,

                metalness: 0.25
            });

        const door =
            new THREE.Mesh(
                doorGeometry,
                doorMaterial
            );

        door.position.set(
            x,
            0.76,
            z - 2.53
        );

        this.cityGroup.add(door);
    }


    // ========================================================
    // ROOFTOP UNIT
    // ========================================================

    createRoofUnit(
        x,
        z,
        width,
        depth,
        height
    ) {

        const unitGeometry =
            new THREE.BoxGeometry(
                1.0,
                0.5,
                0.8
            );

        const unitMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x52575a,

                roughness: 0.85
            });

        const unit =
            new THREE.Mesh(
                unitGeometry,
                unitMaterial
            );

        unit.position.set(
            x,
            height + 0.4,
            z
        );

        this.cityGroup.add(unit);
    }


    // ========================================================
    // STREET LIGHTS
    // ========================================================

    createStreetLights() {

        const positions = [

            [-7.5, -20],
            [7.5, -20],

            [-7.5, 20],
            [7.5, 20],

            [-20, -7.5],
            [-20, 7.5],

            [20, -7.5],
            [20, 7.5],

            [-37, -7],
            [-37, 7],

            [37, -7],
            [37, 7],

            [-7, -37],
            [7, -37],

            [-7, 37],
            [7, 37]
        ];


        positions.forEach(
            (position) => {

                this.createStreetLight(
                    position[0],
                    position[1]
                );
            }
        );
    }


    // ========================================================
    // CREATE STREET LIGHT
    // ========================================================

    createStreetLight(
        x,
        z
    ) {

        const group =
            new THREE.Group();


        // POLE

        const poleGeometry =
            new THREE.CylinderGeometry(
                0.06,
                0.08,
                3.3,
                8
            );

        const poleMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x454a4c,

                roughness: 0.75,

                metalness: 0.4
            });

        const pole =
            new THREE.Mesh(
                poleGeometry,
                poleMaterial
            );

        pole.position.y = 1.65;

        group.add(pole);


        // ARM

        const armGeometry =
            new THREE.BoxGeometry(
                0.65,
                0.06,
                0.06
            );

        const arm =
            new THREE.Mesh(
                armGeometry,
                poleMaterial
            );

        arm.position.set(
            0.28,
            3.15,
            0
        );

        group.add(arm);


        // LIGHT

        const lightGeometry =
            new THREE.BoxGeometry(
                0.25,
                0.08,
                0.18
            );

        const lightMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xfff1bd,

                emissive: 0xffd96a,

                emissiveIntensity: 0.8
            });

        const lamp =
            new THREE.Mesh(
                lightGeometry,
                lightMaterial
            );

        lamp.position.set(
            0.58,
            3.12,
            0
        );

        group.add(lamp);


        group.position.set(
            x,
            0,
            z
        );

        this.cityGroup.add(group);

        this.streetLights.push(group);
    }


    // ========================================================
    // COINS
    // ========================================================

    createCoins() {

        const coinPositions = [

            [-15, -2],
            [-8, -2],
            [8, -2],
            [15, -2],

            [-2, -15],
            [-2, -8],
            [-2, 8],
            [-2, 15],

            [15, 2],
            [8, 2],
            [-8, 2],
            [-15, 2],

            [2, -15],
            [2, -8],
            [2, 8],
            [2, 15],

            [-27, -2],
            [-21, -2],
            [21, -2],
            [27, -2],

            [-2, -27],
            [-2, -21],
            [2, 21],
            [2, 27]
        ];


        coinPositions.forEach(
            (
                position,
                index
            ) => {

                this.createCoin(
                    position[0],
                    position[1],
                    index
                );
            }
        );
    }


    // ========================================================
    // CREATE COIN
    // ========================================================

    createCoin(
        x,
        z,
        index
    ) {

        const geometry =
            new THREE.CylinderGeometry(
                0.32,
                0.32,
                0.12,
                16
            );

        const material =
            new THREE.MeshStandardMaterial({

                color: 0xf5b942,

                emissive: 0x7a4f00,

                emissiveIntensity: 0.35,

                roughness: 0.3,

                metalness: 0.7
            });

        const coin =
            new THREE.Mesh(
                geometry,
                material
            );

        coin.rotation.z =
            Math.PI / 2;

        coin.position.set(
            x,
            0.55,
            z
        );

        coin.castShadow = true;

        coin.userData = {

            collected: false,

            value: 1,

            index: index
        };

        this.cityGroup.add(coin);

        this.coins.push(coin);
    }


    // ========================================================
    // UPDATE
    // ========================================================

    update(
        deltaTime = 0.016,
        playerPosition = null
    ) {

        if (!this.initialized) {
            return 0;
        }

        deltaTime =
            Math.min(
                Math.max(
                    deltaTime,
                    0
                ),
                0.05
            );

        this.time += deltaTime;


        // ROTATE / FLOAT COINS

        this.coins.forEach(
            (coin) => {

                if (
                    coin.userData.collected
                ) {
                    return;
                }

                coin.rotation.y +=
                    this.coinRotationSpeed *
                    deltaTime;

                coin.position.y =
                    0.55 +
                    Math.sin(
                        this.time * 3 +
                        coin.userData.index
                    ) *
                    0.08;
            }
        );


        // COLLECT COINS

        let collectedThisFrame = 0;

        if (playerPosition) {

            this.coins.forEach(
                (coin) => {

                    if (
                        coin.userData.collected
                    ) {
                        return;
                    }

                    const distance =
                        coin.position.distanceTo(
                            playerPosition
                        );

                    if (
                        distance <=
                        this.coinCollectionDistance
                    ) {

                        coin.userData.collected =
                            true;

                        coin.visible = false;

                        this.coinCount +=
                            coin.userData.value;

                        collectedThisFrame +=
                            coin.userData.value;
                    }
                }
            );
        }

        return collectedThisFrame;
    }


    // ========================================================
    // GET COIN COUNT
    // ========================================================

    getCoinCount() {

        return this.coinCount;
    }


    // ========================================================
    // RESET COINS
    // ========================================================

    resetCoins() {

        this.coinCount = 0;

        this.coins.forEach(
            (coin) => {

                coin.userData.collected =
                    false;

                coin.visible = true;
            }
        );
    }


    // ========================================================
    // GET COINS
    // ========================================================

    getCoins() {

        return this.coins;
    }


    // ========================================================
    // DESTROY
    // ========================================================

    destroy() {

        if (
            this.scene &&
            this.cityGroup
        ) {

            this.scene.remove(
                this.cityGroup
            );
        }

        this.buildings = [];

        this.roads = [];

        this.coins = [];

        this.streetLights = [];

        this.cityGroup = null;

        this.scene = null;

        this.initialized = false;

        this.coinCount = 0;

        this.time = 0;
    }
}


// ============================================================
// SINGLETON
// ============================================================

const cityInstance = new City();


// ============================================================
// COMPATIBILITY FUNCTIONS
// ============================================================
//
// These allow the game to work whether game.js uses:
//
//     city.initialize(scene)
//
// or:
//
//     import City from "./city.js";
//     const city = new City();
//
// ============================================================

export function initialize(scene) {
    return cityInstance.initialize(scene);
}

export function update(
    deltaTime = 0.016,
    playerPosition = null
) {
    return cityInstance.update(
        deltaTime,
        playerPosition
    );
}

export function getCoinCount() {
    return cityInstance.getCoinCount();
}

export function resetCoins() {
    return cityInstance.resetCoins();
}

export function getCoins() {
    return cityInstance.getCoins();
}

export function destroy() {
    return cityInstance.destroy();
}

export { City };

export default City;