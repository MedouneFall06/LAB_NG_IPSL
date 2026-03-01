import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  @Input() username: string = '';
  @Input() searchTerm: string = '';
  @Output() search = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  isCollapsed = true;

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onLogout(): void {
    this.logout.emit();
  }
}
