import { Component } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ButtonModule, RouterLink],
  selector: 'app-landing',
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing {}
