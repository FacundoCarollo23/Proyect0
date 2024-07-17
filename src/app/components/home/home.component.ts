import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}
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
  constructor(private voiceService: VoiceRecognitionService) {
  
  }
  transcript: string = '';
  ngOnInit() {
    this.voiceService.onResult((transcript: string) => {
      this.transcript = transcript;
    });

    this.voiceService.onError((event: any) => {
      console.error(event.error);
    });
  }

  startListening() {
    this.voiceService.startRecognition();
  }

  stopListening() {
    this.voiceService.stopRecognition();
  }
  

}
