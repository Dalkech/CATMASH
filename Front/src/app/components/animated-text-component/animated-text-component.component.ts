import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-animated-text-component',
  standalone: true,
  templateUrl: './animated-text-component.component.html',
  styleUrl: './animated-text-component.component.css'
})
export class AnimatedTextComponentComponent {
  @Input() text: string = '';
}
