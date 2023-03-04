export enum information_types {
  account_created = "account_created",
  resetting_password_message_sent = "resetting_password_message_sent",
  password_reseted = "password_reseted",
  profile_updated = "profile_updated",
  item_added = "item_added",
  password_changed = "password_changed",
  update_email_message_sent = "update_email_message_sent",
  question_added = "question_added",
  new_email_set = "new_email_set",
  steal_added = "steal_added",
  question_deleted = "question_deleted",
}

export const informations = {
  account_created: {
    header: "Twoje konto zostało poprawnie utworzone!",
    content:
      "Wejdź na wprowadzony przez Ciebie adres e-maila i aktywuj swoje konto (sprawdź spam). Następnie będziesz mógł się zalogować.",
  },
  resetting_password_message_sent: {
    header: "Sprawdź swojego maila!",
    content:
      "Jeżeli podany przez Ciebie adres email jest powiązany, z którymś z kont, wysłaliśmy na niego link do zresetowania hasła. Sprawdź sekcję ze spamem.",
  },
  password_reseted: {
    header: "Hasło zmienione!",
    content:
      "Hasło do Twojego konta zostało poprawnie zmienione. Od tej pory możesz logować się przy pomocy nowego hasła.",
  },
  profile_updated: {
    header: "Zaktualizowano dane!",
    content:
      "Twoje dane zostały zaktualizowane i od teraz będą widoczne na Twoim profilu.",
  },
  item_added: {
    header: "Ogłoszenie z Twoim itemem zostało utworzone!",
    content:
      "Twój item został dodany. Od teraz będzie widoczny na liście wszystkich itemów.",
  },
  password_changed: {
    header: "Twoje hasło zostało zmienione!",
    content:
      "Hasło do Twojego konta zostało zmienione poprawnie. Od tej pory możesz logować się korzystając z nowego hasła.",
  },
  update_email_message_sent: {
    header: "Wiadomość została wysłana!",
    content:
      "Wiadomość wraz z linkiem pozwalającym na zmianę maila została wysłana na Twój aktualny adres e-mail.",
  },
  new_email_set: {
    header: "Wejdź na pocztę nowego maila!",
    content:
      "Nowy adres e-mail został wprowadzony, ale żeby móc z niego zacząć korzystać przy logowaniu, wejdź na pocztę i skorzystaj z linku aktywującego.",
  },
  question_added: {
    header: "Twoje pytanie zostało dodane!",
    content:
      "Twoje pytanie jest już widoczne dla wszystich użytkowników. Nie zapomnij go zbumpować!",
  },
  support_message_sent: {
    header: "Twoja wiadomość do Centrum Pomocy Sneakpick została wysłana!",
    content: "Jakieś extra info.",
  },
  steal_added: {
    header: "Twój steal został dodany!",
    content:
      "Twój steal został dodany i będzie widoczny dla wszystich użytkowników.",
  },
  question_deleted: {
    header: "Twoje pytanie zostało usunięte!",
    content:
      "Twoje pytanie zostało pomyślnie usunięte i nie będzie już widoczne na tablicy TALK.",
  },
};
