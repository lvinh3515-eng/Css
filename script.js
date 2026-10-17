const username = "lvinh3515-eng";
const repo = "Css";

const gallery = document.getElementById("gallery");

async function loadImages() {
  const url =
    `https://api.github.com/repos/${username}/${repo}/contents/images`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Không thể tải danh sách ảnh");
    }

    const files = await response.json();

    files
      .filter(file =>
        file.type === "file" &&
        /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file.name)
      )
      .forEach(file => {
        const img = document.createElement("img");
        img.src = file.download_url;
        img.alt = file.name;
        img.loading = "lazy";
        gallery.appendChild(img);
      });
  } catch (error) {
    console.error(error);
    gallery.textContent = "Không thể tải ảnh.";
  }
}

loadImages();