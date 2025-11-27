import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer-service';
import { Customer } from '../customer.model';
import { first  } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TranslatePipe } from '../translate-pipe'; 
import { TranslationService } from '../translation.service';

interface Slide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-page-component',
  imports: [CommonModule,TranslatePipe],
  standalone: true,
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  isAutoPlaying = true;
  private autoPlayInterval: any;
  lang: any; 


  
  positiveReviews: Customer[] = [];
  constructor (private customerservice :CustomerService, private translationService: TranslationService){}
  slides: Slide[] = [
    {
      image: 'resources/IMG-20251018-WA0007.png',
      title: 'SLIDE_1_TITLE',
      description: 'SLIDE_1_DESC'
    },
    {
      image: 'resources/8.jpg',
      title: 'SLIDE_2_TITLE',
      description: 'SLIDE_2_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0019.png',
      title: 'SLIDE_3_TITLE',
      description: 'SLIDE_3_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0013.png',
      title: 'SLIDE_4_TITLE',
      description: 'SLIDE_4_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0016.png',
      title: 'SLIDE_5_TITLE',
      description: 'SLIDE_5_DESC'
    },

    {
      image: 'resources/IMG-20251018-WA0012.png',
      title: 'SLIDE_6_TITLE',
      description: 'SLIDE_6_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0014.png',
      title: 'SLIDE_7_TITLE',
      description: 'SLIDE_7_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0015.png',
      title: 'SLIDE_8_TITLE',
      description: 'SLIDE_8_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0009.png',
      title: 'SLIDE_9_TITLE',
      description: 'SLIDE_9_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0011.png',
      title: 'SLIDE_10_TITLE',
      description: 'SLIDE_10_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0007.png',
      title: 'SLIDE_11_TITLE',
      description: 'SLIDE_11_DESC'
    },
    {
      image: 'resources/IMG-20251018-WA0008.png',
      title: 'SLIDE_12_TITLE',
      description: 'SLIDE_12_DESC'
    },
{
  image: 'resources/2.png',
  title: 'SLIDE_14_TITLE',
  description: 'SLIDE_14_DESC'
},
{
  image: 'resources/3.png',
  title: 'SLIDE_15_TITLE',
  description: 'SLIDE_15_DESC'
},
{
  image: 'resources/4.png',
  title: 'SLIDE_16_TITLE',
  description: 'SLIDE_16_DESC'
},
{
  image: 'resources/5.png',
  title: 'SLIDE_17_TITLE',
  description: 'SLIDE_17_DESC'
},
{
  image: 'resources/6.png',
  title: 'SLIDE_18_TITLE',
  description: 'SLIDE_18_DESC'
}
  ];

  ngOnInit(): void {
    this.startAutoPlay();

    this.positive_reviews();
    this.lang = this.translationService.getLang();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  toggleAutoPlay(): void {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  positive_reviews(){
      const headers = new HttpHeaders({
    'Accept-Language':this.lang
  })
    this.customerservice.get_all_positive_reviews().subscribe({
      next: (reviews) =>{
        this.positiveReviews = reviews
        console.log('Positive reviews loaded:', reviews);
      }
    });
  }
changeLang(event: Event) {
  const target = event.target as HTMLSelectElement ;
  const lang = target?.value;
  if(lang){
    this.translationService.setLang(lang);
  }

}


}