// Data pertanyaan
const quizData = [
  {
    question: "Hewan apa inii",
    options: ["singa", "sapi", "burung hantu", "dinosaurus"],
    answer: "singa",
    image:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732221917/gambar_gabener1_usctih.jpg",
    fullImage:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732222003/gambar_bener1_qvdfsw.jpg",
  },
  {
    question: "Hewan apa inii",
    options: ["srigala", "anjing", "burung", "hiu"],
    answer: "srigala",
    image:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732222085/gambar_gabener2_htysg5.jpg",
    fullImage:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732222099/gambar_bener2_ixruv9.jpg",
  },
  {
    question: "Hewan apa inii",
    options: ["penguin", "kambing", "srigala", "uler"],
    answer: "srigala",
    image:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732222180/gambar_gabener3_smdaf6.jpg",
    fullImage:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732222196/gambar_bener3_kuwzkm.jpg",
  },
  {
    question: "Hewan apa inii",
    options: ["kucing", "anjing", "ayam", "jerapah"],
    answer: "ayam",
    image:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732222269/gambar_gabener4_xfng6k.jpg",
    fullImage:
      "https://res.cloudinary.com/do0yadsn5/image/upload/v1732222281/gambar_bener4_gygk5c.jpg",
  },
];

let currentQuestion = 0;
let score = 0;
let playerName = "";

const quizSection = document.getElementById("quiz-section");
const quizQuestion = document.getElementById("quiz-question");
const quizImage = document.getElementById("quiz-image");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");

document.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    title: "Masukkan Nama Kamu!",
    input: "text",
    inputPlaceholder: "Masukkin Nama",
    confirmButtonText: "Mulai",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Nama tidak boleh kosong!";
      }
    },
  }).then((result) => {
    playerName = result.value;
    Swal.fire({
      title: `Haloo ${playerName}!`,
      text: "Selamat bermain! Jawab yang bener yaaa!",
      icon: "info",
      confirmButtonText: "Mulai Kuis",
      allowOutsideClick: false,
    }).then(() => {
      quizSection.classList.remove("hidden");
      loadQuestion();
    });
  });
});

function loadQuestion() {
  const current = quizData[currentQuestion];
  quizQuestion.textContent = current.question;

  if (current.image) {
    quizImage.src = current.image;
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
    Swal.fire({
      title: "Betull!",
      text: "pinterr bangett, kok bisa tau sii",
      imageUrl: current.fullImage,
      imageWidth: 400,
      imageAlt: "Gambar utuh",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      loadNextQuestion();
    });
  } else {
    Swal.fire({
      title: "TETOTT",
      text: `Jawaban yg bener adalaah ${current.answer}.`,
      imageUrl: current.fullImage,
      imageWidth: 400,
      imageAlt: "Gambar utuh",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      loadNextQuestion();
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
  loadNextQuestion();
});

function showResult() {
  quizSection.classList.add("hidden");
  Swal.fire({
    title: "Kuis Selesai!",
    text: `Skor akhir ${playerName}: ${score}/${quizData.length}`,
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
