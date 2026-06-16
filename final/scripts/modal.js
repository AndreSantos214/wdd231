function openSkillModal(skill) {
  const modal = document.getElementById("skill-modal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
    <h2>${skill.name}</h2>
    <p><strong>Category:</strong> ${skill.category}</p>
    <p><strong>Level:</strong> ${skill.level}</p>
    <p><strong>Status:</strong> ${skill.status}</p>
    <p>${skill.description}</p>
  `;

  modal.showModal();
}

function setupModal() {
  const modal = document.getElementById("skill-modal");
  const closeButton = document.getElementById("close-modal");

  closeButton.addEventListener("click", () => {
    modal.close();
  });
}

export { openSkillModal, setupModal };
