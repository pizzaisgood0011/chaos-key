import { Injectable } from '@angular/core';
import { PasswordOptions } from '../models/password-optoins.model';

const CHARSET = {
  upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower:   'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*_+-=?<>',
};

@Injectable({
  providedIn: 'root',
})
export class PasswordService {

  generate(opts: PasswordOptions): string {
    const charset = (Object.keys(CHARSET) as (keyof typeof CHARSET)[])
      .filter(k => opts[k])
      .map(k => CHARSET[k])
      .join('');

    if (!charset) return '';

    const arr = new Uint32Array(opts.length);
    crypto.getRandomValues(arr);
    return Array.from(arr, n => charset[n % charset.length]).join('');
  }

  calcStrength(pwd: string, opts: PasswordOptions): 'weak' | 'medium' | 'strong' | 'very-strong' | null {
    if (!pwd) return null;
    let score = 0;
    if (pwd.length >= 10) score++;
    if (pwd.length >= 16) score++;
    if (pwd.length >= 24) score++;
    const types = (['upper', 'lower', 'numbers', 'symbols'] as const)
      .filter(k => opts[k]).length;
    score += types;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    if (score <= 5) return 'strong';
    return 'very-strong';
  }

}
