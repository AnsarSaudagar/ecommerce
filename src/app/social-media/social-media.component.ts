import { Component } from '@angular/core';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent {
  faPhone = faPhone
  faPinterest = faPinterestP
  faTwitter = faTwitter
  faInstagram = faInstagram
  faLinkedin = faLinkedinIn
  faFacebook = faFacebookF
}
