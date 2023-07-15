import { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import storeUserRenew from '../store/userRenew';
import { log } from '../utils/lib';
import Request from '../utils/request';
import { UserCleanResult } from '../types/interfaces';

const request = new Request();
const { userRenew: userRenewDef } = storeUserRenew.getState();

export default function useUser() {
  const [userLoad, setUserLoad] = useState<boolean>(false);
  const [user, setUser] = useState<UserCleanResult | null>(null);
  const [renew, setRenew] = useState<boolean>(userRenewDef);

  /**
   * Get user
   */
  useEffect(() => {
    (async () => {
      const _user = await request.getUser();
      setUserLoad(true);
      if (_user.status !== 'info') {
        log(_user.status, _user.message, { _user });
        setUser(null);
        return;
      }
      setUser(_user.data);
    })();
  }, [renew]);

  /**
   * Android set notification id
   */
  useEffect(() => {
    if (typeof androidCommon === 'undefined' || !user) {
      return;
    }
    const notificationId = androidCommon.getUUID();
    (async () => {
      const updateRes = await request.userUpdate({ notificationId, userId: user.id });
      log(updateRes.status, updateRes.message, updateRes);
    })();
  }, [user]);

  /**
   * Set time zone
   */
  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const updateRes = await request.userUpdate({
        timeZone: new Date().getTimezoneOffset() / 60,
        userId: user.id,
      });
      log(updateRes.status, updateRes.message, updateRes);
    })();
  }, [user]);

  /**
   * Listen need renew
   */
  useEffect(() => {
    const cleanSubs = storeUserRenew.subscribe(() => {
      const { userRenew } = storeUserRenew.getState();
      setRenew(userRenew);
    });
    return () => {
      cleanSubs();
    };
  }, []);

  return { user, userLoad };
}
