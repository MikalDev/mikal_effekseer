const C3 = self.C3;

//<-- PLUGIN_INFO -->

const camelCasedMap = new Map();

function camelCasify(str) {
    // If the string is already camelCased, return it
    if (camelCasedMap.has(str)) {
        return camelCasedMap.get(str);
    }
    // Replace any non-valid JavaScript identifier characters with spaces
    let cleanedStr = str.replace(/[^a-zA-Z0-9$_]/g, " ");

    // Split the string on spaces
    let words = cleanedStr.split(" ").filter(Boolean);

    // Capitalize the first letter of each word except for the first one
    for (let i = 1; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }

    // Join the words back together
    let result = words.join("");

    // If the first character is a number, prepend an underscore
    if (!isNaN(parseInt(result.charAt(0)))) {
        result = "_" + result;
    }

    camelCasedMap.set(str, result);

    return result;
}

const parentClass = {
    object: {
        scripting: self.IInstance,
        instance: C3.SDKInstanceBase,
        plugin: C3.SDKPluginBase,
    },
    world: {
        scripting: self.IWorldInstance,
        instance: C3.SDKWorldInstanceBase,
        plugin: C3.SDKPluginBase,
    },
    dom: {
        scripting: self.IDOMInstance,
        instance: C3.SDKDOMInstanceBase,
        plugin: C3.SDKDOMPluginBase,
    },
};

C3.Plugins[PLUGIN_INFO.id] = class extends (
    parentClass[PLUGIN_INFO.type].plugin
) {
    Release() {
        super.Release();
    }
};
const P_C = C3.Plugins[PLUGIN_INFO.id];
import { EffekseerManager } from "./effekseerManager.js";
P_C.Type = class extends C3.SDKTypeBase {
    constructor(objectClass) {
        super(objectClass);
        console.log("EffekseerManager");
        this.effekseerManager = new EffekseerManager(this);
        this.loaded = false;
        this.loading = false;
        this.runtime = objectClass.GetRuntime();
        this.lastTickDraw = -1;
        this.effects = new Map();
        this.handles = new Map();
        this._checkWebGLRendererAndInit();
    }

    _checkWebGLRendererAndInit() {
        const checkInterval = setInterval(() => {
            const renderer = this.runtime.GetWebGLRenderer();
            if (renderer && globalThis.effekseerWasmLoaded) {
                console.log("renderer found");
                clearInterval(checkInterval);
                this.init(renderer);
            } else {
                if (renderer && !globalThis.effekseerWasmLoaded) {
                    console.log("renderer found but effekseerWasm not loaded");
                }
            }
        }, 5);
    }

    async init(renderer) {
        if (this.loading) return false;
        if (this.loaded) return true;
        this.loading = true;
        console.log("init0");
        await this.effekseerManager.initialize(
            renderer._gl
        );
        console.log("init1");
        this.loaded = true;
        this.loading = false;
        return true;
    }

    Draw(renderer, tickCount) {
        if (this.lastTickDraw === tickCount) return;
        if (this.handles.size === 0) return;
        this.lastTickDraw = tickCount;
        renderer.EndBatch();

        const MV = renderer._matMV;
        const P = renderer._matP;

        this.effekseerManager.setMVPMatrices(MV, P);
        this.effekseerManager.draw(tickCount);
        this.runtime.UpdateRender();
    }

    Release() {
        super.Release();
    }

    LoadTextures(renderer) {
        return this.GetImageInfo().LoadStaticTexture(renderer, {
            sampling: this._runtime.GetSampling(),
        });
    }

    ReleaseTextures() {
        this.GetImageInfo().ReleaseTexture();
    }

    OnCreate() {
        this.GetImageInfo().LoadAsset(this._runtime);
    }
};

//====== SCRIPT INTERFACE ======
const map = new WeakMap();

//<-- SCRIPT_INTERFACE -->

const scriptInterface = getScriptInterface(
    parentClass[PLUGIN_INFO.type].scripting,
    map
);

