import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
    @Input() type: 'sideBar' | 'menuBar' | 'burgerMenu' = 'menuBar';

    menuItems = [
        { href: '/home', label: 'Início' },
        { href: '/home/transactions', label: 'Transferências' },
        { href: '/home/investments', label: 'Investimentos' },
        { href: '/home/services', label: 'Outros Serviços' },
    ];

    typeClasses: { [key: string]: string } = {
        sideBar: 'flex flex-col h-44',
        menuBar: 'flex flex-row justify-between w-[38rem] px-4 gap-4 ',
        burgerMenu: 'flex flex-col gap-4',
    };

    constructor(private router: Router) { }

    get actualPage(): string {
        return window.location.pathname;
    }

    navigateTo(href: string): void {
        console.log('Navigating to', href);
        this.router.navigate([href]);
    }
}