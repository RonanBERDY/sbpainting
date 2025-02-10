import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
    provideFirebaseApp(()=>initializeApp({
      apiKey: "AIzaSyAVAGQBFlu46h1MRzhJCEJX1DrVILKGEK8",
      authDomain: "sbpainting-95531.firebaseapp.com",
      projectId: "sbpainting-95531",
      storageBucket: "sbpainting-95531.firebasestorage.app",
      messagingSenderId: "301100706383",
      appId: "1:301100706383:web:ed5c30260493993aa5583a",
      measurementId: "G-5CLXMKN4LX"
    })
  ),provideAuth(()=>getAuth()),
  provideAnalytics(()=>getAnalytics()),
  provideFirestore(()=>getFirestore()),
]
};
