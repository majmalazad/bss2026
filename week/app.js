const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const tabTargetButtons = document.querySelectorAll('[data-tab-target]');

function activateTab(tabId) {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabId));
  panels.forEach(panel => panel.classList.toggle('active', panel.id === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
tabTargetButtons.forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tabTarget)));

const toast = document.getElementById('toast');
function showToast(message = 'Saved') {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1400);
}

document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast('Command copied');
    } catch (error) {
      showToast('Copy failed');
    }
  });
});

const portAnswer = document.getElementById('port-answer');
document.querySelectorAll('[data-match]').forEach(button => {
  button.addEventListener('click', () => {
    if (portAnswer) portAnswer.textContent = `${button.textContent} is commonly used for ${button.dataset.match}.`;
  });
});

function storageKey(name) {
  const scope = document.body.dataset.storageScope || `cmp5358-week-${document.body.dataset.weekNumber || 'global'}`;
  return `${scope}-${name}`;
}

function updateProgress() {
  const boxes = document.querySelectorAll('.task-check');
  const total = boxes.length;
  const done = [...boxes].filter(box => box.checked).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const count = document.getElementById('progress-count');
  const bar = document.getElementById('progress-bar');
  if (count) count.textContent = `${percent}%`;
  if (bar) bar.style.width = `${percent}%`;
}

document.querySelectorAll('.self-task').forEach(task => {
  const id = task.dataset.task;
  const checkbox = task.querySelector('.task-check');
  if (checkbox) {
    checkbox.checked = localStorage.getItem(storageKey(`task-${id}`)) === 'true';
    checkbox.addEventListener('change', () => {
      localStorage.setItem(storageKey(`task-${id}`), checkbox.checked);
      updateProgress();
    });
  }
});
updateProgress();

document.querySelectorAll('.note-box').forEach(box => {
  const key = storageKey(`note-${box.dataset.note}`);
  const saved = localStorage.getItem(key);
  if (saved !== null) box.value = saved;
  box.addEventListener('input', () => {
    localStorage.setItem(key, box.value);
    box.classList.add('saved');
    setTimeout(() => box.classList.remove('saved'), 250);
  });
});

document.querySelectorAll('.clear-note').forEach(button => {
  button.addEventListener('click', () => {
    const task = button.closest('.self-task');
    if (!task) return;
    task.querySelectorAll('.note-box').forEach(box => {
      box.value = '';
      localStorage.removeItem(storageKey(`note-${box.dataset.note}`));
    });
    showToast('Answer cleared');
  });
});

document.querySelectorAll('.reveal-btn').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.parentElement?.nextElementSibling?.classList.contains('answer-box')
      ? button.parentElement.nextElementSibling
      : button.nextElementSibling;
    if (target) target.classList.toggle('hidden');
  });
});

document.querySelectorAll('[data-single-check]').forEach(block => {
  const feedback = block.parentElement.querySelector('.inline-feedback');
  block.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const correct = button.textContent.trim() === block.dataset.answer;
      if (feedback) {
        feedback.textContent = correct ? (block.dataset.feedback || 'Correct.') : `Not quite. Best answer: ${block.dataset.answer}.`;
        feedback.className = `inline-feedback ${correct ? 'correct-text' : 'incorrect-text'}`;
      }
    });
  });
});

document.querySelectorAll('.check-sequence').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card, .self-task');
    const list = card.querySelector('[data-sequence]');
    const expected = list.dataset.sequence.split(',');
    const selected = [...list.querySelectorAll('select')].map(select => select.value);
    const feedback = card.querySelector('.inline-feedback');
    const complete = selected.every(Boolean);
    const correct = complete && selected.join(',') === expected.join(',');
    if (feedback) {
      feedback.textContent = correct ? 'Correct order. You understand the process.' : complete ? 'Not quite. Review the figure and try again.' : 'Complete every step first.';
      feedback.className = `inline-feedback ${correct ? 'correct-text' : 'incorrect-text'}`;
    }
  });
});

document.querySelectorAll('.mini-question').forEach(question => {
  question.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const isCorrect = button.textContent.trim() === question.dataset.answer;
      question.classList.remove('correct', 'incorrect');
      question.classList.add(isCorrect ? 'correct' : 'incorrect');
      const existing = question.querySelector('.feedback');
      if (existing) existing.remove();
      const feedback = document.createElement('p');
      feedback.className = 'feedback';
      feedback.textContent = isCorrect ? 'Correct.' : `Not quite. Best answer: ${question.dataset.answer}.`;
      question.appendChild(feedback);
    });
  });
});

