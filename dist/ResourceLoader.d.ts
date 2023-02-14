import { Howl } from "howler";
export type LoadedResourceImage = {
    src: string;
    type: 'image';
    resource: HTMLImageElement;
};
export type LoadedResourceAudio = {
    src: string;
    type: 'audio';
    resource: Howl;
};
export type LoadedResource = LoadedResourceImage | LoadedResourceAudio;
export declare class ResourceLoader {
    loadedResources: LoadedResource[];
    fileNumToLoad: number;
    fileNumLoaded(): number;
    isDone(): boolean;
    percent(): number;
    get(src: string): LoadedResource | null;
    isLoaded(src: string): boolean;
    load(src: string): Promise<LoadedResource | null>;
    loadImage(src: string): Promise<LoadedResourceImage>;
    loadAudio(src: string): Promise<LoadedResourceAudio>;
}
