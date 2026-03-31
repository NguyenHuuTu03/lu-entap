module.exports = (query) => {
  const objectStatus = [{
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    },
  ]
  objectStatus.forEach(item => {
    if (item.status == query.status) {
      item.class = "active";
    } else {
      item.class = "";
    }
  });
  return objectStatus;
}