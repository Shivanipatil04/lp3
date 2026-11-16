/**
 * SPPU Laboratory Practice III (410246)
 * Static Site Application Controller
 * Academic Year 2026-27 | Late G. N. Sapkal College of Engineering
 */

(function () {
  "use strict";

  // State
  let currentPracticalId = null;
  const practicals = window.PRACTICALS_DATA || [];
  const practicalMap = new Map();
  practicals.forEach((p, idx) => {
    p.index = idx;
    practicalMap.set(p.id, p);
  });

  // DOM Elements
  const contentEl = document.getElementById("content");
  const sidebarNavEl = document.getElementById("sidebar-nav-groups");
  const searchInput = document.getElementById("search-input");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");
  const prismThemeLink = document.getElementById("prism-theme-link");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const sidebarEl = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const breadcrumbCurrent = document.getElementById("breadcrumb-current");

  // 1. Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem("lp3_theme") || "light";
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light Mode";
      if (prismThemeLink) prismThemeLink.href = "vendor/prism-dark.css";
      localStorage.setItem("lp3_theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark Mode";
      if (prismThemeLink) prismThemeLink.href = "vendor/prism-light.css";
      localStorage.setItem("lp3_theme", "light");
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");
    });
  }

  // 2. Mobile Drawer
  function toggleMobileSidebar(open) {
    if (open) {
      sidebarEl.classList.add("open");
      sidebarBackdrop.classList.add("open");
    } else {
      sidebarEl.classList.remove("open");
      sidebarBackdrop.classList.remove("open");
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => toggleMobileSidebar(true));
  }
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", () => toggleMobileSidebar(false));
  }

  // 3. Render Sidebar
  function renderSidebar() {
    if (!sidebarNavEl) return;

    const groups = [
      { id: "group-a", title: "Group A - DAA", prefix: "Group A" },
      { id: "group-b", title: "Group B - Machine Learning", prefix: "Group B" },
      { id: "group-c", title: "Group C - Blockchain", prefix: "Group C" }
    ];

    let html = `
      <a href="#/" class="nav-home-link" id="nav-link-home">
        <span>🏠</span>
        <span>Home & Overview</span>
      </a>
    `;

    groups.forEach((grp) => {
      const items = practicals.filter((p) => p.group.startsWith(grp.prefix));
      html += `
        <div class="nav-group expanded" id="nav-${grp.id}">
          <button class="group-toggle" type="button" data-group="${grp.id}">
            <span>${grp.title}</span>
            <span class="arrow">▶</span>
          </button>
          <ul class="group-items">
            ${items
              .map(
                (p) => `
              <li>
                <a href="#/${p.id}" class="practical-link" id="nav-link-${p.id}" data-id="${p.id}" title="${p.title}">
                  <span>P${p.number} - ${p.shortTitle.split(" - ")[1] || p.shortTitle}</span>
                  ${
                    !p.hasCode
                      ? '<span class="badge badge-proc">Procedure</span>'
                      : '<span class="badge badge-code">Code</span>'
                  }
                </a>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `;
    });

    sidebarNavEl.innerHTML = html;

    // Attach group collapse toggles
    document.querySelectorAll(".group-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const groupEl = btn.closest(".nav-group");
        if (groupEl) {
          groupEl.classList.toggle("expanded");
        }
      });
    });
  }

  // 4. Sidebar Filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      document.querySelectorAll(".practical-link").forEach((link) => {
        const id = link.getAttribute("data-id");
        const p = practicalMap.get(id);
        if (!p) return;

        const match =
          p.shortTitle.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          `p${p.number}`.includes(query) ||
          p.group.toLowerCase().includes(query);

        link.parentElement.style.display = match ? "block" : "none";
      });

      // Keep groups expanded during search
      if (query.length > 0) {
        document.querySelectorAll(".nav-group").forEach((grp) => grp.classList.add("expanded"));
      }
    });
  }

  // 5. Update Navigation State
  function updateNavState(id) {
    document.querySelectorAll(".practical-link, .nav-home-link").forEach((el) => {
      el.classList.remove("active");
    });

    if (!id || id === "home") {
      const homeLink = document.getElementById("nav-link-home");
      if (homeLink) homeLink.classList.add("active");
      if (breadcrumbCurrent) breadcrumbCurrent.textContent = "Home";
      return;
    }

    const activeLink = document.getElementById(`nav-link-${id}`);
    if (activeLink) {
      activeLink.classList.add("active");
      const parentGroup = activeLink.closest(".nav-group");
      if (parentGroup) {
        parentGroup.classList.add("expanded");
      }
    }

    const p = practicalMap.get(id);
    if (p && breadcrumbCurrent) {
      breadcrumbCurrent.textContent = `P${p.number}: ${p.shortTitle.split(" - ")[1] || p.shortTitle}`;
    }

    // Close mobile drawer on route change
    toggleMobileSidebar(false);
  }

  // 6. Router
  function handleRoute() {
    const hash = window.location.hash || "#/";
    const match = hash.match(/^#\/([a-zA-Z0-9_-]*)$/);

    if (!match || !match[1] || match[1] === "") {
      currentPracticalId = null;
      renderHomePage();
      updateNavState("home");
    } else {
      const pId = match[1].toLowerCase();
      if (practicalMap.has(pId)) {
        currentPracticalId = pId;
        renderPracticalPage(practicalMap.get(pId));
        updateNavState(pId);
      } else {
        renderNotFoundPage();
      }
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // 7. Render Home Page
  function renderHomePage() {
    let grpA = practicals.filter((p) => p.group.startsWith("Group A"));
    let grpB = practicals.filter((p) => p.group.startsWith("Group B"));
    let grpC = practicals.filter((p) => p.group.startsWith("Group C"));

    contentEl.innerHTML = `
      <div class="home-container">
        <div class="hero-card">
          <div class="hero-college">Late G. N. Sapkal College of Engineering, Nashik</div>
          <h1 class="hero-title">Laboratory Practice III (410246)</h1>
          <div class="hero-meta">
            Academic Year 2026–27 | BE Computer Engineering (2019 Pattern) | SPPU
          </div>
          <p class="hero-desc">
            Official static offline laboratory repository and exam revision portal. Contains complete source codes, theoretical foundations, execution walkthroughs, and viva voce question banks for all 15 practical assignments.
          </p>
        </div>

        <div class="subjects-grid">
          <!-- Group A -->
          <div class="subject-card">
            <div class="subject-card-header">
              <h2 class="subject-card-title">Design & Analysis of Algorithms</h2>
              <span class="subject-card-tag tag-daa">Group A (5 Practicals)</span>
            </div>
            <ul class="subject-practical-list">
              ${grpA
                .map(
                  (p) => `
                <li>
                  <a href="#/${p.id}">
                    <span><strong>P${p.number}:</strong> ${p.shortTitle.split(" - ")[1]}</span>
                    <span class="badge badge-code">Code</span>
                  </a>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>

          <!-- Group B -->
          <div class="subject-card">
            <div class="subject-card-header">
              <h2 class="subject-card-title">Machine Learning</h2>
              <span class="subject-card-tag tag-ml">Group B (5 Practicals)</span>
            </div>
            <ul class="subject-practical-list">
              ${grpB
                .map(
                  (p) => `
                <li>
                  <a href="#/${p.id}">
                    <span><strong>P${p.number}:</strong> ${p.shortTitle.split(" - ")[1]}</span>
                    <span class="badge badge-code">Code</span>
                  </a>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>

          <!-- Group C -->
          <div class="subject-card">
            <div class="subject-card-header">
              <h2 class="subject-card-title">Blockchain Technology</h2>
              <span class="subject-card-tag tag-bc">Group C (5 Practicals)</span>
            </div>
            <ul class="subject-practical-list">
              ${grpC
                .map(
                  (p) => `
                <li>
                  <a href="#/${p.id}">
                    <span><strong>P${p.number}:</strong> ${p.shortTitle.split(" - ")[1]}</span>
                    ${
                      p.hasCode
                        ? '<span class="badge badge-code">Code</span>'
                        : '<span class="badge badge-proc">Procedure</span>'
                    }
                  </a>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>

        <div class="instructions-box">
          <h3>📌 Instructions for Practical Examination</h3>
          <div class="instructions-grid">
            <div class="instruction-step">
              <h4>1. Python Setup</h4>
              <p>Execute once: <code>pip install pandas numpy scikit-learn matplotlib</code>. Keep required CSV datasets in the same folder as Python scripts.</p>
            </div>
            <div class="instruction-step">
              <h4>2. Smart Contract Testing</h4>
              <p>Open Remix IDE (<code>remix.ethereum.org</code>), paste the Solidity code, compile with compiler 0.8.x, and deploy to Remix VM or Sepolia.</p>
            </div>
            <div class="instruction-step">
              <h4>3. Offline Exam Use</h4>
              <p>Double-click <code>index.html</code> to open directly via <code>file://</code> protocol. No internet connection or server required.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 8. Render Practical Page (Strict 10 SPPU Journal Sections)
  function renderPracticalPage(p) {
    const prevP = p.index > 0 ? practicals[p.index - 1] : null;
    const nextP = p.index < practicals.length - 1 ? practicals[p.index + 1] : null;

    // Build Theory HTML
    let theoryHtml = `<p><strong>${escapeHtml(p.theory.summary)}</strong></p>`;
    if (p.theory.sections) {
      p.theory.sections.forEach((sec) => {
        theoryHtml += `
          <div style="margin-top: 1rem;">
            <div class="theory-subheading">${escapeHtml(sec.heading)}</div>
            ${sec.content ? `<div class="theory-content">${escapeHtml(sec.content)}</div>` : ""}
            ${
              sec.table
                ? `
              <div class="table-wrapper" style="margin-top: 0.5rem;">
                <table class="styled-table">
                  <thead>
                    <tr>${sec.table.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr>
                  </thead>
                  <tbody>
                    ${sec.table.rows
                      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
                      .join("")}
                  </tbody>
                </table>
              </div>
            `
                : ""
            }
          </div>
        `;
      });
    }

    // Build Program HTML
    let programHtml = "";
    if (p.hasCode) {
      programHtml = `
        <div class="code-box-header">
          <div class="code-file-tag">
            <span>📄</span>
            <span>${escapeHtml(p.fileName)}</span>
          </div>
          <div class="code-actions">
            <button class="btn-code" id="btn-copy-code" type="button" title="Copy code to clipboard">
              <span>📋</span> Copy Code
            </button>
            <button class="btn-code" id="btn-download-code" type="button" title="Download original source file">
              <span>⬇️</span> Download
            </button>
          </div>
        </div>
        <div class="code-container">
          <pre class="line-numbers"><code class="language-${p.language}">${escapeHtml(p.code)}</code></pre>
        </div>
      `;
    } else {
      programHtml = `
        <div class="procedure-banner">
          <span>ℹ️</span>
          <span>No program for this practical - procedure and report.</span>
        </div>
        ${
          p.observationTable
            ? `
          <div style="margin-top: 1rem;">
            <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem;">Observation & Fee Table Template:</h4>
            <div class="table-wrapper">
              <table class="styled-table">
                <thead>
                  <tr>${p.observationTable.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr>
                </thead>
                <tbody>
                  ${p.observationTable.rows
                    .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`)
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        `
            : ""
        }
      `;
    }

    // Build Execution Guide HTML
    let guideHtml = "";
    if (p.guide.vscode || p.guide.terminal || p.guide.jupyter) {
      guideHtml = `
        ${p.guide.pip ? `<div style="margin-bottom: 0.75rem;"><strong>Required Packages:</strong><div class="code-snippet">${escapeHtml(p.guide.pip)}</div></div>` : ""}
        ${p.guide.dataset ? `<div style="margin-bottom: 0.75rem;"><strong>Dataset Requirement:</strong> ${escapeHtml(p.guide.dataset)}</div>` : ""}
        <div class="guide-tabs">
          <button class="tab-btn active" data-tab="tab-vscode">VS Code</button>
          <button class="tab-btn" data-tab="tab-terminal">Linux Terminal</button>
          <button class="tab-btn" data-tab="tab-jupyter">Jupyter Notebook</button>
        </div>
        <div class="tab-content active" id="tab-vscode">
          <div class="code-snippet">${escapeHtml(p.guide.vscode || "")}</div>
        </div>
        <div class="tab-content" id="tab-terminal">
          <div class="code-snippet">${escapeHtml(p.guide.terminal || "")}</div>
        </div>
        <div class="tab-content" id="tab-jupyter">
          <div class="code-snippet">${escapeHtml(p.guide.jupyter || "")}</div>
        </div>
      `;
    } else if (p.guide.remix) {
      guideHtml = `
        <ol>
          ${p.guide.remix.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      `;
    } else if (p.guide.procedureSteps) {
      guideHtml = `
        <ol>
          ${p.guide.procedureSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      `;
    }

    contentEl.innerHTML = `
      <div class="practical-page">
        <!-- 1. Header -->
        <div class="practical-header-card">
          <div class="practical-top-meta">
            <span class="practical-group-label">${escapeHtml(p.group)}</span>
            <span class="badge ${p.hasCode ? "badge-code" : "badge-proc"}">
              ${p.hasCode ? "Coded Program" : "Procedure & Study"}
            </span>
          </div>
          <h1 class="practical-main-title">Practical ${p.number}: ${escapeHtml(p.title)}</h1>
          ${p.co ? `<div class="practical-co-pill">🎯 ${escapeHtml(p.co)}</div>` : ""}
        </div>

        <!-- 2. Problem Statement / Aim -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">1</span>
            <span>Problem Statement / Aim</span>
          </div>
          <div class="section-body">
            <p><strong>${escapeHtml(p.title)}</strong></p>
          </div>
        </div>

        <!-- 3. Objectives & Prerequisites -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">2</span>
            <span>Objectives and Prerequisites</span>
          </div>
          <div class="section-body">
            <h4 style="font-size: 0.95rem; color: var(--text-primary);">Objectives:</h4>
            <ul>
              ${p.objectives.map((obj) => `<li>${escapeHtml(obj)}</li>`).join("")}
            </ul>
            <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-top: 0.5rem;">Prerequisites:</h4>
            <ul>
              ${p.prerequisites.map((pre) => `<li>${escapeHtml(pre)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- 4. Theory -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">3</span>
            <span>Theory (SPPU Exam-Ready)</span>
          </div>
          <div class="section-body">
            ${theoryHtml}
          </div>
        </div>

        <!-- 5. Algorithm / Steps -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">4</span>
            <span>Algorithm / Step-by-Step Execution</span>
          </div>
          <div class="section-body">
            <ol>
              ${p.algorithm.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
            </ol>
          </div>
        </div>

        <!-- 6. Program -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">5</span>
            <span>Program Code / Implementation</span>
          </div>
          <div class="section-body">
            ${programHtml}
          </div>
        </div>

        <!-- 7. Guide: How to Run -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">6</span>
            <span>Execution Guide</span>
          </div>
          <div class="section-body">
            ${guideHtml}
          </div>
        </div>

        <!-- 8. Sample Input and Expected Output -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">7</span>
            <span>Sample Input & Expected Output</span>
          </div>
          <div class="section-body">
            <div class="sample-io-grid">
              <div class="io-card">
                <div class="io-card-title">Sample Input</div>
                <div class="io-code">${escapeHtml(p.sampleIO.input)}</div>
              </div>
              <div class="io-card">
                <div class="io-card-title">Expected Output</div>
                <div class="io-code">${escapeHtml(p.sampleIO.output)}</div>
              </div>
            </div>
            ${p.sampleIO.note ? `<div class="io-note">Note: ${escapeHtml(p.sampleIO.note)}</div>` : ""}
          </div>
        </div>

        <!-- 9. Conclusion -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">8</span>
            <span>Conclusion</span>
          </div>
          <div class="section-body">
            <p>${escapeHtml(p.conclusion)}</p>
          </div>
        </div>

        <!-- 10. Viva Voce Questions -->
        <div class="journal-section">
          <div class="section-heading">
            <span class="section-number">9</span>
            <span>Viva Voce Questions & Answers</span>
          </div>
          <div class="section-body">
            <div class="viva-list">
              ${p.viva
                .map(
                  (v, idx) => `
                <div class="viva-item">
                  <div class="viva-question">
                    <span class="viva-q-prefix">Q${idx + 1}.</span>
                    <span>${escapeHtml(v.q)}</span>
                  </div>
                  <div class="viva-answer"><strong>Ans:</strong> ${escapeHtml(v.a)}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- Previous / Next Navigation -->
        <div class="pagination-nav">
          ${
            prevP
              ? `<a href="#/${prevP.id}" class="btn-nav-page">⬅️ P${prevP.number}: ${prevP.shortTitle.split(" - ")[1]}</a>`
              : `<span class="btn-nav-page disabled">⬅️ Previous</span>`
          }
          <a href="#/" class="btn-nav-page">🏠 Index</a>
          ${
            nextP
              ? `<a href="#/${nextP.id}" class="btn-nav-page">P${nextP.number}: ${nextP.shortTitle.split(" - ")[1]} ➡️</a>`
              : `<span class="btn-nav-page disabled">Next ➡️</span>`
          }
        </div>
      </div>
    `;

    // Initialize Prism Syntax Highlighting
    if (window.Prism) {
      window.Prism.highlightAll();
    }

    // Attach Copy Code Button
    const copyBtn = document.getElementById("btn-copy-code");
    if (copyBtn && p.hasCode) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard
          .writeText(p.code)
          .then(() => {
            copyBtn.innerHTML = "<span>✅</span> Copied!";
            setTimeout(() => {
              copyBtn.innerHTML = "<span>📋</span> Copy Code";
            }, 2000);
          })
          .catch((err) => {
            console.error("Clipboard copy failed:", err);
          });
      });
    }

    // Attach Download Button
    const downloadBtn = document.getElementById("btn-download-code");
    if (downloadBtn && p.hasCode) {
      downloadBtn.addEventListener("click", () => {
        const blob = new Blob([p.code], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = p.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Attach Guide Tab Buttons
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTabId = btn.getAttribute("data-tab");
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
        btn.classList.add("active");
        const activeContent = document.getElementById(targetTabId);
        if (activeContent) activeContent.classList.add("active");
      });
    });
  }

  // 9. Render 404 Page
  function renderNotFoundPage() {
    contentEl.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">404</h1>
        <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem;">The practical assignment you requested could not be found.</p>
        <a href="#/" class="btn-action">Return to Home</a>
      </div>
    `;
  }

  // Utility: Escape HTML
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Keyboard Shortcuts (Arrow keys for pagination)
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (!currentPracticalId) return;

    const currentP = practicalMap.get(currentPracticalId);
    if (!currentP) return;

    if (e.key === "ArrowLeft" && currentP.index > 0) {
      window.location.hash = `#/${practicals[currentP.index - 1].id}`;
    } else if (e.key === "ArrowRight" && currentP.index < practicals.length - 1) {
      window.location.hash = `#/${practicals[currentP.index + 1].id}`;
    }
  });

  // Initialization
  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderSidebar();
    handleRoute();
  });

  window.addEventListener("hashchange", handleRoute);
})();
