// Mobile Menu Toggle con animación mejorada
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      
      // Change the icon based on menu state
      const isOpen = mobileNav.classList.contains('active');
      mobileMenuBtn.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTop');

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Video Player con controles avanzados
  const videoContainer = document.querySelector('.video-container');
  
  if (videoContainer) {
    // Crear elementos de la interfaz de video
    setupVideoPlayer(videoContainer);
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Form submitted! In a production environment, this would send the data to a server.');
      contactForm.reset();
    });
  }

  // Modal functionality for gallery
  if (window.location.pathname.includes('gallery.html')) {
    initGalleryModal();
  }
  
  // Inicializar las pestañas de competiciones si estamos en la página de competiciones
  if (window.location.pathname.includes('competitions.html')) {
    initCompetitionTabs();
  }
});

// Función para configurar el reproductor de video avanzado
function setupVideoPlayer(container) {
  // Eliminar la imagen existente
  const existingImg = container.querySelector('img');
  const posterUrl = existingImg ? existingImg.src : '';
  container.innerHTML = '';
  
  // Crear elementos del reproductor
  const videoElement = document.createElement('video');
  videoElement.src = 'assets/video/featured_video.mp4';
  videoElement.poster = posterUrl;
  videoElement.className = 'featured-video-element';
  
  // Crear contenedor de controles
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'video-controls';
  
  // Crear barra de progreso
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-fill';
  
  const progressHandle = document.createElement('div');
  progressHandle.className = 'progress-handle';
  
  // Crear botones de control
  const controlButtons = document.createElement('div');
  controlButtons.className = 'control-buttons';
  
  // Botón de reproducción/pausa
  const playPauseBtn = document.createElement('button');
  playPauseBtn.className = 'control-button play-pause';
  playPauseBtn.innerHTML = `
    <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
    <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  `;
  
  // Botón de retroceso
  const rewindBtn = document.createElement('button');
  rewindBtn.className = 'control-button rewind';
  rewindBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 19 2 12 11 5 11 19"></polygon>
      <polygon points="22 19 13 12 22 5 22 19"></polygon>
    </svg>
  `;
  
  // Botón de avance
  const forwardBtn = document.createElement('button');
  forwardBtn.className = 'control-button forward';
  forwardBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 19 22 12 13 5 13 19"></polygon>
      <polygon points="2 19 11 12 2 5 2 19"></polygon>
    </svg>
  `;
  
  // Indicador de tiempo
  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'time-display';
  timeDisplay.textContent = '0:00 / 0:00';
  
  // Control de volumen
  const volumeControl = document.createElement('div');
  volumeControl.className = 'volume-control';
  volumeControl.setAttribute('aria-label', 'Volume Control');
  
  // Botón de silencio/sonido
  const muteBtn = document.createElement('button');
  muteBtn.className = 'control-button volume-button';
  muteBtn.innerHTML = `
    <svg class="volume-high" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path class="volume-wave-1" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path class="volume-wave-2" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
    <svg class="volume-low" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
    <svg class="volume-muted" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  `;
  
  // Barra de volumen
  const volumeBarContainer = document.createElement('div');
  volumeBarContainer.className = 'volume-bar-container';
  
  const volumeBar = document.createElement('div');
  volumeBar.className = 'volume-bar';
  
  const volumeFill = document.createElement('div');
  volumeFill.className = 'volume-fill';
  
  const volumeHandle = document.createElement('div');
  volumeHandle.className = 'volume-handle';
  
  // Botón de pantalla completa
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'control-button fullscreen';
  fullscreenBtn.innerHTML = `
    <svg class="enter-fullscreen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
      <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
      <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
      <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
    </svg>
    <svg class="exit-fullscreen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 14h3v3"></path>
      <path d="M20 10h-3V7"></path>
      <path d="M14 4v3h3"></path>
      <path d="M10 20v-3H7"></path>
    </svg>
  `;
  
  // Ensamblar los elementos
  progressBar.appendChild(progressFill);
  progressBar.appendChild(progressHandle);
  progressContainer.appendChild(progressBar);
  
  volumeBar.appendChild(volumeFill);
  volumeBar.appendChild(volumeHandle);
  volumeBarContainer.appendChild(volumeBar);
  volumeControl.appendChild(muteBtn);
  volumeControl.appendChild(volumeBarContainer);
  
  controlButtons.appendChild(rewindBtn);
  controlButtons.appendChild(playPauseBtn);
  controlButtons.appendChild(forwardBtn);
  controlButtons.appendChild(timeDisplay);
  controlButtons.appendChild(volumeControl);
  controlButtons.appendChild(fullscreenBtn);
  
  controlsContainer.appendChild(progressContainer);
  controlsContainer.appendChild(controlButtons);
  
  // Añadir elementos al contenedor
  container.appendChild(videoElement);
  container.appendChild(controlsContainer);
  
  // Overlay para clic inicial
  const playOverlay = document.createElement('div');
  playOverlay.className = 'play-overlay';
  playOverlay.innerHTML = `
    <button class="play-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    </button>
  `;
  container.appendChild(playOverlay);
  
  // Variables de estado
  let isPlaying = false;
  let isDragging = false;
  let isFullscreen = false;
  let isMuted = false;
  let volumeLevel = 1; // Nivel de volumen (0-1)
  let isVolumeBarVisible = false;
  
  // Inicializar el volumen
  videoElement.volume = volumeLevel;
  updateVolumeUI(volumeLevel);
  
  // Función para formatear tiempo (segundos a MM:SS)
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  // Actualizar la barra de progreso
  function updateProgressBar() {
    if (!isDragging && videoElement.duration) {
      const percentage = (videoElement.currentTime / videoElement.duration) * 100;
      progressFill.style.width = `${percentage}%`;
      progressHandle.style.left = `${percentage}%`;
      
      // Actualizar el tiempo mostrado
      timeDisplay.textContent = `${formatTime(videoElement.currentTime)} / ${formatTime(videoElement.duration)}`;
    }
  }
  
  // Función para alternar reproducción/pausa
  function togglePlayPause() {
    if (videoElement.paused) {
      videoElement.play();
      playPauseBtn.classList.add('playing');
      playOverlay.style.display = 'none';
      isPlaying = true;
    } else {
      videoElement.pause();
      playPauseBtn.classList.remove('playing');
      isPlaying = false;
    }
  }
  
  // Función para saltar a una posición específica
  function skipTo(position) {
    const skipTime = videoElement.duration * (position / 100);
    videoElement.currentTime = skipTime;
  }
  
  // Función para alternar pantalla completa
  function toggleFullscreen() {
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      fullscreenBtn.classList.add('active');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fullscreenBtn.classList.remove('active');
    }
    isFullscreen = !isFullscreen;
  }
  
  // Función para alternar silencio
  function toggleMute() {
    if (videoElement.volume === 0 || videoElement.muted) {
      videoElement.muted = false;
      videoElement.volume = volumeLevel || 0.5;
      updateVolumeUI(videoElement.volume);
    } else {
      videoElement.muted = true;
      updateVolumeUI(0);
    }
  }
  
  // Función para actualizar la interfaz de volumen
  function updateVolumeUI(volume) {
    // Actualizamos la altura del relleno en lugar del ancho para una barra vertical
    volumeFill.style.height = `${volume * 100}%`;
    // Actualizamos la posición del manejador
    volumeHandle.style.bottom = `${volume * 100}%`;
    
    // Actualizar el icono de volumen
    muteBtn.classList.remove('high', 'low', 'muted');
    
    if (volume === 0) {
      muteBtn.classList.add('muted');
    } else if (volume < 0.5) {
      muteBtn.classList.add('low');
    } else {
      muteBtn.classList.add('high');
    }
  }
  
  // Función para establecer el volumen
  function setVolume(volume) {
    // Asegurar que el volumen esté entre 0 y 1
    volume = Math.max(0, Math.min(1, volume));
    
    videoElement.volume = volume;
    volumeLevel = volume;
    videoElement.muted = (volume === 0);
    
    updateVolumeUI(volume);
  }
  
  // Función para actualizar el volumen durante el arrastre
  function updateVolumeDrag(e) {
    const rect = volumeBar.getBoundingClientRect();
    // Para una barra vertical, usamos la posición Y en lugar de X
    // Invertimos la lógica ya que 0 está en la parte inferior
    const height = rect.height;
    const position = height - (e.clientY - rect.top);
    const volume = Math.max(0, Math.min(1, position / height));
    
    setVolume(volume);
  }
  
  // Event Listeners
  
  // Reproducción/Pausa
  playPauseBtn.addEventListener('click', togglePlayPause);
  playOverlay.addEventListener('click', togglePlayPause);
  videoElement.addEventListener('click', function(e) {
    e.stopPropagation();
    togglePlayPause();
  });
  
  // Retroceder 10 segundos
  rewindBtn.addEventListener('click', function() {
    videoElement.currentTime = Math.max(videoElement.currentTime - 10, 0);
  });
  
  // Avanzar 10 segundos
  forwardBtn.addEventListener('click', function() {
    videoElement.currentTime = Math.min(videoElement.currentTime + 10, videoElement.duration);
  });
  
  // Pantalla completa
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  
  // Control de volumen
  muteBtn.addEventListener('click', toggleMute);
  
  // Mostrar/ocultar la barra de volumen al pasar el ratón
  volumeControl.addEventListener('mouseenter', function() {
    volumeBarContainer.classList.add('visible');
    isVolumeBarVisible = true;
  });
  
  volumeControl.addEventListener('mouseleave', function() {
    if (!isDragging) {
      volumeBarContainer.classList.remove('visible');
      isVolumeBarVisible = false;
    }
  });
  
  // Eventos para la barra de volumen
  volumeBar.addEventListener('mousedown', function(e) {
    e.preventDefault(); // Prevenir selección de texto
    isDragging = true;
    updateVolumeDrag(e);
  });
  
  // Asegurarse de que el arrastre funcione correctamente
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const volumeRect = volumeBar.getBoundingClientRect();
      // Verificar si estamos arrastrando el control de volumen
      if (e.clientX >= volumeRect.left - 20 && 
          e.clientX <= volumeRect.right + 20 && 
          e.clientY >= volumeRect.top - 20 && 
          e.clientY <= volumeRect.bottom + 20) {
        updateVolumeDrag(e);
        e.preventDefault();
      }
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      if (!isVolumeBarVisible) {
        volumeBarContainer.classList.remove('visible');
      }
    }
  });
  
  // Mejorar la accesibilidad con eventos de teclado
  volumeBar.addEventListener('keydown', function(e) {
    let newVolume = videoElement.volume;
    
    if (e.key === 'ArrowUp') {
      newVolume = Math.min(1, newVolume + 0.1);
      setVolume(newVolume);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      newVolume = Math.max(0, newVolume - 0.1);
      setVolume(newVolume);
      e.preventDefault();
    }
  });
  
  // Hacer que el control de volumen sea accesible mediante tabulación
  volumeBar.setAttribute('tabindex', '0');
  volumeBar.setAttribute('role', 'slider');
  volumeBar.setAttribute('aria-label', 'Volumen');
  volumeBar.setAttribute('aria-valuemin', '0');
  volumeBar.setAttribute('aria-valuemax', '100');
  
  // Eventos de cambio de estado del video
  videoElement.addEventListener('play', function() {
    playPauseBtn.classList.add('playing');
    playOverlay.style.display = 'none';
  });
  
  videoElement.addEventListener('pause', function() {
    playPauseBtn.classList.remove('playing');
  });
  
  videoElement.addEventListener('ended', function() {
    playPauseBtn.classList.remove('playing');
    playOverlay.style.display = 'flex';
    isPlaying = false;
  });
  
  videoElement.addEventListener('timeupdate', updateProgressBar);
  
  videoElement.addEventListener('loadedmetadata', function() {
    timeDisplay.textContent = `0:00 / ${formatTime(videoElement.duration)}`;
  });
  
  // Eventos para la barra de progreso
  progressBar.addEventListener('mousedown', function(e) {
    isDragging = true;
    updateProgressDrag(e);
  });
  
  // Función para actualizar la posición durante el arrastre
  function updateProgressDrag(e) {
    const rect = progressBar.getBoundingClientRect();
    const position = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const percentage = (position / rect.width) * 100;
    
    progressFill.style.width = `${percentage}%`;
    progressHandle.style.left = `${percentage}%`;
    
    // Actualizar tiempo del video
    skipTo(percentage);
  }
  
  // Eventos de pantalla completa
  document.addEventListener('fullscreenchange', updateFullscreenButton);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
  document.addEventListener('mozfullscreenchange', updateFullscreenButton);
  document.addEventListener('MSFullscreenChange', updateFullscreenButton);
  
  function updateFullscreenButton() {
    isFullscreen = !!document.fullscreenElement || !!document.webkitFullscreenElement || 
                  !!document.mozFullScreenElement || !!document.msFullscreenElement;
    
    if (isFullscreen) {
      fullscreenBtn.classList.add('active');
    } else {
      fullscreenBtn.classList.remove('active');
    }
  }
  
  // Mostrar/ocultar controles al mover el ratón
  let controlsTimeout;
  container.addEventListener('mousemove', function() {
    controlsContainer.classList.add('visible');
    clearTimeout(controlsTimeout);
    
    controlsTimeout = setTimeout(function() {
      if (isPlaying) {
        controlsContainer.classList.remove('visible');
      }
    }, 3000);
  });
  
  container.addEventListener('mouseleave', function() {
    if (isPlaying) {
      controlsContainer.classList.remove('visible');
    }
  });
}

