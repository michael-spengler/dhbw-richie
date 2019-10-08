
// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    visitLandingPage: function () {
      this.amOnPage("https://dhbw-richie.de") // should be replaced by localhost 
      this.wait(10)
      this.see("Welcome")
    },

    askQuestionAndExpect: function (question, answer) {
      this.wait(2)
      this.say(`I received a question: ${question}`)
      // this.fillField("question", question)
      // this.click("Go")
      // this.wait(10)
      // this.see(answer)
      this.say(`I gave the following answer: ${answer}`)

    },

    addAnswerToRecentlyAddedQuestion: function (newQuestion, newAnswerForRecentlyAddedQuestion) {
      this.wait(2)
      this.say(`I add "${newAnswerForRecentlyAddedQuestion}" for question: ${newQuestion}`)
      // this.click("Browse new Questions")
      // this.see(newQuestion)
      // this.click(newQuestion)
      // this.fillField("answer", newAnswerForRecentlyAddedQuestion)
      // this.click("Go")
    },


    loginAsReviewer: function () {
      this.wait(2)
      this.say(`I login via Telegram`)
      // this.click("Login Via Telegram")
      // this.see("Successfully Signed In")
    },

    logout: function () {
      this.wait(2)
      this.say("I logout")
      // this.click("Logout")
    },

  });
}
