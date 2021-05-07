import campaignQuotePage from '../support/campaignQuotePage';

context('Vamp Automated Test Challenge', () => {
  beforeEach(() => {
    cy.visit('https://vamp.vampdashstaging.com/campaign/create/quote')
  })

  it('Vamp campaign quote page loads successfully', () => {
    // This is a basic test to check the Vamp campaign quote staging page loads correctly
    cy.get('[data-cy="campaign-header"]')
      .contains('Welcome to Quote')
      .should('be.visible');
  })

  it('Test case 1 - Setting currency, budget, location & social channel will show performance metric results for an "Influencer" campaign type', () => {
    // This test validates that performance metrics will return results when all necessary fields are set
    campaignQuotePage.selectCampaignType('Influencer');
    campaignQuotePage.setBudgetCurrencyToAUD();
    campaignQuotePage.setBudgetValue('2000');
    campaignQuotePage.setLocationToAustralia();
    campaignQuotePage.selectSocialChannelInstagram();
    campaignQuotePage.waitForPerformanceMetricsToLoad();
    campaignQuotePage.assertPerformanceMetricsReturnsResults();
    campaignQuotePage.assertSocialChannelValuesAppear();
  })

  it('Test case 2 - User is not able to save an "Influencer" campaign quote until all required fields are populated', () => {
    // This test checks that a user can save a campaign quote only when the required fields are entered
    campaignQuotePage.selectCampaignType('Influencer');
    campaignQuotePage.saveQuote();
    campaignQuotePage.assertRequiredFields();
    campaignQuotePage.setBudgetCurrencyToAUD();
    campaignQuotePage.setBudgetValue('2000');
    campaignQuotePage.setHowToSupplyProductToCreator();
    campaignQuotePage.setCreatorDemographicsAge();
    campaignQuotePage.setCreatorDemographicsGender();  
    campaignQuotePage.setLocationToAustralia();
    campaignQuotePage.selectSocialChannelInstagram();
    campaignQuotePage.saveQuote();
    campaignQuotePage.assertSaveQuotePromptAppears();
  })

  it('Test case 3 - Validate fields that are not visible when the "Content" campaign type is selected', () => {
    // This test validates that creator manangement, event attendance and ojbectives/socials channels do not appear for a Content campaign 
    campaignQuotePage.selectCampaignType('Content');
    campaignQuotePage.assertCreatorManagementNotVisible();
    campaignQuotePage.assertEventAttendanceNotVisible();
    campaignQuotePage.assertObjectivesAreNotVisible();
    campaignQuotePage.assertSocialChannelFieldsNotVisible();
  })

  it('Test case 4 - Validate social channel bars are not visible and performance metrics show images and videos for a "Content" campaign type', () => {
    // This test validates that social channel bars do not appear and performance metrics show just images and vides for a Content campaign
    campaignQuotePage.selectCampaignType('Content');
    campaignQuotePage.assertSocialChannelBarsNotVisibleUnderContent();
    campaignQuotePage.assertSocialChannelBarsNotVisibleInHeader();
    campaignQuotePage.assertImagesAndVideosAppearInPerformanceMetrics();
  })

  afterEach(() => {
    cy.reload();
  })
})
  