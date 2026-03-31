// Pagination
const buttonPage = document.querySelectorAll("[button-page]");
if (buttonPage.length > 0) {
  buttonPage.forEach(button => {

    button.addEventListener("click", () => {
      let url = new URL(window.location.href);
      const page = button.getAttribute("data-page");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End Pagination

// Search
const formSearch = document.querySelector(".form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = e.target.elements.keyword.value;
    url.searchParams.set("keyword", value);
    window.location.href = url.href;
  });
}
// Search

// preview image
const uploadInput = document.querySelector("[upload-image-input]");
const previewContainer = document.querySelector(".preview-image");
const previewImage = document.querySelector("[upload-image-preview]");
const closeBtn = document.querySelector(".close-image");

if (uploadInput) {
  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);

      previewImage.src = imageURL;
      previewContainer.classList.remove("d-none");
    }
  });
}

// nút xoá ảnh preview
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    previewImage.src = "";
    previewContainer.classList.add("d-none");
    uploadInput.value = "";
  });
}
// preview image

const alertProduct = (time) => {
  const messageInfo = document.querySelector(".alert");
  setTimeout(() => {
    messageInfo.classList.add("d-none");
  }, time);
  const closeAlert = document.querySelector("[close-alert]");
  if (closeAlert) {
    closeAlert.addEventListener("click", () => {
      messageInfo.classList.add("d-none");
    });
  }
}
alertProduct(5000);