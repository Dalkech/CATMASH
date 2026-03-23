import { Component, OnInit, signal, computed } from '@angular/core';
import { ExemplePersonService } from '../../services/exemplePerson.service';
import { AppPulsingPlaceholderComponent } from '../../components/app-pulsing-placeholder/app-pulsing-placeholder.component';
import { CommonModule } from '@angular/common';

interface ExemplePerson {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-exemple',
  standalone: true,
  imports: [AppPulsingPlaceholderComponent, CommonModule],
  templateUrl: './exemple.component.html',
  styleUrl: './exemple.component.css'
})

export class ExempleComponent implements OnInit {
  users = signal<ExemplePerson[]>([]);
  isLoading = signal(true);
  hasUsers = computed(() => this.users().length > 0);

  constructor(private exemplePersonService: ExemplePersonService) {}

  ngOnInit() {
    console.log("loading exemple datas ...");
    this.exemplePersonService.getAll().subscribe(data => {
      this.users.set(data);
      this.isLoading.set(false);
    });
  }
}
