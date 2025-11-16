// Erişilebilirlik Widget'ı
(function () {
  // Widget'ın ana kapsayıcısı
  var widgetContainer = document.createElement('div');
  widgetContainer.id = 'eri-ilebilirlik-widget-container';
  widgetContainer.style.position = 'fixed';
  widgetContainer.style.right = '24px';
  widgetContainer.style.bottom = '24px';
  widgetContainer.style.zIndex = '9999';
  widgetContainer.style.display = 'flex';
  widgetContainer.style.flexDirection = 'column';
  widgetContainer.style.alignItems = 'flex-end';

  // Aç/Kapa butonu
  var toggleButton = document.createElement('button');
  toggleButton.id = 'eri-ilebilirlik-toggle';
  toggleButton.innerText = '♿';
  toggleButton.style.width = '48px';
  toggleButton.style.height = '48px';
  toggleButton.style.borderRadius = '24px';
  toggleButton.style.background = '#2d3748';
  toggleButton.style.color = '#fff';
  toggleButton.style.border = 'none';
  toggleButton.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  toggleButton.style.cursor = 'pointer';
  toggleButton.setAttribute('aria-label', 'Erişilebilirlik menüsünü aç/kapat');

  // Menü
  var menu = document.createElement('div');
  menu.id = 'eri-ilebilirlik-menu';
  menu.style.display = 'none';
  menu.style.flexDirection = 'column';
  menu.style.gap = '8px';
  menu.style.background = '#f7fafc';
  menu.style.padding = '16px';
  menu.style.borderRadius = '12px';
  menu.style.boxShadow = '0 2px 16px rgba(0,0,0,0.12)';
  menu.style.marginBottom = '8px';
  menu.style.minWidth = '200px';

  // Menü başlığı
  var menuTitle = document.createElement('div');
  menuTitle.innerText = 'Erişilebilirlik Menüsü';
  menuTitle.style.fontWeight = 'bold';
  menuTitle.style.marginBottom = '8px';
  menu.appendChild(menuTitle);

  // Kapat butonu
  var closeButton = document.createElement('button');
  closeButton.innerText = '✕';
  closeButton.style.alignSelf = 'flex-end';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '18px';
  closeButton.style.cursor = 'pointer';
  closeButton.setAttribute('aria-label', 'Menüyü kapat');
  closeButton.onclick = function () {
    menu.style.display = 'none';
  };
  menu.appendChild(closeButton);

  // Özellikler
  var features = [
    'Ekran Okuyucu',
    'Seçili Alan Okuyucu',
    'Bağlantı Vurgula',
    'Büyük Metin',
    'Metni Sola Hizala',
    'İmleç',
    'Okuma Kılavuzu',
    'Okuma Maskesi',
    'Disleksi Dostu',
    'Kontrast',
    'Solgunlaştırma',
    'Düşük Doygunluk',
    'Yüksek Doygunluk'
  ];

  features.forEach(function (feature) {
    var btn = document.createElement('button');
    btn.innerText = feature;
    btn.className = 'eri-ilebilirlik-feature-btn';
    btn.style.width = '100%';
    btn.style.padding = '8px';
    btn.style.borderRadius = '6px';
    btn.style.border = 'none';
    btn.style.background = '#edf2f7';
    btn.style.color = '#2d3748';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '15px';
    btn.style.marginBottom = '4px';
    btn.setAttribute('aria-label', feature);
    // Özellik işlevleri
    var synth = window.speechSynthesis;
    if (feature === 'Ekran Okuyucu') {
      var isReaderActive = false;
      btn.onclick = function () {
        if (!isReaderActive) {
          var texts = Array.from(document.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, li, td, th, label')).map(function (el) {
            return el.innerText.trim();
          }).filter(Boolean);
          var utter = new SpeechSynthesisUtterance(texts.join('. '));
          utter.lang = 'tr-TR';
          synth.speak(utter);
          btn.style.background = '#c6f6d5';
          btn.innerText = 'Ekran Okuyucu (Açık)';
          isReaderActive = true;
          utter.onend = function () {
            btn.style.background = '#edf2f7';
            btn.innerText = 'Ekran Okuyucu';
            isReaderActive = false;
          };
        } else {
          synth.cancel();
          btn.style.background = '#edf2f7';
          btn.innerText = 'Ekran Okuyucu';
          isReaderActive = false;
        }
      };
    } else if (feature === 'Seçili Alan Okuyucu') {
      btn.onclick = function () {
        var selectedText = window.getSelection().toString().trim();
        if (selectedText) {
          var utter = new SpeechSynthesisUtterance(selectedText);
          utter.lang = 'tr-TR';
          synth.speak(utter);
        } else {
          alert('Lütfen bir metin seçin.');
        }
      };
    } else if (feature === 'Bağlantı Vurgula') {
      var isHighlighted = false;
      btn.onclick = function () {
        var links = document.querySelectorAll('a');
        if (!isHighlighted) {
          links.forEach(function (a) {
            a.classList.add('eri-ilebilirlik-link-highlight');
          });
          btn.style.background = '#c6f6d5';
          btn.innerText = 'Bağlantı Vurgula (Açık)';
          isHighlighted = true;
        } else {
          links.forEach(function (a) {
            a.classList.remove('eri-ilebilirlik-link-highlight');
          });
          btn.style.background = '#edf2f7';
          btn.innerText = 'Bağlantı Vurgula';
          isHighlighted = false;
        }
      };
    } else if (feature === 'Büyük Metin') {
      var isBigText = false;
      btn.onclick = function () {
        var elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, li, td, th, label');
        if (!isBigText) {
          elements.forEach(function (el) {
            el.classList.add('eri-ilebilirlik-big-text');
          });
          btn.style.background = '#c6f6d5';
          btn.innerText = 'Büyük Metin (Açık)';
          isBigText = true;
        } else {
          elements.forEach(function (el) {
            el.classList.remove('eri-ilebilirlik-big-text');
          });
          btn.style.background = '#edf2f7';
          btn.innerText = 'Büyük Metin';
          isBigText = false;
        }
      };
    } else if (feature === 'Metni Sola Hizala') {
      var isLeftAligned = false;
      btn.onclick = function () {
        var elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th');
        if (!isLeftAligned) {
          elements.forEach(function (el) {
            el.classList.add('eri-ilebilirlik-left-align');
          });
          btn.style.background = '#c6f6d5';
          btn.innerText = 'Metni Sola Hizala (Açık)';
          isLeftAligned = true;
        } else {
          elements.forEach(function (el) {
            el.classList.remove('eri-ilebilirlik-left-align');
          });
          btn.style.background = '#edf2f7';
          btn.innerText = 'Metni Sola Hizala';
          isLeftAligned = false;
        }
      };
    } else if (feature === 'İmleç') {
      var isCursorActive = false;
      var cursorDiv;
      btn.onclick = function () {
        if (!isCursorActive) {
          cursorDiv = document.createElement('div');
          cursorDiv.id = 'eri-ilebilirlik-cursor';
          document.body.appendChild(cursorDiv);
          document.addEventListener('mousemove', moveCursor);
          btn.style.background = '#c6f6d5';
          btn.innerText = 'İmleç (Açık)';
          isCursorActive = true;
        } else {
          if (cursorDiv) cursorDiv.remove();
          document.removeEventListener('mousemove', moveCursor);
          btn.style.background = '#edf2f7';
          btn.innerText = 'İmleç';
          isCursorActive = false;
        }
      };
      function moveCursor(e) {
        if (cursorDiv) {
          cursorDiv.style.left = e.clientX + 'px';
          cursorDiv.style.top = e.clientY + 'px';
        }
      }
    } else if (feature === 'Okuma Kılavuzu') {
      var isGuideActive = false;
      var guideDiv;
      btn.onclick = function () {
        if (!isGuideActive) {
          guideDiv = document.createElement('div');
          guideDiv.id = 'eri-ilebilirlik-guide';
          guideDiv.style.position = 'fixed';
          guideDiv.style.left = '0';
          guideDiv.style.width = '100vw';
          guideDiv.style.height = '4px';
          guideDiv.style.background = '#3182ce';
          guideDiv.style.opacity = '0.7';
          guideDiv.style.zIndex = '2147483647';
          guideDiv.style.pointerEvents = 'none';
          guideDiv.style.filter = 'none !important';
          guideDiv.style.backdropFilter = 'none !important';
          (document.documentElement || document.body).appendChild(guideDiv);
          window.addEventListener('mousemove', moveGuide);
          btn.style.background = '#c6f6d5';
          btn.innerText = 'Okuma Kılavuzu (Açık)';
          isGuideActive = true;
        } else {
          if (guideDiv) guideDiv.remove();
          window.removeEventListener('mousemove', moveGuide);
          btn.style.background = '#edf2f7';
          btn.innerText = 'Okuma Kılavuzu';
          isGuideActive = false;
        }
      };
      function moveGuide(e) {
        if (guideDiv) {
          guideDiv.style.top = e.clientY + 'px';
        }
      }
    } else if (feature === 'Okuma Maskesi') {
      var isMaskActive = false;
      var maskDiv;
      btn.onclick = function () {
        if (!isMaskActive) {
          maskDiv = document.createElement('div');
          maskDiv.id = 'eri-ilebilirlik-mask';
          maskDiv.style.position = 'fixed';
          maskDiv.style.left = '0';
          maskDiv.style.width = '100vw';
          maskDiv.style.height = '120px';
          maskDiv.style.background = 'rgba(0,0,0,0.15)';
          maskDiv.style.zIndex = '2147483647';
          maskDiv.style.pointerEvents = 'none';
          maskDiv.style.filter = 'none !important';
          maskDiv.style.backdropFilter = 'none !important';
          (document.documentElement || document.body).appendChild(maskDiv);
          window.addEventListener('mousemove', moveMask);
          btn.style.background = '#c6f6d5';
          btn.innerText = 'Okuma Maskesi (Açık)';
          isMaskActive = true;
        } else {
          if (maskDiv) maskDiv.remove();
          window.removeEventListener('mousemove', moveMask);
          btn.style.background = '#edf2f7';
          btn.innerText = 'Okuma Maskesi';
          isMaskActive = false;
        }
      };
      function moveMask(e) {
        if (maskDiv) {
          maskDiv.style.top = (e.clientY - 60) + 'px';
        }
      }
    } else if (feature === 'Disleksi Dostu') {
      var isDisleksi = false;
      btn.onclick = function () {
        var elements = document.querySelectorAll('body, p, h1, h2, h3, h4, h5, h6, a, li, td, th, label');
        if (!isDisleksi) {
          elements.forEach(function (el) {
            el.classList.add('eri-ilebilirlik-disleksi');
          });
          btn.style.background = '#c6f6d5';
          btn.innerText = 'Disleksi Dostu (Açık)';
          isDisleksi = true;
        } else {
          elements.forEach(function (el) {
            el.classList.remove('eri-ilebilirlik-disleksi');
          });
          btn.style.background = '#edf2f7';
          btn.innerText = 'Disleksi Dostu';
          isDisleksi = false;
        }
      };
    } else if (feature === 'Kontrast') {
      var isContrast = false;
      btn.onclick = function () {
        document.body.classList.toggle('eri-ilebilirlik-contrast');
        isContrast = !isContrast;
        btn.style.background = isContrast ? '#c6f6d5' : '#edf2f7';
        btn.innerText = isContrast ? 'Kontrast (Açık)' : 'Kontrast';
      };
    } else if (feature === 'Solgunlaştırma') {
      var isFade = false;
      btn.onclick = function () {
        document.body.classList.toggle('eri-ilebilirlik-fade');
        isFade = !isFade;
        btn.style.background = isFade ? '#c6f6d5' : '#edf2f7';
        btn.innerText = isFade ? 'Solgunlaştırma (Açık)' : 'Solgunlaştırma';
      };
    } else if (feature === 'Düşük Doygunluk') {
      var isLowSat = false;
      btn.onclick = function () {
        document.body.classList.toggle('eri-ilebilirlik-low-sat');
        isLowSat = !isLowSat;
        btn.style.background = isLowSat ? '#c6f6d5' : '#edf2f7';
        btn.innerText = isLowSat ? 'Düşük Doygunluk (Açık)' : 'Düşük Doygunluk';
      };
    } else if (feature === 'Yüksek Doygunluk') {
      var isHighSat = false;
      btn.onclick = function () {
        document.body.classList.toggle('eri-ilebilirlik-high-sat');
        isHighSat = !isHighSat;
        btn.style.background = isHighSat ? '#c6f6d5' : '#edf2f7';
        btn.innerText = isHighSat ? 'Yüksek Doygunluk (Açık)' : 'Yüksek Doygunluk';
      };
    } else {
      btn.onclick = function () {
        alert(feature + ' özelliği henüz eklenmedi.');
      };
    }
    menu.appendChild(btn);
  });

  // Aç/Kapa butonu işlevi
  toggleButton.onclick = function () {
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
  };

  widgetContainer.appendChild(menu);
  widgetContainer.appendChild(toggleButton);
  (document.documentElement || document.body).appendChild(widgetContainer);
})();
