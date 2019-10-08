
Feature('Provide Helpful Answers');

Scenario('As a Reviewer I add helpful answers to new questions', (I) => {

    const newQuestion = "Will some of us live on Mars?"
    const defaultAnswer = "Ich bin mir noch nicht ganz sicher wie ich das beantworten soll. Bitte gib mir etwas Bedenkzeit und frage mich morgen nochmal."
    const newAnswer = "Yes"

    I.visitLandingPage()
    I.askQuestionAndExpect(newQuestion, defaultAnswer)

    I.loginAsReviewer()
    I.addAnswerToRecentlyAddedQuestion(newAnswer)
    I.logout()

    I.askQuestionAndExpect(newQuestion, newAnswer)
});
