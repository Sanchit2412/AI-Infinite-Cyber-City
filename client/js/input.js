// =========================================================
// AI INFINITE CYBER CITY
// Lightweight Edition
// Input Controller
// =========================================================

class InputController {

    constructor() {

        // -------------------------------------------------
        // Keyboard state
        // -------------------------------------------------

        this.keys = new Set();

        this.justPressed = new Set();

        this.justReleased = new Set();


        // -------------------------------------------------
        // Mouse state
        // -------------------------------------------------

        this.mouse = {

            x: 0,

            y: 0,

            movementX: 0,

            movementY: 0,

            left: false,

            right: false,

            middle: false

        };


        // -------------------------------------------------
        // Pointer lock
        // -------------------------------------------------

        this.pointerLocked = false;


        // -------------------------------------------------
        // Enabled state
        // -------------------------------------------------

        this.enabled = true;


        // -------------------------------------------------
        // Canvas
        // -------------------------------------------------

        this.canvas = null;


        // -------------------------------------------------
        // Bound event handlers
        // -------------------------------------------------

        this.boundKeyDown =
            (event) =>
                this.handleKeyDown(event);


        this.boundKeyUp =
            (event) =>
                this.handleKeyUp(event);


        this.boundMouseDown =
            (event) =>
                this.handleMouseDown(event);


        this.boundMouseUp =
            (event) =>
                this.handleMouseUp(event);


        this.boundMouseMove =
            (event) =>
                this.handleMouseMove(event);


        this.boundPointerLockChange =
            () =>
                this.handlePointerLockChange();


        this.boundContextMenu =
            (event) =>
                event.preventDefault();


        // -------------------------------------------------
        // Initialize
        // -------------------------------------------------

        this.initialize();

    }


    // =====================================================
    // INITIALIZE
    // =====================================================

    initialize() {

        window.addEventListener(
            "keydown",
            this.boundKeyDown
        );


        window.addEventListener(
            "keyup",
            this.boundKeyUp
        );


        window.addEventListener(
            "mousedown",
            this.boundMouseDown
        );


        window.addEventListener(
            "mouseup",
            this.boundMouseUp
        );


        window.addEventListener(
            "mousemove",
            this.boundMouseMove
        );


        document.addEventListener(
            "pointerlockchange",
            this.boundPointerLockChange
        );


        window.addEventListener(
            "contextmenu",
            this.boundContextMenu
        );

    }


    // =====================================================
    // SET CANVAS
    // =====================================================

    setCanvas(canvas) {

        this.canvas = canvas;

    }


    // =====================================================
    // KEY DOWN
    // =====================================================

    handleKeyDown(event) {

        if (!this.enabled) {

            return;

        }


        const key =
            event.key.toLowerCase();


        // -------------------------------------------------
        // Prevent browser shortcuts during gameplay
        // -------------------------------------------------

        if (
            key === "w" ||
            key === "a" ||
            key === "s" ||
            key === "d" ||
            key === "e" ||
            key === "shift" ||
            key === "escape" ||
            key === " "
        ) {

            event.preventDefault();

        }


        if (
            !this.keys.has(key)
        ) {

            this.justPressed.add(
                key
            );

        }


        this.keys.add(
            key
        );

    }


    // =====================================================
    // KEY UP
    // =====================================================

    handleKeyUp(event) {

        if (!this.enabled) {

            return;

        }


        const key =
            event.key.toLowerCase();


        this.keys.delete(
            key
        );


        this.justReleased.add(
            key
        );

    }


    // =====================================================
    // MOUSE DOWN
    // =====================================================

    handleMouseDown(event) {

        if (!this.enabled) {

            return;

        }


        if (
            event.button === 0
        ) {

            this.mouse.left =
                true;

        }


        if (
            event.button === 1
        ) {

            this.mouse.middle =
                true;

        }


        if (
            event.button === 2
        ) {

            this.mouse.right =
                true;

        }


        // -------------------------------------------------
        // Request pointer lock when clicking game canvas
        // -------------------------------------------------

        if (
            this.canvas &&
            event.target === this.canvas &&
            !this.pointerLocked
        ) {

            this.requestPointerLock();

        }

    }


    // =====================================================
    // MOUSE UP
    // =====================================================

    handleMouseUp(event) {

        if (
            event.button === 0
        ) {

            this.mouse.left =
                false;

        }


        if (
            event.button === 1
        ) {

            this.mouse.middle =
                false;

        }


        if (
            event.button === 2
        ) {

            this.mouse.right =
                false;

        }

    }


    // =====================================================
    // MOUSE MOVE
    // =====================================================

    handleMouseMove(event) {

        if (!this.enabled) {

            return;

        }


        this.mouse.x =
            event.clientX;


        this.mouse.y =
            event.clientY;


        if (
            this.pointerLocked
        ) {

            this.mouse.movementX +=
                event.movementX;


            this.mouse.movementY +=
                event.movementY;

        }

    }


