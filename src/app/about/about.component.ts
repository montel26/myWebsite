import { Component,OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent{
// export class AboutComponent  implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  //   const options = {
  //     strings: [
  //       '<br>HI, I’M MONTEL WOOD.',
  //       'An experienced full stack java developer with a passion for programming.<br>',
  //       'Lorem ipsum dolor sit amet, lorem ipsum dolor.<br>'
  //     ],
  //     typeSpeed: 30,
  //     backSpeed: 25,
  //     showCursor: true,
  //     cursorChar: '|',
  //     smartBackspace: false,
  //     loop: true,
  //     onComplete: (self: any) => {
  //       const typedOutput = document.getElementById('typed-output');
  //       if (typedOutput) {
  //         typedOutput.innerHTML = typedOutput.innerHTML.replace(/<span>/g, '').replace(/<\/span><br>/g, '<br>').replace(/<\/span>/g, '');
  //       }
  //     }
  //   };

  //   const typed = new Typed('#typed-output', options);
  // }

}
