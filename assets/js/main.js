/**
 * ==========================================================================
 * ARTE & FIOS DA LALLY - JAVASCRIPT PRINCIPAL
 * Gerenciamento de menu mobile, filtros dinâmicos de catálogo e interações.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa a biblioteca de ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ------------------------------------------------------------------------
     1. MENU MOBILE (Abrir / Fechar e fechar ao clicar em item)
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Fecha o menu móvel ao clicar em qualquer link de navegação interna
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. FILTRO DE PRODUTOS DO CATÁLOGO
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      // Atualiza estilo visual dos botões de filtro
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-lally-malva', 'text-white', 'border-lally-malva');
        btn.classList.add('bg-white', 'text-[#5956E2]', 'border-gray-200');
        btn.setAttribute('aria-pressed', 'false');
      });

      button.classList.remove('bg-white', 'text-[#5956E2]', 'border-gray-200');
      button.classList.add('bg-lally-malva', 'text-white', 'border-lally-malva');
      button.setAttribute('aria-pressed', 'true');

      // Exibe ou oculta os cards com base na categoria
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     3. NAVEGAÇÃO SUAVE PARA LINKS ÂNCORA
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
