import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {
  NgbCarousel, NgbCollapse,
  NgbDropdown,
  NgbDropdownMenu, NgbDropdownToggle,
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLink,
  NgbNavOutlet, NgbSlide
} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink} from "@angular/router";
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbNavContent,
    NgbNavItem,
    NgbNav,
    NgbNavLink,
    NgbNavOutlet,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    RouterLink,
    NgbCarousel,
    NgbSlide,
    NgbCollapse
  ]
})
export class SharedModule { }
