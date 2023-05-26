import { Theme } from '../Theme';
import useLoad from '../hooks/useLoad';
import useSpeechSynth from '../hooks/useSpeechSynth';
import { Locale, UserCleanResult } from '../types/interfaces';
import { SPEECH_SPEED_MAX } from '../utils/constants';
import { useLanguage, useTestSpeech } from './Settings.hooks';
import s from './Settings.module.scss';
import VolumeHighIcon from './icons/VolumeHigh';
import VolumeLowIcon from './icons/VolumeLow';
import VolumeMediumIcon from './icons/VolumeMedium';
import IconButton from './ui/IconButton';
import Input from './ui/Input';
import Select from './ui/Select';
import Typography from './ui/Typography';

function Settings({
  locale,
  theme,
  user,
  voiceNotFound,
  playSound,
}: {
  locale: Locale['app']['settings'];
  theme: Theme;
  user: UserCleanResult | null;
  voiceNotFound: string;
  playSound: string;
}) {
  const { load } = useLoad();
  const { testText, onChangeTestText } = useTestSpeech();

  const { lang, langs, changeLang } = useLanguage();

  const { synthAllow, speechText, speechSpeed, changeSpeechSpeed, volumeIcon } = useSpeechSynth({
    text: testText,
    voiceNotFound,
    lang,
  });

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography variant="h1" theme={theme}>
          {locale.title}
        </Typography>

        <div className={s.test_input}>
          <Input
            type="text"
            id="test-speech"
            theme={theme}
            value={testText}
            name={locale.speechTest}
            onChange={onChangeTestText}
            disabled={load}
          />
          <div className={s.lang_select}>
            <Select onChange={changeLang} value={lang} aria-label={locale.speechLang} theme={theme}>
              {langs.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
          {synthAllow && (
            <div className={s.speed_select}>
              <Typography variant="label" theme={theme}>
                {`${locale.speechSpeed}: ${speechSpeed}`}
              </Typography>
              <input
                type="range"
                value={speechSpeed}
                max={SPEECH_SPEED_MAX}
                min={0}
                step={0.1}
                name="tes"
                onChange={changeSpeechSpeed}
                id="speech-speed"
              />
            </div>
          )}
          {synthAllow && (
            <div className={s.speech_button}>
              <IconButton title={playSound} onClick={speechText}>
                {volumeIcon === 'high' ? (
                  <VolumeHighIcon color={theme.text} />
                ) : volumeIcon === 'medium' ? (
                  <VolumeMediumIcon color={theme.text} />
                ) : (
                  <VolumeLowIcon color={theme.text} />
                )}
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
