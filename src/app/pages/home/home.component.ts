import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productgallery: any;
  reviews: any;
  relatedproducts: any;
  imagecolor: any = '';

  constructor(private lightbox: Lightbox) {}

  ngOnInit(): void {
    this.productgallery = []
    this.reviews = []
    this.relatedproducts = []
  }

  /**
   * Open lightbox
   */
  openImage(index: any): void {
    this.lightbox.open(this.productgallery, index, { disableScrolling: true, centerVertically: true, showZoom: true });
  }

  /**
   * Swiper setting
   */
  config = {
    initialSlide: 0, // Set the initial slide to 0
    slidesToShow: 1, // Show 1 slide at a time
    slidesToScroll: 1,
    dots: true, // Show dots for pagination
    arrows: false, // Hide navigation arrows
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  setColor(ev: any) {
    let colorText = ev.target.dataset.bsLabel
    let target = ev.target.labels[0].dataset.bsTarget?.substring(1)
    let children = document.querySelectorAll('.radio-tab-pane');
    children.forEach(function (element: any, i: any) {
      var txt = element.getAttribute('id')
      element.classList.remove('active');
      if (txt == target) {
        (document.getElementById(colorText) as HTMLElement).innerHTML = ev.target.value
        element.classList.add('active');
      }
    })
  }

}
