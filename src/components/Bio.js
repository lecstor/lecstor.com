import React from "react";

// Import typefaces
import "typeface-montserrat";
import "typeface-merriweather";

import profilePic from "./profile-pic.jpg";
import { rhythm } from "../utils/typography";

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Jason Galea`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <div>
          <p>
            Written by <strong>Jason Galea</strong> from Cairns, Australia.
          </p>
          <p>
            I work at{" "}
            <a href="https://safetyculture.com" target="_blank">
              SafetyCulture
            </a>{" "}
            on the{" "}
            <a href="https://app.safetyculture.io">SafetyCulture web app</a>,{" "}
            with React & Nodem, backing the awsome{" "}
            <a href="http://www.safetyculture.com.au/iAuditor/">iAuditor</a>{" "}
            mobile app for{" "}
            <a href="https://itunes.apple.com/au/app/iauditor-safety-audit-checklist/id499999532?mt=8">
              iOS
            </a>{" "}
            and{" "}
            <a href="https://play.google.com/store/apps/details?id=com.safetyculture.iauditor&hl=en">
              Android
            </a>
            .<br />
          </p>
          {/* <p>
            <h5>Previously..</h5>
            <ul>
              <li>
                1999 - Built and developed the{" "}
                <a href="http://www.ezydvd.com.au">EzyDVD</a> web site over 12
                years with 10,000 visitors a day and $25,000,000 in sales per
                year.
              </li>
              <li>
                1997 - Rebuit the{" "}
                <a href="http://www.afc.com.au">Adelaide Crows</a> web site with
                e-commerce, message board, and footy tipping competition.
              </li>
            </ul>
          </p> */}
          <p>
            <a href="https://twitter.com/lecstor">Twitter</a> |{" "}
            <a href="https://github.com/lecstor">Github</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Bio;
