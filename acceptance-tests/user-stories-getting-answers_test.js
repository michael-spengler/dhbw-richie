Feature('Get Helpful Answers');

Scenario(
  `As a User I ask a Question and expect a valuable answer in order to support my learning process.`,
  I => {
    const question = 'Was meinen manche Entwickler mit SCS?';
    const answer =
      'Wahrscheinlich sprechen sie von Self Contained Systems. Eine gute Zusammenfassung dazu findest Du hier: https://blog.senacor.com/self-contained-systems';

    I.visitLandingPage();
    I.askQuestionAndExpect(question, answer);
  }
);
