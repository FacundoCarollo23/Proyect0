import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
    private recognition: any;
    public isListening = false;
    public isRecognitionAvailable = false;
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        this.initializeRecognition();
      } else {
        console.error('Window object is not available. Running in a non-browser environment.');
      }
    }
  
    private initializeRecognition(): void {
      if (isPlatformBrowser(this.platformId)) {
        try {
          const { webkitSpeechRecognition } = window as any;
          if (webkitSpeechRecognition) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'es-ES';
            this.isRecognitionAvailable = true;

          } else {
            console.error('Web Speech API is not supported in this browser.');
          }
        } catch (error) {
          console.error('Error initializing webkitSpeechRecognition:', error);
        }
      } else {
        console.error('Not running in a browser environment.');
      }
    }
  
    public startRecognition(): void {
      if (this.isRecognitionAvailable) {
        this.isListening = true;
        this.recognition.start();
      } else {
        console.error('Web Speech API is not available.');
      }
    }
  
    public stopRecognition(): void {
      if (this.isRecognitionAvailable) {
        this.isListening = false;
        this.recognition.stop();
      } else {
        console.error('Web Speech API is not available.');
      }
    }
  
    public onResult(callback: (transcript: string) => void): void {
      if (this.isRecognitionAvailable) {
        this.recognition.onresult = (event: any) => {
          const lastResultIndex = event.results.length - 1;
          const transcript = event.results[lastResultIndex][0].transcript;
          console.log('Transcripción:', transcript); // Aquí se muestra lo que dices en la consola
          callback(transcript);
        };
      } else {
        console.error('Web Speech API no está disponible.');
      }
    }
  
    public onError(callback: (event: any) => void): void {
      if (this.isRecognitionAvailable) {
        this.recognition.onerror = callback;
      } else {
        console.error('Web Speech API is not available.');
      }
    }
}

