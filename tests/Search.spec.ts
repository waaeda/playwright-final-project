import {test, expect} from '@playwright/test';
import {BrowserWrapper} from '../infra/ui/brwoser-wrapper';
import {SearchPage} from '../logic/pages/searchPage';
import {WebsiteUrl} from '../config/ui-url.json';
import {brandSearch} from '../config/brandSearch.json'


test.describe('search test', ()=>{
    let browserWrapper : BrowserWrapper;

    test.beforeAll(async()=>{
        browserWrapper = new BrowserWrapper();

    })

    test.beforeEach(async()=>{
        await browserWrapper.maximizeWindow();
    })
    

    test.afterEach(async()=>{
        await browserWrapper.closeBrowser();
    })


    test('Perform search on TerminalX', async () => {
        const page = await browserWrapper.getPage(WebsiteUrl)
        const searchPage = new SearchPage(page);
        await browserWrapper.maximizeWindow();
        await searchPage.clickSearchIcon()   
        await searchPage.typeSearch(brandSearch);
        await page.keyboard.press('Enter');
        expect(await searchPage.getProductListItemsText(brandSearch)).toBeTruthy();
        
    });
 })



  




