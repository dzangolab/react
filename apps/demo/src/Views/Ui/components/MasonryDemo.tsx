import { useTranslation } from "@dzangolab/react-i18n";
import { Masonry, Page } from "@dzangolab/react-ui";

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
    { blockSize: "200px", background: "#ff6f61" },
    { blockSize: "300px", background: "#6b5b95" },
    { blockSize: "180px", background: "#88b04b" },
    { blockSize: "250px", background: "#d65076" },
    { blockSize: "220px", background: "#ffb347" },
    { blockSize: "320px", background: "#45b8ac" },
    { blockSize: "280px", background: "#e94b3c" },
    { blockSize: "210px", background: "#6c5b7b" },
    { blockSize: "270px", background: "#00a86b" },
    { blockSize: "350px", background: "#b565a7" },
    { blockSize: "200px", background: "#ff6f61" },
    { blockSize: "300px", background: "#6b5b95" },
    { blockSize: "180px", background: "#88b04b" },
    { blockSize: "250px", background: "#d65076" },
    { blockSize: "220px", background: "#ffb347" },
    { blockSize: "320px", background: "#45b8ac" },
    { blockSize: "280px", background: "#e94b3c" },
    { blockSize: "210px", background: "#6c5b7b" },
    { blockSize: "270px", background: "#00a86b" },
    { blockSize: "350px", background: "#b565a7" },
  ];

  return (
    <Page>
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
    </Page>
  );
};
