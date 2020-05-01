import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  constructor(private sanitizer: DomSanitizer) {
  }

  getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
