import { Page, expect, test } from '@playwright/test'
import { BrowserWrapper } from '../infra/ui/brwoser-wrapper'
import * as UI_URLS from '../config/ui-urls.json'
import { AddressPage } from '../logic/ui/address-page'
import user from "../config/user-credentials.json"
import { ApiCalls } from "../logic/api/api-requtsets";
import { buildAddressRequest } from "../logic/api/request-body/add-new-address-api-request";

test.describe('Add New Address And Validate ', () => {

    let browser: BrowserWrapper
    let page: Page

    test.beforeEach(async () => {
        browser = new BrowserWrapper()
        page = await browser.getPage(UI_URLS.myAdressesPage);
        await browser.maximizeWindow()
    })

    test.afterEach(async () => { await browser.closeBrowser() })

    test('Add New Address And Validate', async () => {
        // add address
        const {firstname,lastname,postcode,telephone,city,country_id} = {...user.address}
        const {streetName,streetNumber,homeNumber} = {...user.address.street}
        const data = buildAddressRequest(firstname,lastname,postcode,telephone,city,country_id,{streetName,streetNumber,homeNumber})
        const apiCall = new ApiCalls();
        await apiCall.addNewAdress(data)
        // assert
        const addressPage = new AddressPage(page)
        expect( await addressPage.checkAddress(firstname,lastname,city,streetName,homeNumber,telephone,postcode)).toBeTruthy()

    })

})

