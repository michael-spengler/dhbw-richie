
// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    visitLandingPage: function () {
      this.amOnPage("https://dhbw-richie.de") // should be replaced by localhost 
      this.wait(10)
      this.see("Welcome")
    },

    askQuestionAndExpect: function (question, answer) {
      // this.fillField("question", question)
      // this.click("Go")
      // this.wait(10)
      // this.see(answer)
    },

    addAnswerToRecentlyAddedQuestion: function (newQuestion, newAnswerForRecentlyAddedQuestion) {
      // this.click("Browse new Questions")
      // this.see(newQuestion)
      // this.click(newQuestion)
      // this.fillField("answer", newAnswerForRecentlyAddedQuestion)
      // this.click("Go")
    },


    loginAsReviewer: function () {
      // this.click("Login Via Telegram")
      // this.see("Successfully Signed In")
    }
  });
}
