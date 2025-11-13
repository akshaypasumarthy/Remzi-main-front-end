import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from './translation.service';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private t = inject(TranslationService);

  transform(key: string): string {
    const v = this.t.instant(key);
    if (v !== key) return v;
    return key;
  }
}
