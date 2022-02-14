$(document).ready(function () {
  class Magic8Ball {
    constructor(listofanswers, regExp, error) {
      this.listofanswers = listofanswers;
      this.regExp = regExp;
      this.error = error;
      this.allQuestionsAnswers = [];
    }

    getAnswer() {
      if (this.allQuestionsAnswers.length === 5) {
        return;
      }
      var randomNumber = Math.random();
      var randomAnswer = Math.floor(randomNumber * this.listofanswers.length);
      var answer = '';

      if (this.question.toLowerCase().trim() === 'увійти в айті?') {
        answer = 'Увійти';
      } else answer = this.listofanswers[randomAnswer];
      $('.answer').css({ display: 'block' });
      $('.8ball').effect('shake');
      $('.answer').text(answer);
      $('.answer').fadeIn(3000);
      $('.8ball').attr(
        'src',
        'https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/answerside.png',
      );
      this.answer = answer;
    }

    getQuestion() {
      const question = prompt('What do you want to know?');
      $('.answer').hide();
      $('.error').hide();
      $('.8ball').attr(
        'src',
        'https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/magic8ballQuestion.png',
      );
      this.question = question;
    }

    getAllQuestionsAnswers() {
      if (this.allQuestionsAnswers.length === 5) {
        alert('Sorry, you can ask only 5 questions:)');
        return;
      }

      this.allQuestionsAnswers.push({ question: this.question, answer: this.answer });

      this.allQuestionsAnswers.sort(function (a, b) {
        if (a.answer.length > b.answer.length) {
          return 1;
        }
        if (a.answer.length < b.answer.length) {
          return -1;
        }
        return 0;
      });

      if (this.allQuestionsAnswers.length > 0) {
        $('.notification').hide();
        $('.questionsAnswersList').empty();
        this.allQuestionsAnswers.map(item => {
          $('.questionsAnswersList').append(
            `<li class="questionsAnswersListItem"><p class="question">${item.question}</p>-${item.answer}</li>`,
          );
        });
      }
    }

    showQuestion() {
      if (this.allQuestionsAnswers.length === 5) {
        return;
      }
      $('#dialog').text(this.question).dialog({ minHeight: 20 });
      $('.ui-button-text')
        .text('')
        .append("<img class='close-btn' src='./images/close.png'  width='16'/>");
      $('.ui-dialog').css({
        position: 'absolute',
        top: '19%',
        left: '50%',
        'margin-left': 'auto',
        'margin-right': 'auto',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #f16059',
        height: '40px',
        'border-radius': '5px',
      });
      $('.ui-button')
        .css({
          display: 'block',
          border: 'none',
          'background-color': 'transparent',
          padding: '0',
          'margin-left': 'auto',
        })
        .click(() => $('.answer').hide());
    }

    setQuestionValidation(question) {
      if (!this.regExp.test(this.question)) {
        alert(this.error);
        return false;
      } else if (this.question.length > 25) {
        alert("You question can't be more than 25 characters!");
        return false;
      }

      if (this.question.toLowerCase().match(/тестер/)) {
        $('.error').fadeIn().delay(4000).fadeOut();
        $('.error-text').text(`!Don't use 'тестер' word in your question!`);
        return false;
      }
      return true;
    }

    onClickAskBtn() {
      if (magic8Ball.allQuestionsAnswers.length > 0) {
        $('#dialog').dialog('close');
      }

      magic8Ball.getQuestion();
      const isQuestionValid = magic8Ball.setQuestionValidation();

      if (isQuestionValid) {
        magic8Ball.showQuestion();
      } else return;
      magic8Ball.getAnswer();
      magic8Ball.getAllQuestionsAnswers();
    }
  }

  const listofanswers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes, definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    "Don't count on it.",
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
  ];

  const magic8Ball = new Magic8Ball(
    listofanswers,
    /^[?, .А-Яа-яЁёЇїІіЄєҐґ']+$/u,
    'Please,use only Cyrillic alphabet!',
  );

  $('.questionButton').click(magic8Ball.onClickAskBtn);
});
