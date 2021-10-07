import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/client';
import { getSession } from 'next-auth/client';
import { Notification } from '../components/Notification';
import { prisma } from '../database/db';
import { AppContext } from '../components/AppContext';

export default function Index({ error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const appCtx = React.useContext(AppContext);
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    if (!loading && !session) {
      signIn();
    } else if (!loading && session) {
      if (error) {
        Notification.add('error', error);
      }
      router.push('/Home');
    }
  }, [loading, session]);
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  try {
    const session = await getSession({ req });
    if (!session) return { props: {} };

    return { props: {} };
  } catch (error: any) {
    return { props: { error: error.message } };
  }
};
