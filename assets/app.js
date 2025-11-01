import './bootstrap.js';
import './styles/app.css';

document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('[data-assistant-trigger]');
    const status = document.querySelector('[data-assistant-status]');
    const bubble = trigger?.closest('.assistant-bubble');

    if (!trigger || !status || !bubble) {
        return;
    }

    trigger.addEventListener('click', () => {
        if (trigger.disabled) {
            return;
        }

        trigger.disabled = true;
        bubble.classList.add('assistant-bubble--active');
        status.hidden = false;
        status.textContent = "Connexion à l'agent en cours…";

        window.dispatchEvent(new CustomEvent('assistant:open'));

        window.setTimeout(() => {
            status.textContent = 'Assistant initialisé ! Posez votre première question.';
            trigger.textContent = 'Assistant prêt';
        }, 900);
    });
});
