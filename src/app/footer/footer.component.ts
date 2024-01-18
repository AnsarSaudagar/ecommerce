import { Component } from '@angular/core';
import { faMapMarkerAlt, faEnvelope, faPhone, faPlus, } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faPinterestP } from '@fortawesome/free-brands-svg-icons';
// import { faFace } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faLocation = faMapMarkerAlt
  faMessage = faEnvelope
  faPhone = faPhone
  faPinterest = faPinterestP
  faTwitter = faTwitter
  faInstagram = faInstagram
  faLinkedin = faLinkedinIn
  faFacebook = faFacebookF
  faPlus = faPlus
}
