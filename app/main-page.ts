import { EventData, Page, View } from '@nativescript/core';
import { MainViewModel } from './main-view-model';
import { Camera } from '@nativescript/camera';

let camera: Camera;

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new MainViewModel();
    
    // Initialize camera preview after page loads
    const container = page.getViewById('cameraContainer') as View;
    if (container) {
        camera = new Camera();
        camera.on('photoCaptured', (args: any) => {
            console.log('Photo captured');
        });
        
        container.addChild(camera);
    }
}

export function onUnloaded() {
    if (camera) {
        camera.off('photoCaptured');
        camera = null;
    }
}