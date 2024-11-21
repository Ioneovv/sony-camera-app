import { Observable, Application, ImageSource } from '@nativescript/core';
import { CameraPlus } from '@nativescript/camera-plus';

export class MainViewModel extends Observable {
    private _aperture: string = '1.4';
    private _shutterSpeed: string = '1/36';
    private _iso: string = '400';
    private _isPaused: boolean = false;
    private _wbIcon: string = '☼';
    private camera: CameraPlus;

    constructor() {
        super();
        this.startExposureCalculation();
    }

    get aperture(): string {
        return this._aperture;
    }

    get shutterSpeed(): string {
        return this._shutterSpeed;
    }

    get iso(): string {
        return this._iso;
    }

    get isPaused(): boolean {
        return this._isPaused;
    }

    get wbIcon(): string {
        return this._wbIcon;
    }

    onCameraLoaded(args) {
        this.camera = args.object as CameraPlus;
        this.camera.toggleCamera();
    }

    onPause() {
        this._isPaused = !this._isPaused;
        this.notifyPropertyChange('isPaused', this._isPaused);
        
        if (this.camera) {
            if (this._isPaused) {
                this.camera.pause();
            } else {
                this.camera.resume();
            }
        }
    }

    onCapture() {
        if (this.camera) {
            this.camera.takePicture({ saveToGallery: false })
                .then((imageAsset: any) => {
                    console.log('Picture taken');
                    // Here you could analyze the image for more accurate light measurement
                })
                .catch(err => console.error('Error taking picture:', err));
        }
    }

    onMenu() {
        // Implement menu functionality
    }

    onSettings() {
        // Implement settings functionality
    }

    private startExposureCalculation() {
        setInterval(() => {
            if (!this._isPaused) {
                this.calculateExposure();
            }
        }, 500);
    }

    private calculateExposure() {
        // Sony ZV-E10 specific settings
        const apertures = [1.4, 1.6, 1.8, 2.0, 2.8, 4, 5.6, 8, 11, 16, 22];
        const shutterSpeeds = ['1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'];
        const isoValues = [100, 200, 400, 500, 640, 800, 1600, 3200, 6400];

        // Simulate light measurement (in real app, this would use device light sensor)
        const randomAperture = apertures[Math.floor(Math.random() * 3)];
        const randomShutter = shutterSpeeds[Math.floor(Math.random() * 4)];
        const randomIso = isoValues[Math.floor(Math.random() * 3)];

        this._aperture = randomAperture.toString();
        this._shutterSpeed = randomShutter;
        this._iso = randomIso.toString();

        this.notifyPropertyChange('aperture', this._aperture);
        this.notifyPropertyChange('shutterSpeed', this._shutterSpeed);
        this.notifyPropertyChange('iso', this._iso);
    }
}