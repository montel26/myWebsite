import { Component } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  activeIcon : string='';

  setActive(section: string): void{
    this.activeIcon = section;
  

  
    // Remove 'active' class from all elements with class .bi or .email
    const elements = document.querySelectorAll<HTMLElement>('.bi, .email');
    elements.forEach(el => {
      el.classList.remove('active');
    });
  
    // Add 'active' class to the clicked element
    const activeElement = document.querySelector<HTMLElement>(`[data-icon="${icon}"]`);
    
    if (activeElement) {
      activeElement.classList.add('active');
    }
  }
  

}
