import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { PasswordService } from '../../services/password.service';
import { PasswordOptions } from '../../models/password-optoins.model';
import { SettingsPanel } from '../settings-panel/settings-panel';
import { StrengthMeter } from '../strength-meter/strength-meter';

@Component({
  selector: 'app-password-generator',
  imports: [SettingsPanel, StrengthMeter],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.css',
})
export class PasswordGenerator implements OnInit {

  private svc = inject(PasswordService);

  options = signal<PasswordOptions>({
    length: 16,
    upper: true, lower: true, numbers: true, symbols: false,
  });

  password = signal('');
  copied = signal(false);

  strength = computed(() =>
    this.svc.calcStrength(this.password(), this.options())
  );

  get activeCount(): number {
    const o = this.options();
    return [o.upper, o.lower, o.numbers, o.symbols].filter(Boolean).length;
  }

  ngOnInit(): void { this.generate(); }

  generate(): void {
    if (this.activeCount === 0) return;
    this.password.set(this.svc.generate(this.options()));
    this.copied.set(false);
  }

  async copy(): Promise<void> {
    if (!this.password()) return;
    await navigator.clipboard.writeText(this.password());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

}
