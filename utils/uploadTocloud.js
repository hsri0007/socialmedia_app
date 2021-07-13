import axios from "axios";

const UploadToCLoudinary = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_presets", "social_mode");
    form.append("cloud_name", "srihari");

    const res = await axios.post(process.env.Cloudinary_url, form);
    return res.data.url;
  } catch (err) {
    return err;
  }
};

export default UploadToCLoudinary;
