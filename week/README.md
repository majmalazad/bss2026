# CMP 5358 Lab Tutorials Website

This is a self-contained browser website for CMP 5358 lab tutorials.

## Main structure

- `index.html` – landing page with 12 weekly lab cards.
- `week1.html` – Week 1 interactive cyber security and networking foundations lab.
- `week3.html` – Week 3 MySQL, MariaDB and database security foundations lab merged from the supplied database tutorial content.
- `styles.css` – shared CMP 5358 styling, cards, figures, page navigation, progress display, and portrait certificate print layout.
- `app.js` – shared interaction logic for page navigation, progress tracking, notes, copy buttons, flashcards, quizzes, and certificate hash generation.
- `week3_sql/` – SQL files used by Week 3.
- `week3_webapp_sample/` – PHP web application examples used by Week 3.

## Updates included

- Week 1 now tells students on the first page to tick **Done** or **Mark complete** after finishing each task.
- Week 1 now includes a **Next** button at the end of each learning page where appropriate.
- Week 3 is linked from the main page and uses the same visual style as Week 1.
- Week 3 includes MariaDB/MySQL setup, SQL basics, table creation, insert/select tasks, filtering, joins, PHP web interaction, hashing, database attacks, security issues, a challenge lab, a quiz/worksheet, and a certificate page.
- The certificate page uses the current design and prints in A4 portrait style.
- Certificate printing outputs only the certificate, not the surrounding tutorial page.

## How to use

1. Unzip the folder.
2. Open `index.html` in a browser.
3. Click Week 1 or Week 3.
4. Students complete each activity, write explanations, and tick **Done** or **Mark complete**.
5. Students generate and print the certificate at the end of the week.

## Safety note

All practical database and web security tasks must stay inside an authorised local teaching environment such as the student’s own Kali VM or an explicitly approved lab machine. Students must not test public websites, university systems, cloud services, or other people’s machines.

- Week 3 uses one end-of-page understanding-check search task per page.
## Latest Week 3 update

- Week 3 no longer asks students to repeat a generic explanation prompt for every query or code block.
- Week 3 now presents query and code explanations directly inside each activity rather than inside a separate Query/Code box.
- Each activity asks one specific student question and includes a revealable sample answer.
- Week 3 still keeps only one search task at the end of each page.

## Latest Week 3 update

- Week 3 now uses the newly supplied MySQL/MariaDB beginner lab content.
- Added a brief web-interaction explanation below the first-page block diagram.
- Added a Week 3 certificate page using the current CMP 5358 certificate design.
- Certificate printing remains A4 portrait and prints the certificate only.
- Added one page-completion checkbox per Week 3 page so the certificate can show completion progress.


## Week 2 addition

- `week2.html` – Week 2 lab on environment setup, Kali Linux command-line practice, Wireshark capture, filters, I/O graphs, challenge lab, and certificate.
- Week 2 uses only the Week 2 content from the uploaded weekly tutorial package, organised in the same CMP5358 style as Week 1 and Week 3.
- Week 2 includes an A4 portrait certificate print view using the existing certificate design.


## Navigation guide

- `navigate.html` – separate page for the lab environment and access guidance. Week 2 now links students back to this guide instead of keeping the environment section inside Week 2.

## Latest layout update

- The home page now centres the **Navigating through the Labs** guide heading.
- The Navigate page no longer displays a Week 2 shortcut.
- The Netlab sign-in instruction now places the URL and sign-in sentence on separate lines for readability.

- Home page Navigate guide button centred, enlarged, and styled to match the weekly card design while using a distinct text colour.
## Latest update

- Added Week 2 flashcards and an interactive Week 2 quiz.
- Added Week 3 flashcards and an interactive Week 3 quiz.
- Week 2 and Week 3 now use the same flashcard and quiz interaction style as the wider site.
- Flashcards include shuffle and reset controls.
- Quiz pages give feedback and a score after submission.


## Week 4 updates

