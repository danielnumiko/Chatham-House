/*
 * Speaker cards with bio preview (CHAT-2088)
 *
 * Progressive enhancement: without this script every bio shows in full and the
 * toggles stay hidden. With it, bios are cut to two lines and a "View more"
 * toggle expands them. The toggle is only shown when the bio is actually
 * truncated, and the whole card acts as its click target.
 */
(function () {
  "use strict";

  var LABEL_CLOSED = "View more";
  var LABEL_OPEN = "View less";

  function setOpen(card, toggle, open) {
    card.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".speaker-card__toggle-label").textContent = open ? LABEL_OPEN : LABEL_CLOSED;
  }

  // Show the toggle only when the clamped bio overflows its two lines.
  function updateTruncation(card) {
    var toggle = card.querySelector(".speaker-card__toggle");
    var text = card.querySelector(".speaker-card__bio-text");
    if (!toggle || !text) return;

    var hasProfileLink = !!card.querySelector(".speaker-card__link");
    var wasOpen = card.classList.contains("is-open");

    // Measure in the collapsed state.
    card.classList.remove("is-open");
    var truncated = text.scrollHeight > text.clientHeight + 1;
    if (wasOpen) card.classList.add("is-open");

    // A short bio with a profile link still needs the toggle to reveal that link.
    var needed = truncated || hasProfileLink;
    toggle.hidden = !needed;
    card.classList.toggle("has-toggle", needed);

    if (!needed) {
      card.classList.add("is-open");
    } else if (!wasOpen) {
      setOpen(card, toggle, false);
    }
  }

  function init(section) {
    section.classList.add("is-enhanced");
    var cards = section.querySelectorAll(".speaker-card");

    Array.prototype.forEach.call(cards, function (card) {
      var toggle = card.querySelector(".speaker-card__toggle");
      if (!toggle) return;

      setOpen(card, toggle, false);
      toggle.addEventListener("click", function () {
        setOpen(card, toggle, !card.classList.contains("is-open"));
      });
    });

    var refresh = function () {
      Array.prototype.forEach.call(cards, updateTruncation);
    };

    refresh();

    // Re-check after web fonts load and whenever the layout width changes.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    if ("ResizeObserver" in window) {
      var lastWidth = section.clientWidth;
      new ResizeObserver(function () {
        if (section.clientWidth !== lastWidth) {
          lastWidth = section.clientWidth;
          refresh();
        }
      }).observe(section);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var sections = document.querySelectorAll("[data-speaker-cards]");
    Array.prototype.forEach.call(sections, init);
  });
})();
