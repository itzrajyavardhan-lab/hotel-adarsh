/* ============================================================
   HOTEL ADARSH — script.js
   ============================================================ */

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

/* ===== THEME SWITCHER ===== */
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.getAttribute('data-t');
    document.documentElement.setAttribute('data-theme', t);
    themeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showToast(`Theme: ${t.charAt(0).toUpperCase() + t.slice(1)} mode activated!`);
  });
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

/* ===== SCROLL — Show/Hide Scroll-to-Top Button ===== */
window.addEventListener('scroll', () => {
  const scrollTop = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
});

/* ===== SCROLL REVEAL (Intersection Observer) ===== */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===== FOOD MENU TABS ===== */
function switchTab(e, id) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
}

/* ===== FAQ ACCORDION ===== */
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ===== SCROLL TO BOOKING SECTION ===== */
function scrollToBook() {
  document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
}

function scrollTo(sel) {
  document.querySelector(sel).scrollIntoView({ behavior: 'smooth' });
}

/* ===== PRE-SELECT ROOM IN BOOKING FORM ===== */
function openBooking(room) {
  const sel = document.getElementById('bRoom');
  for (let i = 0; i < sel.options.length; i++) {
    if (sel.options[i].text.startsWith(room)) {
      sel.selectedIndex = i;
      break;
    }
  }
  document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
}

/* ===== BOOKING FORM SUBMIT ===== */
function submitBooking(e) {
  e.preventDefault();
  const name = document.getElementById('bName').value;
  const room = document.getElementById('bRoom').value;
  if (!room) {
    showToast('⚠️ Please select a room type!');
    return;
  }
  showToast(`🎉 Booking received, ${name}! We'll confirm soon.`);
  e.target.reset();
}

/* ===== CONTACT FORM SUBMIT ===== */
function submitContact(e) {
  e.preventDefault();
  showToast("✉️ Message sent! We'll reply within 24 hours.");
  e.target.reset();
}

/* ===== TOAST NOTIFICATION ===== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ===== DATE VALIDATION FOR BOOKING FORM ===== */
const today = new Date().toISOString().split('T')[0];
document.getElementById('bCheckin').min = today;
document.getElementById('bCheckout').min = today;

document.getElementById('bCheckin').addEventListener('change', function () {
  document.getElementById('bCheckout').min = this.value;
});

function submitBooking(event) {
  event.preventDefault();

  var name = document.getElementById("bName").value;
  var email = document.getElementById("bEmail").value;
  var phone = document.getElementById("bPhone").value;
  var room = document.getElementById("bRoom").value;
  var checkin = document.getElementById("bCheckin").value;
  var checkout = document.getElementById("bCheckout").value;
  var guests = document.getElementById("bGuests").value;
  var request = document.getElementById("bRequest").value;

  // 🔥 SIMPLE STRING (no backtick confusion)
  var message = "Hotel Booking Details\n\n"
    + "Name: " + name + "\n"
    + "Email: " + email + "\n"
    + "Phone: " + phone + "\n"
    + "Room: " + room + "\n"
    + "Check-in: " + checkin + "\n"
    + "Check-out: " + checkout + "\n"
    + "Guests: " + guests + "\n"
    + "Request: " + request;

  var whatsappNumber = "918252890568"; // Replace with your WhatsApp number (with country code)

  // 🔥 MOST IMPORTANT LINE
  var finalMessage = encodeURIComponent(message);

  var url = "https://api.whatsapp.com/send?phone=" 
            + 918252890568 + "&text=" + finalMessage;

  // 🔥 Redirect (mobile friendly)
  window.location.href = url;
}

function submitContact(event) {
  event.preventDefault();

  var name = document.getElementById("cName").value;
  var email = document.getElementById("cEmail").value;
  var subject = document.getElementById("cSubject").value;
  var message = document.getElementById("cMessage").value;

  // Final message
  var finalMsg = "New Contact Message\n\n"
    + "Name: " + name + "\n"
    + "Email: " + email + "\n"
    + "Subject: " + subject + "\n"
    + "Message: " + message;

  var whatsappNumber = "918252890568";

  var url = "https://api.whatsapp.com/send?phone=" 
            + 918252890568 + "&text=" 
            + encodeURIComponent(finalMsg);

  // Mobile friendly redirect
  window.location.href = url;
}