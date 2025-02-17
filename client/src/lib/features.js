import moment from "moment";

const fileFormat = (url = "") => {
  const ext = url.split(".").pop();
  if (ext === "mp4" || ext === "webm" || ext === "ogg") {
    return "video";
  }
  if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif") {
    return "image";
  }
  if (ext === "wev" || ext === "mp3") {
    return "audio";
  }
  return "file";
};

const transformImg = (url = "") => {
return url
}


const getLast7Days = () => {
  const today = moment();
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    last7Days.push(today.clone().subtract(i, "days").format("dddd"));
  }

  return last7Days;
};


export { fileFormat, transformImg, getLast7Days };
