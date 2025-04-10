import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CreateUserRequest, LoginService } from '../services/login.service';

@Component({
    selector: 'app-form-modal',
    templateUrl: './form-modal.component.html',
    styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent {
    @Input() isLogin = true; // Determines if the form is for login or registration
    @Output() closeModal = new EventEmitter<void>();

    errorMessage = '';

    nome = new FormControl('', { validators: [Validators.required, Validators.minLength(3)] });
    email = new FormControl('', { validators: [Validators.required, Validators.email] });
    password = new FormControl('', { validators: [Validators.required, Validators.minLength(6)] });

    constructor(private loginService: LoginService) { }

    onClose() {
        this.closeModal.emit();
    }

    onSubmit() {
        if (!this.isLogin && this.nome.invalid) {
            this.errorMessage = 'Please enter a valid name.';
            return;
        }

        if (this.email.invalid || this.password.invalid) {
            this.errorMessage = 'Please enter a valid email and password.';
            return;
        }

        const nomeValue = this.nome.value ?? '';
        const emailValue = this.email.value ?? '';
        const passwordValue = this.password.value ?? '';

        if (this.isLogin) {
            console.log('Login:', { email: emailValue, password: passwordValue });
            // Uncomment the following to use the login service
            this.loginService.login(emailValue, passwordValue).subscribe({
                next: (response) => {
                    console.log('Login successful:', response);
                    window.location.replace('/home');
                    this.onClose();
                },
                error: (error) => {
                    console.error('Login failed:', error);
                    this.errorMessage = 'Invalid email or password.';
                }
            });
        } else {
            const user: CreateUserRequest = {
                username: nomeValue,
                email: emailValue,
                password: passwordValue
            };
            this.loginService.createUser(user).subscribe({
                next: (response) => {
                    console.log('User created successfully:', response);
                    this.onClose();
                },
                error: (error) => {
                    console.error('User creation failed:', error);
                    this.errorMessage = 'Failed to create user. Please try again.';
                }
            });
        }
    }
}
