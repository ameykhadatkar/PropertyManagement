import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/properties', title: 'Properties',  icon:'holiday_village', class: '' },
    { path: '/tenant', title: 'Tenant',  icon:'groups', class: '' },
    { path: '/transactions', title: 'Transactions',  icon:'receipt_long', class: '' },
    { path: '/account-monitoring', title: 'Account Monitoring',  icon:'account_balance', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/export', title: 'Export',  icon:'insights', class: '' },
    { path: '/document-storage', title: 'Document Storage',  icon:'upload', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