// Gallery Modal Functionality (sin generación dinámica de imágenes)
function initGalleryModal() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const imageModal = document.getElementById('imageModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCategory = document.getElementById('modalCategory');
  const modalPhotographer = document.getElementById('modalPhotographer');

  // Add click event to open modal for each gallery item
  if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const imgAlt = item.querySelector('img').alt;
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const category = item.getAttribute('data-category');
        const photographer = item.getAttribute('data-photographer');
        
        if (imageModal && modalImage) {
          modalImage.src = imgSrc;
          modalImage.alt = imgAlt;
          
          if (modalTitle) modalTitle.textContent = title;
          if (modalDescription) modalDescription.textContent = description;
          if (modalCategory) modalCategory.textContent = category;
          if (modalPhotographer) modalPhotographer.textContent = photographer;
          
          imageModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
      });
    });
  }

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside the content
  if (imageModal) {
    imageModal.addEventListener('click', function(e) {
      if (e.target === imageModal) {
        closeModal();
      }
    });
  }

  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  function closeModal() {
    if (imageModal) {
      imageModal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
}

// Funcionalidad de pestañas de competiciones
function initCompetitionTabs() {
  const tabButtons = document.querySelectorAll('.sport-tab-button');
  const tabContents = document.querySelectorAll('.sport-tab-content');
  
  // Mostrar la primera pestaña por defecto
  if (tabContents.length > 0) {
    tabContents[0].classList.add('active');
  }
  
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add('active');
    
    // Añadir eventos de clic a los botones de pestañas
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Desactivar todas las pestañas
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Activar la pestaña seleccionada
        button.classList.add('active');
        tabContents[index].classList.add('active');
      });
    });
  }
}