import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '../config';
import { QuestionService } from './question.service';

const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Finanzbuchhaltung',
          url: 'tg://join?invite=OPAIJBTneo2nOtpJQW1OZg'
        },
        {
          text: 'Handels- & Gesellschaftsrecht',
          url: 'tg://join?invite=OPAIJBG-3psPyQ8_DnAQ5w'
        }
      ],
      [
        {
          text: 'Kommunikations- & Betriebssysteme',
          url: 'tg://join?invite=OPAIJA-X5rNSatj3xYK-0w'
        },
        {
          text: 'Kosten- & Leistungsrechnung',
          url: 'tg://join?invite=OPAIJBMh5QzLGDZMpmyOWw'
        }
      ],
      [
        {
          text: 'Logik & Algebra',
          url: 'tg://join?invite=OPAIJBRrsdtbKrdD_jryRA'
        },
        {
          text: 'Moderne Programmierkonzepte',
          url: 'tg://join?invite=OPAIJBe6hPFvOAXYYrKdAA'
        }
      ],
      [
        {
          text: 'Präsentation & Kommunikation',
          url: 'tg://join?invite=OPAIJBes55BU3LJ8bnsTWw'
        },
        {
          text: 'Programmieren II',
          url: 'tg://join?invite=OPAIJBdSSQSZNXeUakzOwg'
        }
      ],
      [
        {
          text: 'Systemanalyse',
          url: 'tg://join?invite=OPAIJBYblCfRi-t5dtsXSQ'
        },
        {
          text: 'Advanced IT',
          url: 'tg://join?invite=OPAIJBMbLp9ZRMyrwh3IVg'
        }
      ],
      [
        {
          text: 'Advanced Database',
          url: 'tg://join?invite=OPAIJBXO1KG_7-70BYuS3w'
        },
        {
          text: 'Bilanzierung',
          url: 'tg://join?invite=OPAIJBaoV1M83DUaIrGVgA'
        }
      ],
      [
        {
          text: 'Investition & Finanzierung',
          url: 'tg://join?invite=OPAIJBeM4KJdcoQY-FmVpA'
        },
        {
          text: 'Datenbanken',
          url: 'tg://join?invite=OPAIJBFhxuDWf38atYSmNA'
        }
      ],
      [
        {
          text: 'Projektmanagement',
          url: 'tg://join?invite=OPAIJBXjFl-CZv_R1Z4NuA'
        },
        {
          text: 'Software Engineering II',
          url: 'tg://join?invite=OPAIJBIpk5coOv338_OZ8Q'
        }
      ],
      [
        {
          text: 'Statistik',
          url: 'tg://join?invite=OPAIJBarCVymg8Ux3P2gXg'
        },
        {
          text: 'Webentwicklung',
          url: 'tg://join?invite=OPAIJBQIw1DGTImta5p3yQ'
        }
      ],
      [
        {
          text: 'Wissenschaftliches Arbeiten II',
          url: 'tg://join?invite=OPAIJBRyBMQq3XUpOHhJHQ'
        },
        {
          text: 'BWL',
          url: 'tg://join?invite=NRMYsxUOXqorOnjB8yGmdg'
        }
      ],
      [
        {
          text: 'Einführung in die IT',
          url: 'tg://join?invite=NRMYsw1xhAlLlmgQ1xLTpA'
        },
        {
          text: 'Einführung in die WI',
          url: 'tg://join?invite=NRMYsxMf3mgt3m_gjd7Keg'
        }
      ],
      [
        {
          text: 'Marketing',
          url: 'tg://join?invite=NRMYsw_BW_Av06WtWWgZig'
        },
        {
          text: 'Lineare Algebra & Analysis',
          url: 'tg://join?invite=NRMYsxFHgBAXEe4Zl2F4cQ'
        }
      ],
      [
        {
          text: 'Programmieren I',
          url: 'tg://join?invite=NRMYsw-YDfi8NYlqHSd95g'
        },
        {
          text: 'Vertrags- & Schuldrecht',
          url: 'tg://join?invite=NRMYsxMwMoY2zIhRMHvONg'
        }
      ],
      [
        {
          text: 'Wissenschaftliches Arbeiten I',
          url: 'tg://join?invite=NRMYsxZmPgA3dEZ1kr76AQ'
        },
        {
          text: 'Software Engineering I',
          url: 'tg://join?invite=NRMYsw8qyy8ClF78jMg-vw'
        }
      ]
    ]
  }
};

const startKeyboard = {
  reply_markup: {
    keyboard: [
      [
        {
          text: '💬 Fragen'
        },
        {
          text: '👥 Austausch'
        }
      ]
    ],
    resize_keyboard: true,
    force_reply: true
  }
};

const cancelKeyboard = {
  reply_markup: {
    keyboard: [
      [
        {
          text: '✖️️ Abbrechen'
        }
      ]
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  }
};

@Injectable()
export class TelegramService {
  public bot: TelegramBot;

  constructor(
    private readonly configService: ConfigService,
    private readonly questionService: QuestionService
  ) {
    this.bot = new TelegramBot(this.configService.get('TG_TOKEN'), {
      polling: true
    });

    this.bot.onText(/💬 Fragen/, msg => {
      this.bot.sendMessage(msg.chat.id, 'Was möchtest du wissen?', cancelKeyboard);

      this.bot.addListener('message', async msg => {
        try {
          if (!msg.text || msg.text === '✖️️ Abbrechen') {
            return;
          }
          const a = await this.questionService.getQuestions(msg.text);
          if (!a.length) {
            this.bot.sendMessage(
              msg.chat.id,
              'Leider gibt es keine Antwort auf deine Frage',
              cancelKeyboard
            );
            return;
          }
          const answers = a
            .map(a => `Frage: ${a.question}\nAntwort: ${a.answer}`)
            .join('\n');
          // Falls ihr einzelne Antworten senden wollt
          /* answers.forEach(message => {
            this.bot.sendMessage(msg.chat.id, message, cancelKeyboard);
          }); */
          this.bot.sendMessage(msg.chat.id, answers, cancelKeyboard);
        } catch {
          this.bot.sendMessage(msg.chat.id, '666 Error');
        }
      });
    });

    this.bot.onText(/👥 Austausch/, msg => {
      this.bot.sendMessage(msg.chat.id, '📚 Auswahl', inlineKeyboard);
      this.bot.sendMessage(
        msg.chat.id,
        '📚 In welche Gruppe möchtest du?',
        cancelKeyboard
      );
    });

    this.bot.onText(/✖️️ Abbrechen/, msg => {
      this.bot.removeAllListeners('message');
      this.bot.sendMessage(msg.chat.id, 'Dann halt nicht.', startKeyboard);
    });
  }
}
