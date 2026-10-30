/*
 * Daily Log: renders the public daily log list and single posts.
 *
 * The JSON files under data/ are written by Forme (index.json and
 * posts/{slug}.json). Title, date and excerpt are plain text and are always
 * rendered with textContent. Only the post "html" field goes through
 * innerHTML, because Forme already sanitizes it to an allowlist.
 *
 * The logic is in pure functions that take a document, so they can also run
 * under node with a minimal DOM stub (see module.exports at the bottom).
 */
(function (root) {
  "use strict"

  var SLUG_PATTERN = /^\d{4}-\d{2}-\d{2}-\d+$/

  var MESSAGES = {
    empty: "No posts yet.",
    loadError: "Sorry, the daily log could not be loaded. Please try again later.",
    postError: "Sorry, this post could not be loaded. It may have been removed.",
    invalidSlug: "This link is not valid. Please go back to the daily log and pick a post.",
  }

  var UNTITLED = "Untitled"

  function isValidSlug(slug) {
    return typeof slug === "string" && SLUG_PATTERN.test(slug)
  }

  // "2026-10-30" -> "30 October 2026"; falls back to the raw value.
  function formatDate(date) {
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return typeof date === "string" ? date : ""
    }
    try {
      var d = new Date(date + "T00:00:00Z")
      if (isNaN(d.getTime())) return date
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    } catch (e) {
      return date
    }
  }

  // Title as plain text, with a fallback so a link is never empty.
  function titleText(title) {
    var value = title == null ? "" : String(title).trim()
    return value === "" ? UNTITLED : value
  }

  function clear(el) {
    while (el.firstChild) el.removeChild(el.firstChild)
  }

  function text(doc, tag, className, value) {
    var el = doc.createElement(tag)
    if (className) el.className = className
    el.textContent = value == null ? "" : String(value)
    return el
  }

  function renderMessage(doc, container, kind, message) {
    clear(container)
    var p = text(doc, "p", "dl-message dl-message-" + kind, message)
    container.appendChild(p)
  }

  function renderIndex(doc, container, data) {
    var posts = data && Array.isArray(data.posts) ? data.posts : null
    if (posts === null) {
      renderMessage(doc, container, "error", MESSAGES.loadError)
      return
    }
    if (posts.length === 0) {
      renderMessage(doc, container, "empty", MESSAGES.empty)
      return
    }

    clear(container)
    var list = doc.createElement("ul")
    list.className = "dl-list"

    posts.forEach(function (post) {
      if (!post || !isValidSlug(post.slug)) return
      var item = doc.createElement("li")
      item.className = "dl-item"

      item.appendChild(text(doc, "p", "dl-date", formatDate(post.date)))

      var h2 = doc.createElement("h2")
      h2.className = "dl-item-title"
      var a = doc.createElement("a")
      a.setAttribute("href", "post.html?slug=" + encodeURIComponent(post.slug))
      a.textContent = titleText(post.title)
      h2.appendChild(a)
      item.appendChild(h2)

      if (post.excerpt) {
        item.appendChild(text(doc, "p", "dl-excerpt", post.excerpt))
      }
      list.appendChild(item)
    })

    if (!list.firstChild) {
      renderMessage(doc, container, "empty", MESSAGES.empty)
      return
    }
    container.appendChild(list)
  }

  // post: {id, title, date, html}
  function renderPost(doc, container, post) {
    if (!post || typeof post.html !== "string") {
      renderMessage(doc, container, "error", MESSAGES.postError)
      return
    }
    clear(container)
    var article = doc.createElement("article")
    article.className = "dl-post"
    article.appendChild(text(doc, "p", "dl-date", formatDate(post.date)))
    article.appendChild(text(doc, "h1", "dl-post-title", titleText(post.title)))
    var body = doc.createElement("div")
    body.className = "dl-body"
    body.innerHTML = post.html // already sanitized by Forme (allowlist)
    article.appendChild(body)
    container.appendChild(article)
  }

  // no-cache: revalidate with the server, since GitHub Pages caches files for 10 minutes.
  function fetchJson(fetchFn, url) {
    return fetchFn(url, { cache: "no-cache" }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status)
      return res.json()
    })
  }

  function loadIndex(doc, container, fetchFn) {
    // catch() after then() so a render exception also shows the friendly message.
    return fetchJson(fetchFn, "data/index.json")
      .then(function (data) {
        renderIndex(doc, container, data)
      })
      .catch(function () {
        renderMessage(doc, container, "error", MESSAGES.loadError)
      })
  }

  // Validates the slug BEFORE any fetch.
  function loadPost(doc, container, fetchFn, slug) {
    if (!isValidSlug(slug)) {
      renderMessage(doc, container, "error", MESSAGES.invalidSlug)
      return Promise.resolve()
    }
    return fetchJson(fetchFn, "data/posts/" + encodeURIComponent(slug) + ".json")
      .then(function (post) {
        renderPost(doc, container, post)
        if (post && typeof post.title === "string" && post.title) {
          doc.title = post.title + " | Daily Log"
        }
      })
      .catch(function () {
        renderMessage(doc, container, "error", MESSAGES.postError)
      })
  }

  var api = {
    MESSAGES: MESSAGES,
    isValidSlug: isValidSlug,
    formatDate: formatDate,
    renderIndex: renderIndex,
    renderPost: renderPost,
    loadIndex: loadIndex,
    loadPost: loadPost,
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api
  }

  if (typeof document !== "undefined" && typeof window !== "undefined") {
    root.DailyLog = api
    var container = document.getElementById("daily-log-app")
    if (container) {
      var page = container.getAttribute("data-page")
      var fetchFn = window.fetch.bind(window)
      if (page === "index") {
        loadIndex(document, container, fetchFn)
      } else if (page === "post") {
        var slug = new URLSearchParams(window.location.search).get("slug")
        loadPost(document, container, fetchFn, slug)
      }
    }
  }
})(typeof window !== "undefined" ? window : this)
