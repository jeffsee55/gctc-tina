import React from "react";

type ImgType = {
  src: string;
  width?: number;
  quality?: number;
  className?: string;
  alt?: string;
};

export const CloudinaryImg = React.forwardRef((props: ImgType, ref) => {
  const args = ["f_auto"];
  if (props.width) {
    args.push(`w_${props.width}`);
  }
  if (props.quality) {
    args.push(`q_${props.quality}`);
  }

  const base = "https://res.cloudinary.com";
  const [account, image, upload, folder, ...name] = props.src
    .replace(`${base}/`, "")
    .split("/");

  const newString = [
    base,
    account,
    image,
    upload,
    args.join(","),
    folder,
    name.join("/"),
  ].join("/");

  return (
    <img
      className={props.className}
      ref={ref}
      src={newString}
      alt={props.alt}
    />
  );
});

export const UnsplashImg = React.forwardRef((props: ImgType, ref) => {
  const { pathname } = new URL(props.src);

  const args: { key: string; value: number | string }[] = [
    { key: "auto", value: "format" },
  ];

  if (props.width) {
    args.push({ key: "w", value: props.width });
  }
  if (props.quality) {
    args.push({ key: "q", value: props.quality });
  }

  const newString = `https://images.unsplash.com${pathname}?${args
    .map((arg) => `${arg.key}=${arg.value}`)
    .join("&")}`;

  // https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=3649&q=80

  // w, h: for adjusting the width and height of a photo
  // crop: for applying cropping to the photo
  // fm: for converting image format
  // auto=format: for automatically choosing the optimal image format depending on user browser
  // q: for changing the compression quality when using lossy file formats
  // fit: for changing the fit of the image within the specified dimensions
  // dpr: for adjusting the device pixel ratio of the image

  return (
    <img
      className={props.className}
      ref={ref}
      src={newString}
      alt={props.alt}
    />
  );
});

export const Img = React.forwardRef((props: ImgType, ref) => {
  if (!props.src) {
    return <span />;
  }
  if (props.src.includes("unsplash")) {
    return <UnsplashImg {...props} ref={ref} />;
  } else if (props.src.includes("cloudinary")) {
    return <CloudinaryImg {...props} ref={ref} />;
  } else {
    return <img className={props.className} ref={ref} src={props.src} />;
  }
});
