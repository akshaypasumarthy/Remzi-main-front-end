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
      title: 'Professional Moving Services',
      description: 'We handle your belongings with care and precision. Our experienced team ensures safe transportation of all your items to your new location.'
    },
    {
      image: 'resources/IMG-20251018-WA0020.png',
      title: 'Complete Clearance Solutions',
      description: 'Fast and efficient clearance services for homes, offices, and commercial spaces. We dispose of items responsibly and environmentally.'
    },
    {
      image: 'resources/IMG-20251018-WA0019.png',
      title: 'Deep Cleaning Services',
      description: 'Thorough cleaning that leaves your space spotless. From floors to ceilings, we handle every detail with professional equipment.'
    },
    {
      image: 'resources/IMG-20251018-WA0013.png',
      title: 'Reliable & Affordable',
      description: 'Quality service at competitive prices. We believe everyone deserves professional moving and cleaning assistance without breaking the bank.'
    },
    {
      image: 'resources/IMG-20251018-WA0016.png',
      title: 'Experienced Team',
      description: 'Our skilled professionals have years of experience in moving, cleaning, and clearance services. Trust us with your most valuable possessions.'
    },

    {
      image: 'resources/IMG-20251018-WA0012.png',
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed your expectations with every service we provide.'
    },
    {
      image: 'resources/IMG-20251018-WA0014.png',
      title: 'Flexible Scheduling',
      description: 'We work around your schedule. Available on weekends and evenings for your convenience. Book anytime that suits you best.'
    },
    {
      image: 'resources/IMG-20251018-WA0015.png',
      title: 'Eco-Friendly Practices',
      description: 'We prioritize environmental responsibility with sustainable disposal methods and recycling whenever possible.'
    },
    {
      image: 'resources/IMG-20251018-WA0009.png',
      title: 'Full Insurance Coverage',
      description: 'All our services are fully insured, giving you complete peace of mind throughout the entire moving and cleaning process.'
    },
    {
      image: 'resources/IMG-20251018-WA0011.png',
      title: 'Same Day Service Available',
      description: 'Need urgent help? We offer same-day service for emergency moves and cleaning. Contact us for immediate assistance.'
    },
    {
      image: 'resources/IMG-20251018-WA0007.png',
      title: 'Office Relocation Experts',
      description: 'Minimize downtime with our efficient office moving services. We handle IT equipment, furniture, and documents with care.'
    },
    {
      image: 'resources/IMG-20251018-WA0008.png',
      title: 'Storage Solutions',
      description: 'Need temporary storage? We offer secure storage facilities for your belongings during the transition period.'
    },


    {
  image: 'resources/1.png',
  title: 'Packing & Unpacking Services',
  description: 'Save time and effort with our professional packing services. We carefully wrap and box your items, and unpack them at your destination.'
},
{
  image: 'resources/2.png',
  title: 'Post-Construction Cleaning',
  description: 'Specialized cleaning after renovations or construction. We remove dust, debris, and residue to make your space move-in ready.'
},
{
  image: 'resources/3.png',
  title: 'Furniture Assembly & Disassembly',
  description: 'Expert furniture handling service. We carefully disassemble items for transport and reassemble them perfectly at your new location.'
},
{
  image: 'resources/4.png',
  title: 'Estate Clearance Services',
  description: 'Compassionate and professional estate clearance. We handle complete property clearances with respect and efficiency during difficult times.'
},
{
  image: 'resources/5.png',
  title: 'Commercial Cleaning Solutions',
  description: 'Keep your business space pristine with our commercial cleaning services. Regular maintenance or one-time deep cleans available.'
},
{
  image: 'resources/6.png',
  title: 'Long Distance Moving',
  description: 'Relocating to another city? Our long-distance moving service ensures your belongings arrive safely, no matter the distance.'
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