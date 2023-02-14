"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceLoader = void 0;
const howler_1 = require("howler");
class ResourceLoader {
    loadedResources = [];
    fileNumToLoad = 0;
    fileNumLoaded() {
        return this.loadedResources.length;
    }
    isDone() {
        return this.percent() === 100;
    }
    // loading progress 0-100
    percent() {
        return Math.floor((this.fileNumLoaded() / this.fileNumToLoad) * 100);
    }
    get(src) {
        for (let resource of this.loadedResources) {
            if (resource.src === src)
                return resource;
        }
        return null;
    }
    isLoaded(src) {
        return !!this.get(src);
    }
    load(src) {
        if (this.get(src))
            return Promise.resolve(this.get(src));
        this.fileNumToLoad++;
        if (getSrcType(src) === 'image') {
            return this.loadImage(src);
        }
        else {
            return this.loadAudio(src);
        }
    }
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.addEventListener('load', e => {
                const resource = {
                    src: src,
                    type: 'image',
                    resource: image,
                };
                this.loadedResources.push(resource);
                resolve(resource);
            });
        });
    }
    loadAudio(src) {
        return new Promise((resolve, reject) => {
            const howl = new howler_1.Howl({
                src: [src]
            });
            howl.on("load", () => {
                const resource = {
                    src: src,
                    type: 'audio',
                    resource: howl,
                };
                this.loadedResources.push(resource);
                resolve(resource);
            });
        });
    }
}
exports.ResourceLoader = ResourceLoader;
function getSrcType(src) {
    const ext = getExtension(src);
    if (!ext)
        throw new Error('no file extension. ' + src);
    if (['mp3', 'wav', 'ogg', 'aac'].includes(ext)) {
        return 'audio';
    }
    return 'image';
}
function getExtension(url) {
    const tmp = url.split('.').pop();
    if (!tmp)
        return null;
    return tmp.trim();
}