    // =====================================================
    // POINTER LOCK
    // =====================================================

    requestPointerLock() {

        if (
            !this.canvas
        ) {

            return;

        }


        if (
            document.pointerLockElement ===
            this.canvas
        ) {

            return;

        }


        if (
            typeof this.canvas.requestPointerLock ===
            "function"
        ) {

            this.canvas.requestPointerLock();

        }

    }


    // =====================================================
    // POINTER LOCK CHANGE
    // =====================================================

    handlePointerLockChange() {

        this.pointerLocked =
            document.pointerLockElement ===
            this.canvas;

    }


    // =====================================================
    // KEY IS DOWN
    // =====================================================

    isDown(key) {

        if (!key) {

            return false;

        }


        return this.keys.has(
            key.toLowerCase()
        );

    }


    // =====================================================
    // KEY JUST PRESSED
    // =====================================================

    isPressed(key) {

        if (!key) {

            return false;

        }


        return this.justPressed.has(
            key.toLowerCase()
        );

    }


    // =====================================================
    // KEY JUST RELEASED
    // =====================================================

    isReleased(key) {

        if (!key) {

            return false;

        }


        return this.justReleased.has(
            key.toLowerCase()
        );

    }


    // =====================================================
    // MOVEMENT
    // =====================================================

    getMovement() {

        let x = 0;

        let z = 0;


        if (
            this.isDown("a")
        ) {

            x -= 1;

        }


        if (
            this.isDown("d")
        ) {

            x += 1;

        }


        if (
            this.isDown("w")
        ) {

            z -= 1;

        }


        if (
            this.isDown("s")
        ) {

            z += 1;

        }


        // -------------------------------------------------
        // Normalize diagonal movement
        // -------------------------------------------------

        const length =
            Math.sqrt(
                x * x +
                z * z
            );


        if (
            length > 1
        ) {

            x /= length;

            z /= length;

        }


        return {

            x,

            z

        };

    }


    // =====================================================
    // RUNNING
    // =====================================================

    isRunning() {

        return this.isDown(
            "shift"
        );

    }


    // =====================================================
    // INTERACT
    // =====================================================

    wantsInteract() {

        return this.isPressed(
            "e"
        );

    }


    // =====================================================
    // PAUSE
    // =====================================================

    wantsPause() {

        return this.isPressed(
            "escape"
        );

    }


    // =====================================================
    // MOUSE DELTA
    // =====================================================

    getMouseDelta() {

        const delta = {

            x:
                this.mouse.movementX,

            y:
                this.mouse.movementY

        };


        this.mouse.movementX =
            0;


        this.mouse.movementY =
            0;


        return delta;

    }


    // =====================================================
    // LEFT MOUSE
    // =====================================================

    isLeftMouseDown() {

        return this.mouse.left;

    }


    // =====================================================
    // RIGHT MOUSE
    // =====================================================

    isRightMouseDown() {

        return this.mouse.right;

    }


    // =====================================================
    // UPDATE
    // =====================================================

    update() {

        // -------------------------------------------------
        // Just-pressed and just-released keys only live
        // for one game frame.
        // -------------------------------------------------

        this.justPressed.clear();

        this.justReleased.clear();

    }


    // =====================================================
    // ENABLE
    // =====================================================

    enable() {

        this.enabled =
            true;

    }


    // =====================================================
    // DISABLE
    // =====================================================

    disable() {

        this.enabled =
            false;

        this.clear();

    }


    // =====================================================
    // CLEAR
    // =====================================================

    clear() {

        this.keys.clear();

        this.justPressed.clear();

        this.justReleased.clear();


        this.mouse.left =
            false;

        this.mouse.right =
            false;

        this.mouse.middle =
            false;


        this.mouse.movementX =
            0;

        this.mouse.movementY =
            0;

    }


    // =====================================================
    // DESTROY
    // =====================================================

    destroy() {

        window.removeEventListener(
            "keydown",
            this.boundKeyDown
        );


        window.removeEventListener(
            "keyup",
            this.boundKeyUp
        );


        window.removeEventListener(
            "mousedown",
            this.boundMouseDown
        );


        window.removeEventListener(
            "mouseup",
            this.boundMouseUp
        );


        window.removeEventListener(
            "mousemove",
            this.boundMouseMove
        );


        document.removeEventListener(
            "pointerlockchange",
            this.boundPointerLockChange
        );


        window.removeEventListener(
            "contextmenu",
            this.boundContextMenu
        );


        this.clear();


        this.canvas =
            null;


        this.pointerLocked =
            false;

    }

}


// =========================================================
// SINGLE INPUT INSTANCE
// =========================================================

const input =
    new InputController();


// =========================================================
// EXPORT
// =========================================================

export default input;