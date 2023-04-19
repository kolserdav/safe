import clsx from 'clsx';
import { useRef } from 'react';
import { Theme } from '../Theme';
import useLoad from '../hooks/useLoad';
import { Locale, UserCleanResult } from '../types/interfaces';
import {
  useLanguages,
  useSavePhrase,
  useSpeechSynth,
  useTags,
  useTranslate,
} from './Translate.hooks';
import s from './Translate.module.scss';
import CloseIcon from './icons/Close';
import IconButton from './ui/IconButton';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import Typography from './ui/Typography';
import VolumeHighIcon from './icons/VolumeHigh';
import Button from './ui/Button';
import Dialog from './ui/Dialog';
import Checkbox from './ui/Checkbox';
import Input from './ui/Input';
import HelpIcon from './icons/Help';
import Tooltip from './ui/Tooltip';
import Cheep from './ui/Cheep';

function Translate({
  theme,
  locale,
  user,
  save,
  showHelp,
}: {
  theme: Theme;
  locale: Locale['app']['translate'];
  user: UserCleanResult;
  save: string;
  showHelp: string;
}) {
  const helpTagRef = useRef(null);
  const { load, setLoad } = useLoad();
  const {
    langs,
    nativeLang,
    learnLang,
    changeLangWrapper,
    changeLang,
    setChangeLang,
    setNativeLang,
    setLearnLang,
  } = useLanguages();

  const {
    onChangeNewTag,
    newTag,
    allTags,
    onClicTagCheepWrapper,
    tags,
    addTags,
    setAddTags,
    setTags,
  } = useTags();

  const {
    translate,
    reTranslate,
    changeText,
    rows,
    cleanText,
    text,
    onKeyDownReTranslate,
    onClickRetranslate,
    edit,
    restart,
    setRestart,
  } = useTranslate({
    nativeLang,
    learnLang,
    changeLang,
    setChangeLang,
    setNativeLang,
    setLearnLang,
    setTags,
    setAddTags,
  });

  const { speechRetranslate, synthAllow } = useSpeechSynth({
    reTranslate,
    locale,
    learnLang,
  });

  const {
    saveDialog,
    onClickSavePhrase,
    setSaveDialog,
    saveTranslate,
    setSaveTranslate,
    onClickSave,
    onClickUpdate,
  } = useSavePhrase({
    translate,
    text,
    setLoad,
    setTags,
    tags,
    learnLang,
    nativeLang,
    edit,
    restart,
    setRestart,
  });

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography variant="h1" theme={theme} align="center">
          {edit ? locale.updatePhrase : locale.title}
        </Typography>
        {!edit && (
          <Typography variant="p" align="center" theme={theme}>
            {locale.description}
          </Typography>
        )}
        <div className={s.selectors}>
          <Select
            onChange={changeLangWrapper('native')}
            value={nativeLang}
            aria-label={locale.nativeLang}
            theme={theme}
          >
            {langs.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </Select>
          <Select
            onChange={changeLangWrapper('learn')}
            value={learnLang}
            aria-label={locale.learnLang}
            theme={theme}
          >
            {langs.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
        <div className={s.textarea}>
          <Textarea
            value={text}
            spellCheck={false}
            onInput={changeText}
            rows={rows}
            theme={theme}
          />
          <div className={s.close_button}>
            <IconButton onClick={cleanText}>
              <CloseIcon color={theme.text} />
            </IconButton>
          </div>
        </div>
        <div style={{ color: theme.text }} className={s.native_res}>
          <Typography variant="p" theme={theme}>
            {translate}
          </Typography>
        </div>
        <div className={s.retrans_container}>
          <div
            role="button"
            tabIndex={-1}
            onKeyDown={onKeyDownReTranslate}
            onClick={onClickRetranslate}
            style={{ color: theme.text }}
            className={clsx(s.learn_res, reTranslate === text ? s.disabled : '')}
            title={locale.allowRecomend}
          >
            <Typography variant="p" theme={theme}>
              {reTranslate}
            </Typography>
          </div>
          {reTranslate && synthAllow && (
            <div className={s.sound_button}>
              <IconButton onClick={speechRetranslate}>
                <VolumeHighIcon color={theme.text} />
              </IconButton>
            </div>
          )}
        </div>
        {reTranslate && (
          <div className={s.actions}>
            <Button
              title={!user ? locale.needLogin : ''}
              disabled={!user}
              theme={theme}
              onClick={onClickSavePhrase}
            >
              {edit ? locale.savePhrase : locale.createPhrase}
            </Button>
          </div>
        )}
      </div>
      {user && (
        <Dialog className={s.dialog} theme={theme} open={saveDialog} onClose={setSaveDialog}>
          <Typography align="center" theme={theme} variant="h2">
            {locale.savePhrase}
          </Typography>
          <Typography align="center" theme={theme} variant="h4">
            {locale.savePhraseDesc}
          </Typography>
          <div className={s.active} style={{ backgroundColor: theme.active }}>
            <Typography align="center" theme={theme} variant="p">
              {text}
            </Typography>
          </div>
          <div className={s.check_item}>
            <Checkbox
              theme={theme}
              label={locale.saveTranlsate}
              id="save-translate"
              checked={saveTranslate}
              onChange={setSaveTranslate}
            />
          </div>
          {saveTranslate && (
            <div className={s.active} style={{ backgroundColor: theme.active }}>
              <Typography align="center" theme={theme} variant="p">
                {translate}
              </Typography>
            </div>
          )}
          <div className={s.check_item}>
            <Checkbox
              theme={theme}
              label={locale.addTags}
              id="add-tags"
              checked={addTags}
              onChange={setAddTags}
            />
          </div>
          {addTags && (
            <div className={s.tags}>
              <Typography className={s.title} variant="h4" theme={theme}>
                {locale.tagsTitle}
              </Typography>
              <div className={s.input}>
                <Input
                  className={s.field}
                  type="text"
                  id="add-new-tag"
                  onChange={onChangeNewTag}
                  value={newTag}
                  name={locale.newTag}
                  theme={theme}
                />
                <IconButton title={showHelp} ref={helpTagRef}>
                  <HelpIcon color={theme.text} />
                </IconButton>
              </div>
              <div className={s.box}>
                {tags.map((item) => (
                  <Cheep
                    key={item.id}
                    onClick={onClicTagCheepWrapper(item, 'del')}
                    add={false}
                    disabled={false}
                    theme={theme}
                  >
                    {item.text}
                  </Cheep>
                ))}
              </div>
              <div className={s.box}>
                {allTags.map((item) => (
                  <span key={item.id}>
                    {tags.findIndex((i) => i.id === item.id) === -1 && (
                      <Cheep onClick={onClicTagCheepWrapper(item, 'add')} add theme={theme}>
                        {item.text}
                      </Cheep>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className={s.actions}>
            <Button theme={theme} onClick={edit ? onClickUpdate : onClickSave} disabled={load}>
              {save}
            </Button>
          </div>
        </Dialog>
      )}
      <Tooltip theme={theme} parent={helpTagRef}>
        {locale.tagHelp}
      </Tooltip>
    </div>
  );
}

export default Translate;
