import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

/**
 * Header Component
 */
export class HeaderComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators: any;

  loginPassField!: boolean;
  public isCollapsed = true;
  cartData: any;
  subTotal = 0;
  Total: any;

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;

  //  Signup form
  signupPassField!: boolean;
  signupCPassField!: boolean;
  SignupForm!: UntypedFormGroup;
  submit = false;

  // Language set
  flagValue: any;
  selectedLanguage: any;
  flag: any;
  countryName: any;
  cookieValue: any;
  valueSet: any;

  constructor(private router: Router, private modalService: NgbModal, protected authService: AuthService,
              private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    const pathName = window.location.pathname;
    /**
     * Form Validation
     */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    /**
     * Form Validation
     */
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    // Language set
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagValue === undefined) { this.valueSet = 'assets/img/flags/en.png'; }
    } else {
      this.flagValue = val.map(element => element.flag);
    }

    this.selectedLanguage = 'Eng / $';
  }

  calculateTotal(total: any) {
    this.subTotal = 0;
    this.cartData.forEach((element: any) => {

      this.subTotal += parseFloat(element.price)
    });
    return this.subTotal.toFixed(2)
  }

  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    // this.initActiveMenu();
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

  /**
   * Open scroll modal
   * @param staticDataModal
   */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

  //------------------ Sign In Form ---------------------//
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.logUserIn(this.loginForm.value)
      .subscribe({
        next: response => {
          document.getElementById('modal-close')?.click();
          this.router.navigateByUrl('/account/transactions')
        }
      })
  }

  /**
   * Password Hide/Show
   */
  toggleLoginPassField() {
    this.loginPassField = !this.loginPassField;
  }

  //------------------ Sign Up Form ---------------------//

  // convenience getter for easy access to form fields
  get fa() { return this.SignupForm.controls; }

  /**
   * Form submit
   */
  SignupSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.SignupForm.invalid) {
      return;
    }

    this.authService.registerUserAsPassenger(this.SignupForm.value).subscribe({
      next: response => {
        this.authService.logUserIn(this.SignupForm.value)
          .subscribe({
            next: response => {
              document.getElementById('modal-close')?.click();
              this.router.navigateByUrl('/account/transactions')
            }
          })
      },
      error: error => console.error(error)
    })
  }

  /**
   * Password Hide/Show
   */
  toggleSignupPassField() {
    this.signupPassField = !this.signupPassField;
  }

  /**
   * Password Hide/Show
   */
  toggleSignupCPassField() {
    this.signupCPassField = !this.signupCPassField;
  }

  // Scroll Toggle Menu Hide/Show
  menuShow() {
    document.querySelector('.navbar-stuck-menu')?.classList.toggle('show');
  }

  // Sidebar Toggle
  sidebar() {
    document.getElementById('shop-sidebar')?.classList.add('show');
  }

  /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/img/flags/en.png', lang: 'en', language: 'Eng / $' },
    { text: 'Deutsche', flag: 'assets/img/flags/de.png', lang: 'de', language: 'DE / £' },
    { text: 'Italiana', flag: 'assets/img/flags/it.png', lang: 'it', language: 'IT / ¥' },
    { text: 'français', flag: 'assets/img/flags/fr.png', lang: 'fr', language: 'FR / €' },
  ];

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string, language: string) {
    this.countryName = text;
    this.flagValue = flag;
    this.cookieValue = lang;
    this.selectedLanguage = language
  }

  // Remove
  remove(id: any) {
    this.subTotal -= parseFloat(this.cartData[id].price)
    this.cartData.splice(id, 1);
  }

}
