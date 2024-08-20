import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  cards = [
    {
      title: 'Users',
      image: 'assets/images/users.svg',
      route: '/settings/userSettings',
    },
    {
      title: 'Campaign',
      image: 'assets/icons/screen.svg',
      route: '/settings/campaignSettings',
    },
    {
      title: 'Playlist',
      image: 'assets/images/media.svg',
      route: '/settings/playlistSettings',
    },
    {
      title: 'Schedulers',
      image: 'assets/images/scheduler.svg',
      route: '/settings/schedulerSettings',
    },
  ];
}
