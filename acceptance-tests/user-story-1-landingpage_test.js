
Feature('User Story 1 - Landingpage');

Scenario('As a User I visit the Landing Page in order to get to know the DHBW Richie', (I) => {
    I.amOnPage("https://dhbw-richie.de")
    I.wait(10)
    I.see("Willkommen")
});
