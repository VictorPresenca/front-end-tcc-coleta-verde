import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

// tudo isso abaixo é para não aparecer o tabs original nas telas principais.

  showTabBar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  checkRoute(url: string) {
    const noTabsRoutes = [
      '/tabs/tab1',
      '/tabs/tab2',
      '/tabs/tab3',
      './pedido-cliente',
    ];

    this.showTabBar = !noTabsRoutes.includes(url);
  }

}
