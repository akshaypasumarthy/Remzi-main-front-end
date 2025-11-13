import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private langCache = new Map<string, Record<string, string>>();
  private inFlight = new Map<string, Promise<Record<string, string>>>();
  private map$ = new BehaviorSubject<Record<string, string>>({});
  current$ = this.map$.asObservable();
  lang = signal<string>('de');

  constructor(private http: HttpClient) {
    this.setLang(this.lang());
  }

  async load(lang: string): Promise<Record<string, string>> {
    if (!lang) throw new Error('lang required');

    // already cached
    const cached = this.langCache.get(lang);
    if (cached) {
      this.map$.next(cached); // instant emit
      return cached;
    }

    const inflight = this.inFlight.get(lang);
    if (inflight) {
      const map = await inflight;
      this.map$.next(map);
      return map;
    }
    const p = this.http
      .get<Record<string, string>>(`/assets/i18n/${lang}.json`)
      .toPromise()
      .then((json) => json || {})
      .finally(() => this.inFlight.delete(lang));

    this.inFlight.set(lang, p);

    const map = await p;
    this.langCache.set(lang, map);
    this.map$.next(map); // emit after first load
    return map;
  }

  async setLang(lang: string): Promise<void> {
    if (!lang) return;
    const prev = this.lang();
    this.lang.set(lang);
    const cached = this.langCache.get(lang);
    if (cached) {
      this.map$.next(cached);
    }

    if (prev !== lang || !cached) {
      try {
        this.load(lang).catch(console.error);
      } catch (e) {
        console.error('Error loading language:', e);
      }
    }
  }

  instant(key: string): string {
    return this.map$.value[key] ?? key;
  }

  getLang(): string {
    return this.lang();
  }
}
