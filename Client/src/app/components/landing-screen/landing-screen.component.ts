import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css']
})
export class LandingScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.getElementById("playButton")!.addEventListener('click', (e) => this.router.navigate(['/play']));
    document.addEventListener('keyup', (e) => {
      var new_direction;
      switch (e.key) {
        case ' ':
          document.getElementById("playButton")!.click();
          break;
        default:
          break;
      }
    });
  }
}
