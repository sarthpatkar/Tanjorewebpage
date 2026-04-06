let currentMenuIndex = 0;

function syncBodyLock() {
  const menuOpen = document.getElementById('menuOverlay')?.classList.contains('open');
  const drawerOpen = document.getElementById('mobileDrawer')?.classList.contains('open');
  const modalOpen = document.querySelector('.dish-modal.open');
  const gateOpen = document.getElementById('branchGate')?.classList.contains('show');
  document.body.style.overflow = menuOpen || drawerOpen || modalOpen || gateOpen ? 'hidden' : '';
}

function toggleDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer) return;
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
}

function openDrawer() {
  document.getElementById('mobileDrawer')?.classList.add('open');
  document.getElementById('drawerBackdrop')?.classList.add('open');
  document.getElementById('navHamburger')?.classList.add('open');
  syncBodyLock();
}

function closeDrawer() {
  document.getElementById('mobileDrawer')?.classList.remove('open');
  document.getElementById('drawerBackdrop')?.classList.remove('open');
  document.getElementById('navHamburger')?.classList.remove('open');
  syncBodyLock();
}

function openMenu() {
  closeDrawer();
  const overlay = document.getElementById('menuOverlay');
  if (!overlay) return;
  overlay.classList.add('open');
  switchMenuCat(currentMenuIndex || 0);
  syncBodyLock();
}

function closeMenu() {
  document.getElementById('menuOverlay')?.classList.remove('open');
  syncBodyLock();
}

