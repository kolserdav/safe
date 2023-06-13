import { Locale, LocaleVars, SEARCH_MIN_LENGTH } from '../../types/interfaces';

const lang: Locale = {
  server: {
    error: 'Server Error',
    badRequest: 'Bad Request',
    notFound: 'Not Found',
    success: 'Successful request',
    wrongPassword: 'Invalid username or password',
    emailIsSend:
      'An email with instructions has been sent to the specified email address. If the letter does not arrive for a long time, then check the "Spam" folder',
    linkExpired: 'Link expired',
    linkUnaccepted: 'Invalid link',
    letterNotSend:
      'The account was created, but the email confirmation email was not sent due to an error',
    successConfirmEmail: 'This email has been successfully confirmed',
    forbidden: 'Access denied',
    unauthorized: 'Insufficient rights',
    notImplement: 'Obsolete request version',
    sendToSupport: 'Contact support',
    phraseSaved: 'Phrase Saved',
    tagExists: 'The tag was previously created',
    tagSaved: 'Tag Saved',
    phraseDeleted: 'Phrase(s) deleted',
    phraseLoad: 'Phrase loaded from database',
    tagDeleteConflict: 'A tag cannot be deleted while it is associated with a phrase',
    tagDeleted: 'Tag deleted',
    tagUpdated: 'Tag updated for all phrases',
    serverReload: 'Server rebooting. This may take several minutes.',
    mailSubjects: {
      confirmEmail: 'Confirm email',
      resetPassword: 'Reset password',
      deletedAccount: 'Account deleted',
    },
    translateServiceNotWorking: 'Sorry, the translation service is temporarily unavailable',
  },
  app: {
    login: {
      loginButton: 'Login',
      register: 'Register',
      signIn: 'Sign in to an existing account',
      signUp: 'Sign Up New Account',
      email: 'Mail',
      name: 'Name',
      password: 'Password',
      passwordRepeat: 'Password repeat',
      fieldProhibited: 'Field contains prohibited characters',
      passwordMinLengthIs: 'Minimum password length',
      passwordMustContain: 'Password must contain at least one ',
      number: 'number',
      letter: 'letter',
      passwordsDoNotMatch: "Passwords don't match",
      emailIsUnacceptable: 'Mail is invalid',
      neededSelect: 'You need to make a choice',
      emailIsNotRegistered: 'This email is not registered with the service',
      emailIsRegistered: 'An account already exists for this email',
      successLogin: 'Successful Login',
      successRegistration: 'Successful registration',
      forgotPassword: 'Forgot your password?',
      restorePassword: 'Password Recovery',
      sendRestoreMail: 'Send mail',
      restoreDesc:
        'An email with password recovery instructions will be sent to the specified email address',
      changePassword: 'Change password',
      newPassword: 'New password',
      save: 'Save',
      wrongParameters: 'Invalid page parameters',
      sendNewLetter: 'Request new password reset email',
      acceptPolicyAndRules: 'I have read and accept before continuing',
      subtitle: 'To save phrases, you must log in to the service',
    },
    appBar: {
      darkTheme: 'Dark Theme',
      homePage: 'Home',
      login: 'Sign in',
      logout: 'Sign out',
      translate: 'Translate',
      myDictionary: 'My phrases',
      openMenu: 'Open menu',
      closeMenu: 'Close Menu',
      changeInterfaceLang: 'Change the interface language',
      about: 'About us',
      closeApp: 'Close app',
      settings: 'Settings',
      logoutDesc:
        "If you log out of your account, then you won't be able to access your saved tags and phrases, and you won't be able to create new ones",
      yes: 'Yes',
      no: 'No',
    },
    confirmEmail: {
      title: 'Mail Confirmation',
      paramsNotFound: 'Required page parameters not found',
    },
    common: {
      formDesc: 'Fields marked with * are required',
      showHelp: 'Show help',
      somethingWentWrong: 'Something went wrong',
      fieldMustBeNotEmpty: 'Field must not be empty',
      eliminateRemarks: 'Eliminate form remarks',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      missingCSRF: 'CSRF Token is missing',
      policyTitle: 'Privacy Policy',
      rulesTitle: 'Service Rules',
      and: 'and',
      voiceNotFound: 'No voice found',
      playSound: 'Play text',
      insertedLink: '...Link replaced...',
    },
    translate: {
      title: 'Sentence Translation',
      description: 'Write on your own in a foreign language and check yourself right away',
      nativeLang: 'I know',
      learnLang: 'Learning',
      allowRecomend: 'Apply suggested option',
      savePhrase: 'Save Phrase',
      createPhrase: 'Create Phrase',
      needLogin: 'Login required',
      savePhraseDesc: 'Save the phrase as a memento. You can then change or delete it at any time.',
      saveTranlsate: 'Save with translation',
      newTag: 'New Tag',
      changeTag: 'Change Tag',
      tagsTitle: 'Tags',
      tagHelp: 'Enter a space after the tag name to save it',
      addTags: 'Add Tags',
      updatePhrase: 'Edit Phrase',
      deleteTag: 'Delete Tag',
      updateTag: 'Update tag',
      textareaPlaceholder: "Write in the language you're learning",
      copied: 'Copied to clipboard',
      swapLangs: 'Swap languages',
      cleanField: 'Clear field',
      quitEdit: 'Quit edit mode',
      startRecognize: 'Hold to recognize speech',
      errorSpeechRecog: 'Speech recognition error',
      recognizeNotSupport: 'Speech recognition not supported',
      microNotPermitted: 'Microphone permission not received',
      serverIsNotConnected:
        'The server is not available or the client does not support the protocol',
      undo: 'Undo last operation',
    },
    my: {
      title: 'My Phrases',
      deletePhrase: 'Delete Entry',
      updatePhrase: 'Change Phrase',
      byUpdateDate: 'By update time',
      filterByTags: 'Filter by tags',
      strongAccord: 'Strong match',
      emptyPhrases: 'No phrases found for the specified filter',
      pagination: `Showing: ${LocaleVars.show} of ${LocaleVars.all}`,
      minimalSearchLenght: `Minimum ${SEARCH_MIN_LENGTH} character per word`,
      forDay: 'per day',
      forWeek: 'for the week',
      forMonth: 'per month',
      forThreeMoths: 'for three months',
      forSixMonths: 'half a year',
      forYear: 'for the year',
      forAllTime: 'for all time',
      allLangs: 'all languages',
      selectAll: 'Select All',
      unselectAll: 'Unselect all',
      deleteSelected: 'Delete selected',
      willDelete: `${LocaleVars.count} phrase(s) will be deleted`,
      resetAllFilters: 'Reset filters',
      playAll: 'Play All',
      openTools: 'Open Tools',
      selectPhrase: 'Select Phrase',
    },
    app: {
      connectionRefused: 'Connection to server lost',
      connectionReOpened: 'Server connection reopened',
      acceptCookies:
        'We use cookies by continuing to use the application you acknowledge that you have read and accept our',
      ok: 'Okay',
      withPolicy: 'Privacy Policy',
    },
    about: {
      aboutProgram: 'About the program',
      licenseTitle: 'Distributed under license',
      repoTitle: 'Source code',
      aboutSite: 'About this application',
      contactsTitle: 'Contacts',
    },
    settings: {
      title: 'Settings',
      speechSpeed: 'Speech speed',
      speechTest: 'Speech test',
      speechLang: 'Speech Language',
      personalData: 'Personal data',
      deleteAccountTitle: 'Delete account',
      deleteAccountDesc:
        'Attention! Deleting your account will delete all the phrases and tags you created, and you will no longer be able to log in to our service.',
      deleteAccountSecure: 'To confirm account deletion, enter',
      deleteVerifying: 'Deletion confirmation',
      deleteMyAccount: 'delete my account',
      deleteAccountWarning:
        'I understand that this operation cannot be undone. The account will be deleted immediately and permanently.',
      changePassword: 'Change password',
    },
  },
};

export default lang;
