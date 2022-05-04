import('./bootstrap');
import { ChromeAPI } from '@redhat-cloud-services/types';

declare global {
  const insights: {
    chrome: CustomChromeApi;
};
}

export interface CustomChromeApi extends Omit<ChromeAPI, 'init'>{
 init: () => {
  identifyApp: (appName: string) => void;
  on: (eventName: string, callbackFunc: (event: any) => void) => () => void;
  };
}
