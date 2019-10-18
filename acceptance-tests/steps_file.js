// in this file you can append custom step methods to 'I' object
const baseURL = 'http://localhost:4200';
// const baseURL = "https://dhbw-richie.de"

module.exports = function() {
  return actor({
    visitLandingPage: function() {
      this.amOnPage(baseURL); // should be replaced by localhost
      this.wait(6);
      this.see('Wissensdatenbank');
    },

    askQuestionAndExpect: function(question, answer) {
      this.click(locate('i').withAttr({ class: 'fa-bars fas' }));
      this.click(locate('i').withAttr({ class: 'fa-search fad' }));
      this.fillField(locate('input'), question);
      this.wait(2);
      this.pressKey('Enter');
      this.wait(5);
      this.see('Filter setzen');
      // this.see(answer)
    },

    addAnswerToRecentlyAddedQuestion: function(
      newQuestion,
      newAnswerForRecentlyAddedQuestion
    ) {
      this.wait(2);
      this.say(
        `I add "${newAnswerForRecentlyAddedQuestion}" for question: ${newQuestion}`
      );
      // this.click("Browse new Questions")
      // this.see(newQuestion)
      // this.click(newQuestion)
      // this.fillField("answer", newAnswerForRecentlyAddedQuestion)
      // this.click("Go")
    },

    loginAsReviewer: function() {
      this.wait(2);
      this.say(`I login via Telegram`);
      // this.click("Login Via Telegram")
      // this.see("Successfully Signed In")
    },

    logout: function() {
      this.wait(2);
      this.say('I logout');
      // this.click("Logout")
    }
  });
};
