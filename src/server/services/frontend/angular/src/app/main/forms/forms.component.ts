import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  shortUrlResult: any;
  longUrlResult: any;
  shortUrlErr: boolean;
  longUrlErr: boolean;

  currentUrl: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() { 
    this.currentUrl = window.location.href;
  }

  process(form, type) {
    if ((form.value.shortUrl && form.value.shortUrl !== '') || (form.value.longUrl && form.value.longUrl !== '')) {
      this.apiService.processUrl(form.value, type)
        .subscribe(res => {
          if (type === 'shorten') { 
            this.shortUrlErr = false;
            this.shortUrlResult = res.shortUrl;
          }
          if (type === 'inflate') { 
            this.longUrlErr = false;
            this.longUrlResult = res.longUrl;
          }
        }, err => {
          if (type === 'shorten') { 
            this.shortUrlErr = true;
            this.shortUrlResult = null;;
          }
          if (type === 'inflate') { 
            this.longUrlErr = true;
            this.longUrlResult = null;
          }

          console.log("====================================");
          console.log(err);
          console.log("====================================");
        });
    }
  }

}