document.querySelectorAll('.check-controls').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.self-task');
    const rows = [...card.querySelectorAll('.match-row')];
    let correct = 0;
    rows.forEach(row => {
      const select = row.querySelector('select');
      const ok = select.value === row.dataset.answer;
      row.classList.toggle('correct', ok);
      row.classList.toggle('incorrect', !ok && select.value !== '');
      if (ok) correct += 1;
    });
    const feedback = card.querySelector('.inline-feedback');
    feedback.textContent = `You selected ${correct}/${rows.length} controls correctly.`;
    feedback.className = `inline-feedback ${correct === rows.length ? 'correct-text' : 'incorrect-text'}`;
  });
});

const flashcards = window.CMP5358_FLASHCARDS || [
  { q: 'What does DNS do?', a: 'DNS converts domain names into IP addresses.' },
  { q: 'What does an A record store?', a: 'It maps a domain name to an IPv4 address.' },
  { q: 'What does TCP provide?', a: 'TCP provides connection-based, reliable data delivery.' },
  { q: 'What does UDP provide?', a: 'UDP sends data quickly without delivery guarantees.' },
  { q: 'What is port 443 commonly used for?', a: 'HTTPS.' },
  { q: 'What does curl -I show?', a: 'It shows HTTP response headers.' },
  { q: 'What does the browser padlock help inspect?', a: 'It helps inspect connection security and certificate information.' },
  { q: 'What does netstat show?', a: 'It shows local listening services and related network details.' },
  { q: 'What does Get-FileHash or shasum -a 256 produce?', a: 'It produces a SHA-256 hash that can help check file integrity.' },
  { q: 'Is Base64 encryption?', a: 'No. Base64 is encoding, not encryption.' },
  { q: 'What is confidentiality?', a: 'Keeping data private from unauthorised access.' },
  { q: 'What is integrity?', a: 'Keeping data accurate and unchanged by unauthorised users.' },
  { q: 'What is availability?', a: 'Keeping systems and services accessible when needed.' },
  { q: 'What does ping test?', a: 'Basic connectivity and response time.' },
  { q: 'What does traceroute show?', a: 'The path or hops between your device and a destination.' },
  { q: 'Why is HTTPS safer than HTTP?', a: 'HTTPS encrypts traffic between browser and server and supports certificate checks.' },
  { q: 'What is Zenmap?', a: 'Zenmap is a graphical front end for Nmap that helps users view scan settings and results.' },
  { q: 'What target should you use in the Zenmap lab?', a: 'Use 127.0.0.1 unless your tutor gives you an explicitly authorised lab VM target.' },
  { q: 'Why should you check the Zenmap command field before scanning?', a: 'It confirms the selected target and scan profile before any test runs.' },
  { q: 'What is MFA?', a: 'Multi-factor authentication adds another login check.' },
  { q: 'Why should unnecessary services be disabled?', a: 'They increase attack surface and may expose avoidable risk.' }
];

