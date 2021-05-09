class campaignQuotePage {

    selectCampaignType(campaignType) {
        if (campaignType == 'Influencer') {
            cy.get(':nth-child(1) > .cshnUt > .fWVOjf > .sc-dIUggk > :nth-child(1) > .childrenWrapper > .kCpdp').click();
        } else if (campaignType == 'Content') {
            cy.get(':nth-child(1) > .cshnUt > .fWVOjf > .sc-dIUggk > :nth-child(2) > .childrenWrapper > .kCpdp').click();
        }  
    }

    setBudgetCurrencyToAUD() {
        cy.get('#select-currencyId > .react-select__control > .react-select__value-container')
            .click()
            .get('#react-select-2-option-0')
            .click();
        cy.get('#select-currencyId > .react-select__control > .react-select__value-container').contains('AUD').should('be.visible');
    }

    setBudgetValue(amount) {
        return cy.get('.kvPGEK > .jXBclO > .sc-fubCfw').clear().type(amount);
    }

    setHowToSupplyProductToCreator() {
        cy.get('#select-productDistributionType > .react-select__control > .react-select__value-container')
            .click()
            .get('#react-select-3-option-1')
            .click();
        cy.get('#select-productDistributionType > .react-select__control > .react-select__value-container').contains('The product will be shipped to the creator').should('be.visible');
    }

    setCreatorDemographicsAge() {
        cy.get('#select-desiredAgeRanges > .react-select__control > .react-select__value-container')
            .click()
            .get('#react-select-4-option-2')
            .click();
        cy.get('#select-desiredAgeRanges > .react-select__control > .react-select__value-container').contains('18-24').should('be.visible');
    }

    setCreatorDemographicsGender() {
        cy.get('#select-desiredGenders > .react-select__control > .react-select__value-container')
        .click()
        .get('#react-select-5-option-0')
        .click();
      cy.get('#select-desiredGenders > .react-select__control > .react-select__value-container').contains('All').should('be.visible');
    }

    setLocationToAustralia() {
        cy.get('#select-desiredLocation > .react-select__control > .react-select__value-container')
            .click()
            .get('#react-select-6-option-1')
            .click();
        cy.get('.css-12jo7m5').contains('Australia').should('be.visible');
    }

    selectSocialChannelInstagram() {
        return cy.get(':nth-child(3) > :nth-child(1) > .childrenWrapper > .kCpdp').click();
    }

    waitForPerformanceMetricsToLoad() {
        cy.intercept('https://staging-analytics-api.vamp.me/price-estimation/performance-estimates').as('performanceMetrics');
        cy.wait('@performanceMetrics');
    }

    saveQuote() {
        return cy.get('button').contains('Save quote').click();
    }

    assertPerformanceMetricsReturnsResults() {
        cy.get('[data-cy=performance-stat-socialAudience]').should('not.contain', '0 - 0');
        cy.get('[data-cy=performance-stat-impressions]').should('not.contain', '0 - 0');
        cy.get('[data-cy=performance-stat-reach]').should('not.contain', '0 - 0');
        cy.get('[data-cy=performance-stat-engagement]').should('not.contain', '0 - 0');
        cy.get('[data-cy=performance-stat-cpe]').should('not.contain', '0 - 0');
        cy.get('[data-cy=performance-stat-cpm]').should('not.contain', '0 - 0');
        cy.get('[data-cy=performance-stat-talent]').should('not.contain', '0 - 0');
        cy.get('[data-cy=performance-stat-content]').should('not.contain', '0');
    }

    assertSocialChannelValuesAppear() {
        return cy.get('.gGsdkh').should('have.length', 1);
    }

    assertRequiredFields() {
        cy.get('.dDrNpr > .gdbLrW > [data-cy=input-error]').should('have.text', 'This value is required');
        cy.get('.bmOZbr > .gdbLrW > [data-cy=input-error]').should('have.text', 'This value is required');
        cy.get('.ejanri > .gdbLrW > [data-cy=input-error]').should('have.text', 'This value is required');
        cy.get('.dzSwvm > .gdbLrW > [data-cy=input-error]').should('have.text', 'This value is required');
        cy.get('.jQrgUF > .gdbLrW > [data-cy=input-error]').should('have.text', 'This value is required');
        cy.get('.fWVOjf > :nth-child(3) > :nth-child(1) > [data-cy=input-error]').should('have.text', 'This value is required');
    }

    assertSaveQuotePromptAppears() {
        cy.get('.dialog-popup__title').should('be.visible');
        cy.get('form > :nth-child(1) > .jXBclO > .sc-fubCfw').should('be.visible');
        cy.get(':nth-child(2) > .jXBclO > .sc-fubCfw').should('be.visible');
    }

    assertCreatorManagementNotVisible() {
        return cy.get('.bsQnQg').should('not.exist');
    }

    assertEventAttendanceNotVisible() {
        return cy.get('.jgXwEM').should('not.exist');
    }

    assertObjectivesAreNotVisible() {
        return cy.get('.fWVOjf > :nth-child(2) > :nth-child(1) > .hYpOWP').should('not.exist');
    }

    assertSocialChannelFieldsNotVisible() {
        return cy.get('.fWVOjf > :nth-child(3) > :nth-child(1) > .hYpOWP').should('not.exist');
    }

    assertSocialChannelBarsNotVisibleUnderContent() {
        cy.get(':nth-child(2) > [data-cy=percentage-bar]').should('not.exist');
        cy.get(':nth-child(3) > [data-cy=percentage-bar]').should('not.exist');
        cy.get(':nth-child(4) > [data-cy=percentage-bar]').should('not.exist');
        cy.get(':nth-child(5) > [data-cy=percentage-bar]').should('not.exist');
        cy.get(':nth-child(6) > [data-cy=percentage-bar]').should('not.exist');
    }

    assertSocialChannelBarsNotVisibleInHeader() {
        return cy.get('.sc-bdfBwQ > [data-cy=percentage-bar]').should('not.exist');
    }

    assertImagesAndVideosAppearInPerformanceMetrics() {
        cy.get('[data-cy=performance-stat-imageContent]').should('exist');
        cy.get('[data-cy=performance-stat-videoContent]').should('exist');
    }
}

export default new campaignQuotePage();