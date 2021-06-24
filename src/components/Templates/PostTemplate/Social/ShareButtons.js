import React from "react";
import { InlineReactionButtons, InlineShareButtons } from "sharethis-reactjs";

export default function ShareButtons({ title, user_id, text }) {
  return (
    <div className="mt-4">
      <InlineShareButtons
        config={{
          alignment: "center", // alignment of buttons (left, center, right)
          color: "social", // set the color of buttons (social, white)
          enabled: true, // show/hide buttons (true, false)
          font_size: 16, // font size for the buttons
          labels: "cta", // button labels (cta, counts, null)
          language: "en", // which language to use (see LANGUAGES)
          networks: [
            // which networks to include (see SHARING NETWORKS)
            "facebook",
            "twitter",
            "messenger",
            "linkedin",
            "pinterest",
            "sharethis",
          ],
          padding: 12, // padding within buttons (INTEGER)
          radius: 4, // the corner radius on each button (INTEGER)
          show_total: false,
          size: 40, // the size of each button (INTEGER)

          // OPTIONAL PARAMETERS
          message: `${text}`, // (only for email sharing)
          subject: `${title}`, // (only for email sharing)
          username: `${user_id}`, // (only for twitter sharing)
        }}
      />
      <div className="mt-4">
        <InlineReactionButtons
          config={{
            alignment: "center", // alignment of buttons (left, center, right)
            enabled: true, // show/hide buttons (true, false)
            language: "en", // which language to use (see LANGUAGES)
            min_count: 1, // hide react counts less than min_count (INTEGER)
            padding: 12, // padding within buttons (INTEGER)
            reactions: [
              // which reactions to include (see REACTIONS)
              "slight_smile",
              "heart_eyes",
              "laughing",
              "astonished",
              "sob",
              "rage",
            ],
            size: 72, // the size of each button (INTEGER)
            spacing: 8, // the spacing between buttons (INTEGER)
          }}
        />
      </div>
    </div>
  );
}
