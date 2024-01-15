import {Page, expect, test} from '@playwright/test'
import { BrowserWrapper } from '../infra/ui/brwoser-wrapper'
import { OnSale } from '../logic/ui/OnSale';
import { NavBar } from '../logic/ui/NavBar';
import * as UI_URLS from '../configs/ui-urls.json'

let browser:BrowserWrapper
let page:Page
test.beforeEach(async()=>{
    browser = new BrowserWrapper()
    page = await browser.getPage(UI_URLS.mainPage);
})
test.afterEach(async()=>{
    await browser.closeBrowser()
})

test('Flow To Men Page',async()=>{
    const navbar = new NavBar(page)
    await navbar.flowToMen()
})