
Feature('Get Helpful Answers');

Scenario('As a User I ask a Question', (I) => {
    I.visitLandingPage()
    I.askQuestionAndExpect("Was meinen manche Entwickler mit SCS?", "Wahrscheinlich sprechen sie von Self Contained Systems. Eine gute Zusammenfassung dazu findest Du hier: https://blog.senacor.com/self-contained-systems")
});
