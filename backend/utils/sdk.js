const env = import.meta.env
const MOUSE_DELAY = 1000;
const inactivityDelay = 15 * 60 * 1000; // en millisecondes
let inactivityTimer;

export default class SDK {
    constructor(api_token) {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouse = [];
        this.clicks = [];
        this.paths = [];
        this.tags = [];
        this.startTime = new Date();
        this.endTime = null;
        this.api_token = api_token;
        this.user_fingerprint = null;

        this.initUserInteractionForInactivity();
        this.initSendData();
    }

    initTracker() {
        this.trackMouseMovement();
        this.trackMouseClick();
        this.trackNavigation();
    }

    stopTracker() {
        this.stopTrackingMouseMovement();
        this.stopTrackingMouseClick();
        this.stopTrackingNavigation();
    }

    trackMouseMovement() {
        this.mouseMoveHandler = (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        };
        document.addEventListener("mousemove", this.mouseMoveHandler);
        this.getMousePosition();
    }

    stopTrackingMouseMovement() {
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        this.stopUpdatingMousePosition();
    }

    getMousePosition() {
        this.mousePositionInterval = setInterval(() => {
            this.mouse.push({
                x: this.mouseX,
                y: this.mouseY,
                timestamp: Date.now(),
                path: window.location.pathname,
            });
        }, MOUSE_DELAY);
    }

    stopUpdatingMousePosition() {
        clearInterval(this.mousePositionInterval);
    }

    trackMouseClick() {
        this.trackerFunction = (e) => {
            this.clicks.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                target: e.target.outerHTML,
                path: window.location.pathname,
            });
            //console.table("click on this element : ", e.target)
        };

        document.body.addEventListener("click", this.trackerFunction);
    }

    stopTrackingMouseClick() {
        document.body.removeEventListener("click", this.trackerFunction);
    }

    trackNavigation() {
        this.navigationFunction = (e) => {
            // N'ajoute pas le meme path 2 fois
            if (this.paths.length > 0) {
                let lastPath = this.paths[this.paths.length - 1].path;
                if (lastPath === window.location.pathname) {
                    return;
                }
            }
            this.paths.push({
                path: window.location.pathname,
                timestamp: Date.now(),
            });
        };

        window.addEventListener("click", this.navigationFunction);
    }

    stopTrackingNavigation() {
        window.removeEventListener("click", this.navigationFunction);
    }

    uuid() {
        return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, c => (
            c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        );
    }

    getFingerprintUser() {
        let fingerprint = localStorage.getItem('fingerprint');
        if (fingerprint && fingerprint.trim() !== "") return fingerprint;
        return localStorage.setItem('fingerprint', this.uuid());
    }

    initSendData() {
        window.addEventListener("visibilitychange", (event) => {
            if (event.target.visibilityState === "hidden") {
                this.sendData();
            }
        });
    }

    sendData() {
        let data = {
            api_token: this.api_token,
            user_fingerprint: this.getFingerprintUser(),
            mouse: this.mouse,
            clicks: this.clicks,
            paths: this.paths,
            tags: this.tags,
            startTime: this.startTime,
            endTime: new Date(),
        }

        navigator.sendBeacon('<%= URL_SITE_CLIENT %>/sdk', JSON.stringify(data));

        this.resetData();
    }

    resetData() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouse = [];
        this.clicks = [];
        this.paths = [];
        this.tags = [];
        this.startTime = new Date();
        this.endTime = null;
    }

    // ? ------------------------- USER INACTIVITY ------------------------- ? //
    initUserInteractionForInactivity() {
        document.addEventListener("click", () => this.handleUserInteraction());
        document.addEventListener("mousemove", () => this.handleUserInteraction());
        document.addEventListener("keydown", () => this.handleUserInteraction());
        document.addEventListener("scroll", () => this.handleUserInteraction());
        document.addEventListener("touchstart", () => this.handleUserInteraction());
        document.addEventListener("touchmove", () => this.handleUserInteraction());
        document.addEventListener("touchend", () => this.handleUserInteraction());
    }

    resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => this.detectInactivity(), inactivityDelay);
    }

    detectInactivity() {
        this.sendData();
    }

    handleUserInteraction() {
        this.resetInactivityTimer();
    }
    // ? ------------------------- USER INACTIVITY ------------------------- ? //

    // ? ------------------------- TAGS ------------------------- ? //
    addTagToQueue(tag) {
        this.tags.push(tag);
    }
    // ? ------------------------- TAGS ------------------------- ? //
}
