import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ubuntu300 } from '../../fonts/ubuntu';
import storeClick from '../../store/click';
import storeScroll from '../../store/scroll';
import { Theme } from '../../Theme';
import { checkClickBy, log } from '../../utils/lib';
import s from './Tooltip.module.scss';

const POSITION_DEFAULT = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
};

function Tooltip({
  children,
  theme,
  length,
  closeOnClick,
  parentRef,
  parent,
}: {
  parentRef?: React.RefObject<HTMLElement>;
  parent?: HTMLElement | null;
  children: string | React.ReactNode;
  theme: Theme;
  length?: number;
  closeOnClick?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>();
  const [position, setPosition] = useState<typeof POSITION_DEFAULT>(POSITION_DEFAULT);

  /**
   * Handle click
   */
  useEffect(() => {
    const current = parentRef ? parentRef.current : parent;
    if (!current) {
      if (!parent && !parentRef) {
        log('warn', 'Parent is not passed into Tooltip', { children });
      }
      return () => {
        /** */
      };
    }
    const onClick = () => {
      const b = current.getBoundingClientRect();
      const { y, x, width: _width, height: _height } = b;
      const { innerWidth } = window;
      const pt = 20;
      let _length = 0;
      if (typeof children !== 'string') {
        _length = length || 200;
      } else {
        _length = children.length;
      }

      let cols = 4;
      let rows = 1;
      if (_length >= 10 && _length < 30) {
        cols = 4;
        rows = 3;
      } else if (_length >= 30 && _length < 50) {
        cols = 6;
        rows = 3;
      } else if (_length >= 50 && _length < 70) {
        cols = 8;
        rows = 4;
      } else if (_length >= 70 && _length < 90) {
        cols = 9;
        rows = 5;
      } else if (_length >= 90 && _length < 110) {
        cols = 10;
        rows = 5;
      } else if (_length >= 110 && _length < 130) {
        cols = 10;
        rows = 6;
      } else if (_length >= 130 && _length < 150) {
        cols = 11;
        rows = 7;
      } else {
        cols = 12;
        rows = 8;
        log('warn', 'Tooltip length is too long', { _length, max: 150 });
      }
      const width = cols * pt;
      const height = rows * pt;
      const TOOLTIP_SHIFT = 8;
      const top =
        y + TOOLTIP_SHIFT > height ? y - rows * pt - TOOLTIP_SHIFT : y + _height + TOOLTIP_SHIFT;
      let left =
        innerWidth - x > width / 2 ? x + _width / 2 - (cols * pt) / 2 : x + _width / 2 - cols * pt;
      left = x < width / 2 ? _width / 2 : left;

      setPosition({
        left,
        top,
        width,
        height,
      });
      setTimeout(() => {
        setOpen(true);
      }, 110);
    };
    current.addEventListener('click', onClick);
    return () => {
      current.removeEventListener('click', onClick);
    };
  }, [parent, children, length, parentRef]);

  /**
   * Listen scroll
   */
  useEffect(() => {
    const cleanSubs = storeScroll.subscribe(() => {
      setOpen(false);
    });
    return () => {
      cleanSubs();
    };
  }, []);

  /**
   * Listen click
   */
  useEffect(() => {
    const { current: _current } = ref;
    if (!_current) {
      return () => {
        /** */
      };
    }
    const cleanSubs = storeClick.subscribe(() => {
      const { clientX, clientY } = storeClick.getState();
      const clickBy = checkClickBy({ current: _current, clientX, clientY });
      if (open) {
        if (!clickBy) {
          setOpen(false);
        } else if (closeOnClick) {
          setOpen(false);
        }
      }
    });
    return () => {
      cleanSubs();
    };
  }, [ref, open, closeOnClick]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: theme.text,
        color: theme.paper,
        left: `${position?.left}px`,
        top: `${position?.top}px`,
        width: `${position?.width}px`,
        height: `${position?.height}px`,
      }}
      className={clsx(s.wrapper, ubuntu300.className, open ? s.open : '')}
    >
      {children}
    </div>
  );
}

Tooltip.defaultProps = {
  length: 0,
  closeOnClick: false,
  parent: undefined,
  parentRef: undefined,
};

export default Tooltip;
