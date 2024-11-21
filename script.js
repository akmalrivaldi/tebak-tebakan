// Data pertanyaan (gambar dan teks)
const quizData = [
  {
    question: "Hewan apa inii",
    options: ["singa", "sapi", "burung hantu", "dinosaurus"],
    answer: "singa",
    image:
      "https://github.com/akmalrivaldi/tebak-tebakan/raw/main/img/gambar_gabener1.jpg", // Gambar potongan
    fullImage:
      "https://github.com/akmalrivaldi/tebak-tebakan/blob/main/img/gambar_bener1.jpg", // Gambar utuh
  },
  {
    question: "Hewan apa inii",
    options: ["srigala", "anjing", "burung", "hiu"],
    answer: "srigala",
    image: "/img/gambar_gabener2.jpg", // Gambar potongan
    fullImage: "/img/gambar_bener2.jpg", // Gambar utuh
  },
  {
    question: "Hewan apa inii",
    options: ["penguin", "kambing", "srigala", "uler"],
    answer: "srigala",
    image: "/img/gambar_gabener3.jpg", // Gambar potongan
    fullImage: "/img/gambar_bener3.jpg", // Gambar utuh
  },
  {
    question: "Hewan apa inii",
    options: ["kucing", "anjing", "ayam", "jerapah"],
    answer: "ayam",
    image: "/img/gambar_gabener4.jpg", // Gambar potongan
    fullImage: "/img/gambar_bener4.jpg", // Gambar utuh
  },
];

let currentQuestion = 0;
let score = 0;

const quizSection = document.getElementById("quiz-section");
const quizQuestion = document.getElementById("quiz-question");
const quizImage = document.getElementById("quiz-image");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");

document.addEventListener("DOMContentLoaded", () => {
  // Tampilkan pesan selamat datang
  Swal.fire({
    title: "Halo Bilaa!",
    text: "Selamat bermain! Jawab yang bener yaaa!",
    icon: "info",
    confirmButtonText: "Mulai Kuis",
    allowOutsideClick: false,
  }).then(() => {
    // Tampilkan kuis
    quizSection.classList.remove("hidden");
    loadQuestion();
  });
});

function loadQuestion() {
  const current = quizData[currentQuestion];
  quizQuestion.textContent = current.question;

  if (current.image) {
    quizImage.src = current.image; // Gambar potongan
    quizImage.classList.remove("hidden");
  } else {
    quizImage.classList.add("hidden");
  }

  optionsContainer.innerHTML = "";
  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "btn btn-outline-primary m-2";
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });

  nextBtn.classList.add("hidden");
}

function checkAnswer(selected) {
  const current = quizData[currentQuestion];
  if (selected === current.answer) {
    score++;
    // Jika jawaban benar
    Swal.fire({
      title: "Betull!",
      text: "pinterr bangett, kok bisa tau sii",
      imageUrl: current.fullImage, // Gambar utuh
      imageWidth: 400,
      imageAlt: "Gambar utuh",
      icon: "success",
      timer: 2000, // Pop-up otomatis tertutup setelah 2 detik
      showConfirmButton: false,
    }).then(() => {
      loadNextQuestion(); // Pindah ke pertanyaan berikutnya
    });
  } else {
    // Jika jawaban salah
    Swal.fire({
      title: "TETOTT",
      text: `Jawaban yg bener adalaah ${current.answer}.`,
      imageUrl: current.fullImage, // Gambar utuh
      imageWidth: 400,
      imageAlt: "Gambar utuh",
      icon: "error",
    }).then(() => {
      nextBtn.classList.remove("hidden"); // Tampilkan tombol untuk lanjut
    });
  }
}

function loadNextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizSection.classList.add("hidden");
  Swal.fire({
    title: "Kuis Selesai!",
    text: `Skor akhir bilaa: ${score}/${quizData.length}`,
    icon: "success",
    confirmButtonText: "Coba Lagi",
  }).then(() => restartQuiz());
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizSection.classList.remove("hidden");
  loadQuestion();
}
