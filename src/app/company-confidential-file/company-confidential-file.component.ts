import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './company-confidential-file.component.html',
  styleUrls: ['./company-confidential-file.component.scss']
})
export class CompanyConfidentialFileComponent implements OnInit {
  fileUrl =
    'https://drive.google.com/file/d/1lIINPcM1RjoSTJ-sZc-U4Iozwvg5OIiH/view?usp=sharing';
  constructor(private sanitizer: DomSanitizer) {  }
  
  ngOnInit() {
  }
}
