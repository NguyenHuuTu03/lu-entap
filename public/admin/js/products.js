// change-status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("path");
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("status");
      const newStatus = status == "active" ? "inactive" : "active";
      const id = button.getAttribute("button-id");
      const action = path + `/${newStatus}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
// End change-status

// Bộ lọc trạng thái và tìm kiếm

const findStatus = document.querySelectorAll("[data-status]");
if (findStatus.length > 0) {
  findStatus.forEach(button => {
    button.addEventListener("click", () => {
      let url = new URL(window.location.href);
      const status = button.getAttribute("data-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

// End Bộ lọc trạng thái và tìm kiếm

// Bộ lọc hành động
const checkAll = document.querySelector("input[name='check-all']");
const checkboxItem = document.querySelectorAll("input[name='checkbox-item']");
if (checkAll) {
  checkAll.addEventListener("click", () => {
    checkboxItem.forEach(button => {
      if (checkAll.checked) {
        button.checked = true;
      } else
        button.checked = false;
    });
  });
}

checkboxItem.forEach(button => {
  button.addEventListener("click", () => {
    const countChecked = document.querySelectorAll("input[name='checkbox-item']:checked").length;
    if (countChecked == checkboxItem.length) {
      checkAll.checked = true;
    } else
      checkAll.checked = false;
  });
});

const formChangeMulti = document.querySelector(".form-change-multi");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = formChangeMulti.querySelector("select[name='option']").value;
    const ids = [];
    if (type == "delete-all") {
      const isConfirm = confirm("Bạn có chắc chắn muốn xoá không?");
      if (!isConfirm) {
        return;
      }
    }
    const inputsChecked = document.querySelectorAll("input[name='checkbox-item']:checked");
    if (inputsChecked.length > 0) {

      inputsChecked.forEach(item => {
        const id = item.getAttribute("data-id");
        if (type == "change-position") {
          const position = item.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else
          ids.push(id);
      });
    }
    const inputIds = formChangeMulti.querySelector("#form-input");
    inputIds.value = ids.join(", ");
    formChangeMulti.submit();
  });
}


// Bộ lọc hành động

// Sắp xếp
const formSort = document.querySelector(".form-sort");
if (formSort) {
  let url = new URL(window.location.href);
  const sortSelect = document.querySelector("[sort]");
  const sortReset = document.querySelector("[button-reset]");
  sortSelect.addEventListener("change", (e) => {
    const sort = e.target.value.split("-");
    let [sortKey, sortValue] = sort;
    if (sortKey && sortValue) {
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
    } else {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
    }
    window.location.href = url.href;
  });
  const buttonReset = formSort.querySelector("[button-reset]");
  if (buttonReset) {
    buttonReset.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      window.location.href = url.href;
    });
  }

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if (sortKey && sortValue) {
    const sort = `${sortKey}-${sortValue}`;
    const optionSelected = formSort.querySelector(`option[value= ${sort}]`)
    if (optionSelected) {
      optionSelected.setAttribute("selected", true);
    }
  }


}

// Sắp xếp

// delete product
const buttonDelete = document.querySelectorAll("[data-delete]");
if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete");
  const path = formDelete.getAttribute("path");
  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?");
      const id = button.getAttribute("data-delete");
      if (isConfirm) {
        formDelete.action = path + `/${id}?_method=DELETE`;
        formDelete.submit();
      }
    });
  });
}
// delete product