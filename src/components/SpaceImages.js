import React, { useState } from "react";
import Container from "react-bootstrap/Container";

export default function SpaceImages({ data }) {
  const [showText, setShowText] = useState(null);

  const picsArray = data.map((pic, i) => {
    if (!pic.links) return;

    console.log("pic.data", pic.data);
    let picDescription = pic.data[0]["description"];
    if (picDescription.length > 115) {
      picDescription = picDescription.substring(0, 100) + "...";
    }

    const picUri = pic.links[0]["href"];
    console.log("picUri", picUri);
    const newUri = picUri.replaceAll(" ", "%20");
    // console.log(picUri.substring(picUri.length - 4));
    if (newUri.includes("video")) {
      console.log(newUri);

      // return (
      //   // <video className="space-img" controls>
      //   //   <source key={i} src={newUri}>
      //   //     Your browser does not support the video tag
      //   //   </source>
      //   // </video>
      // );
    }

    return (
      <Container
        key={i}
        className="space-img-wrapper"
        onMouseOver={() => setShowText(pic.data[0]["nasa_id"])}
        onMouseOut={() => setShowText(null)}
      >
        <figure>
          <img className="space-img" src={newUri} />
          {showText === pic.data[0]["nasa_id"] && (
            <figcaption className="c">{picDescription}</figcaption>
          )}
        </figure>
      </Container>
    );
  });

  return <div className="space-img-lst">{picsArray}</div>;
}
