document.addEventListener("DOMContentLoaded", function () {
  const gif = document.getElementById("gifMelayang");
  let isDragging = false;
  let offsetX, offsetY;

  gif.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - gif.getBoundingClientRect().left;
    offsetY = e.clientY - gif.getBoundingClientRect().top;

    gif.classList.add("dragged");
    gif.style.left = gif.offsetLeft + "px";
    gif.style.top = gif.offsetTop + "px";
    gif.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      gif.style.left = (e.clientX - offsetX) + "px";
      gif.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      gif.classList.remove("dragged");
      gif.style.animation = "melayang 8ss ease-in-out infinite"; // aktifkan ulang
      gif.style.cursor = "pointer";
    }
  });

  gif.addEventListener("click", function () {
    Swal.fire({
      title: 'Eh ada apa nih 😳',
      text: 'Kamu mau aku tetep terbang atau ngilang nih?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Tetep Aja 😎',
      cancelButtonText: 'Ngilang Aja 😪',
      reverseButtons: true
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        gif.classList.add("hidden");
        setTimeout(() => gif.style.display = "none", 500);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements (from index.html and shared) ---
    const loginSection = document.getElementById('loginSection');
    const celebrationSection = document.getElementById('celebrationSection');
    const navbar = document.querySelector('.navbar');
    const logoutNavBtn = document.getElementById('logoutNavBtn');

    // Define correct credentials
    const CORRECT_USERNAME = 'banana123';
    const CORRECT_PASSWORD = 'kucing123';
    const DEFAULT_FRIEND_NAME = 'Chiro'; // Default name

    // Get login status from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // --- Function to show celebration content ---
    const showCelebrationContent = () => {
        if (loginSection) loginSection.style.display = 'none';
        if (celebrationSection) celebrationSection.style.display = 'block';
        if (navbar) navbar.style.display = 'flex';
        if (logoutNavBtn) {
            logoutNavBtn.style.display = 'inline-block';
            logoutNavBtn.textContent = 'Logout'; // Memastikan teksnya 'Logout'
            // Tambahkan event listener untuk tombol logout di navbar
            logoutNavBtn.addEventListener('click', () => {
                showLogoutConfirmation();
            });
        }

        const fullText = `Selamat, ${DEFAULT_FRIEND_NAME}! IPK-mu Naik Drastis! 🎉`;

        const celebrationTextElement = document.getElementById('celebrationText');
        if (celebrationTextElement) {
            let i = 0;
            celebrationTextElement.style.width = '0';
            celebrationTextElement.textContent = '';
            const typingSpeed = 70;

            function typeWriter() {
                if (i < fullText.length) {
                    celebrationTextElement.innerHTML += fullText.charAt(i);
                    i++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    celebrationTextElement.style.borderRight = 'none';
                }
            }
            typeWriter();
        }

        // --- Logic for the new Logout Button (in celebrationSection) ---
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                showLogoutConfirmation();
            });
        }
    };

    // --- Function to show login form ---
    const showLoginForm = () => {
        if (loginSection) loginSection.style.display = 'block';
        if (celebrationSection) celebrationSection.style.display = 'none';
        if (navbar) navbar.style.display = 'none';
    };

    // --- Logout Confirmation Function using SweetAlert2 ---
    const showLogoutConfirmation = () => {
        Swal.fire({
            title: "Yakin ingin Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('isLoggedIn', 'false'); // Set status login menjadi false
                // Arahkan kembali ke halaman index.html
                window.location.href = 'index.html'; 
            }
        });
    };

    // --- Initial page load logic for index.html ---
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        if (isLoggedIn === 'true') {
            showCelebrationContent();
        } else {
            showLoginForm();
            if (logoutNavBtn) logoutNavBtn.style.display = 'none';
        }
    }

    // --- Login Button Event Listener (for index.html) ---
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const enteredUsername = usernameInput.value.trim();
            const enteredPassword = passwordInput.value.trim();

            if (enteredUsername === CORRECT_USERNAME && enteredPassword === CORRECT_PASSWORD) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.reload();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal!',
                    text: 'Penyusup dilarang masuk. Pesan ini khusus wle!',
                    confirmButtonText: 'Oke'
                });
                localStorage.setItem('isLoggedIn', 'false');
                showLoginForm();
                if (logoutNavBtn) logoutNavBtn.style.display = 'none';
            }
        });
    }

    // --- Logic for other pages (kalkulator.html, matkul.html) ---
    // Pastikan navbar dan tombol logout di navbar berfungsi di halaman lain
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        if (navbar) {
            navbar.style.display = 'flex'; // Pastikan navbar terlihat di halaman ini
            if (logoutNavBtn) {
                if (isLoggedIn === 'true') {
                    logoutNavBtn.style.display = 'inline-block';
                    logoutNavBtn.textContent = 'Logout';
                    logoutNavBtn.addEventListener('click', () => {
                        showLogoutConfirmation();
                    });
                } else {
                    logoutNavBtn.style.display = 'none';
                }
            }
        }
    }

    // --- Kalkulator IP & IPK Logic ---
    const semestersContainer = document.getElementById('semestersContainer');
    const addSemesterBtn = document.getElementById('addSemesterBtn');
    const calculateAllBtn = document.getElementById('calculateAllBtn');
    const semesterIPResultsDiv = document.getElementById('semesterIPResults');
    const ipkResultSpan = document.getElementById('ipkResult');

    // Data mata kuliah per semester
    const coursesPerSemester = {
        1: [
            { name: "Kalkulus I", sks: 3 },
            { name: "Dasar Pemrograman", sks: 3 },
            { name: "Logika Informatika", sks: 3 },
            { name: "Literasi Teknologi Informasi", sks: 2 },
            { name: "Pancasila", sks: 2 },
            { name: "Bahasa Indonesia", sks: 2 },
            { name: "Kewirausahaan", sks: 2 },
            { name: "Bahasa Inggris", sks: 2 }
        ],
        2: [
            { name: "Kalkulus II", sks: 3 },
            { name: "Algoritma dan Struktur Data", sks: 3 },
            { name: "Matematika Diskrit", sks: 3 },
            { name: "Basis Data", sks: 3 },
            { name: "Pendidikan Kewarganegaraan", sks: 2 },
            { name: "Agama", sks: 2 },
            { name: "Pendidikan Anti Korupsi", sks: 2 },
            { name: "Perilaku Organisasi", sks: 2 }
        ],
        3: [
            { name: "Aljabar Linier dan Matriks", sks: 3 },
            { name: "Pemrograman Sistem", sks: 3 },
            { name: "Pemrograman Berorientasi Objek", sks: 3 },
            { name: "Rekayasa Perangkat Lunak", sks: 3 },
            { name: "Sistem Digital", sks: 3 },
            { name: "Arsitektur dan Organisasi Komputer", sks: 3 },
            { name: "Statistika dan Probabilitas", sks: 3 }
        ],
        4: [
            { name: "Analisa Numerik", sks: 3 },
            { name: "Jaringan Komputer", sks: 3 },
            { name: "Pemodelan dan Simulasi", sks: 3 },
            { name: "Pemrograman Web", sks: 3 },
            { name: "Keamanan Informasi", sks: 3 },
            { name: "Sistem Informasi", sks: 3 },
            { name: "Sistem Operasi", sks: 3 }
        ],
        5: [
            { name: "Data Science", sks: 3 },
            { name: "Pengembangan Aplikasi Berbasis Platform", sks: 3 },
            { name: "Kecerdasan Buatan", sks: 3 },
            { name: "Teori Bahasa dan Otomata", sks: 3 },
            { name: "Komputasi Awan", sks: 3 },
            { name: "Pemrosesan Data Terdistribusi", sks: 3 },
            { name: "Teori Informasi", sks: 3 },
            { name: "Interaksi Manusia - Komputer", sks: 3 }
        ],
        // Semester 6 dan 7 sekarang akan memiliki placeholder untuk pilihan KK
        // Matkul "Pilihan" akan dihapus dari sini dan diisi secara dinamis
        // Berubah: Matkul "Pilihan" dari sini akan diisi otomatis setelah KK dipilih.
        // Kita tetap mempertahankan "Pilihan 1", "Pilihan 2", "Pilihan 3" sebagai
        // penanda slot, tapi namanya akan berubah secara dinamis.
        6: [
            { name: "Grafika Komputer", sks: 3 },
            { name: "Pembelajaran Mesin", sks: 3 },
            { name: "Etika Profesi", sks: 2 },
            { name: "Metodologi Penelitian", sks: 3 },
            { name: "Sosioteknologi Informasi", sks: 2 },
            // Placeholder for 3 choice courses, SKS will be pulled from choiceCourses
            { name: "Pilihan Matkul", sks: 3, isPilihan: true },
            { name: "Pilihan Matkul", sks: 3, isPilihan: true },
            { name: "Pilihan Matkul", sks: 3, isPilihan: true }
        ],
        7: [
            { name: "Kuliah Kerja Nyata", sks: 3 },
            { name: "Kerja Praktek", sks: 3 },
            { name: "Pengujian dan Implementasi Sistem", sks: 3 },
            { name: "Penulisan Ilmiah", sks: 3 },
            { name: "Manajemen Proyek Perangkat Lunak", sks: 3 },
            // Placeholder for 3 choice courses, SKS will be pulled from choiceCourses
            { name: "Pilihan Matkul", sks: 3, isPilihan: true },
            { name: "Pilihan Matkul", sks: 3, isPilihan: true },
            { name: "Pilihan Matkul", sks: 3, isPilihan: true }
        ],
        8: [
            { name: "Tugas Akhir / Skripsi", sks: 6 }
        ]
    };

    // New structure for choiceCourses to differentiate by semester
    const choiceCourses = {
        6: { // Semester 6 choices
            "Teknologi Multimedia dan Game (TMG)": [
                { name: "Sistem Multimedia", sks: 3 },
                { name: "Animasi Komputer", sks: 3 },
                { name: "Database Multimedia", sks: 3 }
            ],
            "Informatika dan Sistem Inteligen (ISI)": [
                { name: "Pemrosesan Bahasa Alami", sks: 3 },
                { name: "Rekayasa Data", sks: 3 },
                { name: "Representasi Pengetahuan dan Penalaran", sks: 3 }
            ],
            "Jaringan Komputer, Keamanan dan Forensik Digital (JKF)": [
                { name: "Digital Forensics", sks: 3 },
                { name: "Ethical Hacking", sks: 3 },
                { name: "Software Defined Network (SDN)", sks: 3 }
            ]
        },
        7: { // Semester 7 choices
            "Teknologi Multimedia dan Game (TMG)": [
                { name: "Rekayasa Sistem Multimedia", sks: 3 },
                { name: "Rekayasa GIM", sks: 3 },
                { name: "Pengolahan Citra", sks: 3 }
            ],
            "Informatika dan Sistem Inteligen (ISI)": [
                { name: "Deep Learning", sks: 3 },
                { name: "Evolusi Perangkat Lunak", sks: 3 },
                { name: "Visi Komputer dan Robotika", sks: 3 }
            ],
            "Jaringan Komputer, Keamanan dan Forensik Digital (JKF)": [
                { name: "Internet of Things (IoT)", sks: 3 },
                { name: "Keamanan dan Penjaminan Informasi", sks: 3 },
                { name: "Malware Analysis", sks: 3 }
            ]
        }
    };

    // Angka mutu untuk setiap nilai
    const gradePoints = {
        'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.5, 'D': 1.0, 'E': 0.0
    };

    let semesterCount = 0; // To keep track of current semester number
    // Using an object to store the chosen KK per semester
    // Format: { semesterNum: 'KK_Name' }
    let lastChosenKKPerSemester = {};

    if (semestersContainer && addSemesterBtn && calculateAllBtn) {
        const addSemester = (semesterNum) => {
            const semesterDiv = document.createElement('div');
            semesterDiv.classList.add('semester-group');
            semesterDiv.setAttribute('data-semester-num', semesterNum);

            // Add dropdown for KK selection only for semesters 6 and 7
            let kkSelectHtml = '';
            if (semesterNum === 6 || semesterNum === 7) {
                // Ensure choices are available for this semester
                const currentSemesterChoiceGroups = choiceCourses[semesterNum] ? Object.keys(choiceCourses[semesterNum]) : [];
                kkSelectHtml = `
                    <div class="semester-header-controls">
                        <select class="choice-group-select" data-semester-num="${semesterNum}">
                            <option value="">Pilih Kelompok Keahlian</option>
                            ${currentSemesterChoiceGroups.map(group => `<option value="${group}">${group}</option>`).join('')}
                        </select>
                    </div>
                `;
            }

            semesterDiv.innerHTML = `
                <h2>Semester ${semesterNum}</h2>
                ${kkSelectHtml}
                <div class="courses-grid" id="coursesGrid-${semesterNum}">
                    </div>
            `;
            semestersContainer.appendChild(semesterDiv);

            const coursesGrid = document.getElementById(`coursesGrid-${semesterNum}`);
            // Define currentSemesterCoreCourses here, outside of renderCourses, so it's always accessible
            const currentSemesterCoreCourses = coursesPerSemester[semesterNum].filter(c => !c.isPilihan);

            // Function to render/re-render courses based on KK selection
            const renderCourses = (selectedKK = '') => {
                coursesGrid.innerHTML = ''; // Clear previous courses
                let coursesToRender = [...currentSemesterCoreCourses]; // Start with core courses

                if (selectedKK && (semesterNum === 6 || semesterNum === 7)) {
                    // Get choice courses for the specific semester and selected KK
                    const chosenKKCourses = choiceCourses[semesterNum] && choiceCourses[semesterNum][selectedKK] ? choiceCourses[semesterNum][selectedKK] : [];
                    coursesToRender = [...currentSemesterCoreCourses, ...chosenKKCourses];
                }

                coursesToRender.forEach(course => {
                    const courseItemDiv = document.createElement('div');
                    courseItemDiv.classList.add('course-item');

                    const courseName = course.name;
                    const sks = course.sks; // SKS from the course object

                    const sksInputHtml = `<input type="number" class="sks-input" value="${sks}" readonly>`;
                    const gradeSelectHtml = `
                        <select class="grade-input">
                            <option value="">Nilai</option>
                            ${Object.keys(gradePoints).map(grade => `<option value="${grade}">${grade}</option>`).join('')}
                        </select>
                    `;

                    courseItemDiv.innerHTML = `
                        <span class="course-name">${courseName}</span>
                        ${sksInputHtml}
                        ${gradeSelectHtml}
                    `;
                    coursesGrid.appendChild(courseItemDiv);
                });
            };

            // Initial render for the semester
            renderCourses();

            // Set up event listener for the choice group select if present
            const choiceGroupSelect = semesterDiv.querySelector('.choice-group-select');
            if (choiceGroupSelect) {
                // Try to pre-select KK if stored for this semester or previous semester
                // Only suggest from previous semester if current semester is 7
                const storedKK = lastChosenKKPerSemester[semesterNum] || (semesterNum === 7 ? lastChosenKKPerSemester[semesterNum - 1] : null);

                // Ensure the storedKK is valid for the current semester's choices
                if (storedKK && choiceCourses[semesterNum] && choiceCourses[semesterNum][storedKK]) {
                    choiceGroupSelect.value = storedKK;
                    // Trigger change to render courses with the pre-selected KK
                    renderCourses(storedKK);
                }


                choiceGroupSelect.addEventListener('change', () => {
                    const selectedKK = choiceGroupSelect.value;
                    lastChosenKKPerSemester[semesterNum] = selectedKK; // Save choice
                    renderCourses(selectedKK); // Re-render courses with new selection
                });
            }
        };

        // Add first semester on load
        semesterCount++;
        addSemester(semesterCount);

        addSemesterBtn.addEventListener('click', () => {
            if (semesterCount < 8) { // Max 8 semesters
                semesterCount++;
                addSemester(semesterCount);
            } else {
                alert('Ehhh kok klik nambah? Cukup 8 sajaa yaa :D.');
            }
        });

        calculateAllBtn.addEventListener('click', () => {
            let totalOverallSKS = 0;
            let totalOverallNilaiBobot = 0;
            let totalSemestersCalculated = 0;
            semesterIPResultsDiv.innerHTML = ''; // Clear previous results

            const allSemesterGroups = document.querySelectorAll('.semester-group');

            allSemesterGroups.forEach(semesterGroup => {
                const semesterNum = parseInt(semesterGroup.getAttribute('data-semester-num'));
                let semesterTotalSKS = 0;
                let semesterTotalNilaiBobot = 0;
                let isSemesterComplete = true;

                // Check if KK is selected for choice semesters
                const choiceGroupSelect = semesterGroup.querySelector('.choice-group-select');
                if ((semesterNum === 6 || semesterNum === 7) && choiceGroupSelect && choiceGroupSelect.value === "") {
                    isSemesterComplete = false; // KK must be selected
                }

                const courseItems = semesterGroup.querySelectorAll('.course-item');
                courseItems.forEach(item => {
                    const sksInput = item.querySelector('.sks-input');
                    const gradeInput = item.querySelector('.grade-input');

                    const sks = parseInt(sksInput.value);
                    const gradeLetter = gradeInput.value;
                    const gradePoint = gradePoints[gradeLetter];

                    // Check for incomplete inputs for *this specific course*
                    if (isNaN(sks) || !gradeLetter || gradeLetter === "") {
                        isSemesterComplete = false; // Mark semester incomplete if any course is incomplete
                    }

                    // Only add to total if all required inputs are valid for this course
                    if (!isNaN(sks) && gradeLetter && gradeLetter !== "") {
                        semesterTotalSKS += sks;
                        semesterTotalNilaiBobot += (sks * gradePoint);
                    }
                });

                if (isSemesterComplete && semesterTotalSKS > 0) {
                    const semesterIP = semesterTotalNilaiBobot / semesterTotalSKS;
                    totalOverallSKS += semesterTotalSKS;
                    totalOverallNilaiBobot += semesterTotalNilaiBobot;
                    totalSemestersCalculated++;

                    const ipResultP = document.createElement('p');
                    ipResultP.innerHTML = `IP Semester ${semesterNum}: <span class="ip-semester-result">${semesterIP.toFixed(2)}</span>`;
                    semesterIPResultsDiv.appendChild(ipResultP);
                } else {
                    const ipResultP = document.createElement('p');
                    ipResultP.innerHTML = `IP Semester ${semesterNum}: <span class="ip-semester-result">Belum Diisi :(</span>`;
                    semesterIPResultsDiv.appendChild(ipResultP);
                }
            });

            if (totalOverallSKS > 0) {
                const ipkKumulatif = totalOverallNilaiBobot / totalOverallSKS;
                ipkResultSpan.textContent = ipkKumulatif.toFixed(2);
            } else {
                ipkResultSpan.textContent = '-';
            }
        });
    }
});