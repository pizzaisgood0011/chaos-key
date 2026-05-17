import { Component, input, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordOptions } from '../../models/password-optoins.model';

@Component({
  selector: 'app-settings-panel',
  imports: [FormsModule],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.css',
})
export class SettingsPanel {

  options = model.required<PasswordOptions>();

  charTypes = [
    { key: 'upper', label: 'Uppercase', example: 'ABC' },
    { key: 'lower', label: 'Lowercase', example: 'abc' },
    { key: 'numbers', label: 'Numbers', example: '123' },
    { key: 'symbols', label: 'Symbols', example: '!@#' },
  ] as const;

  get activeCount(): number {
    const o = this.options();
    return [o.upper, o.lower, o.numbers, o.symbols].filter(Boolean).length;
  }

  onLengthChange(val: number): void {
    this.options.update(o => ({ ...o, length: val }));
  }

  onTypeChange(key: keyof PasswordOptions, val: boolean): void {
    this.options.update(o => ({ ...o, [key]: val }));
  }

}
