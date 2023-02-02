import { ubuntu400 } from '@/fonts/ubuntu';
import storeAlert from '@/store/alert';
import { Theme } from '@/Theme';
import { AlertProps } from '@/types';
import { ALERT_TIMEOUT, ALERT_TRANSITION } from '@/utils/constants';
import clsx from 'clsx';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import CloseCircleIcon from '../icons/CloseCircle';
import ErrorIcon from '../icons/Error';
import InfoIcon from '../icons/Info';
import WarnIcon from '../icons/Warn';
import s from './Alert.module.scss';
import IconButton from './IconButton';

const getButtonId = (button: HTMLButtonElement | null) => {
  const id = button?.getAttribute('id');
  if (!id) {
    return null;
  }
  return id;
};

const itemClassNameRegexp = /_i__\d+/;

const getItemClassName = (index: number) => s[`i__${index}`];

function Alert({ theme }: { theme: Theme }) {
  const [alerts, setAlerts] = useState<
    (AlertProps & { id: string; ref: React.RefObject<HTMLDivElement> })[]
  >([]);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [deleted, setDeleted] = useState<string | null>(null);

  const closeById = (idS: string) => {
    setToDelete(idS);
  };

  const onClickCloseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { target }: { target: HTMLElement } = e as any;
    let button: HTMLButtonElement | null = null;
    switch (target.nodeName.toLowerCase()) {
      case 'path':
        button = target.parentElement?.parentElement as HTMLButtonElement;
        break;
      case 'svg':
        button = target.parentElement as HTMLButtonElement;
        break;
      case 'button':
        button = target as HTMLButtonElement;
        break;
      default:
    }
    if (!button) {
      return;
    }
    const idN = getButtonId(button);
    if (idN === null) {
      return;
    }
    closeById(idN);
  };

  /**
   * Close item
   */
  useEffect(() => {
    const closeHandler = async () => {
      alerts.every((item) => {
        if (toDelete === item.id) {
          const { current } = item.ref;
          if (current) {
            current.classList.remove(s.open);
          }
          return false;
        }
        return true;
      });
    };
    if (toDelete) {
      closeHandler();
    }
  }, [alerts, toDelete]);

  /**
   * Delete item
   */
  useEffect(() => {
    if (toDelete) {
      setTimeout(() => {
        setDeleted(toDelete);
      }, ALERT_TRANSITION);
      setToDelete(null);
    }
  }, [toDelete]);

  /**
   * Listen store alert
   */
  useEffect(() => {
    const cleanSubs = storeAlert.subscribe(() => {
      const {
        alert: { message, status },
      } = storeAlert.getState();
      const _alerts = alerts.slice();
      const id = v4();
      _alerts.push({
        message,
        status,
        id,
        ref: createRef<HTMLDivElement>(),
      });

      setTimeout(() => {
        closeById(id);
      }, ALERT_TIMEOUT);

      setAlerts(_alerts);
    });
    return () => {
      cleanSubs();
    };
  }, [alerts, theme]);

  /**
   * Set item classes
   */
  useEffect(() => {
    alerts.forEach((item, index) => {
      const { current } = item.ref;
      if (!current) {
        return;
      }
      const { classList } = current;
      if (!classList.contains(getItemClassName(index))) {
        classList.forEach((classN) => {
          if (itemClassNameRegexp.test(classN)) {
            current.classList.remove(classN);
          }
        });
        current.classList.add(getItemClassName(index));
      }
    });
  }, [alerts]);

  /**
   * Set open classes
   */
  useEffect(() => {
    alerts.forEach((item) => {
      const { current } = item.ref;
      if (!current) {
        return;
      }
      const { classList } = current;
      if (!classList.contains(s.open) && item.id !== deleted) {
        current.classList.add(s.open);
      }
    });
  }, [alerts, deleted]);

  useEffect(() => {
    if (deleted) {
      setAlerts(alerts.filter((item) => item.id !== deleted));
      setDeleted(null);
    }
  }, [alerts, deleted]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <>
      {alerts.map((item) => (
        <div
          key={item.id}
          ref={item.ref}
          style={{
            color: theme.black,

            backgroundColor:
              item.status === 'warn'
                ? theme.yellow
                : item.status === 'error'
                ? theme.red
                : theme.blue,
          }}
          className={clsx(s.item, ubuntu400.className)}
        >
          {item.status === 'warn' ? (
            <WarnIcon color={theme.red} />
          ) : item.status === 'error' ? (
            <ErrorIcon color={theme.yellow} />
          ) : (
            <InfoIcon color={theme.black} />
          )}

          <p style={{ color: theme.black }} className={s.text}>
            {item.message}
          </p>
          <IconButton id={item.id} onClick={onClickCloseHandler}>
            <CloseCircleIcon color={theme.black} />
          </IconButton>
        </div>
      ))}
    </>
  );
}

export default Alert;