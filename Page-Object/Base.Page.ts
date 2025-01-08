import {Page } from 'playwright/test'

export class Base {
    readonly page :Page
  constructor(page : Page){
    this.page = page
  }
  async NavigateToUrl (url : string){
    await this.page.goto(url)
  }
}