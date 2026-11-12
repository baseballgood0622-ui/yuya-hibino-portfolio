/**
 * GROWTH BASE オンラインサロン LP インタラクション制御スクリプト (script.js)
 *
 * 【このファイルの主な役割】
 * 1. スマートフォン・タブレット用メニューの開閉制御（MENU / CLOSE テキスト切替）
 * 2. スクロール位置に応じたナビゲーションリンクの現在地ハイライト
 * 3. スクロールに応じた穏やかなフェードアップ表示（.reveal-up）
 * 4. よくある質問（FAQ）アコーディオンの開閉制御
 * 5. 要件先行型お問い合わせフォームの入力チェックと、誠実な「現在窓口準備中」案内表示
 *
 * ※外部ライブラリには一切依存せず、標準のJavaScriptのみで軽量に動作します。
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. モバイルメニューの開閉制御（画面幅 1024px 以下）
     アイコンを使わず、ボタン文字列の「MENU」「CLOSE」を切り替えて状態を伝えます。
     ======================================================================== */
  const menuTrigger = document.getElementById('menu-trigger');
  const mobileNav = document.getElementById('mobile-nav');
  const siteHeader = document.getElementById('site-header');

  /**
   * モバイルメニューの開閉状態をまとめて更新する関数
   * @param {boolean} shouldOpen - trueで開く、falseで閉じる
   */
  const setMobileMenuState = (shouldOpen) => {
    if (!menuTrigger || !mobileNav) return;

    menuTrigger.setAttribute('aria-expanded', String(shouldOpen));
    menuTrigger.textContent = shouldOpen ? 'CLOSE' : 'MENU';
    menuTrigger.setAttribute('aria-label', shouldOpen ? 'メニューを閉じる' : 'メニューを開く');
    mobileNav.hidden = !shouldOpen;
  };

  if (menuTrigger && mobileNav) {
    // MENU / CLOSE ボタンを押したときの切り替え
    menuTrigger.addEventListener('click', () => {
      const isExpanded = menuTrigger.getAttribute('aria-expanded') === 'true';
      setMobileMenuState(!isExpanded);
    });

    // メニュー内のリンクを押したら自動でメニューを閉じて目的のセクションへ移動
    const mobileLinks = mobileNav.querySelectorAll('a[href^="#"]');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        setMobileMenuState(false);
      });
    });

    // キーボードの Escape キーを押したときにメニューを閉じてボタンへフォーカスを戻す
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuTrigger.getAttribute('aria-expanded') === 'true') {
        setMobileMenuState(false);
        menuTrigger.focus();
      }
    });

    // ヘッダーの外側をクリックしたときにメニューを閉じる
    document.addEventListener('click', (event) => {
      if (
        menuTrigger.getAttribute('aria-expanded') === 'true' &&
        siteHeader &&
        !siteHeader.contains(event.target)
      ) {
        setMobileMenuState(false);
      }
    });

    // 画面幅をPCサイズ（1025px以上）に広げた際はモバイルメニューを自動で閉じる
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && menuTrigger.getAttribute('aria-expanded') === 'true') {
        setMobileMenuState(false);
      }
    });
  }

  /* ========================================================================
     2. 現在表示中のセクションに応じたナビゲーションの控えめなアクティブ表示
     ======================================================================== */
  const desktopNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[href^="#"]');

  // ナビゲーションに対応する対象セクション一覧を取得
  const trackedSectionIds = ['concept', 'activities', 'overview', 'target', 'faq'];
  const trackedSections = trackedSectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const contactSection = document.getElementById('contact');

  const updateActiveNavLink = () => {
    // 画面上部から30%の位置を「現在読んでいる基準ライン」として判定
    const referenceLine = window.scrollY + window.innerHeight * 0.3;
    let currentActiveId = '';

    // お問い合わせセクションに到達したら上部5項目のアクティブ表示を解除
    if (contactSection && referenceLine >= contactSection.offsetTop) {
      currentActiveId = '';
    } else {
      trackedSections.forEach((section) => {
        if (referenceLine >= section.offsetTop) {
          currentActiveId = section.id;
        }
      });
    }

    const applyActiveClass = (links) => {
      links.forEach((link) => {
        const targetId = link.getAttribute('href').slice(1);
        if (targetId === currentActiveId) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'true');
        } else {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      });
    };

    applyActiveClass(desktopNavLinks);
    applyActiveClass(mobileNavLinks);
  };

  // スクロール負荷を抑えるため requestAnimationFrame で間引いて実行
  let isScrollTicking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!isScrollTicking) {
        window.requestAnimationFrame(() => {
          updateActiveNavLink();
          isScrollTicking = false;
        });
        isScrollTicking = true;
      }
    },
    { passive: true }
  );
  updateActiveNavLink();

  /* ========================================================================
     3. スクロールフェードアップ演出（.reveal-up）
     OS設定で「視覚効果を減らす」が有効な場合はアニメーションせず即座に表示します。
     ======================================================================== */
  const revealElements = document.querySelectorAll('.reveal-up');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    // 最初の画面（ファーストビュー）内の要素は待たせずにすぐ表示する
    const heroReveals = document.querySelectorAll('.hero-section .reveal-up');
    heroReveals.forEach((el, index) => {
      window.setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 90);
    });

    // スクロールして画面に12%入ったタイミングで一度だけ穏やかに表示する
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => {
      if (!el.closest('.hero-section')) {
        revealObserver.observe(el);
      }
    });
  }

  /* ========================================================================
     4. FAQ（よくある質問）アコーディオンの開閉制御
     ======================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    // 初期状態の整合性を設定（Q1は開いた状態、Q2〜Q4は閉じた状態）
    const initiallyOpen = item.classList.contains('is-open');
    trigger.setAttribute('aria-expanded', String(initiallyOpen));
    if ('inert' in panel) {
      panel.inert = !initiallyOpen;
    }

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      const nextState = !isOpen;

      item.classList.toggle('is-open', nextState);
      trigger.setAttribute('aria-expanded', String(nextState));
      if ('inert' in panel) {
        panel.inert = !nextState;
      }
    });
  });

  /* ========================================================================
     5. 要件先行型お問い合わせフォームの制御と誠実な「準備中」案内表示
     【変更ポイント：将来フォームの送信先を開設する場合】
     現在は送信先が未設定（準備中）であるため、event.preventDefault() で送信を止め、
     「現在窓口準備中のため送信できません」という案内と入力内容の確認プレビューを表示しています。
     将来、実際のメール送信サービス（Formspree等）や自社サーバーへ接続する際は、
     下の submit イベント内の「準備中案内表示パート」を実際の送信処理に置き換えてください。
     ======================================================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const radioInputs = contactForm.querySelectorAll('input[name="inquiry_type"]');
    const radioCards = contactForm.querySelectorAll('.radio-card');
    const fieldsetInquiryType = document.getElementById('fieldset-inquiry-type');
    const detailInput = document.getElementById('inquiry-detail');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');

    const errorType = document.getElementById('error-inquiry-type');
    const errorName = document.getElementById('error-contact-name');
    const errorEmail = document.getElementById('error-contact-email');

    const feedbackBox = document.getElementById('form-status-feedback');
    const previewType = document.getElementById('preview-type');
    const previewDetail = document.getElementById('preview-detail');
    const previewName = document.getElementById('preview-name');
    const previewEmail = document.getElementById('preview-email');

    /**
     * ラジオボタンの選択状態に合わせてカードの見た目クラスを更新する関数
     */
    const syncRadioCardSelection = () => {
      radioCards.forEach((card) => {
        const input = card.querySelector('input[type="radio"]');
        if (input) {
          card.classList.toggle('is-selected', input.checked);
        }
      });
    };

    // ラジオ選択時のハイライト更新＆エラー解除・キーボードフォーカス補助
    radioInputs.forEach((input) => {
      input.addEventListener('change', () => {
        syncRadioCardSelection();
        clearFieldError(fieldsetInquiryType, errorType);
      });

      input.addEventListener('focus', () => {
        const parentCard = input.closest('.radio-card');
        if (parentCard && input.matches(':focus-visible')) {
          parentCard.classList.add('is-focused');
        }
      });

      input.addEventListener('blur', () => {
        const parentCard = input.closest('.radio-card');
        if (parentCard) {
          parentCard.classList.remove('is-focused');
        }
      });
    });

    /**
     * エラーメッセージを表示し、アクセシビリティ属性を設定する補助関数
     */
    const showFieldError = (targetEl, errorEl, message) => {
      if (targetEl) {
        targetEl.setAttribute('aria-invalid', 'true');
      }
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.hidden = false;
      }
    };

    /**
     * エラーメッセージを消去する補助関数
     */
    const clearFieldError = (targetEl, errorEl) => {
      if (targetEl) {
        targetEl.removeAttribute('aria-invalid');
      }
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.hidden = true;
      }
    };

    // お名前・メールアドレスの入力中にエラーをリアルタイム解除
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') {
          clearFieldError(nameInput, errorName);
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const emailVal = emailInput.value.trim();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          clearFieldError(emailInput, errorEmail);
        }
      });
    }

    // 初期表示時のラジオカード状態を同期
    syncRadioCardSelection();

    // フォーム送信ボタン押下時の処理
    contactForm.addEventListener('submit', (event) => {
      // 【重要】現在お問い合わせ窓口は未設定（準備中）のため、外部へのデータ送信を確実に停止します
      event.preventDefault();

      let firstErrorElement = null;

      // 1. Step 1：お問い合わせ要件（必須）のチェック
      const selectedRadio = contactForm.querySelector('input[name="inquiry_type"]:checked');
      if (!selectedRadio) {
        showFieldError(
          fieldsetInquiryType,
          errorType,
          'お問い合わせ要件を1つお選びください。'
        );
        firstErrorElement = firstErrorElement || radioInputs[0];
      } else {
        clearFieldError(fieldsetInquiryType, errorType);
      }

      // 2. Step 2：お名前（必須）のチェック
      const nameValue = nameInput ? nameInput.value.trim() : '';
      if (!nameValue) {
        showFieldError(
          nameInput,
          errorName,
          'お名前をご入力ください（ご相談段階ではニックネームでも可能です）。'
        );
        firstErrorElement = firstErrorElement || nameInput;
      } else {
        clearFieldError(nameInput, errorName);
      }

      // 3. Step 2：メールアドレス（必須・形式）のチェック
      const emailValue = emailInput ? emailInput.value.trim() : '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue) {
        showFieldError(
          emailInput,
          errorEmail,
          'メールアドレスをご入力ください。'
        );
        firstErrorElement = firstErrorElement || emailInput;
      } else if (!emailPattern.test(emailValue)) {
        showFieldError(
          emailInput,
          errorEmail,
          'メールアドレスの形式をご確認のうえ、正しくご入力ください（例：your-name@example.com）。'
        );
        firstErrorElement = firstErrorElement || emailInput;
      } else {
        clearFieldError(emailInput, errorEmail);
      }

      // 未入力や形式エラーがある場合は案内枠を隠し、最初のエラー項目へフォーカスを移動
      if (firstErrorElement) {
        if (feedbackBox) {
          feedbackBox.hidden = true;
        }
        firstErrorElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
        firstErrorElement.focus({ preventScroll: true });
        return;
      }

      // =====================================================================
      // 必須項目がすべて正しく入力されている場合：
      // 決して「送信完了しました」と偽装せず、現在は窓口準備中のため送信されない旨と
      // 入力内容の確認プレビュー（手元確認用）を誠実に表示します。
      // =====================================================================
      const detailValue = detailInput ? detailInput.value.trim() : '';

      if (previewType) previewType.textContent = selectedRadio.value;
      if (previewDetail) previewDetail.textContent = detailValue || '（未記入）';
      if (previewName) previewName.textContent = nameValue;
      if (previewEmail) previewEmail.textContent = emailValue;

      if (feedbackBox) {
        feedbackBox.hidden = false;
        feedbackBox.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
        feedbackBox.focus({ preventScroll: true });
      }
    });
  }
});