// extend script interface with plugin actions
Object.keys(PLUGIN_INFO.Acts).forEach((key) => {
    const ace = PLUGIN_INFO.Acts[key];
    if (!ace.autoScriptInterface) return;
    if (ace.isAsync) {
        scriptInterface.prototype[camelCasify(key)] = async function (...args) {
            const sdkInst = map.get(this);
            await P_C.Acts[camelCasify(key)].call(sdkInst, ...args);
        };
    } else {
        scriptInterface.prototype[camelCasify(key)] = function (...args) {
            const sdkInst = map.get(this);
            P_C.Acts[camelCasify(key)].call(sdkInst, ...args);
        };
    }
});

const addonTriggers = [];

// extend script interface with plugin conditions
Object.keys(PLUGIN_INFO.Cnds).forEach((key) => {
    const ace = PLUGIN_INFO.Cnds[key];
    if (!ace.autoScriptInterface || ace.isStatic || ace.isLooping) return;
    if (ace.isTrigger) {
        scriptInterface.prototype[camelCasify(key)] = function (
            callback,
            ...args
        ) {
            const callbackWrapper = () => {
                const sdkInst = map.get(this);
                if (P_C.Cnds[camelCasify(key)].call(sdkInst, ...args)) {
                    callback();
                }
            };
            this.addEventListener(key, callbackWrapper, false);
            return () => this.removeEventListener(key, callbackWrapper, false);
        };
    } else {
        scriptInterface.prototype[key] = function (...args) {
            const sdkInst = map.get(this);
            return P_C.Cnds[camelCasify(key)].call(sdkInst, ...args);
        };
    }
});

// extend script interface with plugin expressions
Object.keys(PLUGIN_INFO.Exps).forEach((key) => {
    const ace = PLUGIN_INFO.Exps[key];
    if (!ace.autoScriptInterface) return;
    scriptInterface.prototype[camelCasify(key)] = function (...args) {
        const sdkInst = map.get(this);
        return P_C.Exps[camelCasify(key)].call(sdkInst, ...args);
    };
});
//====== SCRIPT INTERFACE ======

//============ ACES ============
P_C.Acts = {};
P_C.Cnds = {};
P_C.Exps = {};
Object.keys(PLUGIN_INFO.Acts).forEach((key) => {
    const ace = PLUGIN_INFO.Acts[key];
    P_C.Acts[camelCasify(key)] = function (...args) {
        return ace.forward
            ? ace.forward(this).call(this, ...args)
            : ace.handler.call(this, ...args);
    };
});
Object.keys(PLUGIN_INFO.Cnds).forEach((key) => {
    const ace = PLUGIN_INFO.Cnds[key];
    P_C.Cnds[camelCasify(key)] = function (...args) {
        return ace.forward
            ? ace.forward(this).call(this, ...args)
            : ace.handler.call(this, ...args);
    };
    if (ace.isTrigger && ace.autoScriptInterface) {
        addonTriggers.push({
            method: P_C.Cnds[camelCasify(key)],
            id: key,
        });
    }
});
Object.keys(PLUGIN_INFO.Exps).forEach((key) => {
    const ace = PLUGIN_INFO.Exps[key];
    P_C.Exps[camelCasify(key)] = function (...args) {
        return ace.forward
            ? ace.forward(this).call(this, ...args)
            : ace.handler.call(this, ...args);
    };
});
//============ ACES ============

//<-- INSTANCE -->

P_C.Instance = class extends parentClass[PLUGIN_INFO.type].instance {
    constructor(opts) {
        if (PLUGIN_INFO.hasDomSide) {
            super(opts, PLUGIN_INFO.id);
        } else {
            super(opts);
        }
        if (PLUGIN_INFO.hasWrapperExtension) {
            this.SetWrapperExtensionComponentId(PLUGIN_INFO.id);
            this._isWrapperExtensionAvailable =
                this.IsWrapperExtensionAvailable();
        }
    }

    Release() {
        super.Release();
    }

    Trigger(method) {
        super.Trigger(method);
        const addonTrigger = addonTriggers.find((x) => x.method === method);
        if (addonTrigger) {
            this.GetScriptInterface().dispatchEvent(
                new C3.Event(addonTrigger.id)
            );
        }
    }

    GetScriptInterfaceClass() {
        return scriptInterface;
    }
};

P_C.Instance = getInstanceJs(P_C.Instance, scriptInterface, addonTriggers, C3);
