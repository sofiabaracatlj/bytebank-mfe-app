import { Component } from '@angular/core';
import { faGift, faMobileScreen, faMoneyBillTransfer, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-login-body',
    templateUrl: './login-body.component.html',
    styleUrls: ['./login-body.component.css']
})
export class LoginBodyComponent {
    faGift = faGift;
    faMoneyTransfer = faMoneyBillTransfer;
    faStar = faStar;
    faMobile = faMobileScreen;


}
