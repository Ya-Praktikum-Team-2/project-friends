export default function toggleSubmenu(element, submenu) {
  element.addEventListener('click', () => {
    submenu.classList.toggle('submenu_active');
  });
}
