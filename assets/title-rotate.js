const page_title = document.title;
setInterval(() => {
  if (document.title === page_title) {
    document.title = window.features.documentTitle.title;
  } else {
    document.title = page_title;
  }
}, window.features.documentTitle.interval);
