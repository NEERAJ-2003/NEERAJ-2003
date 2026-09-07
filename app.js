/**
 * NEERAJ-2003 INTERACTIVE SHOWCASE APPLICATION
 * Handles dynamic typing, terminal emulator, project filtering,
 * modal dialogs, and one-click README copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicTyping();
  initTerminal();
  initProjectFilters();
  initModalAndReadme();
  initAudioEffects();
  initProjectInfoPopups();
});

/* --------------------------------------------------------------------------
   1. Dynamic Typing Effect in Hero
-------------------------------------------------------------------------- */
function initDynamicTyping() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const phrases = [
    'Full-Stack Developer & Python Engineer',
    'Django & Asynchronous AJAX Specialist',
    'CNN & Genetic Algorithm Researcher',
    'Computer Vision & Touchless HCI Explorer',
    'Creator of FlowTrack & Check-Balance'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* --------------------------------------------------------------------------
   2. Interactive Terminal Emulator
-------------------------------------------------------------------------- */
function initTerminal() {
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-input');
  const clearBtn = document.getElementById('terminal-clear-btn');
  const chips = document.querySelectorAll('.term-chip');

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<span class="term-highlight">Available Commands:</span>
  <span class="term-success">about</span>       - Developer background and philosophy
  <span class="term-success">skills</span>      - Breakdown of technical capabilities
  <span class="term-success">projects</span>    - List of all 5 open-source repositories
  <span class="term-success">stats</span>       - Real-time GitHub statistics
  <span class="term-success">live</span>        - Deployed web apps on Vercel
  <span class="term-success">research</span>    - Genetic Algorithm & CNN details
  <span class="term-success">contact</span>     - Reach out via Email or GitHub
  <span class="term-success">whoami</span>      - Session user details
  <span class="term-success">sudo hire</span>   - Fast-track hiring authorization
  <span class="term-success">clear</span>       - Clear the terminal screen
`,
    about: () => `
<span class="term-highlight">Neeraj (NEERAJ-2003)</span>
<span class="term-dim">Role:</span> Computer Science Engineer & Full-Stack Developer
<span class="term-dim">Focus:</span> Python, Django, JavaScript, Machine Learning, Computer Vision
<span class="term-dim">Mission:</span> Merging robust backend software with state-of-the-art vision and AI models.
`,
    skills: () => `
<span class="term-highlight">Technical Arsenal:</span>
  • <span class="term-accent">Languages:</span> Python, JavaScript (ES6+), HTML5, CSS3, SQL
  • <span class="term-accent">Frameworks:</span> Django, Asynchronous AJAX, REST APIs
  • <span class="term-accent">AI & Vision:</span> OpenCV, CNN (Deep Learning), Genetic Algorithms, NumPy
  • <span class="term-accent">Cloud & Tools:</span> Git, GitHub, Vercel, VS Code, Linux/Bash
`,
    projects: () => `
<span class="term-highlight">Featured Projects (5 Public Repositories):</span>
  1. <span class="term-success">Brain-Tumor-Detection</span> [Python, CNN, Genetic Algorithm]
     MRI scan diagnostic pipeline for high-precision tumor classification.
  2. <span class="term-success">FlowTrack</span> [JavaScript, Vercel]
     Monthly expense tracker: <a href="https://flow-track-eight.vercel.app" target="_blank" style="color:#38bdf8;">flow-track-eight.vercel.app</a>
  3. <span class="term-balance">Check-Balance</span> [JavaScript, Vercel]
     Real-time balance monitor: <a href="https://check-balance-pi.vercel.app" target="_blank" style="color:#38bdf8;">check-balance-pi.vercel.app</a>
  4. <span class="term-success">Django-with-CRUD-and-AJAX</span> [Django, Python, AJAX]
     Dynamic async database operations without page refresh.
  5. <span class="term-success">GESTURE-CONTROLLED-BRIGHTNESS</span> [OpenCV, Python]
     Touchless webcam-based display brightness controller.
`,
    live: () => `
<span class="term-highlight">Active Vercel Deployments:</span>
  • <b>FlowTrack:</b> <a href="https://flow-track-eight.vercel.app" target="_blank" style="color:#38bdf8;">https://flow-track-eight.vercel.app</a>
  • <b>Check-Balance:</b> <a href="https://check-balance-pi.vercel.app" target="_blank" style="color:#38bdf8;">https://check-balance-pi.vercel.app</a>
`,
    research: () => `
<span class="term-highlight">Research Spotlight:</span>
  Evolutionary Genetic Algorithms applied to Convolutional Neural Networks for MRI brain tumor detection.
  Optimizes deep hyperparameter search spaces to maximize classification precision.
`,
    stats: () => `
<span class="term-highlight">GitHub Real-Time Metrics:</span>
  • Username: <span class="term-accent">NEERAJ-2003</span>
  • Repositories: <span class="term-accent">5 Public</span>
  • Primary Stack: <span class="term-accent">Python, JavaScript</span>
  • Deployments: <span class="term-accent">Vercel (Production)</span>
`,
    whoami: () => `
<span class="term-dim">User:</span> visitor@neeraj-dev
<span class="term-dim">Role:</span> Distinguished Tech Leader / Recruiter / Collaborator
<span class="term-dim">Permissions:</span> Read, Explore, Star, Fork, Hire
`,
    'sudo hire': () => `
<span class="term-success">ACCESS GRANTED: Full permissions granted!</span>
Neeraj is currently open to full-stack, software engineering, and AI/ML opportunities.
Contact immediately via: <a href="mailto:neeraj.contact.dev@gmail.com" style="color:#38bdf8;">neeraj.contact.dev@gmail.com</a>
`,
    contact: () => `
<span class="term-highlight">Connect with Neeraj:</span>
  • GitHub: <a href="https://github.com/NEERAJ-2003" target="_blank" style="color:#38bdf8;">github.com/NEERAJ-2003</a>
  • Email:  <a href="mailto:neeraj.contact.dev@gmail.com" style="color:#38bdf8;">neeraj.contact.dev@gmail.com</a>
`,
    clear: () => {
      terminalScreen.innerHTML = '';
      return '';
    }
  };

  function executeCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    history.push(cmd);
    historyIndex = history.length;

    // Echo command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-cmd-history';
    cmdLine.innerHTML = `<span class="term-user">visitor@neeraj-dev</span>:<span class="term-dir">~</span>$&nbsp;<span class="term-dim">${escapeHTML(cmdRaw)}</span>`;
    terminalScreen.appendChild(cmdLine);

    // Audio click effect
    playTerminalClick();

    // Result
    let outputHTML = '';
    if (commands[cmd]) {
      outputHTML = commands[cmd]();
    } else {
      outputHTML = `<span class="term-warning">Command not found: '${escapeHTML(cmd)}'. Type <span class="term-highlight">help</span> for a list of valid commands.</span>`;
    }

    if (outputHTML) {
      const outputLine = document.createElement('div');
      outputLine.innerHTML = outputHTML;
      terminalScreen.appendChild(outputLine);
    }

    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = history[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < history.length - 1) {
          historyIndex++;
          terminalInput.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          terminalInput.value = '';
        }
        e.preventDefault();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      commands.clear();
      terminalInput.focus();
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = '';
        executeCommand(cmd);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Project Category Filter
-------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Modal & GitHub README Exporter
-------------------------------------------------------------------------- */
function initModalAndReadme() {
  const modal = document.getElementById('readme-modal');
  const openBtn = document.getElementById('open-readme-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const doneBtn = document.getElementById('modal-done-btn');
  const copyBtn = document.getElementById('copy-readme-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const readmeContainer = document.getElementById('readme-code-content');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const tabPanes = document.querySelectorAll('.modal-tab-pane');

  let readmeMarkdown = '';

  // Fetch local README.md
  fetch('README.md')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load README.md');
      return res.text();
    })
    .then((text) => {
      readmeMarkdown = text;
      if (readmeContainer) {
        readmeContainer.textContent = text;
      }
    })
    .catch((err) => {
      console.warn('Loading fallback README string:', err);
      readmeMarkdown = `# NEERAJ-2003 Profile\nFull Stack Developer & AI/ML Engineer`;
      if (readmeContainer) readmeContainer.textContent = readmeMarkdown;
    });

  function openModal() {
    if (modal) modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Tabs
  tabBtns.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabBtns.forEach((t) => t.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.getAttribute('data-tab')}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Copy to Clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = readmeMarkdown || readmeContainer.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtnText.textContent = 'Copied!';
        showToast('README.md copied! Ready to paste into NEERAJ-2003 repo.');
        setTimeout(() => {
          copyBtnText.textContent = 'Copy Markdown';
        }, 2500);
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Toast Notification System
-------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   6. Synthesized Audio Feedback (Web Audio API)
-------------------------------------------------------------------------- */
let audioCtx = null;
function initAudioEffects() {
  // Web audio initializes safely on first user gesture
  document.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
  }, { once: true });
}

function playTerminalClick() {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(640, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (err) {
    // Ignore audio errors silently
  }
}

/* --------------------------------------------------------------------------
   7. Project Architecture Detail Triggers
-------------------------------------------------------------------------- */
function initProjectInfoPopups() {
  const infoTriggers = document.querySelectorAll('.info-trigger');
  infoTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const proj = trigger.getAttribute('data-project');
      const terminalSection = document.getElementById('terminal');
      const terminalInput = document.getElementById('terminal-input');

      if (terminalSection) {
        terminalSection.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        if (terminalInput) {
          terminalInput.focus();
          let cmd = 'projects';
          if (proj === 'brain-tumor') cmd = 'research';
          if (proj === 'django-crud') cmd = 'skills';
          if (proj === 'gesture-ctrl') cmd = 'research';
          
          const event = new KeyboardEvent('keydown', { key: 'Enter' });
          terminalInput.value = cmd;
          terminalInput.dispatchEvent(event);
        }
      }, 500);
    });
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
