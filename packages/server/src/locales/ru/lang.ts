import { Locale, LocaleVars, SEARCH_MIN_LENGTH } from '../../types/interfaces';

const lang: Locale = {
  server: {
    error: 'Ошибка сервера',
    badRequest: 'Неверный запрос',
    notFound: 'Не найдено',
    success: 'Успешный запрос',
    wrongPassword: 'Неверный логин или пароль',
    emailIsSend: 'На указанную почту отправлено письмо с инструкцией',
    linkExpired: 'Просроченная ссылка',
    linkUnaccepted: 'Недействительная ссылка',
    letterNotSend:
      'Учетная запись создана, но письмо подтверждения почты не отправлено из-за ошибки',
    successConfirmEmail: 'Данная почта успешно подтверждена',
    forbidden: 'Доступ запрещен',
    unauthorized: 'Недостаточно прав',
    notImplement: 'Устаревшая версия запроса',
    sendToSupport: 'Обратитесь в техподдержку',
    phraseSaved: 'Фраза сохранена',
    tagExists: 'Метка была создана ранее',
    tagSaved: 'Метка сохранена',
    phraseDeleted: 'Фраза удалена',
    phraseLoad: 'Фраза загружена из базы данных',
    tagDeleteConflict: 'Метка не может быть удалена, пока она привязана к фразе',
    tagDeleted: 'Метка удалена',
    tagUpdated: 'Метка изменена для всех фраз',
    serverReload: 'Перезагрузка сервера. Это может занять несколько минут.',
  },
  app: {
    login: {
      loginButton: 'Войти',
      register: 'Зарегистрироваться',
      signIn: 'Войти в существующий аккаунт',
      signUp: 'Зарегистрировать новый аккаунт',
      email: 'Почта',
      name: 'Имя',
      password: 'Пароль',
      passwordRepeat: 'Повтор пароля',
      fieldProhibited: 'Поле содержит запрещенные символы',
      passwordMinLengthIs: 'Минимальная длина пароля',
      passwordMustContain: 'Пароль должен содержать хотя-бы одну ',
      number: 'цифру',
      letter: 'букву',
      passwordsDoNotMatch: 'Пароли не совпадают',
      emailIsUnacceptable: 'Почта имеет недопустимый вид',
      neededSelect: 'Необходимо сделать выбор',
      emailIsNotRegistered: 'Данная почта не зарегистрирована на сервисе',
      emailIsRegistered: 'На данную почту уже существует учетная запись',
      successLogin: 'Успешный вход',
      successRegistration: 'Успешная регистрация',
      forgotPassword: 'Забыли пароль?',
      restorePassword: 'Восстановление пароля',
      sendRestoreMail: 'Отправить письмо',
      restoreDesc: 'На указанную почту будет выслано письмо с инструкцией по восстановлению пароля',
      changePassword: 'Сменить пароль',
      newPassword: 'Новый пароль',
      save: 'Сохранить',
      wrongParameters: 'Неверные параметры страницы',
      sendNewLetter: 'Запросить новое письмо для восстановления пароля',
    },
    appBar: {
      darkTheme: 'Темная тема',
      homePage: 'Главная',
      login: 'Вход',
      logout: 'Выход',
      translate: 'Перевод',
      myDictionary: 'Мои фразы',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      changeInterfaceLang: 'Сменить язык интерфейса',
    },
    confirmEmail: {
      title: 'Подтверждение почты',
      paramsNotFound: 'Не найдены необходимые параметры страницы',
    },
    common: {
      formDesc: 'Поля помеченные * обязательны для заполенения',
      showHelp: 'Показать справку',
      somethingWentWrong: 'Что-то пошло не так',
      fieldMustBeNotEmpty: 'Поле не должно быть пустым',
      eliminateRemarks: 'Устраните замечания в форме',
      save: 'Сохранить',
      edit: 'Изменить',
      delete: 'Удалить',
      cancel: 'Отмена',
      missingCSRF: 'Токен безопасности не найден',
    },
    translate: {
      title: 'Перевод предложений',
      description: 'Самостоятельно пишите на иностранном языке и сразу проверяйте себя',
      nativeLang: 'Знаю',
      learnLang: 'Изучаю',
      allowRecomend: 'Применить предложенный вариант',
      voiceNotFound: 'Голос для озвучивания не найден',
      savePhrase: 'Сохранить фразу',
      createPhrase: 'Создать фразу',
      needLogin: 'Необходим вход в учетную запись',
      savePhraseDesc: 'Сохраненная фраза будет доступна только вам',
      saveTranlsate: 'Сохранить вместе с переводом',
      newTag: 'Новая метка',
      changeTag: 'Изменение метки',
      tagsTitle: 'Метки',
      tagHelp: 'Введите пробел после названия метки, чтобы она сохранилась',
      addTags: 'Добавить метки',
      updatePhrase: 'Редактирование фразы',
      deleteTag: 'Удалить метку',
      updateTag: 'Обновить метку',
      textareaPlaceholder: 'Пишите на языке, который изучаете',
      copied: 'Скопировано в буфер',
      swapLangs: 'Поменять языки местами',
      cleanField: 'Очистить поле',
      quitEdit: 'Выйти из режима редактирования',
      startRecognize: 'Удерживать для распознания речи',
      playSound: 'Озвучить текст',
      errorSpeechRecog: 'Ошибка при распознании речи',
      recognizeNotSupport: 'Распознание речи не поддерживается',
      microNotPermitted: 'Разрешение на использование микрофона не получено',
    },
    my: {
      title: 'Мои фразы',
      deletePhrase: 'Удалить запись',
      updatePhrase: 'Изменить фразу',
      byUpdateDate: 'По времени изменения',
      filterByTags: 'Фильтр по меткам',
      strongAccord: 'Строгое соответствие',
      emptyPhrases: 'По заданному фильтру фразы не найдены',
      pagination: `Показано: ${LocaleVars.show} из ${LocaleVars.all}`,
      minimalSearchLenght: `Минимум ${SEARCH_MIN_LENGTH} символa в слове`,
    },
  },
};

export default lang;
