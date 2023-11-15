import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

/**
 * Menu Component
 */
export class MenuComponent implements OnInit {

  menuItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Menu Items
    this.menuItems = [];

    this.initActiveMenu();
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: any) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * On menu click
   */
  onMenuClick(event: any) {
    const nextEl = event.target.nextElementSibling;
    if (nextEl) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove('show');
      }
      nextEl.classList.toggle('show');
    }
    return false;
  }

  toggleItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.menu-link');
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
      activeIconItems.forEach((item: any) => {
        item.setAttribute('aria-expanded', "false")
        item.classList.remove("active");
      });
    }
    if (isCurrentMenuId) { }
  }

  toggleSubItem(event: any) {
    if (event.target && event.target.nextElementSibling)
      event.target.nextElementSibling.classList.toggle("show");
  };

  // Load Wise Active class set
  initActiveMenu() {
    setTimeout(() => {
      const pathName = window.location.pathname;
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const items = Array.from(ul.querySelectorAll("a.sublink"));
        let activeItems = items.filter((x: any) => x.classList.contains("active"));
        let matchingMenuItem = items.find((x: any) => {
          return x.pathname === pathName;
        });
        if (matchingMenuItem != undefined) {
          this.activateParentDropdown(matchingMenuItem);
        }
      }
    }, 0);
  }

  // remove active items of two-column-menu
  activateParentDropdown(item: any) {
    item.classList.add('active')
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
        if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
          parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling?.classList.add("active");
      }
    }
  }

}
