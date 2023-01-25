import Head from 'next/head';
import s from '@/styles/Home.module.scss';
import Login from '@/components/Login';
import useTheme from '@/hooks/useTheme';
import { GetStaticPropsContext } from 'next';
import Request from '@/utils/request';
import { LocaleValue, Locale } from '@/types/interfaces';
import { PageFull } from '@/types';
import { prepagePage } from '@/utils/lib';

const request = new Request();

interface LoginProps {
  locale: Locale['app']['login'];
  page: PageFull;
}

export default function HomePage({ locale, page }: LoginProps) {
  if (typeof window !== 'undefined') {
    console.log(page);
  }

  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={s.wrapper} style={{ backgroundColor: theme.paper }}>
        <Login theme={theme} locale={locale} />
      </main>
    </>
  );
}

export async function getStaticProps({
  locale,
}: GetStaticPropsContext): Promise<{ props: LoginProps }> {
  const localeLogin = await request.getLocale({ field: 'login', locale });
  const page = await request.pageFindMany({
    where: {
      AND: [
        {
          name: 'index',
        },
        {
          lang: locale as LocaleValue,
        },
      ],
    },
  });
  return {
    props: {
      locale: localeLogin.data,
      page: prepagePage(page.data),
    },
  };
}
