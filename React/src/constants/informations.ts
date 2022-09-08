export enum information_types {
  account_created = "account_created",
  resetting_password_message_sent = "resetting_password_message_sent",
  password_reseted = "password_reseted",
}

export const informations = {
  account_created: {
    header: "Twoje konto zostało poprawnie utworzone!",
    content:
      "Wejdź na wprowadzony przez Ciebie adres e-maila i aktywuj swoje konto (sprawdź spam). Następnie będziesz mógł się zalogować.",
  },
  item_added: {
    header: "Ogłoszenie z Twoim itemem zostało utworzone!",
    content:
      "Twój item został pomyślnie dodany. Od teraz będzie widoczny na liście wszystkich itemów.",
  },
  support_message_sent: {
    header: "Twoja wiadomość do Centrum Pomocy Sneakpick została wysłana!",
    content: "Jakieś extra info.",
  },
  profile_updated: {
    header: "Zaktualizowano dane!",
    content:
      "Twoje dane zostały zaktualizowane i od teraz będą widoczne na Twoim profilu.",
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
};
