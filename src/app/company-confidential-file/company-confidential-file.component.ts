import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-company-confidential-file',
  templateUrl: './company-confidential-file.component.html',
  styleUrls: ['./company-confidential-file.component.scss']
})
export class CompanyConfidentialFileComponent implements OnInit {
  
  companyconfidentialfileForm!: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.companyconfidentialfileForm = new FormGroup({});
  }
  onCompanyconfidentialfile(){
    
  }
}
