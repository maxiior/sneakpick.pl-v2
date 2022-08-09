export enum information_types {
  account_created = "account_created",
}

export const informations = {
  account_created: {
    header: "Twoje konto zostało poprawnie utworzone!",
    content:
      "Wejdź na wprowadzonego przez Ciebie e-maila i aktywuj swoje konto. Następnie będziesz mógł się zalogować.",
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
};
