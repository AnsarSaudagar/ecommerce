import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-badge',
  templateUrl: './icon-badge.component.html',
  styleUrls: ['./icon-badge.component.css']
})
export class IconBadgeComponent {
  @Input() count: number;
}
