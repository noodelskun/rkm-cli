module.exports = function () {
  const children = [
    { isdir: true, hasFiles: false, dir: "/assets", name: "images" },
    { isdir: true, hasFiles: false, dir: "/assets", name: "css" },
    { isdir: true, hasFiles: false, dir: "/assets", name: "js" },
    { isdir: true, hasFiles: false, dir: "/assets", name: "font" },
  ]
  return { isdir: true, hasFiles: false, dir: "", name: "assets", children };
};