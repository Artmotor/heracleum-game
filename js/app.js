// Состояние приложения
const state = {
    currentQuestion: 0,
    score: 0,
    timer: null,
    timeLeft: 15,
    userData: {
        name: 'Игрок',
        photo: 'images/icons/user.png'
    }
};

// Элементы DOM
const elements = {
    startScreen: document.getElementById('start-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultScreen: document.getElementById('result-screen'),
    finalScreen: document.getElementById('final-screen'),
    rulesScreen: document.getElementById('rules-screen'),
    startBtn: document.getElementById('start-btn'),
    rulesBtn: document.getElementById('rules-btn'),
    backBtn: document.getElementById('back-btn'),
    nextBtn: document.getElementById('next-btn'),
    restartBtn: document.getElementById('restart-btn'),
    shareBtn: document.getElementById('share-btn'),
    questionText: document.getElementById('question-text'),
    mythBtn: document.getElementById('myth-btn'),
    realityBtn: document.getElementById('reality-btn'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    timerElement: document.getElementById('timer'),
    resultTitle: document.getElementById('result-title'),
    resultExplanation: document.getElementById('result-explanation'),
    finalScore: document.getElementById('final-score'),
    scoreMessage: document.getElementById('score-message'),
    achievements: document.getElementById('achievements'),
    userName: document.getElementById('user-name'),
    userPhoto: document.getElementById('user-photo')
};

// Инициализация приложения
function initApp() {
    // Запрашиваем имя игрока
    const playerName = localStorage.getItem('quiz-player-name') || 'Игрок';
    const playerPhoto = localStorage.getItem('quiz-player-photo') || 'images/icons/user.png';
    
    state.userData.name = playerName;
    state.userData.photo = playerPhoto;
    updateUserInfo();
    
    // Назначаем обработчики событий
    elements.startBtn.addEventListener('click', startQuiz);
    elements.rulesBtn.addEventListener('click', showRules);
    elements.backBtn.addEventListener('click', hideRules);
    elements.nextBtn.addEventListener('click', nextQuestion);
    elements.restartBtn.addEventListener('click', restartQuiz);
    elements.shareBtn.addEventListener('click', shareResults);
    elements.mythBtn.addEventListener('click', () => checkAnswer('myth'));
    elements.realityBtn.addEventListener('click', () => checkAnswer('reality'));
    
    // Если есть сохраненная игра
    const savedGame = localStorage.getItem('quiz-saved-game');
    if (savedGame) {
        const confirmRestore = confirm('Обнаружена сохраненная игра. Хотите продолжить?');
        if (confirmRestore) {
            const gameState = JSON.parse(savedGame);
            state.currentQuestion = gameState.currentQuestion;
            state.score = gameState.score;
            startQuiz();
        }
    }
}

// Обновление информации о пользователе
function updateUserInfo() {
    elements.userName.textContent = state.userData.name;
    elements.userPhoto.src = state.userData.photo;
}

// Начало викторины
function startQuiz() {
    showQuestion();
    elements.startScreen.style.display = 'none';
    elements.quizScreen.style.display = 'flex';
}

// Показать правила
function showRules() {
    elements.startScreen.style.display = 'none';
    elements.rulesScreen.style.display = 'flex';
}

// Скрыть правила
function hideRules() {
    elements.rulesScreen.style.display = 'none';
    elements.startScreen.style.display = 'flex';
}

// Показать вопрос
function showQuestion() {
    resetTimer();
    startTimer();
    
    const question = questions[state.currentQuestion];
    elements.questionText.textContent = question.text;
    elements.progressText.textContent = `${state.currentQuestion + 1}/${questions.length}`;
    elements.progressFill.style.width = `${(state.currentQuestion / questions.length) * 100}%`;
    
    // Сохраняем прогресс
    saveGameState();
}

// Запуск таймера
function startTimer() {
    state.timeLeft = 15;
    elements.timerElement.textContent = state.timeLeft;
    
    state.timer = setInterval(() => {
        state.timeLeft--;
        elements.timerElement.textContent = state.timeLeft;
        
        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            timeOut();
        }
    }, 1000);
}

// Сброс таймера
function resetTimer() {
    clearInterval(state.timer);
    state.timeLeft = 15;
    elements.timerElement.textContent = state.timeLeft;
}

// Время вышло
function timeOut() {
    const question = questions[state.currentQuestion];
    showResult(false, question);
}

// Проверка ответа
function checkAnswer(answer) {
    clearInterval(state.timer);
    
    const question = questions[state.currentQuestion];
    const isCorrect = (answer === 'myth' && question.isMyth) || 
                     (answer === 'reality' && !question.isMyth);
    
    if (isCorrect) {
        state.score++;
    }
    
    showResult(isCorrect, question);
}

// Показать результат
function showResult(isCorrect, question) {
    elements.quizScreen.style.display = 'none';
    elements.resultScreen.style.display = 'flex';
    
    elements.resultTitle.textContent = isCorrect ? '✅ Правильно!' : '❌ Неверно!';
    
    let explanation = `<p><strong>${isCorrect ? 'Вы правы!' : 'Правильный ответ:'} Это ${question.isMyth ? 'МИФ' : 'РЕАЛЬНОСТЬ'}.</strong></p>`;
    explanation += `<p>${question.explanation}</p>`;
    
    if (question.tip) {
        explanation += `<div class="tip"><p>💡 <strong>Совет:</strong> ${question.tip}</p></div>`;
    }
    
    elements.resultExplanation.innerHTML = explanation;
}

// Следующий вопрос
function nextQuestion() {
    state.currentQuestion++;
    
    if (state.currentQuestion < questions.length) {
        elements.resultScreen.style.display = 'none';
        elements.quizScreen.style.display = 'flex';
        showQuestion();
    } else {
        showFinalScreen();
    }
}

// Показать финальный экран
function showFinalScreen() {
    elements.resultScreen.style.display = 'none';
    elements.finalScreen.style.display = 'flex';
    
    elements.finalScore.textContent = state.score;
    
    // Определяем сообщение в зависимости от результата
    let message = '';
    if (state.score >= 22) {
        message = 'Отличный результат! Вы настоящий эксперт по борщевику!';
    } else if (state.score >= 15) {
        message = 'Хороший результат! Но есть куда расти.';
    } else {
        message = 'Неплохо, но стоит изучить тему лучше.';
    }
    elements.scoreMessage.textContent = message;
    
    // Показываем достижения
    showAchievements();
    
    // Очищаем сохраненную игру
    localStorage.removeItem('quiz-saved-game');
}

// Показать достижения
function showAchievements() {
    elements.achievements.innerHTML = '';
    
    // Проверяем достижения
    const achievements = [];
    
    if (state.score >= 20) {
        achievements.push({
            title: 'Эксперт по борщевику',
            description: 'Правильно ответили на 20+ вопросов',
            icon: ''
        });
    }
    
    if (state.score === questions.length) {
        achievements.push({
            title: 'Идеальный результат',
            description: 'Ответили правильно на все вопросы',
            icon: ''
        });
    }
    
    if (achievements.length === 0) {
        achievements.push({
            title: 'Новичок',
            description: 'Продолжайте учиться!',
            icon: ''
        });
    }
    
    // Добавляем достижения в DOM
    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        achievementElement.innerHTML = `
            <img src="images/icons/${achievement.icon || 'trophy.png'}" alt="Трофей">
            <div>
                <strong>${achievement.title}</strong>
                <p>${achievement.description}</p>
            </div>
        `;
        elements.achievements.appendChild(achievementElement);
    });
}

// Перезапуск викторины
function restartQuiz() {
    state.currentQuestion = 0;
    state.score = 0;
    elements.finalScreen.style.display = 'none';
    startQuiz();
}

// Поделиться результатами
function shareResults() {
    const shareText = `Я прошел викторину "Борщевик: Миф или Реальность" с результатом ${state.score}/25! Попробуй и ты!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Борщевик: Миф или Реальность',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Ошибка при использовании Web Share API:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

// Альтернативный способ поделиться
function fallbackShare(shareText) {
    const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Борщевик: Миф или Реальность')}&comment=${encodeURIComponent(shareText)}`;
    
    const confirmShare = confirm(`${shareText}\n\nХотите поделиться этим результатом?`);
    if (confirmShare) {
        window.open(shareUrl, '_blank');
    }
}

// Сохранить состояние игры
function saveGameState() {
    const gameState = {
        currentQuestion: state.currentQuestion,
        score: state.score
    };
    localStorage.setItem('quiz-saved-game', JSON.stringify(gameState));
}

// Инициализация приложения при загрузке
document.addEventListener('DOMContentLoaded', initApp);