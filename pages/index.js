import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import homeStyles from "./home.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import dynamic from "next/dynamic";
import Script from "next/script";
import "odometer/themes/odometer-theme-car.css";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

const milesTraveled = 2713.1;

const Odometer = dynamic(import("react-odometerjs"), {
  ssr: false,
  loading: () => 0,
});

export default function Home({ allPostsData }) {
  const [odometerValue, setOdometerValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOdometerValue(milesTraveled);
    }, 500);
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1 className={homeStyles.odometer}>
          <Odometer value={odometerValue} />
        </h1>
        <div className={homeStyles.odometerCaption}>Miles Traveled</div>

        <div className={homeStyles.photoAlbum}>
          <a href="https://photos.app.goo.gl/sdf6tAxt6Wk383E9A" target="_blank">
            {" "}
            <FontAwesomeIcon icon={faImages} /> &nbsp;Photo Album
          </a>
        </div>

        <div className={homeStyles.nextStop}>Next Stops: </div>

        <div className={homeStyles.nextStopLink}>
          📍{" "}
          <a href="https://g.co/kgs/9ubmAf" target="_blank">
            Grand Teton National Park
          </a>{" "}
          WY
        </div>
        <div className={homeStyles.nextStopLink}>
          📍{" "}
          <a href="https://g.co/kgs/26SUYz" target="_blank">
            Jackson, WY
          </a>
        </div>
        <div className={homeStyles.nextStopLink}>
          📍{" "}
          <a href="https://g.co/kgs/6VGt8r" target="_blank">
            Eden, UT
          </a>
        </div>
      </section>
      <section>
        <p>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1yvUZ-9wBUgMF3DlIzKDTe-JyzWseAI8&hl=en&ehbc=2E312F"
            width="100%"
            height="480"
          ></iframe>
        </p>
        <p>
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=164l6sSvw9FDWyXDxlObEG1dqVc_225U&ehbc=2E312F"
            width="100%"
            height="480"
          ></iframe>
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, location, miles }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <div>Location: 📍 {location}</div>
              <div>Miles Traveled: {miles}</div>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
