import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import { Toaster } from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="A twitter clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="grid grid-cols-9">
        {/* sidebar */}
        <Sidebar />

        {/* feed */}
        <Feed tweets={tweets} />

        {/* widgets */}
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets: Tweet[] = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};
