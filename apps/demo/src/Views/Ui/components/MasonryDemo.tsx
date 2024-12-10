import { useTranslation } from "@dzangolab/react-i18n";
import { Masonry } from "@dzangolab/react-ui";

export const MasonryDemo = () => {
  const [t] = useTranslation("ui");

  const PageContent = <div style={{ height: "20vh" }}>{t("page.content")}</div>;
  const images = [
    "https://picsum.photos/200/300?image=1050",
    "https://picsum.photos/300/300?image=1051",
    "https://picsum.photos/200/300?image=1052",
    "https://picsum.photos/300/300?image=1053",
    "https://picsum.photos/100/300?image=1054",
    "https://picsum.photos/200/300?image=1055",
    "https://picsum.photos/300/300?image=1056",
    "https://picsum.photos/200/300?image=1057",
    "https://picsum.photos/200/300?image=1058",
    "https://picsum.photos/400/300?image=1059",
    "https://picsum.photos/200/300?image=1060",
    "https://picsum.photos/400/300?image=1061",
    "https://picsum.photos/200/300?image=1062",
    "https://picsum.photos/300/300?image=1063",
    "https://picsum.photos/200/300?image=1064",
    "https://picsum.photos/300/300?image=206",
  ];

  const items = [
    { blockSize: "200px", background: "red" },
    { blockSize: "300px", background: "blue" },
    { blockSize: "180px", background: "green" },
    { blockSize: "250px", background: "purple" },
    { blockSize: "220px", background: "orange" },
    { blockSize: "320px", background: "yellow" },
    { blockSize: "280px", background: "pink" },
    { blockSize: "210px", background: "brown" },
    { blockSize: "270px", background: "teal" },
    { blockSize: "350px", background: "gray" },
  ];

  return (
    <>
      <Masonry>
        {/* {images.map((image, i) => (
          <img
            key={i}
            src={image}
            style={{ width: "10rem", display: "block", height: "10rem" }}
          />
        ))} */}
        {items.map((item, index) => (
          <div
            key={index}
            className="masonry-item"
            style={{
              height: item.blockSize,
              background: item.background,
            }}
          ></div>
        ))}
      </Masonry>
    </>
  );
};
