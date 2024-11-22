import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Para ngFor funcionar

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    CommonModule,  // Necessário para ngFor
  ]
}).catch(err => console.error(err));
