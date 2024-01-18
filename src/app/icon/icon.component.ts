import { Component, Input } from '@angular/core';
import { IconDefinition, faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() icon: IconDefinition;
}
