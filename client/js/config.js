// =========================================================
// AI INFINITE CYBER CITY
// Lightweight Edition
// Game Configuration
// =========================================================


// =========================================================
// GAME CONFIGURATION
// =========================================================

const CONFIG = {

    // -----------------------------------------------------
    // GAME INFORMATION
    // -----------------------------------------------------

    GAME_NAME:
        "AI Infinite Cyber City",

    VERSION:
        "1.0.0",

    EDITION:
        "Lightweight Final Year Edition",


    // -----------------------------------------------------
    // RENDERING
    // -----------------------------------------------------

    RENDER: {

        antialias:
            true,

        shadows:
            false,

        pixelRatio:
            Math.min(
                window.devicePixelRatio || 1,
                1.5
            ),

        maxPixelRatio:
            1.5,

        clearColor:
            0x050b12

    },


    // -----------------------------------------------------
    // CAMERA
    // -----------------------------------------------------

    CAMERA: {

        fieldOfView:
            65,

        near:
            0.1,

        far:
            600,

        height:
            5.5,

        distance:
            8

    },


    // -----------------------------------------------------
    // CITY
    // -----------------------------------------------------

    CITY: {

        // Small city for good performance
        size:
            220,

        roadWidth:
            12,

        blockSize:
            32,

        buildingCount:
            28,

        buildingMinHeight:
            8,

        buildingMaxHeight:
            28,

        buildingMinWidth:
            8,

        buildingMaxWidth:
            18,

        buildingMinDepth:
            8,

        buildingMaxDepth:
            18,

        streetLightCount:
            20

    },


    // -----------------------------------------------------
    // PLAYER
    // -----------------------------------------------------

    PLAYER: {

        startX:
            0,

        startY:
            1,

        startZ:
            35,

        height:
            2,

        radius:
            0.7,

        walkSpeed:
            8,

        runSpeed:
            13,

        acceleration:
            30,

        friction:
            12,

        maxHealth:
            100,

        mouseSensitivity:
            0.0025,

        cameraHeight:
            4.8,

        cameraDistance:
            7

    },


    // -----------------------------------------------------
    // POLICE
    // -----------------------------------------------------

    POLICE: {

        enabled:
            true,

        count:
            1,

        detectionDistance:
            45,

        chaseDistance:
            70,

        stopDistance:
            3,

        speed:
            5.5,

        maxSpeed:
            7,

        damageDistance:
            3.5,

        damageCooldown:
            1.2,

        spawnDistance:
            35

    },


    // -----------------------------------------------------
    // WANTED SYSTEM
    // -----------------------------------------------------

    WANTED: {

        maxLevel:
            5,

        detectionIncrease:
            1,

        decayDelay:
            12,

        decayRate:
            1

    },


    // -----------------------------------------------------
    // MISSION
    // -----------------------------------------------------

    MISSION: {

        name:
            "Cyber Data Heist",

        startX:
            0,

        startY:
            1,

        startZ:
            35,

        targetX:
            65,

        targetY:
            1,

        targetZ:
            -55,

        escapeX:
            -65,

        escapeY:
            1,

        escapeZ:
            55,

        targetRadius:
            7,

        escapeRadius:
            9,

        policeAlertDistance:
            25

    },


    // -----------------------------------------------------
    // LIGHTING
    // -----------------------------------------------------

    LIGHTING: {

        ambientIntensity:
            1.4,

        directionalIntensity:
            1.8,

        hemisphereIntensity:
            1.0,

        sunHeight:
            80,

        sunDistance:
            120

    },


    // -----------------------------------------------------
    // SKY
    // -----------------------------------------------------

    SKY: {

        topColor:
            0x050b18,

        bottomColor:
            0x111827,

        fogColor:
            0x08111c,

        fogNear:
            120,

        fogFar:
            400

    },


    // -----------------------------------------------------
    // COLORS
    // -----------------------------------------------------

    COLORS: {

        ground:
            0x071018,

        road:
            0x111820,

        roadLine:
            0x273742,

        building:
            0x182633,

        buildingDark:
            0x101a24,

        window:
            0x00d9ff,

        windowWarm:
            0xffc857,

        player:
            0x00e5ff,

        police:
            0xff334f,

        mission:
            0x35ff7a,

        missionEscape:
            0xffd23f,

        streetLight:
            0x9be7ff

    },


    // -----------------------------------------------------
    // GAMEPLAY
    // -----------------------------------------------------

    GAMEPLAY: {

        gravity:
            20,

        interactionDistance:
            5,

        missionCompleteDelay:
            1000,

        gameOverDelay:
            1000

    },


    // -----------------------------------------------------
    // PERFORMANCE
    // -----------------------------------------------------

    PERFORMANCE: {

        maxBuildings:
            28,

        maxPolice:
            1,

        maxLights:
            20,

        shadows:
            false,

        postProcessing:
            false,

        particles:
            false,

        reflections:
            false,

        dynamicCityStreaming:
            false,

        proceduralWorld:
            false

    }

};


// =========================================================
// FREEZE CONFIGURATION
// =========================================================

Object.freeze(
    CONFIG
);


Object.freeze(
    CONFIG.RENDER
);

Object.freeze(
    CONFIG.CAMERA
);

Object.freeze(
    CONFIG.CITY
);

Object.freeze(
    CONFIG.PLAYER
);

Object.freeze(
    CONFIG.POLICE
);

Object.freeze(
    CONFIG.WANTED
);

Object.freeze(
    CONFIG.MISSION
);

Object.freeze(
    CONFIG.LIGHTING
);

Object.freeze(
    CONFIG.SKY
);

Object.freeze(
    CONFIG.COLORS
);

Object.freeze(
    CONFIG.GAMEPLAY
);

Object.freeze(
    CONFIG.PERFORMANCE
);


// =========================================================
// EXPORT
// =========================================================

export default CONFIG;