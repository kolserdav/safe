import { ThemeType } from '@/types';

export const SERVER = process.env.NEXT_PUBLIC_SERVER as string;
export const IS_DEV = process.env.NODE_ENV === 'development';
export const LOG_LEVEL = parseInt(process.env.NEXT_PUBLIC_LOG_LEVEL as string, 10);
export const WS_ADDRESS = process.env.NEXT_PUBLIC_WS_ADDRESS as string;
export const EMAIL_MAX_LENGTH = 254;
export const DEFAULT_THEME: ThemeType = 'dark';
export const TAB_INDEX_DEFAULT = -1;

// Deps $label-transition
export const LABEL_TRANSITION = '0.2s';
// Deps $icon-width-default
export const ICON_WIDTH_DEFAULT = 24;
export const EXPAND_LESS_SHOW_FROM = -300;
// Deps $menu-transition
export const MENU_TRANSITION = 300;
// Deps global
export const NO_SCROLL_CLASS = 'no__scroll';
