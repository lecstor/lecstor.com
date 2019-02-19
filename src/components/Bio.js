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
            Senior Software Engineer looking for the next big challenge.<br />
            Full Stack developer specialising in React and NodeJS.
          </p>
          <p>
            <a href="https://www.linkedin.com/in/jasongalea/">LinkedIn</a> |{" "}
            <a href="https://github.com/lecstor">Github</a> |{" "}
            <a href="https://stackoverflow.com/users/1315176/lecstor">StackOverflow</a> |{" "}
            <a href="https://twitter.com/lecstor">Twitter</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Bio;
