// // Lật trang cho các nút next/prev hiện có
const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

pageTurnBtn.forEach((el, i) => {
  el.onclick = () => {
    const pageTurnId = el.getAttribute("data-page");
    const pageTurn = document.getElementById(pageTurnId);

    if (pageTurn.classList.contains("turn")) {
      pageTurn.classList.remove("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - i;
      }, 500);
    } else {
      pageTurn.classList.add("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + i;
      }, 500);
    }
  };
});

// contact form navigation
const pages = document.querySelectorAll(".book-page.page-right");
const contactBtn = document.querySelector(".btn.contact-me");

contactBtn.onclick = () => {
  pages.forEach((page, index) => {
    setTimeout(() => {
      page.classList.add("turn");
      page.style.zIndex = 20 + index; // cho nó chồng lên
    }, (index + 1) * 400); // mỗi trang delay 0.4s
  });
};

//create reverse index function
let totalPages = pages.length;
let pageNumber = 0;
function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalPages - 1; // reset về trang cuối
  }
}

//back profile button
const backProfileBtn = document.querySelector(".back-profile");

backProfileBtn.onclick = () => {
  pages.forEach((_, index) => {
    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].classList.remove("turn");

      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].style.zIndex = 10 + index;
      }, 500);
    }, (index + 1) * 200 + 100); // mỗi trang delay 0.4s
  });
};

// Khởi tạo EmailJS bằng Public Key của bạn
(function () {
  emailjs.init("FaTgYkke84m-G4QnG"); // thay YOUR_PUBLIC_KEY bằng key thật trong dashboard
})();

// Xử lý khi submit form
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // chặn reload trang

    emailjs.sendForm("service_ukaeqwj", "template_xjpec7f", this).then(
      () => {
        alert("✅ Message sent successfully!");
        this.reset(); // xoá nội dung form
      },
      (error) => {
        alert("❌ Failed to send message. Error: " + JSON.stringify(error));
      }
    );
  });
