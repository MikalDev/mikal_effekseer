function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
    return class extends parentClass {
        constructor(inst, properties) {
            super(inst);

            if (properties) {
                this.scaleX = properties[0];
                this.scaleY = properties[1];
                this.scaleZ = properties[2];
                this.rotationX = (properties[3] * Math.PI) / 180;
                this.rotationY = (properties[4] * Math.PI) / 180;
                this.rotationZ = (properties[5] * Math.PI) / 180;
            }

            this.effect = null;
            this.handle = null;
            this.sdkType = inst._objectType._sdkType;
            this.runtime = this.sdkType.runtime;
            this.playing = false;
            this.loaded = false;
            this.animationSpeed = 1.0;
            this.uid = inst.GetUID();
            this.path = null;
            this._StartTicking();
        }

        async _LoadEffect(effectPath, name, playEnable = true) {
            console.log("LoadEffect");
            const effect = await this.sdkType.effekseerManager.loadEffect(
                effectPath
            );
            this.effect = effect;
            this.sdkType.effects.set(this.uid, effect);
            this.loaded = true;
            this.Trigger(C3.Plugins.mikal_effekseer.Cnds.OnLoaded);

            if (playEnable) {
                this.handle = this.sdkType.effekseerManager.playEffect(
                    this.effect
                );
                this.sdkType.handles.set(this.uid, this.handle);
                const wi = this.GetWorldInfo();
                const x = wi.GetX();
                const y = wi.GetY();
                const z = wi.GetTotalZElevation();
                this.handle.setLocation(x, y, z);
                this.handle.setScale(this.scaleX, this.scaleY, this.scaleZ);
                this.handle.setRotation(
                    this.rotationX,
                    this.rotationY,
                    this.rotationZ
                );
                this.playing = true;
            }
        }

        _SetScale(scaleX, scaleY, scaleZ) {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.scaleZ = scaleZ;
        }

        _SetRotation(rotationX, rotationY, rotationZ) {
            this.rotationX = (rotationX * Math.PI) / 180;
            this.rotationY = (rotationY * Math.PI) / 180;
            this.rotationZ = (rotationZ * Math.PI) / 180;
        }

        _OnLoaded() {
            return true;
        }

        _IsLoaded() {
            return this.loaded;
        }

        _Play() {
            if (!this.effect || this.playing) {
                return;
            }
            this.handle = this.sdkType.effekseerManager.playEffect(this.effect);
            this.sdkType.handles.set(this.uid, this.handle);
            const wi = this.GetWorldInfo();
            const x = wi.GetX();
            const y = wi.GetY();
            const z = wi.GetTotalZElevation();
            this.handle.setLocation(x, y, z);
            this.handle.setScale(this.scaleX, this.scaleY, this.scaleZ);
            this.handle.setRotation(
                this.rotationX,
                this.rotationY,
                this.rotationZ
            );
            this.playing = true;
        }

        _SetFrame(frame) {
            if (!this.effect || !this.handle) {
                return;
            }
            this.sdkType.effekseerManager.setEffectFrame(this.handle, frame);
        }

        _Stop() {
            if (!this.effect || !this.handle) {
                return;
            }
            this.sdkType.effekseerManager.stopEffect(this.handle);
        }

        _Path() {
            return this.path ? this.path : "";
        }

        _OnFinished() {
            console.log("_OnFinished called");
            return true;
        }

        Tick() {
            const handle = this.handle;
            if (handle) {
                const wi = this.GetWorldInfo();
                const x = wi.GetX();
                const y = wi.GetY();
                const z = wi.GetTotalZElevation();
                handle.setLocation(x, y, z);
                handle.setRotation(
                    this.rotationX,
                    this.rotationY,
                    this.rotationZ
                );
                if (this.playing && !handle.exists) {
                    this.playing = false;
                    this.Trigger(C3.Plugins.mikal_effekseer.Cnds.OnFinished);
                }
            }
        }

        async Draw(renderer) {
            const sdkType = this.sdkType;
            if (!sdkType.loaded) {
                await this.sdkType.init(renderer);
            }
            const tickCount = this.runtime.GetTickCount();
            sdkType.Draw(renderer, tickCount);
        }

        Release() {
            super.Release();
            this.sdkType.effekseerManager.releaseEffect(this.effect);
            this.sdkType.handles.delete(this.uid);
            this.sdkType.effects.delete(this.uid);
            this.effect = null;
            this.handle = null;
            this.loaded = false;
            this.playing = false;
        }

        SaveToJson() {
            return {
                // data to be saved for savegames
            };
        }

        LoadFromJson(o) {
            // load state for savegames
        }
    };
}
