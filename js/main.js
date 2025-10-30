document.addEventListener("DOMContentLoaded", function () {
  // Инициализация анимаций
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter, index) => {
    chapter.style.animationDelay = `${index * 0.2}s`;
  });

  // Плавная прокрутка к разделам
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const offset = 60;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // Отслеживание текущего раздела при прокрутке
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll(".nav-menu a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  chapters.forEach((chapter) => observer.observe(chapter));

  // Инициализация квизов
  initializeQuizzes();
});

// Функция для инициализации квизов
function initializeQuizzes() {
  const quizContainers = document.querySelectorAll(".quiz-container");

  quizContainers.forEach((container) => {
    const options = container.querySelectorAll(".quiz-option");

    options.forEach((option) => {
      option.addEventListener("click", function () {
        // Сначала удаляем классы у всех опций
        options.forEach((opt) => {
          opt.classList.remove("selected", "correct", "incorrect");
        });

        // Добавляем класс выбранной опции
        this.classList.add("selected");

        // Здесь можно добавить логику проверки правильности ответа
        // Например:
        if (this.dataset.correct) {
          this.classList.add("correct");
          updateProgress(true);
        } else {
          this.classList.add("incorrect");
          updateProgress(false);
        }
      });
    });
  });
}

// Функция для обновления прогресса
function updateProgress(isCorrect) {
  let progress = JSON.parse(localStorage.getItem("userProgress")) || {
    totalAnswers: 0,
    correctAnswers: 0,
    completedChapters: [],
  };

  progress.totalAnswers++;
  if (isCorrect) {
    progress.correctAnswers++;
  }

  localStorage.setItem("userProgress", JSON.stringify(progress));
  updateProgressUI(progress);
}

// Функция для обновления UI прогресса
function updateProgressUI(progress) {
  const progressPercentage =
    (progress.correctAnswers / progress.totalAnswers) * 100;
  // Здесь можно добавить код для отображения прогресса в интерфейсе
}

// Функция для загрузки мультимедийного контента
function loadMultimediaContent(chapterId, contentType, url) {
  const container = document.querySelector(`#${chapterId} .multimedia`);

  switch (contentType) {
    case "image":
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Изображение";
      img.classList.add("fade-in");
      container.appendChild(img);
      break;

    case "video":
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.classList.add("fade-in");
      container.appendChild(video);
      break;

    case "audio":
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
      container.appendChild(audio);
      break;
  }
}

// Добавление эффектов при наведении
document.querySelectorAll(".interactive").forEach((element) => {
  element.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  element.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});
