import effekseer from "./effekseer.js";

class EffekseerManager {
    constructor() {
        this.context = null;
        this.gl = null;
        this.effects = {};
        this.handles = {};
    }

    async initialize(gl) {
        this.context = effekseer.createContext();
        this.context.setRestorationOfStatesFlag(true);
        this.gl = gl;
        await this.context.init(gl);
    }

    releaseEffect(effect) {
        this.context.releaseEffect(effect);
    }

    async loadEffect(effectUrl) {
        return await new Promise((resolve, reject) => {
            let effect;
            effect = this.context.loadEffect(
                effectUrl,
                1.0,
                () => {
                    resolve(effect);
                },
                reject
            );
        });
    }

    stopEffect(handle) {
        handle.stop();
    }

    setMVPMatrices(MV, P) {
        if (!this.context) return;
        this.context.setProjectionMatrix(P);
        this.context.setCameraMatrix(MV);
    }

    playEffect(effectName, x, y, z = 0) {
        if (!this.context) return;
        const handle = this.context.play(effectName, x, y, z);
        return handle ? handle : null;
    }

    update(step) {
        if (this.context) {
            this.context.update(step);
        }
    }

    setEffectFrame(handle, frame) {
        if (!handle) return;
        handle.setFrame(frame);
    }

    draw(tickCount) {
        if (this.context) {
            this.update(0);
            // this.updateHandles(1);
            this.context.draw();
        }
    }

    updateHandles() {
        if (!this.context) return;
        for (const handle in this.handles) {
            this.context.updateHandle(handle);
        }
    }

    release() {
        if (this.context) {
            this.context.release();
            this.context = null;
        }
    }
}

export default EffekseerManager;
