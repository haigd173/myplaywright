import {Page } from 'playwright/test'

export class Base {
    readonly page :Page
  constructor(page : Page){
    this.page = page

  }
  async NavigateToUrl (){
    await this.page.goto('https://localhost:44336/')
  }
}