
Feature('Is landingpage-available');

Scenario('test something', (I) => {
    I.amOnPage("https://dhbw-richie.de")
    I.wait(10)
    I.see("Willkommen")
});