const flashcardGrid = document.getElementById('flashcard-grid');
function renderFlashcards(cards = flashcards) {
  if (!flashcardGrid) return;
  flashcardGrid.innerHTML = '';
  cards.forEach((card, index) => {
    const article = document.createElement('article');
    article.className = 'flashcard flip-card';
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'button');
    article.setAttribute('aria-pressed', 'false');
    article.setAttribute('aria-label', `Flip card ${index + 1}`);
    article.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-face flashcard-front">
          <p class="question"><strong>Card ${index + 1}</strong></p>
          <p>${card.q}</p>
          <span class="flip-hint">Click to flip</span>
        </div>
        <div class="flashcard-face flashcard-back">
          <p class="answer">${card.a}</p>
          <span class="flip-hint">Click to return</span>
        </div>
      </div>`;
    const toggleCard = () => {
      const flipped = article.classList.toggle('flipped');
      article.setAttribute('aria-pressed', String(flipped));
    };
    article.addEventListener('click', toggleCard);
    article.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard();
      }
    });
    flashcardGrid.appendChild(article);
  });
}

function shuffleCards() {
  const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
  renderFlashcards(shuffled);
}

const shuffleButton = document.getElementById('shuffle-cards');
const resetButton = document.getElementById('reset-cards');
if (shuffleButton) shuffleButton.addEventListener('click', shuffleCards);
if (resetButton) resetButton.addEventListener('click', () => renderFlashcards());
renderFlashcards();

const quizQuestions = window.CMP5358_QUIZ_QUESTIONS || [
  { q: 'Which item identifies a device or interface on a network?', options: ['Port', 'IP address', 'Hash value', 'Certificate'], answer: 'IP address', feedback: 'An IP address identifies a device or interface on a network.' },
  { q: 'Which port is commonly used by HTTPS?', options: ['22', '53', '80', '443'], answer: '443', feedback: 'HTTPS commonly uses TCP port 443.' },
  { q: 'Which protocol focuses on reliable delivery?', options: ['TCP', 'UDP', 'Base64', 'SHA-256'], answer: 'TCP', feedback: 'TCP checks delivery and manages connection state.' },
  { q: 'Which command can show HTTP response headers?', options: ['curl -I https://www.wikipedia.org', 'Get-FileHash or shasum -a 256 message.txt', 'route print or netstat -rn', 'Get-FileHash .\message.txt'], answer: 'curl -I https://www.wikipedia.org', feedback: 'curl -I requests headers without downloading the full page body.' },
  { q: 'Which browser feature helps inspect TLS certificate information?', options: ['Padlock or site settings icon', 'Bookmarks bar', 'Download history', 'Print preview'], answer: 'Padlock or site settings icon', feedback: 'The padlock or site settings icon can show connection and certificate details.' },
  { q: 'A changed mark in a student database mainly affects which security goal?', options: ['Availability', 'Integrity', 'Confidentiality', 'Usability'], answer: 'Integrity', feedback: 'Integrity focuses on accuracy and protection from unauthorised changes.' },
  { q: 'Which command can help show local listening services on your own machine?', options: ['netstat', 'ICANN Lookup in a browser', 'nslookup wikipedia.org', "btoa('Cyber')"], answer: 'netstat', feedback: 'netstat can show local listening services on your own computer.' },
  { q: 'What does a file hash help you check?', options: ['Whether a file changed', 'Whether a router is fast', 'Whether a domain exists', 'Whether a password is strong'], answer: 'Whether a file changed', feedback: 'A changed file should produce a different hash value.' },
  { q: 'Base64 is best described as what?', options: ['Encryption', 'Encoding', 'Firewalling', 'Authentication'], answer: 'Encoding', feedback: 'Base64 changes representation. It does not provide secrecy.' },
  { q: 'What should you do before testing any system that is not yours?', options: ['Get permission', 'Hide your identity', 'Increase speed', 'Disable logging'], answer: 'Get permission', feedback: 'Permission is essential. Only work on approved systems.' },
  { q: 'Which task is safest for this beginner lab?', options: ['Inspect your own IP address', 'Probe a public university server', 'Try random passwords', 'Overload a website'], answer: 'Inspect your own IP address', feedback: 'Local inspection of your own machine is appropriate for a beginner lab.' },
  { q: 'Which target is safest for the Zenmap lab unless your tutor gives another authorised target?', options: ['A public website', 'A classmate\'s laptop', '127.0.0.1', 'Any university server'], answer: '127.0.0.1', feedback: '127.0.0.1 means your own local machine, so it keeps the lab within an authorised target.' },
  { q: 'Why should students include search evidence?', options: ['To copy answers quickly', 'To support explanations with reliable sources', 'To avoid practical work', 'To skip the quiz'], answer: 'To support explanations with reliable sources', feedback: 'Search tasks help connect commands and concepts to recognised guidance.' }
];

const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

function renderQuiz() {
  if (!quizForm) return;
  quizForm.innerHTML = '';
  quizQuestions.forEach((item, index) => {
    const block = document.createElement('fieldset');
    block.className = 'quiz-question';
    block.innerHTML = `<h3>${index + 1}. ${item.q}</h3>`;
    item.options.forEach(option => {
      const id = `q${index}-${option.replace(/\W+/g, '-')}`;
      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.innerHTML = `<input type="radio" id="${id}" name="q${index}" value="${option}"> ${option}`;
      block.appendChild(label);
    });
    const feedback = document.createElement('small');
    feedback.className = 'quiz-feedback';
    block.appendChild(feedback);
    quizForm.appendChild(block);
  });
  if (quizResult) quizResult.textContent = '';
}

function submitQuiz() {
  let score = 0;
  const questionBlocks = document.querySelectorAll('.quiz-question');
  quizQuestions.forEach((item, index) => {
    const selected = quizForm.querySelector(`input[name="q${index}"]:checked`);
    const block = questionBlocks[index];
    block.classList.remove('correct', 'incorrect');
    const feedback = block.querySelector('.quiz-feedback');
    if (selected && selected.value === item.answer) {
      score += 1;
      block.classList.add('correct');
      feedback.textContent = `Correct. ${item.feedback}`;
    } else {
      block.classList.add('incorrect');
      feedback.textContent = `Best answer: ${item.answer}. ${item.feedback}`;
    }
  });
  const percent = Math.round((score / quizQuestions.length) * 100);
  const passMessage = window.CMP5358_QUIZ_PASS_MESSAGE || 'Good work. Now complete the case study, challenge lab, and certificate.';
  const failMessage = window.CMP5358_QUIZ_FAIL_MESSAGE || 'Review the flashcards and try again.';
  quizResult.innerHTML = `<strong>Score: ${score}/${quizQuestions.length} (${percent}%).</strong> ${percent >= 70 ? passMessage : failMessage}`;
}

const submitQuizButton = document.getElementById('submit-quiz');
const resetQuizButton = document.getElementById('reset-quiz');
if (submitQuizButton) submitQuizButton.addEventListener('click', submitQuiz);
if (resetQuizButton) resetQuizButton.addEventListener('click', renderQuiz);
renderQuiz();


// Certificate generator with verifiable SHA-256 hash
function getTaskProgressPercent() {
  const boxes = document.querySelectorAll('.task-check');
  const total = boxes.length;
  const done = [...boxes].filter(box => box.checked).length;
  return total ? Math.round((done / total) * 100) : 0;
}

function rightRotate(value, amount) {
  return (value >>> amount) | (value << (32 - amount));
}

function sha256Fallback(message) {
  const bytes = new TextEncoder().encode(message);
  const bitLength = bytes.length * 8;
  const paddedLength = Math.ceil((bytes.length + 9) / 64) * 64;
  const data = new Uint8Array(paddedLength);
  data.set(bytes);
  data[bytes.length] = 0x80;
  const view = new DataView(data.buffer);
  const high = Math.floor(bitLength / 0x100000000);
  const low = bitLength >>> 0;
  view.setUint32(paddedLength - 8, high, false);
  view.setUint32(paddedLength - 4, low, false);

  const k = new Uint32Array([
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ]);
  const h = new Uint32Array([0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]);
  const w = new Uint32Array(64);

  for (let offset = 0; offset < data.length; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4, false);
    for (let i = 16; i < 64; i++) {
      const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let [a,b,c,d,e,f,g,hh] = h;
    for (let i = 0; i < 64; i++) {
      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (hh + s1 + ch + k[i] + w[i]) >>> 0;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (s0 + maj) >>> 0;
      hh = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    h[0]=(h[0]+a)>>>0; h[1]=(h[1]+b)>>>0; h[2]=(h[2]+c)>>>0; h[3]=(h[3]+d)>>>0;
    h[4]=(h[4]+e)>>>0; h[5]=(h[5]+f)>>>0; h[6]=(h[6]+g)>>>0; h[7]=(h[7]+hh)>>>0;
  }
  return [...h].map(value => value.toString(16).padStart(8, '0')).join('');
}

async function sha256Hex(message) {
  if (window.crypto && window.crypto.subtle && window.TextEncoder) {
    const data = new TextEncoder().encode(message);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return sha256Fallback(message);
}

async function generateCertificate() {
  const name = document.getElementById('cert-name')?.value.trim() || '';
  const studentId = document.getElementById('cert-id')?.value.trim() || '';
  const feedback = document.getElementById('certificate-feedback');
  if (!name || !studentId) {
    if (feedback) {
      feedback.textContent = 'Enter your name and student ID first.';
      feedback.className = 'inline-feedback incorrect-text';
    }
    return;
  }
  const completion = `${getTaskProgressPercent()}%`;
  const time = new Date().toISOString();
  const moduleCode = document.body.dataset.moduleCode || 'CMP5358';
  const weekNumber = document.body.dataset.weekNumber || '1';
  const canonicalRecord = `module=${moduleCode}|week=${weekNumber}|name=${name}|studentId=${studentId}|time=${time}|completion=${completion}`;
  const hash = await sha256Hex(canonicalRecord);

  document.getElementById('cert-display-name').textContent = name;
  document.getElementById('cert-display-id').textContent = studentId;
  document.getElementById('cert-display-time').textContent = new Date(time).toLocaleString('en-GB');
  document.getElementById('cert-display-progress').textContent = completion;
  document.getElementById('cert-hash').textContent = hash;
  document.getElementById('cert-record').textContent = canonicalRecord;
  document.getElementById('certificate-output').classList.add('certificate-generated');

  localStorage.setItem(storageKey('certificate-record'), canonicalRecord);
  localStorage.setItem(storageKey('certificate-hash'), hash);
  if (feedback) {
    feedback.textContent = 'Certificate generated. Use Print certificate to print only the certificate.';
    feedback.className = 'inline-feedback correct-text';
  }
  showToast('Certificate generated');
}

const generateCertificateButton = document.getElementById('generate-certificate');
const printCertificateButton = document.getElementById('print-certificate');
if (generateCertificateButton) generateCertificateButton.addEventListener('click', generateCertificate);
if (printCertificateButton) printCertificateButton.addEventListener('click', () => {
  const output = document.getElementById('certificate-output');
  const feedback = document.getElementById('certificate-feedback');
  if (!output?.classList.contains('certificate-generated')) {
    if (feedback) {
      feedback.textContent = 'Generate the certificate before printing.';
      feedback.className = 'inline-feedback incorrect-text';
    }
    return;
  }
  window.print();
});
