import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  recognition: any;
  isListening = false;
  selectedVoice: SpeechSynthesisVoice | null = null;
  voices: SpeechSynthesisVoice[] = [];
  transcript: string = '';
  constructor(private voiceService: VoiceRecognitionService) {
  
  }
  ngOnInit() : void {
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices();
      this.selectedVoice = this.voices.find(voice => voice.lang === 'es-US') || this.voices[10];
    };
    
  }

  initiateSpeech() {
    this.speak();
  }

  startListening() {
    let lastResultIndex : any [] = [];
    this.voiceService.startRecognition();
    this.voiceService.onResult((transcript: any) => {
    this.transcript = transcript;
    lastResultIndex.push(transcript);
    this.speak();
    });
    console.log(lastResultIndex)
    this.voiceService.onError((event: any) => {
     this.voiceService.stopRecognition();
    });
  }

  speak() {
    const synth = window.speechSynthesis;
    if (this.transcript !== '') {
      const utterThis = new SpeechSynthesisUtterance(this.transcript);
      utterThis.voice = this.selectedVoice;
      utterThis.onend = () => {
        console.log('SpeechSynthesisUtterance.onend');
      }
      utterThis.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
      }
      synth.speak(utterThis);
    }
  }

  


}
