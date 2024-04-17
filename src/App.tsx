import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const preset_key = "vhmqeqeb";
  const cloud_name = "dmgozibet";
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imgValue, setImgValue] = useState<File | undefined>(undefined);
  const handleChangeImg = () => {
    if (imgValue) {
      const formData = new FormData();
      formData.append("file", imgValue);
      formData.append("upload_preset", preset_key);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        )
        .then((res) => {
          setImageUrl(res.data.secure_url);
          alert(res.data.secure_url);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setImgValue(e.target.files[0]);
          }
        }}
      />
      <button onClick={handleChangeImg}> upload Img</button>
      <img src={imageUrl} style={{ width: "350px" }} />
    </div>
  );
}

export default App;
