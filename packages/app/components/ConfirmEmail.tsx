import { useEffect, useState } from 'react';
import useLoad from '../hooks/useLoad';
import useQueryString from '../hooks/useQueryString';
import { Theme } from '../Theme';
import { Locale } from '../types/interfaces';
import { LOAD_PAGE_DURATION } from '../utils/constants';
import s from './ConfirmEmail.module.scss';
import Typography from './ui/Typography';
import Request from '../utils/request';

const request = new Request();

function ConfirmEmail({ theme, locale }: { theme: Theme; locale: Locale['app']['confirmEmail'] }) {
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>();
  const { load, setLoad } = useLoad();
  const { e, k } = useQueryString<{ e: string; k: string }>();

  /**
   * Set params
   */
  useEffect(() => {
    let interval = setTimeout(() => {
      /** */
    }, 0);
    if (!e || !k) {
      interval = setTimeout(() => {
        setError(locale.paramsNotFound);
      }, LOAD_PAGE_DURATION);
    } else {
      setError('');
    }
    return () => {
      clearInterval(interval);
    };
  }, [e, k, locale]);

  /**
   * Check key
   */
  useEffect(() => {
    if (!e || !k) {
      return;
    }
    (async () => {
      setLoad(true);
      const conRes = await request.confirmEmail({ email: e, key: k });
      setLoad(false);

      if (conRes.status !== 'info') {
        setError(conRes.message);
        return;
      }
      setResult(conRes.message);
    })();
  }, [e, k, setLoad]);

  return (
    <div className={s.wrapper} style={{ backgroundColor: theme.paper }}>
      <div className={s.container}>
        <Typography align="center" theme={theme} variant="h1">
          {locale.title}
        </Typography>
        <Typography styleName="error" align="center" theme={theme} variant="h4">
          {error}
        </Typography>
        <Typography variant="h4" align="center" styleName="info" theme={theme}>
          {result || ''}
        </Typography>
      </div>
    </div>
  );
}

export default ConfirmEmail;