- `week4_part1.html` contains Week 4 Part A: SQL Injection with DVWA, adapted from the attached DVWA tutorial package.
- Week 4 Part A uses the same CMP 5358 page, tab, progress, flashcard, quiz, challenge, and certificate design as Weeks 1–3.
- DVWA screenshots are stored in `assets/dvwa/images/` and are embedded where they appear in the tutorial content without visual filtering.
- `week4_part2.html` is a placeholder page linked from the main page for Week 4 Part B.

## Latest Week 4 Part A changes

- Updated the opening wording to describe the page as a browser-based learning resource without referring to a lab document.
- Added a SQL injection block diagram to the SQLi concept page.
- Updated DVWA credentials to Username: admin and Password: password.
- Updated Task 2 so students try IDs 2, 3, 4, and 5 and observe the output.
- Removed the screenshot gallery tab and route.


## Week 4 Part B: SQL Injection and Login Bypass

- Added the uploaded VulnShop SQL injection and login bypass lab.
- Organised the material into the same tabbed style used by Weeks 1, 2, and 3.
- Embedded the screenshots from the uploaded document in their relevant sections without filtering.
- Included guided Burp Suite, login bypass, product disclosure, cart challenge, flashcards, quiz, and certificate pages.

- Copy buttons now sit above relevant code blocks and align to the right to keep code formatting stable.

- Week 4 Part B Products SQLi updated from Tutorialsql product.docx with embedded screenshots.

## Week 5 update

- Added `week5.html` with the title Mobile Security.
- Embedded the MobSF and Exodus Privacy tutorial content using the same CMP5358 site style as Weeks 1, 2, and 3.
- Copied MobSF and Exodus screenshots into `assets/mobsf/` and embedded them in the relevant Week 5 pages.
- Updated the main page Week 5 card to open the Mobile Security lab.

## Latest Week 5 update

- Removed the Lab machine context figure from Week 5 while keeping the lab context description.
- Removed the Exodus Internet-access figure while keeping the Exodus guidance text.
- Added MobSF result interpretation notes linking findings to security impact and impact on people.
- Added Exodus privacy and security impact notes with examples for users.

- Week 5 Report Analysis tab added for MobSF PDF export and LLM-assisted permission/tracker analysis.
- Week 5 Navigation tab describes how students use the MobSF side menu to move from summary findings to evidence.
- Added MobSF scan overview screenshot after the security score and findings severity section.


## Week 5 PDF analysis asset

- `assets/mobsf/mobsf_spl.pdf` – sample MobSF PDF report used in the Week 5 Report Analysis and LLM analysis activity.

- Week 7 Part A: User File Upload and Local File Inclusion lab embedded from the supplied package.
- Week 7 Part B: placeholder card added on the home page.

- Week 7 Part A review material is split into Review, Flashcards, Quiz, and Certificate pages.

- Week 7 Part A numbering layout fixed: setup and LFI step numbers no longer overlap text or duplicate.


Latest update: Week 7 Part A renamed the upload section to File Upload Vulnerability, removed the Part B label, and removed the Useful screenshots and Report headings boxes.

- `week7_part2.html` — Week 7 Part B: Testing XSS and CSRF in VulnShop.

- Week 12: Client-side vulnerabilities (Clickjacking)

- `essential_skills.html` – professional cyber security skills and development planning.


## Essential Skills page

The Essential Skills page summarises the 12-week learning journey, connects each weekly topic to real-world cyber security practice, and maps twelve professional skills to cyber security specialisms and related job roles.


## Additional Lab 1
Open `additional_lab1.html` for the Mastering Burp Suite practical, including Proxy, Target, Repeater, Intruder, Inspector, supporting tools, challenge activities, flashcards, quiz and certificate.


## Additional Lab 7

- `additional_lab7.html` — API Security Vulnerabilities practical.
- Covers API concepts, JSON traffic, exposed OpenAPI documentation, BOLA, BFLA, OPTIONS method discovery, error-guided PATCH construction, secure design, challenge activities, flashcards, quiz and certificate.