function switchMenuCat(index) {
  currentMenuIndex = index;
  const catButtons = [...document.querySelectorAll('.menu-cat-btn')];
  const sideButtons = [...document.querySelectorAll('.menu-side-btn')];
  const panels = [...document.querySelectorAll('.menu-panel')];
  const body = document.querySelector('.menu-body');

  catButtons.forEach((button, i) => button.classList.toggle('active', i === index));
  sideButtons.forEach((button, i) => button.classList.toggle('active', i === index));
  panels.forEach((panel, i) => panel.classList.toggle('active', i === index));
  if (body) body.scrollTop = 0;
}

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp01 = value => Math.max(0, Math.min(1, value));
  const mapRange = (value, start, end) => {
    if (end <= start) return value >= end ? 1 : 0;
    return clamp01((value - start) / (end - start));
  };
  const branchCatalog = {
    versova: {
      key: 'versova',
      name: 'The Tanjore Tiffin Room, Versova',
      cityLine: 'Andheri West · Versova · Mumbai',
      heroLocation: 'Andheri West · Versova · Mumbai',
      heroStatus: '<strong>Open</strong> · Closes 1:30 AM',
      heroProofTime: 'Kitchen till 1:30 AM',
      heroSignature: 'Chicken Ghee Roast · Rasam Sour',
      rating: 4.4,
      reviewCount: 4207,
      addressHtml: 'JEWEL MAHAL, Bungalow Rd, Ratan Kunj,<br>Aram Nagar, Versova, Andheri West,<br>Mumbai, Maharashtra 400061',
      footerAddress: ['JEWEL MAHAL, Bungalow Rd', 'Ratan Kunj, Aram Nagar, Versova', 'Mumbai 400061', 'Open · Closes 1:30 AM'],
      hoursHtml: 'Open · Closes 1:30 AM<br>Dine-In · Takeaway · No-contact delivery',
      phoneDisplay: '+91 96190 11696',
      phoneTel: '9619011696',
      mapQuery: 'JEWEL MAHAL Bungalow Road Ratan Kunj Aram Nagar Versova Andheri West Mumbai Maharashtra 400061',
      orderLinks: { zomato: '#', swiggy: '#', eazydiner: '#' }
    },
    khar: {
      key: 'khar',
      name: 'The Tanjore Tiffin Room, Khar',
      cityLine: 'Khar West · Mumbai',
      heroLocation: 'Khar West · Mumbai · Union Park',
      heroStatus: '<strong>Open</strong> · Closes 11:30 PM',
      heroProofTime: 'Kitchen till 11:30 PM',
      heroSignature: 'Chicken Ghee Roast · Ambur Biryani',
      rating: 4.4,
      reviewCount: 1741,
      addressHtml: 'room, 12, The Tanjore Tiffin, Union Park,<br>Khar West, Mumbai, Maharashtra 400052',
      footerAddress: ['room, 12, The Tanjore Tiffin', 'Union Park, Khar West', 'Mumbai 400052', 'Open · Closes 11:30 PM'],
      hoursHtml: 'Open · Closes 11:30 PM<br>Dine-In · Takeaway · No-contact delivery',
      phoneDisplay: '+91 73030 21212',
      phoneTel: '7303021212',
      mapQuery: 'room 12 The Tanjore Tiffin Union Park Khar West Mumbai Maharashtra 400052',
      orderLinks: { zomato: '#', swiggy: '#', eazydiner: '#' }
    },
    nesco: {
      key: 'nesco',
      name: 'The Tanjore Tiffin Room, Nesco',
      cityLine: 'Nesco · Goregaon East · Mumbai',
      heroLocation: 'Nesco Gate 2 · Goregaon East · Mumbai',
      heroStatus: '<strong>Open</strong> · Closes 12:30 AM',
      heroProofTime: 'Kitchen till 12:30 AM',
      heroSignature: 'Chicken Ghee Roast · Prawn Moilee',
      rating: 4.1,
      reviewCount: 531,
      addressHtml: 'Gate 2, Building No 2, Western Urban Rd,<br>NESCO, Goregaon East, Mumbai, Maharashtra 400063',
      footerAddress: ['Gate 2, Building No 2, Western Urban Rd', 'NESCO, Goregaon East', 'Mumbai 400063', 'Open · Closes 12:30 AM'],
      hoursHtml: 'Open · Closes 12:30 AM<br>Dine-In · Takeaway · No-contact delivery',
      phoneDisplay: '+91 99202 79745',
      phoneTel: '9920279745',
      mapQuery: 'Gate 2 Building No 2 Western Urban Road NESCO Goregaon East Mumbai Maharashtra 400063',
      orderLinks: { zomato: '#', swiggy: '#', eazydiner: '#' }
    },
    goa: {
      key: 'goa',
      name: 'The Tanjore Tiffin Room, Goa',
      cityLine: 'Anjuna · Arpora · Goa',
      heroLocation: 'Anjuna · Arpora · Goa',
      heroStatus: '<strong>Open</strong> · Closes 12:00 AM',
      heroProofTime: 'Kitchen till 12:00 AM',
      heroSignature: 'Prawn Moilee · Rasam Sour',
      rating: 4.5,
      reviewCount: 666,
      addressHtml: '1111, Road, near Orchard Stores, near Corporation Bank,<br>Mazal Waddo, Anjuna, Arpora, Goa 403509',
      footerAddress: ['1111 Road, near Orchard Stores', 'Mazal Waddo, Anjuna, Arpora', 'Goa 403509', 'Open · Closes 12:00 AM'],
      hoursHtml: 'Open · Closes 12:00 AM<br>Dine-In · Takeaway · No-contact delivery',
      phoneDisplay: '+91 75067 41286',
      phoneTel: '7506741286',
      mapQuery: '1111 Road near Orchard Stores near Corporation Bank Mazal Waddo Anjuna Arpora Goa 403509',
      orderLinks: { zomato: '#', swiggy: '#', eazydiner: '#' }
    }
  };
  const branchFromURL = new URLSearchParams(window.location.search).get('branch');
  const hasChosenBranch = Boolean(branchFromURL && branchCatalog[branchFromURL]);
  const activeBranchKey = hasChosenBranch ? branchFromURL : 'versova';
  const activeBranch = branchCatalog[activeBranchKey];
  const getBranchMapLink = branch =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`;
  const waBase =
    document.querySelector('a[href*="wa.me"]')?.getAttribute('href') ||
    'https://wa.me/919619011696';
  const mapsBase = getBranchMapLink(activeBranch);

  const useIcon = (id, className = '') =>
    `<svg ${className ? `class="${className}"` : ''} aria-hidden="true"><use href="#${id}"></use></svg>`;

  const googleMark = `
    <svg class="google-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12.2 10.2v3.9h5.4c-.2 1.2-.9 2.2-1.9 2.9l3 2.3c1.7-1.6 2.7-3.9 2.7-6.7 0-.6-.1-1.1-.2-1.7z"/>
      <path fill="#4285F4" d="M12 22c2.7 0 5-.9 6.7-2.5l-3-2.3c-.8.6-1.9 1-3.7 1-2.8 0-5.2-1.9-6.1-4.5H2.8v2.4A10 10 0 0 0 12 22z"/>
      <path fill="#FBBC05" d="M5.9 13.7a6 6 0 0 1 0-3.4V7.9H2.8A10 10 0 0 0 2 12c0 1.6.4 3.1.8 4.1z"/>
      <path fill="#34A853" d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 2.8 14.7 2 12 2a10 10 0 0 0-9.2 5.9l3.1 2.4c.9-2.6 3.3-4.5 6.1-4.5z"/>
    </svg>`;

  const smoothScrollTo = target => {
    const top =
      typeof target === 'number'
        ? target
        : document.querySelector(target)?.getBoundingClientRect().top + window.scrollY;
    if (typeof top !== 'number' || Number.isNaN(top)) return;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const parseCounterText = text => {
    if (!text || text.includes(':')) return null;
    const match = text.match(/[\d,.]+(?:\.\d+)?/);
    if (!match) return null;
    const value = Number(match[0].replace(/,/g, ''));
    if (!Number.isFinite(value)) return null;
    return {
      value,
      decimals: match[0].includes('.') ? match[0].split('.')[1].length : 0,
      prefix: text.slice(0, match.index),
      suffix: text.slice((match.index || 0) + match[0].length)
    };
  };

  const formatCounter = (value, decimals) => {
    if (decimals > 0) return value.toFixed(decimals);
    return Math.round(value).toLocaleString('en-IN');
  };

  const animateCounter = (element, value, decimals = 0, prefix = '', suffix = '', duration = 1200) => {
    if (!element || element.dataset.counted) return;
    element.dataset.counted = 'true';
    const start = performance.now();
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const frame = now => {
      const progress = Math.min(1, (now - start) / duration);
      const current = value * easeOutQuart(progress);
      element.textContent = `${prefix}${formatCounter(current, decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
      else element.textContent = `${prefix}${formatCounter(value, decimals)}${suffix}`;
    };

    requestAnimationFrame(frame);
  };

  const buildSpiceMeter = level => {
    const chilies = Array.from({ length: 5 }, (_, index) => {
      const active = index < level ? 'active' : '';
      return `<span class="chili-slot">${useIcon('icon-chili', active)}</span>`;
    }).join('');
    return `<div class="spice-meter" aria-label="Spice level: ${level} out of 5">${chilies}</div>`;
  };

  const openDishModal = card => {
    const modal = document.querySelector('.dish-modal');
    if (!modal || !card) return;
    const name = card.querySelector('.dish-name')?.textContent?.trim() || 'Signature Dish';
    const desc = card.querySelector('.dish-desc')?.textContent?.trim() || '';
    const price = card.querySelector('.dish-price')?.textContent?.trim() || '';
    const level = Number(card.dataset.spice || 1);
    const type = card.dataset.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian';
    const longer = `${desc} Crafted in the signature Tanjore style with layered spice, generous texture, and the kind of finish made for a slow dinner.`;

    modal.querySelector('[data-modal-name]').textContent = name;
    modal.querySelector('[data-modal-copy]').textContent = longer;
    modal.querySelector('[data-modal-price]').textContent = price;
    modal.querySelector('[data-modal-type]').textContent = type;
    modal.querySelector('[data-modal-spice]').innerHTML = buildSpiceMeter(level);

    const enquiryLink = modal.querySelector('[data-modal-enquiry]');
    if (enquiryLink) {
      enquiryLink.href = `${waBase}?text=${encodeURIComponent(`Hello, I'd like to enquire about ${card.dataset.whatsapp || name} from The Tanjore Tiffin Room.`)}`;
    }

    modal.classList.add('open');
    syncBodyLock();
  };

  const closeDishModal = () => {
    document.querySelector('.dish-modal')?.classList.remove('open');
    syncBodyLock();
  };

  const addStaggerAttributes = () => {
    const groups = [
      ['.dishes-grid', '.dish-card'],
      ['.exp-features', '.exp-feat'],
      ['.story-pillars', '.pillar'],
      ['.story-insights', '.story-insight'],
      ['.dishes-header', '.section-eyebrow, h2, p'],
      ['.reviews-header', '.section-eyebrow, h2, .rating-display'],
      ['.info-col', '.section-eyebrow, h2, .info-item, .offers-strip, .visit-quick-actions, .delivery-links'],
      ['.visit-quick-actions', '.visit-action'],
      ['.reservation-box', '.reservation-kicker, h3, p, .reservation-actions'],
      ['.footer-top', '.footer-brand, .footer-col']
    ];

    groups.forEach(([containerSelector, itemSelector]) => {
      document.querySelectorAll(containerSelector).forEach(container => {
        container.querySelectorAll(itemSelector).forEach(item => item.setAttribute('data-stagger', ''));
      });
    });
  };

  const initCinematicJourney = () => {
    const expContent = document.querySelector('.exp-content');
    if (expContent && !expContent.classList.contains('reveal')) {
      expContent.classList.add('reveal');
      expContent
        .querySelectorAll('.section-eyebrow, h2, p, .exp-slider, .exp-photo-band, .exp-features')
        .forEach(item => item.setAttribute('data-stagger', ''));
    }

    const hero = document.querySelector('.hero');
    const scenes = [
      { element: document.querySelector('.story'), progressProp: '--story-scene-progress', shiftProp: '--story-scene-shift', shiftFactor: -18 },
      { element: document.querySelector('.dishes'), progressProp: '--dishes-scene-progress', shiftProp: '--dishes-scene-shift', shiftFactor: -22 },
      { element: document.querySelector('.experience-parallax'), progressProp: '--exp-scene-progress', shiftProp: '--exp-scene-shift', shiftFactor: -18 },
      { element: document.querySelector('.reviews'), progressProp: '--reviews-scene-progress', shiftProp: '--reviews-scene-shift', shiftFactor: -14 },
      { element: document.querySelector('.reserve-section'), progressProp: '--reserve-scene-progress', shiftProp: '--reserve-scene-shift', shiftFactor: -12 }
    ].filter(scene => scene.element);

    const syncHeroDefaults = () => {
      if (!hero) return;
      hero.style.setProperty('--hero-pin-span', prefersReducedMotion ? '0px' : `${Math.round(window.innerHeight * (coarsePointer ? 0.92 : 1.04))}px`);
      hero.style.setProperty('--hero-scene-progress', '0');
      hero.style.setProperty('--hero-stage-badge-progress', '1');
      hero.style.setProperty('--hero-stage-eyebrow-progress', '1');
      hero.style.setProperty('--hero-stage-title-progress', '1');
      hero.style.setProperty('--hero-stage-copy-progress', '1');
      hero.style.setProperty('--hero-stage-cta-progress', '1');
      hero.style.setProperty('--hero-stage-menu-progress', '1');
      hero.style.setProperty('--hero-stage-image-progress', '1');
      hero.style.setProperty('--hero-shift', '0px');
      hero.classList.remove('is-hero-pinned', 'is-hero-released');
    };

    if (prefersReducedMotion) {
      syncHeroDefaults();
      return;
    }

    if (!hero && !scenes.length) return;

    let ticking = false;
    const updateScenes = () => {
      scenes.forEach(({ element, progressProp, shiftProp, shiftFactor }) => {
        const rect = element.getBoundingClientRect();
        const progress = clamp01((window.innerHeight * 0.74 - rect.top) / (rect.height + window.innerHeight * 0.22));
        const centered = progress * 2 - 1;
        element.style.setProperty(progressProp, progress.toFixed(4));
        element.style.setProperty(shiftProp, `${(centered * shiftFactor).toFixed(2)}px`);
      });

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
        const progress = clamp01(-rect.top / travel);
        const badgeProgress = mapRange(progress, 0.02, 0.2);
        const eyebrowProgress = mapRange(progress, 0.08, 0.3);
        const titleProgress = mapRange(progress, 0.18, 0.52);
        const copyProgress = mapRange(progress, 0.42, 0.72);
        const ctaProgress = mapRange(progress, 0.64, 0.9);
        const menuProgress = mapRange(progress, 0.82, 1);
        const imageProgress = mapRange(progress, 0, 1);

        hero.style.setProperty('--hero-scene-progress', progress.toFixed(4));
        hero.style.setProperty('--hero-stage-badge-progress', badgeProgress.toFixed(4));
        hero.style.setProperty('--hero-stage-eyebrow-progress', eyebrowProgress.toFixed(4));
        hero.style.setProperty('--hero-stage-title-progress', titleProgress.toFixed(4));
        hero.style.setProperty('--hero-stage-copy-progress', copyProgress.toFixed(4));
        hero.style.setProperty('--hero-stage-cta-progress', ctaProgress.toFixed(4));
        hero.style.setProperty('--hero-stage-menu-progress', menuProgress.toFixed(4));
        hero.style.setProperty('--hero-stage-image-progress', imageProgress.toFixed(4));
        hero.style.setProperty('--hero-shift', `${(-progress * (coarsePointer ? 20 : 32)).toFixed(2)}px`);

        const isPinned = rect.top <= 0 && rect.bottom > window.innerHeight && progress < 0.999;
        const isReleased = rect.top < 0 && progress >= 0.999;
        hero.classList.toggle('is-hero-pinned', isPinned);
        hero.classList.toggle('is-hero-released', isReleased);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateScenes);
    };

    syncHeroDefaults();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      syncHeroDefaults();
      onScroll();
    });
    updateScenes();
  };

  const initBranchRouting = () => {
    const gate = document.getElementById('branchGate');
    const gateGrid = document.getElementById('branchGateGrid');
    const directory = document.getElementById('branchDirectory');
    const goToBranch = key => {
      const url = new URL(window.location.href);
      url.searchParams.set('branch', key);
      window.location.href = url.toString();
    };

    if (gateGrid) {
      gateGrid.innerHTML = Object.values(branchCatalog)
        .map(
          branch => `
            <article class="branch-gate-card">
              <div class="branch-gate-copy">
                <span class="branch-gate-city">${branch.cityLine}</span>
                <h3>${branch.name}</h3>
                <p class="branch-gate-meta">${branch.rating.toFixed(1)} · ${branch.reviewCount.toLocaleString('en-IN')} reviews</p>
              </div>
              <button class="btn-primary" type="button" data-branch-select="${branch.key}">Visit ${branch.name.split(', ').pop()}</button>
            </article>
          `
        )
        .join('');
      gateGrid.querySelectorAll('[data-branch-select]').forEach(button => {
        button.addEventListener('click', () => goToBranch(button.getAttribute('data-branch-select')));
      });
    }

    if (directory) {
      directory.innerHTML = Object.values(branchCatalog)
        .filter(branch => branch.key !== activeBranch.key)
        .map(
          branch => `
            <article class="branch-card">
              <div class="branch-card-copy">
                <span class="branch-gate-city">${branch.cityLine}</span>
                <h4>${branch.name}</h4>
                <p>${branch.rating.toFixed(1)} · ${branch.reviewCount.toLocaleString('en-IN')} reviews</p>
                <button class="btn-outline" type="button" data-branch-nav="${branch.key}">Open Branch Page</button>
              </div>
            </article>
          `
        )
        .join('');
      directory.querySelectorAll('[data-branch-nav]').forEach(button => {
        button.addEventListener('click', () => goToBranch(button.getAttribute('data-branch-nav')));
      });
    }

    document.title = `${activeBranch.name} — The Tanjore Tiffin Room`;
    const heroLoc = document.getElementById('branchHeroLocation');
    const heroStatus = document.getElementById('branchHeroStatus');
    const heroRating = document.getElementById('branchHeroRating');
    const heroLate = document.getElementById('branchHeroLate');
    const heroDishPair = document.getElementById('branchHeroDishPair');
    const reviewCount = document.getElementById('branchReviewCount');
    const addressText = document.getElementById('branchAddressText');
    const hoursText = document.getElementById('branchHoursText');
    const infoPhone = document.getElementById('branchInfoPhone');
    const reservePhone = document.getElementById('reservePhoneLink');
    const reserveCallCta = document.getElementById('reserveCallCta');
    const drawerPhone = document.getElementById('drawerPhoneLink');
    const groupPhone = document.getElementById('branchGroupPhone');
    const directionsLink = document.getElementById('branchDirectionsLink');
    const footerPhone = document.getElementById('footerPhoneLink');
    const footerAddressLine1 = document.getElementById('footerAddressLine1');
    const footerAddressLine2 = document.getElementById('footerAddressLine2');
    const footerAddressLine3 = document.getElementById('footerAddressLine3');
    const footerAddressLine4 = document.getElementById('footerAddressLine4');
    const footerCityLine = document.getElementById('footerCityLine');
    const footerOrder1 = document.getElementById('footerOrderLink1');
    const footerOrder2 = document.getElementById('footerOrderLink2');
    const footerOrder3 = document.getElementById('footerOrderLink3');

    if (heroLoc) heroLoc.textContent = `${activeBranch.heroLocation} · Est. Tanjore`;
    if (heroStatus) heroStatus.innerHTML = activeBranch.heroStatus;
    if (heroRating) heroRating.textContent = `${activeBranch.rating.toFixed(1)}★ Google`;
    if (heroLate) heroLate.textContent = activeBranch.heroProofTime;
    if (heroDishPair) heroDishPair.textContent = `Order first: ${activeBranch.heroSignature}`;
    if (reviewCount) reviewCount.textContent = `Based on ${activeBranch.reviewCount.toLocaleString('en-IN')} Google Reviews`;
    if (addressText) addressText.innerHTML = activeBranch.addressHtml;
    if (hoursText) hoursText.innerHTML = activeBranch.hoursHtml;
    if (directionsLink) directionsLink.href = mapsBase;

    [infoPhone, reservePhone, groupPhone, footerPhone].forEach(link => {
      if (!link) return;
      link.href = `tel:${activeBranch.phoneTel}`;
      link.textContent = activeBranch.phoneDisplay;
    });
    if (reserveCallCta) reserveCallCta.href = `tel:${activeBranch.phoneTel}`;
    if (drawerPhone) {
      drawerPhone.href = `tel:${activeBranch.phoneTel}`;
      drawerPhone.innerHTML = `${useIcon('icon-phone')}<span>${activeBranch.phoneDisplay}</span>`;
    }

    if (footerAddressLine1) footerAddressLine1.textContent = activeBranch.footerAddress[0];
    if (footerAddressLine2) footerAddressLine2.textContent = activeBranch.footerAddress[1];
    if (footerAddressLine3) footerAddressLine3.textContent = activeBranch.footerAddress[2];
    if (footerAddressLine4) footerAddressLine4.textContent = activeBranch.footerAddress[3];
    [footerAddressLine1, footerAddressLine2, footerAddressLine3, footerAddressLine4].forEach(link => {
      if (link) link.href = mapsBase;
    });
    if (footerCityLine) footerCityLine.textContent = `Crafted with care · ${activeBranch.cityLine}`;
    if (footerOrder1) footerOrder1.href = activeBranch.orderLinks.zomato;
    if (footerOrder2) footerOrder2.href = activeBranch.orderLinks.swiggy;
    if (footerOrder3) footerOrder3.href = activeBranch.orderLinks.eazydiner;

    if (!hasChosenBranch) {
      gate?.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else {
      gate?.classList.remove('show');
      document.body.style.overflow = '';
    }
  };

  const initLoader = () => {
    window.addEventListener('load', () => {
      window.setTimeout(() => {
        document.getElementById('loader')?.classList.add('hidden');
      }, 2500);
    });
  };

  const initAccessibility = () => {
    document.querySelectorAll('img').forEach((img, index) => {
      if (index > 0) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('alt') || !img.getAttribute('alt')) {
        img.setAttribute('alt', 'The Tanjore Tiffin Room');
      }
    });

    document.getElementById('navHamburger')?.setAttribute('aria-label', 'Open navigation');
    document.querySelector('.menu-close')?.setAttribute('aria-label', 'Close menu');
    document.querySelector('.float-btn')?.setAttribute('aria-label', 'Contact on WhatsApp');
    document.querySelectorAll('.dish-tab').forEach(tab => tab.setAttribute('type', 'button'));
    document.querySelectorAll('.menu-cat-btn').forEach(tab => tab.setAttribute('type', 'button'));

    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileDrawer && !mobileDrawer.querySelector('.mobile-drawer-arch')) {
      const arch = document.createElement('div');
      arch.className = 'mobile-drawer-arch';
      arch.innerHTML = useIcon('icon-temple-arch');
      mobileDrawer.insertBefore(arch, mobileDrawer.firstChild);
    }
  };

  const initCursor = () => {
    if (!finePointer) return;
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    if (!cursor || !cursorRing) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    document.addEventListener('mousemove', event => {
      mx = event.clientX;
      my = event.clientY;
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
    });

    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      cursorRing.style.left = `${rx}px`;
      cursorRing.style.top = `${ry}px`;
      requestAnimationFrame(tick);
    };

    tick();

    document
      .querySelectorAll('a, button, .dish-card, .exp-feat, .hero-photo-card, .story-photo, .exp-slider-track')
      .forEach(element => {
        element.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
      });
  };

  const initHero = () => {
    const hero = document.querySelector('.hero');
    const heroTitle = hero?.querySelector('h1');
    const heroPhoto = hero?.querySelector('.hero-photo-card');
    const shell = hero?.querySelector('.hero-shell');
    if (!hero || !heroTitle || !shell) return;

    hero.querySelector('.hero-live')?.classList.add('hero-stage-badge');
    hero.querySelector('.hero-eyebrow')?.classList.add('hero-stage-eyebrow');
    heroTitle.classList.add('hero-stage-title');
    hero.querySelector('.hero-tagline')?.classList.add('hero-stage-copy');
    hero.querySelector('.hero-ctas')?.classList.add('hero-stage-cta');
    hero.querySelector('.hero-media')?.classList.add('hero-stage-media');

    if (!hero.querySelector('.hero-lotus')) {
      ['l1', 'l2', 'l3'].forEach(cls => {
        const lotus = document.createElement('div');
        lotus.className = `hero-lotus ${cls}`;
        lotus.innerHTML = useIcon('icon-lotus');
        if (!prefersReducedMotion) lotus.style.animation = 'lotusDrift 30s linear infinite';
        hero.insertBefore(lotus, shell);
      });
    }

    if (heroPhoto && !heroPhoto.querySelector('.hero-outline')) {
      const outline = document.createElement('div');
      outline.className = 'hero-outline';
      outline.innerHTML = `
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="97" height="97" rx="2"></rect>
        </svg>
      `;
      heroPhoto.appendChild(outline);
    }

    let wordCursor = 0;
    const wrapWords = element => {
      const words = element.textContent.trim().split(/\s+/);
      element.textContent = '';
      words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'hero-word';
        span.textContent = word;
        span.style.animationDelay = `${wordCursor * 0.05 + 0.2}s`;
        span.style.setProperty('--word-index', `${wordCursor}`);
        if (!prefersReducedMotion) span.style.transform = 'translateY(18px)';
        element.append(span, document.createTextNode(' '));
        wordCursor += 1;
      });
    };

    [...heroTitle.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const fragment = document.createDocumentFragment();
        node.textContent
          .trim()
          .split(/\s+/)
          .forEach(word => {
            const span = document.createElement('span');
            span.className = 'hero-word';
            span.textContent = word;
            span.style.animationDelay = `${wordCursor * 0.05 + 0.15}s`;
            span.style.setProperty('--word-index', `${wordCursor}`);
            if (!prefersReducedMotion) span.style.transform = 'translateY(18px)';
            fragment.append(span, document.createTextNode(' '));
            wordCursor += 1;
          });
        node.replaceWith(fragment);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        wrapWords(node);
      }
    });

    const particlePalette = ['var(--saffron)', 'rgba(212,160,23,0.7)', 'rgba(139,26,26,0.5)'];
    const existingParticles = hero.querySelectorAll('.spice-particle').length;
    for (let index = existingParticles; index < 12; index += 1) {
      const particle = document.createElement('div');
      const size = 3 + (index % 7);
      particle.className = 'spice-particle';
      particle.style.left = `${10 + index * 7}%`;
      particle.style.bottom = `${5 + (index % 5) * 8}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = particlePalette[index % particlePalette.length];
      particle.style.setProperty('--dur', `${6 + (index % 5)}s`);
      particle.style.setProperty('--delay', `${(index * 0.35).toFixed(2)}s`);
      hero.appendChild(particle);
    }
  };

  const initMarquee = () => {
    const strip = document.querySelector('.marquee-strip');
    if (!strip || strip.querySelector('.marquee-shell')) return;
    const items = [
      'Chicken Ghee Roast',
      `${activeBranch.rating.toFixed(1)}★ on Google`,
      `${activeBranch.reviewCount.toLocaleString('en-IN')} Reviews`,
      activeBranch.footerAddress[3],
      'Chettinad · Coastal · Kerala',
      'South Indian Cocktails',
      'Outdoor Seating',
      'Up to ₹1,000 Off'
    ];
    const icons = ['icon-chili', 'icon-lotus', 'icon-banana-leaf'];
    const rowMarkup = reverse =>
      `<div class="marquee-row ${reverse ? 'reverse' : ''}"><div class="marquee-inner">${
        items
          .concat(items)
          .map(
            (item, index) =>
              `<span class="marquee-item">${useIcon(icons[index % icons.length])}<span>${item}</span></span>`
          )
          .join('')
      }</div></div>`;
    strip.innerHTML = `<div class="marquee-shell">${rowMarkup(false)}${rowMarkup(true)}</div>`;
  };

  const initObserver = () => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          entry.target.querySelectorAll('[data-stagger]').forEach((element, index) => {
            element.style.transitionDelay = `${index * 0.08}s`;
            element.classList.add('visible');
          });
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(element => observer.observe(element));

    document.querySelectorAll('.story-stat strong').forEach(strong => {
      const config = parseCounterText(strong.textContent.trim());
      if (!config) return;
      const counterObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animateCounter(strong, config.value, config.decimals, config.prefix, config.suffix);
            counterObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.35 }
      );
      counterObserver.observe(strong);
    });
  };

  const initNavAndProgress = () => {
    const nav = document.getElementById('nav');
    const navProgress = document.getElementById('navProgress');
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.type = 'button';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = useIcon('icon-arrow-up');
    if (!document.querySelector('.back-to-top')) document.body.appendChild(backToTop);

    const updateScrollUI = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      nav?.classList.toggle('scrolled', window.scrollY > 80);
      if (navProgress) navProgress.style.transform = `scaleX(${progress})`;
      backToTop.classList.toggle('show', window.scrollY > 380);
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();

    backToTop.addEventListener('click', () => smoothScrollTo(0));
  };

  const initStory = () => {
    const storyVisual = document.querySelector('.story-visual');
    const storyText = document.querySelector('.story-text');
    const storyGallery = document.querySelector('.story-gallery');
    const mainPhoto = document.querySelector('.story-photo-main');
    const altPhoto = document.querySelector('.story-photo-alt');
    if (!storyVisual || !storyText) return;

    if (!storyVisual.querySelector('.story-ornament-line')) {
      const line = document.createElement('div');
      line.className = 'story-ornament-line';
      line.innerHTML = `
        <svg viewBox="0 0 20 200" preserveAspectRatio="none" aria-hidden="true">
          <circle cx="10" cy="10" r="6" fill="currentColor"></circle>
          <line x1="10" y1="20" x2="10" y2="180" stroke="currentColor" stroke-width="1.5"></line>
          <circle cx="10" cy="190" r="6" fill="currentColor"></circle>
        </svg>
      `;
      storyVisual.appendChild(line);
    }

    if (!storyVisual.querySelector('.kolam-canvas')) {
      const kolam = document.createElement('div');
      kolam.className = 'kolam-canvas';
      kolam.innerHTML = `
        <svg viewBox="0 0 320 320" aria-hidden="true">
          <path class="kolam-path" d="M160 88c40 0 72 32 72 72s-32 72-72 72-72-32-72-72 32-72 72-72Z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="kolam-path" d="M160 56c58 0 104 46 104 104S218 264 160 264 56 218 56 160 102 56 160 56Z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="kolam-path" d="M98 160c0-34 28-62 62-62s62 28 62 62-28 62-62 62-62-28-62-62Z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="kolam-path" d="M160 26c74 0 134 60 134 134s-60 134-134 134S26 234 26 160 86 26 160 26Z" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      `;
      storyVisual.prepend(kolam);
    }

    if (!storyText.querySelector('.story-watermark')) {
      const watermark = document.createElement('div');
      watermark.className = 'story-watermark';
      watermark.textContent = 'தஞ்சாவூர்';
      storyText.appendChild(watermark);
    }

    if (!prefersReducedMotion && mainPhoto && altPhoto && !coarsePointer) {
      const updateParallax = () => {
        const rect = storyVisual.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top) / window.innerHeight));
        mainPhoto.style.transform = `translateY(${Math.max(-20, Math.min(20, progress * -18))}px)`;
        altPhoto.style.transform = `translateY(${Math.max(-20, Math.min(20, progress * 18))}px)`;
      };
      window.addEventListener('scroll', updateParallax, { passive: true });
      updateParallax();
    }
  };

  const initDishes = () => {
    const tabs = [...document.querySelectorAll('.dish-tab')];
    const cards = [...document.querySelectorAll('.dish-card')];
    const tabsWrap = document.querySelector('.dish-tabs');
    if (!tabs.length || !cards.length || !tabsWrap) return;

    cards.forEach(card => {
      const category = card.dataset.category;
      const iconId =
        category === 'seafood'
          ? 'icon-bowl'
          : category === 'vegetarian'
            ? 'icon-banana-leaf'
            : category === 'bar-bites'
              ? 'icon-chili'
              : 'icon-flame';

      if (!card.querySelector('.dish-icon')) {
        const icon = document.createElement('div');
        icon.className = 'dish-icon';
        icon.innerHTML = useIcon(iconId);
        card.insertBefore(icon, card.firstElementChild);
      }

      if (!card.querySelector('.steam')) {
        const steam = document.createElement('div');
        steam.className = 'steam';
        steam.innerHTML = useIcon('icon-steam');
        card.appendChild(steam);
      }

      const desc = card.querySelector('.dish-desc');
      const spiceLevel = Number(card.dataset.spice || 1);
      if (desc && !card.querySelector('.spice-meter')) {
        desc.insertAdjacentHTML('afterend', buildSpiceMeter(spiceLevel));
      }

      const tag = card.querySelector('.dish-tag');
      if (tag && !card.querySelector('.dish-actions')) {
        const actions = document.createElement('div');
        actions.className = 'dish-actions';
        const quickButton = document.createElement('button');
        quickButton.className = 'quick-view-btn';
        quickButton.type = 'button';
        quickButton.textContent = 'Quick View';
        quickButton.setAttribute('aria-label', `Quick view ${card.querySelector('.dish-name')?.textContent?.trim() || 'dish'}`);
        actions.append(tag, quickButton);
        card.appendChild(actions);
        quickButton.addEventListener('click', event => {
          event.stopPropagation();
          openDishModal(card);
        });
      }

      if (card.classList.contains('hero-dish') && !card.querySelector('.today-special-ribbon')) {
        const ribbon = document.createElement('div');
        ribbon.className = 'today-special-ribbon';
        ribbon.textContent = "TODAY'S SPECIAL";
        card.appendChild(ribbon);
      }

      card.addEventListener('click', event => {
        if (event.target.closest('button, a')) return;
        openDishModal(card);
      });
    });

    if (!tabsWrap.querySelector('.dish-tab-indicator')) {
      tabsWrap.appendChild(Object.assign(document.createElement('div'), { className: 'dish-tab-indicator' }));
    }

    const indicator = tabsWrap.querySelector('.dish-tab-indicator');
    const updateIndicator = activeTab => {
      if (!indicator || !activeTab) return;
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    };

    const applyFilter = filter => {
      cards.forEach(card => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !visible);
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(button => button.classList.remove('active'));
        tab.classList.add('active');
        applyFilter(tab.dataset.filter || 'all');
        updateIndicator(tab);
      });
    });

    updateIndicator(tabsWrap.querySelector('.dish-tab.active'));

    const spiceObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll('.spice-meter svg').forEach((svg, index) => {
            if (!svg.classList.contains('active')) return;
            svg.style.animationDelay = `${index * 0.09}s`;
          });
          spiceObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    cards.forEach(card => spiceObserver.observe(card));

    if (!document.querySelector('.dish-modal')) {
      const modal = document.createElement('div');
      modal.className = 'dish-modal';
      modal.innerHTML = `
        <div class="dish-modal-panel">
          <div class="dish-modal-head">
            <div>
              <h3 data-modal-name></h3>
              <div class="dish-modal-meta">
                <span data-modal-price></span>
                <span data-modal-type></span>
                <div data-modal-spice></div>
              </div>
            </div>
            <button class="dish-modal-close" type="button" aria-label="Close dish details">${useIcon('icon-close')}</button>
          </div>
          <p class="dish-modal-copy" data-modal-copy></p>
          <div class="dish-modal-actions">
            <a class="btn-primary" data-modal-enquiry target="_blank" rel="noopener">Add to Enquiry</a>
            <button class="btn-outline" type="button" data-modal-menu>View Full Menu</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', event => {
        if (event.target === modal || event.target.closest('.dish-modal-close')) closeDishModal();
        if (event.target.closest('[data-modal-menu]')) {
          closeDishModal();
          openMenu();
        }
      });
    }
  };

  const initExperience = () => {
    const rings = document.querySelector('.exp-rings');
    const content = document.querySelector('.exp-content');
    const intro = content?.querySelector('p');
    const features = content?.querySelector('.exp-features');
    if (!rings || !content || !intro || !features) return;

    rings.innerHTML = `
      <svg viewBox="0 0 600 600" aria-hidden="true">
        <circle class="exp-ring-stroke" cx="300" cy="300" r="120" stroke="rgba(232,144,10,0.26)" stroke-width="3"></circle>
        <circle class="exp-ring-stroke alt" cx="300" cy="300" r="170" stroke="rgba(232,144,10,0.18)" stroke-width="2" stroke-dasharray="12 10"></circle>
        <circle class="exp-ring-stroke" cx="300" cy="300" r="220" stroke="rgba(251,246,238,0.1)" stroke-width="1.5" stroke-dasharray="4 12" style="animation-duration:26s"></circle>
        <circle class="exp-ring-stroke alt" cx="300" cy="300" r="270" stroke="rgba(232,144,10,0.12)" stroke-width="2.2" style="animation-duration:34s"></circle>
      </svg>
    `;

    if (!content.querySelector('.exp-slider')) {
      const sources = [
        {
          src: document.querySelector('.hero-photo-card img')?.src,
          alt: 'Signature cocktail and dinner setting at The Tanjore Tiffin Room',
          title: 'Evening Pour'
        },
        {
          src: document.querySelector('.story-photo-main img')?.src,
          alt: 'Dining table at The Tanjore Tiffin Room',
          title: 'Fine-Dining Room'
        },
        {
          src: document.querySelector('.story-photo-alt img')?.src,
          alt: 'Candlelit table at The Tanjore Tiffin Room',
          title: 'Candlelit Tables'
        },
        {
          src: document.querySelector('.exp-photo-band img')?.src,
          alt: 'Full cocktail bar at The Tanjore Tiffin Room',
          title: 'The Bar'
        }
      ].filter(item => item.src);

      const slider = document.createElement('div');
      slider.className = 'exp-slider';
      slider.setAttribute('data-stagger', '');
      slider.style.transitionDelay = '0.32s';
      slider.innerHTML = `
        <div class="exp-slider-track">
          ${sources
            .map(
              item => `
                <figure class="exp-slide">
                  <img src="${item.src}" alt="${item.alt}" loading="lazy">
                  <figcaption>${item.title}</figcaption>
                </figure>
              `
            )
            .join('')}
        </div>
        <div class="exp-slider-dots">
          ${sources.map((_, index) => `<button type="button" aria-label="Go to experience slide ${index + 1}"></button>`).join('')}
        </div>
      `;
      intro.insertAdjacentElement('afterend', slider);

      const track = slider.querySelector('.exp-slider-track');
      const dots = [...slider.querySelectorAll('.exp-slider-dots button')];
      const syncDots = () => {
        const slideWidth = track.firstElementChild?.getBoundingClientRect().width || 1;
        const activeIndex = Math.round(track.scrollLeft / (slideWidth + 16));
        dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
      };

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          const slide = track.children[index];
          if (!slide) return;
          track.scrollTo({
            left: slide.offsetLeft,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        });
      });

      track.addEventListener('scroll', syncDots, { passive: true });
      syncDots();
    }
  };

  const initReviews = () => {
    const section = document.querySelector('.reviews');
    const originalWrap = section?.querySelector('.reviews-track-wrap');
    const ratingNum = section?.querySelector('.rating-num');
    const starsRow = section?.querySelector('.stars-row');
    if (!section || !originalWrap || !ratingNum || !starsRow) return;

    ratingNum.textContent = activeBranch.rating.toFixed(1);
    starsRow.innerHTML = '<span class="star">★</span>'.repeat(5);

    if (!section.querySelector('.reviews-rows')) {
      const rows = document.createElement('div');
      rows.className = 'reviews-rows';
      originalWrap.replaceWith(rows);
      rows.appendChild(originalWrap);

      const secondWrap = document.createElement('div');
      secondWrap.className = 'reviews-track-wrap';
      secondWrap.innerHTML = `
        <div class="reviews-track second">
          <div class="review-card">
            <p class="review-text">"Our anniversary dinner felt genuinely special. Warm service, beautiful lighting, and the ghee roast still lives in my head."</p>
            <div class="review-author"><div class="author-avatar">M</div><div class="author-info"><strong>Megha P.</strong><span>Local Guide · 6 days ago</span></div></div>
          </div>
          <div class="review-card">
            <p class="review-text">"The seafood here is exceptional. Prawn Moilee, cocktails, and that late-night energy make this one of the easiest places to recommend for dinner."</p>
            <div class="review-author"><div class="author-avatar">V</div><div class="author-info"><strong>Vivek L.</strong><span>71 reviews · 2 weeks ago</span></div></div>
          </div>
          <div class="review-card">
            <p class="review-text">"We came for dinner and stayed for dessert and one more drink. The room feels polished without losing the appetite and warmth."</p>
            <div class="review-author"><div class="author-avatar">T</div><div class="author-info"><strong>Tanvi R.</strong><span>Local Guide · last month</span></div></div>
          </div>
          <div class="review-card">
            <p class="review-text">"Rare to find a place this stylish that still cooks with real depth. The biryani and peppery small plates were the reason we started planning the next visit."</p>
            <div class="review-author"><div class="author-avatar">H</div><div class="author-info"><strong>Harsh S.</strong><span>22 reviews · 5 weeks ago</span></div></div>
          </div>
          <div class="review-card">
            <p class="review-text">"Our anniversary dinner felt genuinely special. Warm service, beautiful lighting, and the ghee roast still lives in my head."</p>
            <div class="review-author"><div class="author-avatar">M</div><div class="author-info"><strong>Megha P.</strong><span>Local Guide · 6 days ago</span></div></div>
          </div>
          <div class="review-card">
            <p class="review-text">"The seafood here is exceptional. Prawn Moilee, cocktails, and that late-night energy make this one of the easiest places to recommend for dinner."</p>
            <div class="review-author"><div class="author-avatar">V</div><div class="author-info"><strong>Vivek L.</strong><span>71 reviews · 2 weeks ago</span></div></div>
          </div>
          <div class="review-card">
            <p class="review-text">"We came for dinner and stayed for dessert and one more drink. The room feels polished without losing the appetite and warmth."</p>
            <div class="review-author"><div class="author-avatar">T</div><div class="author-info"><strong>Tanvi R.</strong><span>Local Guide · last month</span></div></div>
          </div>
          <div class="review-card">
            <p class="review-text">"Rare to find a place this stylish that still cooks with real depth. The biryani and peppery small plates were the reason we started planning the next visit."</p>
            <div class="review-author"><div class="author-avatar">H</div><div class="author-info"><strong>Harsh S.</strong><span>22 reviews · 5 weeks ago</span></div></div>
          </div>
        </div>
      `;
      rows.appendChild(secondWrap);
    }

    section.querySelectorAll('.review-card').forEach(card => {
      if (!card.querySelector('.google-mark')) card.insertAdjacentHTML('beforeend', googleMark);
    });

    const ratingObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateCounter(ratingNum, activeBranch.rating, 1, '', '', 1500);
          ratingObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );
    ratingObserver.observe(ratingNum);
  };

  const initReserve = () => {
    const infoItems = [...document.querySelectorAll('.info-item')];

    infoItems.forEach((item, index) => {
      item.setAttribute('data-stagger', '');
      item.style.transitionDelay = `${index * 0.08}s`;
      const icon = item.querySelector('.info-icon');
      const label = item.querySelector('strong')?.textContent?.trim();
      const iconMap = {
        Address: 'icon-map-pin',
        Hours: 'icon-clock',
        Reservations: 'icon-phone',
        Payment: 'icon-card'
      };
      if (icon && label && iconMap[label]) icon.innerHTML = useIcon(iconMap[label]);
    });

    const hoursItem = infoItems.find(item => item.querySelector('strong')?.textContent?.trim() === 'Hours');
    if (hoursItem && !hoursItem.querySelector('.opening-clock')) {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const hourDeg = hours * 30 + minutes * 0.5;
      const minuteDeg = minutes * 6;
      const clock = document.createElement('div');
      clock.className = 'opening-clock';
      clock.innerHTML = `
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="2"></circle>
          <line x1="24" y1="24" x2="24" y2="13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" transform="rotate(${hourDeg} 24 24)"></line>
          <line x1="24" y1="24" x2="24" y2="9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" transform="rotate(${minuteDeg} 24 24)"></line>
          <circle cx="24" cy="24" r="2" fill="currentColor"></circle>
        </svg>
        <span>Open and preparing the room right now</span>
      `;
      hoursItem.querySelector('.info-content')?.appendChild(clock);
    }

    document.querySelectorAll('.form-group').forEach(group => {
      const field = group.querySelector('input, select, textarea');
      if (!field || field.parentElement.classList.contains('form-shell')) return;

      const shell = document.createElement('div');
      shell.className = 'form-shell';
      field.parentNode.insertBefore(shell, field);
      shell.appendChild(field);

      field.addEventListener('focus', () => shell.classList.add('focused'));
      field.addEventListener('blur', () => shell.classList.remove('focused'));

      if (field.matches('input[type="text"], input[type="tel"], textarea')) {
        const counter = document.createElement('span');
        counter.className = 'char-counter';
        const limit = field.getAttribute('maxlength') || 40;
        const update = () => {
          counter.textContent = `${field.value.length}/${limit}`;
        };
        update();
        field.addEventListener('input', update);
        group.appendChild(counter);
      }
    });

    const infoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          infoObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    infoItems.forEach(item => infoObserver.observe(item));

  };

  const initMenuOverlay = () => {
    const overlay = document.getElementById('menuOverlay');
    const cats = overlay?.querySelector('.menu-cats');
    const body = overlay?.querySelector('.menu-body');
    if (!overlay || !cats || !body) return;

    if (!overlay.querySelector('.menu-curtain')) {
      const curtain = document.createElement('div');
      curtain.className = 'menu-curtain';
      overlay.insertBefore(curtain, overlay.firstChild);
    }

    if (!overlay.querySelector('.menu-stage')) {
      const stage = document.createElement('div');
      stage.className = 'menu-stage';

      const sidebar = document.createElement('aside');
      sidebar.className = 'menu-sidebar';
      sidebar.innerHTML = '<div class="menu-sidebar-list"></div>';

      const content = document.createElement('div');
      content.className = 'menu-stage-main';
      content.append(cats, body);

      stage.append(sidebar, content);
      overlay.appendChild(stage);

      const sidebarList = sidebar.querySelector('.menu-sidebar-list');
      [...cats.querySelectorAll('.menu-cat-btn')].forEach((button, index) => {
        const side = document.createElement('button');
        side.className = `menu-side-btn ${index === 0 ? 'active' : ''}`;
        side.type = 'button';
        side.textContent = button.textContent;
        side.addEventListener('click', () => switchMenuCat(index));
        sidebarList.appendChild(side);
        button.addEventListener('click', () => switchMenuCat(index));
      });
    }

    switchMenuCat(0);

    document.querySelectorAll('[data-open-menu]').forEach(trigger => {
      trigger.addEventListener('click', event => {
        event.preventDefault();
        openMenu();
      });
    });
  };

  const initFooter = () => {
    const footer = document.querySelector('footer');
    const brand = footer?.querySelector('.footer-brand');
    const socialLinks = footer?.querySelector('.social-links');
    const floatCta = document.querySelector('.float-cta');
    if (!footer || !brand || !socialLinks || !floatCta) return;

    if (!document.querySelector('.footer-wave')) {
      const wave = document.createElement('div');
      wave.className = 'footer-wave';
      wave.innerHTML = `
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 80C120 40 220 40 340 80s220 40 340 0 220-40 340 0 220 40 420-10V120H0Z" fill="currentColor"></path>
        </svg>
      `;
      footer.parentNode.insertBefore(wave, footer);
    }

    if (!brand.querySelector('.footer-brand-mark')) {
      const mark = document.createElement('div');
      mark.className = 'footer-brand-mark';
      mark.innerHTML = useIcon('icon-lotus');
      brand.querySelector('.logo')?.insertAdjacentElement('afterend', mark);
    }

    const links = [...socialLinks.querySelectorAll('.social-link')];
    const mapsLink = links[1]?.getAttribute('href');
    const socialMarkup = [
      { label: 'Instagram', icon: useIcon('icon-instagram'), href: links[0]?.getAttribute('href') || '#' },
      { label: 'Google Maps', icon: useIcon('icon-map-pin'), href: mapsLink && mapsLink !== '#' ? mapsLink : mapsBase },
      {
        label: 'Zomato',
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14v3L9 18h10v3H5v-3L15 9H5Z" fill="currentColor"></path></svg>',
        href: links[2]?.getAttribute('href') || '#'
      },
      {
        label: 'Swiggy',
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.3 3c3.3 0 5.7 2.2 5.7 5.4 0 1.9-.9 3.6-2.4 4.8l-4.3 7.8c-.3.6-1.2.6-1.5 0-.7-1.2-1-2.4-.8-3.6.3-2.1 2.1-3.6 4.1-3.6.6 0 1.2.1 1.7.3-.2-.8-.9-1.5-1.9-1.5-1.5 0-2.8 1.2-2.8 2.8H7.8C7.8 8.1 9.8 3 12.3 3Z" fill="currentColor"></path></svg>',
        href: '#'
      }
    ];

    socialLinks.innerHTML = socialMarkup
      .map(
        item =>
          `<a class="social-link" href="${item.href}" aria-label="${item.label}" title="${item.label}">${item.icon}</a>`
      )
      .join('');

    const fan = document.createElement('div');
    fan.className = 'float-fan';
    fan.innerHTML = `
      <a class="float-mini" href="#reserve">Reserve</a>
      <a class="float-mini" href="${waBase}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="float-mini" href="${mapsBase}" target="_blank" rel="noopener">Directions</a>
      <a class="float-mini" href="tel:${activeBranch.phoneTel}">Call</a>
    `;
    if (!floatCta.querySelector('.float-fan')) floatCta.appendChild(fan);

    const mainButton = floatCta.querySelector('.float-btn');
    const label = floatCta.querySelector('.float-label');
    if (mainButton) {
      mainButton.href = waBase;
      mainButton.innerHTML = useIcon('icon-message');
      mainButton.target = '_blank';
      mainButton.rel = 'noopener';
    }
    if (label) label.textContent = 'Reserve or Message';

    if (!document.querySelector('.mobile-action-bar')) {
      const bar = document.createElement('div');
      bar.className = 'mobile-action-bar';
      bar.innerHTML = `
        <a class="call-btn" href="tel:${activeBranch.phoneTel}">Call</a>
        <a class="wa-btn" href="${waBase}" target="_blank" rel="noopener">WhatsApp</a>
        <a class="call-btn" href="${mapsBase}" target="_blank" rel="noopener">Directions</a>
      `;
      document.body.appendChild(bar);
      window.setTimeout(() => bar.classList.add('show'), 2000);
    }
  };

  const initMosaic = () => {
    document.querySelectorAll('.mosaic-item').forEach((item, index) => {
      if (!item.querySelector('.mosaic-panel-overlay')) {
        const title = item.querySelector('h4')?.textContent || `Space ${index + 1}`;
        const copy = item.querySelector('p')?.textContent || 'An atmospheric corner of the restaurant.';
        const overlay = document.createElement('div');
        overlay.className = 'mosaic-panel-overlay';
        overlay.innerHTML = `
          ${item.classList.contains('span-row') ? useIcon('icon-banana-leaf') : useIcon(index % 2 === 0 ? 'icon-lotus' : 'icon-banana-leaf')}
          <div class="mosaic-label">
            <h4>${title}</h4>
            <p>${copy}</p>
          </div>
        `;
        item.appendChild(overlay);
      }
    });
  };

  const initKeyboard = () => {
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      closeDishModal();
      closeMenu();
      closeDrawer();
    });
  };

  addStaggerAttributes();
  initBranchRouting();
  initLoader();
  initAccessibility();
  initCursor();
  initHero();
  initMarquee();
  initCinematicJourney();
  initObserver();
  initNavAndProgress();
  initStory();
  initDishes();
  initExperience();
  initReviews();
  initReserve();
  initMenuOverlay();
  initFooter();
  initMosaic();
  initKeyboard();
});
