import { Howl } from "howler";

export type LoadedResourceImage = {
    src: string
    type: 'image'
    resource: HTMLImageElement
}

export type LoadedResourceAudio = {
    src: string
    type: 'audio'
    resource: Howl
}

export type LoadedResource = LoadedResourceImage | LoadedResourceAudio

export class ResourceLoader {
    loadedResources: LoadedResource[] = []

    fileNumToLoad: number = 0

    percent: number = 0

    fileNumLoaded(): number {
        return this.loadedResources.length
    }

    isDone(): boolean {
        return this.percent === 100
    }

    // loading progress 0-100
    private setPercent() {
        this.percent = Math.floor((this.fileNumLoaded() / this.fileNumToLoad) * 100)
    }

    get(src: string): LoadedResource | null {
        for (let resource of this.loadedResources) {
            if (resource.src === src) return resource
        }
        return null
    }

    isLoaded(src: string): boolean {
        return !!this.get(src)
    }

    load(src: string): Promise<LoadedResource | null> {
        if (this.get(src)) return Promise.resolve(this.get(src))

        this.fileNumToLoad ++

        if (getSrcType(src) === 'image') {
            return this.loadImage(src)
        } else {
            return this.loadAudio(src)
        }
    }

    loadImage(src: string): Promise<LoadedResourceImage> {
        return new Promise((resolve, reject) => {

            const image = new Image()

            image.src = src
            image.addEventListener('load', e => {
                const resource: LoadedResourceImage = {
                    src: src,
                    type: 'image',
                    resource: image,
                }
                this.loadedResources.push(resource)
                this.setPercent()
                resolve(resource)
            });
        })
    }

    loadAudio(src: string): Promise<LoadedResourceAudio> {
        return new Promise((resolve, reject) => {

            const howl = new Howl({
                src: [src]
            });

            howl.on("load", () => {
                const resource: LoadedResourceAudio = {
                    src: src,
                    type: 'audio',
                    resource: howl,
                }
                this.loadedResources.push(resource)
                this.setPercent()
                resolve(resource)
            })
        })
    }
}


function getSrcType(src: string): 'image' | 'audio' {
    const ext = getExtension(src)
    if (!ext) throw new Error('no file extension. '+src)
    if (['mp3', 'wav', 'ogg', 'aac'].includes(ext)) {
        return 'audio'
    }
    return 'image'
}

function getExtension(url: string): string | null {
    const tmp = url.split('.').pop()
    if (!tmp) return null
    return tmp.trim()
}