import { TitleCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  canSendNotifications,
  enabledCategories,
  getOption,
  setOption,
  ToggleableCategory,
} from '../../helpers';
import { GameOptions } from '../../interfaces';
import { OptionsBaseComponent } from '../panel-options/option-base-page.component';

@Component({
  selector: 'app-panel-options-ui',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './panel-options-ui.component.html',
  styleUrl: './panel-options-ui.component.css',
})
export class PanelOptionsUIComponent extends OptionsBaseComponent {
  public currentTheme = signal<string>(
    this.currentValueForOption('uiTheme') as string,
  );

  public notificationsEnabled = computed(() => canSendNotifications());
  public notificationCategoriesEnabled = computed(() => enabledCategories());

  public readonly themes = [
    { name: 'acid', type: 'light' },
    { name: 'autumn', type: 'light' },
    {
      name: 'black',
      type: 'dark',
    },
    { name: 'bumblebee', type: 'light' },
    {
      name: 'business',
      type: 'dark',
    },
    {
      name: 'coffee',
      type: 'dark',
    },
    { name: 'cmyk', type: 'light' },
    { name: 'corporate', type: 'light' },
    { name: 'cupcake', type: 'light' },
    { name: 'cyberpunk', type: 'light' },
    {
      name: 'dark',
      type: 'dark',
    },
    {
      name: 'dim',
      type: 'dark',
    },
    {
      name: 'dracula',
      type: 'dark',
    },
    { name: 'emerald', type: 'light' },
    { name: 'fantasy', type: 'light' },
    {
      name: 'forest',
      type: 'dark',
    },
    { name: 'garden', type: 'light' },
    {
      name: 'halloween',
      type: 'dark',
    },
    { name: 'lemonade', type: 'light' },
    { name: 'light', type: 'light' },
    { name: 'lofi', type: 'light' },
    {
      name: 'luxury',
      type: 'dark',
    },
    {
      name: 'night',
      type: 'dark',
    },
    { name: 'nord', type: 'light' },
    { name: 'pastel', type: 'light' },
    { name: 'retro', type: 'light' },
    {
      name: 'sunset',
      type: 'dark',
    },
    { name: 'synthwave', type: 'dark' },
    { name: 'valentine', type: 'light' },
    { name: 'winter', type: 'light' },
    { name: 'wireframe', type: 'light' },
  ];

  public changeTheme(theme: string): void {
    this.setValueForOption('uiTheme', theme);
  }

  public getOption<T extends keyof GameOptions>(option: T) {
    return getOption(option);
  }

  public setOption<T extends keyof GameOptions>(
    option: T,
    value: GameOptions[T],
  ) {
    setOption(option, value);
  }

  public toggleNotifications() {
    canSendNotifications.set(!canSendNotifications());
  }

  public toggleNotificationCategories(category: ToggleableCategory) {
    if (enabledCategories().includes(category)) {
      enabledCategories.set(
        enabledCategories().filter((cat) => cat !== category),
      );
      return;
    }
    enabledCategories.set([...enabledCategories(), category]);
  }
}
