document.querySelectorAll('.feedback-form button').forEach(button => {
    button.addEventListener('click', () => {
      alert(`You selected: ${button.textContent}`);
    });
  });
  