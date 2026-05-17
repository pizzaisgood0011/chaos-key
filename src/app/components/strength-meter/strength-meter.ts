import { Component, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';

type StrengthLevel = 'weak' | 'medium' | 'strong' | 'very-strong' | null;

@Component({
  selector: 'app-strength-meter',
  imports: [NgClass],
  templateUrl: './strength-meter.html',
  styleUrl: './strength-meter.css',
})
export class StrengthMeter {

  barColor = computed(() => {
    const map: Record<string, string> = {
      'weak': 'var(--red)',
      'medium': 'var(--amber)',
      'strong': 'var(--green)',
      'very-strong': 'var(--green)',
    };
    return map[this.strength() ?? ''] ?? 'transparent';
  });

  strength = input<StrengthLevel>(null);

  bars = [1, 2, 3, 4];

  filled = computed(() => {
    const map: Record<string, number> = {
      'weak': 1, 'medium': 2, 'strong': 3, 'very-strong': 4,
    };
    return map[this.strength() ?? ''] ?? 0;
  });

  label = computed(() => {
    const map: Record<string, string> = {
      'weak': 'Weak', 'medium': 'Medium',
      'strong': 'Strong', 'very-strong': 'Very strong',
    };
    return map[this.strength() ?? ''] ?? '';
  });

}
