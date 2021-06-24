import React from "react";
import { InlineFollowButtons } from "sharethis-reactjs";

export default function FollowButtons({ author, twitter, facebook }) {
  return (
    <InlineFollowButtons
      config={{
        action: `Follow ${author}`, // call to action (STRING)
        action_enable: true, // show/hide call to action (true, false)
        action_pos: "bottom", // position of call to action (left, top, right)
        alignment: "center", // alignment of buttons (left, center, right)
        color: "white", // set the color of buttons (social, white)
        enabled: true, // show/hide buttons (true, false)
        networks: [
          // which networks to include (see FOLLOW NETWORKS)
          "twitter",
          "facebook",
        ],
        padding: 8, // padding within buttons (INTEGER)
        profiles: {
          // social profile links for buttons
          twitter,
          facebook,
        },
        radius: 12, // the corner radius on each button (INTEGER)
        size: 48, // the size of each button (INTEGER)
        spacing: 12, // the spacing between buttons (INTEGER)
      }}
    />
  );
}
