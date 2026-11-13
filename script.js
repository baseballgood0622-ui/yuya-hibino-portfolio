/**
 * ==========================================================================
 * YUYA HIBINO PORTFOLIO JAVASCRIPT
 * ==========================================================================
 * 本スクリプトは、初心者の方でも保守・編集しやすいよう、
 * 各機能ごとにわかりやすい日本語コメントを添えて実装しています。
 * 
 * 【主な機能一覧】
 * 1. 掲載実績データ（WORKS詳細データ管理）★作品の追加・文言変更はここ
 * 2. ページローダーのフェードアウト処理
 * 3. スムーズスクロール機能（ヘッダー・アンカーリンク）
 * 4. スクロール連動のヘッダースタイル変化＆現在地アクティブ表示
 * 5. スクロールフェードインアニメーション（Intersection Observer）
 * 6. 実績詳細モーダルの表示・非表示・キーボード操作
 * 7. お問い合わせフォームのバリデーション＆送信完了サンクスモーダル
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. 掲載実績詳細データ（WORKS DATA）
   ★新しい実績を追加したり、文章を編集したい場合はこのオブジェクトを変更します。
   ========================================================================== */
const worksData = {
  // 案件1: NextBridge 株式会社
  nextbridge: {
    id: 'nextbridge',
    title: 'NextBridge 株式会社',
    sub: 'AI技術×事業戦略を加速する次世代DXコンサルティング企業',
    category: 'ART DIRECTION / WEB DESIGN',
    eyecatch: './assets/tmb_nextbridge.svg',
    client: 'NextBridge Inc.',
    service: 'AI・DXコンサルティング / システムインテグレーション',
    scope: 'アートディレクション、UI設計、Webデザイン、フロントエンド実装',
    year: '2026年',
    background: '最先端の生成AIを活用したエンタープライズ向けDX支援を行う同社。技術力は国内トップクラスであるものの、旧Webサイトでは専門用語が多く、一般企業の経営層・意思決定層に強みが直感的に伝わりにくいという課題がありました。',
    solutions: [
      '知的でミニマルなデザイン言語：黒・白・深みのあるスレートグレーを基調とし、装飾を極限まで削ぎ落とすことで「知性と信頼」を視覚化。',
      '直感的なサービス図解：難解なAIソリューションを3つの導入ステップに整理し、初心者でも30秒で理解できるインフォグラフィックを作成。',
      '快適な操作性：画面遷移を極力減らし、スムーズなインタラクション（滑らかな動き）を実装。'
    ],
    result: '「サイトリニューアル後、上場企業やメガベンチャーからのWeb経由問い合わせが前年比180%に増加しました。特に商談冒頭で『Webサイトが非常に見やすく、御社の思想がよく理解できた』とお褒めいただくことが増え、成約までのスピードが大幅に短縮されています。」'
  },

  // 案件2: Trattoria Sole
  sole: {
    id: 'sole',
    title: 'Trattoria Sole（トラットリア ソーレ）',
    sub: '旬の恵みとワインを愉しむ大人の本格イタリアン',
    category: 'BRANDING / WEB DESIGN',
    eyecatch: './assets/tmb_sole.svg',
    client: '株式会社 ソーレ・ダイニング',
    service: '飲食・イタリアンレストラン / ワインバー',
    scope: 'ブランドアイデンティティ設計、ロゴリファイン、Webデザイン、撮影ディレクション',
    year: '2026年',
    background: '地域で長年愛されてきた名店が、内装リニューアルに合わせてWebサイトを一新。グルメサイト（ポータルサイト）への掲載手数料依存から脱却し、自社Webサイトからの直接予約を増やしたいというご要望でした。',
    solutions: [
      '温度感のあるアースカラー：トスカーナ地方の温かみを思わせるテラコッタとオリーブグリーンを採用。',
      'シズル感と物語の提示：旬の有機野菜や厳選ワインの魅力を、引き締まったタイポグラフィと高精細な写真で構成。',
      'ストレスのない予約体験：どの画面からでも2タップで空席確認・予約へ進める直感的なUIボタンを設置。'
    ],
    result: '「グルメサイト経由の予約比率が大幅に下がり、自社サイト経由のWeb予約が2.4倍に成長しました。客単価の高いディナーコースや記念日利用の予約が定着し、予約手数料のコスト削減にも大きく貢献しています。」'
  },

  // 案件3: Urban Closet
  urban: {
    id: 'urban',
    title: 'Urban Closet（アーバン クローゼット）',
    sub: '洗練と機能美を纏うミニマル・ワードローブブランド',
    category: 'ART DIRECTION / EC DESIGN',
    eyecatch: './assets/tmb_urban.svg',
    client: 'アーバン・アパレル・ラボ 株式会社',
    service: 'D2Cアパレルブランド / オンラインストア',
    scope: 'アートディレクション、ECサイトUI/UX設計、Shopifyカスタマイズ',
    year: '2025年',
    background: '「日常に寄り添うミニマリズム」を掲げる新進気鋭のD2Cブランド。スマートフォンでの購入時に「生地の質感がわかりにくい」「購入までのステップが多くて途中で離脱してしまう」という問題がありました。',
    solutions: [
      '引き算のECインターフェース：バナーや余計な装飾を排除し、服の立体感やドレープ（生地のたわみ）が鮮明に見える超高精細ギャラリーを実装。',
      '迷わないサイズガイド：着用モデルの身長・体型に応じたサイズ比較モジュールを新設。',
      '1クリック決済導線：カート投入から購入完了までの手順を最適化し、入力負担を大幅に軽減。'
    ],
    result: '「カゴ落ち（商品をカートに入れたまま離脱すること）が劇的に減少し、購入完了率（CVR）が35%向上しました。お客様からも『写真が綺麗で実物のイメージが湧きやすい』と大好評です。」'
  },

  // 案件4: Growth Base Shibuya
  growth: {
    id: 'growth',
    title: 'Growth Base Shibuya（グロースベース）',
    sub: '挑戦者が集う次世代シェアオフィス＆コワーキングスペース',
    category: 'UI/UX DESIGN / WEB DESIGN',
    eyecatch: './assets/tmb_growth.svg',
    client: 'グロース・プロパティーズ 株式会社',
    service: 'コワーキングスペース / インキュベーション施設',
    scope: 'コンセプト設計、UI/UX設計、Webサイト制作、プロモーション動画演出',
    year: '2025年',
    background: '渋谷エリアに新設されたスタートアップ・クリエイター特化型オフィス。競合施設が多い中で、「単なる作業場所ではなく、事業が急成長するコミュニティであること」を強く打ち出し、オープン前の事前予約を獲得する必要がありました。',
    solutions: [
      '活動の熱量を伝える動的レイアウト：施設内部の活気あるスチール写真と、洗練されたタイポグラフィを大胆にレイアウト。',
      '3Dフロアマップ＆設備シミュレーション：個室プラン・フリーアドレス席の利用イメージが直感的に掴めるインタラクティブUIを採用。',
      '30秒で完了する内覧予約フォーム：面倒な項目を削ぎ落とし、カレンダーから即時予約できる仕組みを構築。'
    ],
    result: '「オープン前の先行内覧会は満員御礼となり、開業からわずか3ヶ月で全個室が満室となりました。コワーキング会員も目標の150%を突破し、活気あるコミュニティが形成されています。」'
  },

  // 案件5: Hair Salon Riche
  riche: {
    id: 'riche',
    title: 'Hair Salon Riche（ヘアサロン リッシュ）',
    sub: '自然美と贅沢な癒しを届ける完全予約制プライベートサロン',
    category: 'WEB DESIGN / PHOTOGRAPHY',
    eyecatch: './assets/tmb_riche.svg',
    client: 'Private Salon Riche',
    service: '美容室・プライベートサロン',
    scope: 'Webサイト制作、写真撮影・レタッチ、ブランディング',
    year: '2025年',
    background: 'マンツーマンの丁寧な施術が評判の隠れ家サロン。「安売りクーポンサイトからの来店客」ではなく、「サロンの技術や想いに共感し、長く通ってくださる本物志向のお客様」との出会いを求めていらっしゃいました。',
    solutions: [
      '静謐で清潔感のある世界観：淡いグレージュと繊細な明朝フォントを組み合わせ、訪れるだけで心が落ち着くサロンの空間美を再現。',
      'こだわり施術プロセスの可視化：オーガニック薬剤の選定理由やカウンセリングの流れを美しい写真と丁寧な文章で紹介。',
      'LINE公式連携：24時間いつでも気軽に質問・予約ができるチャット相談導線を整備。'
    ],
    result: '「クーポン目当ての単発利用が減り、髪のケアを大切にされる素敵なお客様ばかりがWebサイトを通じて訪れてくださるようになりました。客単価は30%向上し、次回予約率は85%を超えています。」'
  },

  // 案件6: Cafe Blossom
  blossom: {
    id: 'blossom',
    title: 'Cafe Blossom（カフェ ブロッサム）',
    sub: '日常を忘れ、豊かな香りに包まれるスペシャリティカフェ',
    category: 'BRANDING / WEB DESIGN',
    eyecatch: './assets/tmb_blossom.svg',
    client: 'Blossom Coffee Roasters',
    service: 'スペシャリティコーヒー専門店 / ロースタリー',
    scope: 'ブランドアイデンティティ、Webデザイン、パッケージデザイン監修',
    year: '2024年',
    background: '世界各国から厳選した豆を自家焙煎するスペシャリティカフェ。実店舗の常連客のみならず、遠方のお客様へのオンライン豆販売や、イベント告知のハブとなるWebサイトが求められていました。',
    solutions: [
      '五感を刺激するデザイン：焙煎の香ばしさや珈琲の温もりが伝わる、深みのあるブラウンとクラフト紙のようなテクスチャの融合。',
      '味わいチャート（フレーバーホイール）：「苦味・酸味・コク・フルーティーさ」を視覚的にチャート化し、珈琲初心者でも好みの豆を直感的に選べる設計。',
      '店舗ストーリーの連載：豆の買い付けから焙煎への情熱をショートストーリーとして掲載。'
    ],
    result: '「オンラインショップでのコーヒー豆の定期便契約が前年比で2倍以上に成長しました。店舗にも『Webサイトを見て雰囲気に一目惚れした』という新しいお客様が連日訪れてくださっています。」'
  }
};

/* ==========================================================================
   2. ページ読み込み完了時（ローダー解除）
   ========================================================================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('js-loader');
  if (loader) {
    // わずかに余韻を持たせてからローダーをフェードアウト
    setTimeout(() => {
      loader.classList.add('is-loaded');
    }, 400);
  }
});

// 万が一画像ロード等で時間がかかった場合のフォールバック（最大1.5秒で自動解除）
setTimeout(() => {
  const loader = document.getElementById('js-loader');
  if (loader && !loader.classList.contains('is-loaded')) {
    loader.classList.add('is-loaded');
  }
}, 1500);

/* ==========================================================================
   3. DOM読み込み後のメイン処理
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     3.1 ヘッダースクロール追従 ＆ ナビゲーション現在地アクティブ表示
  ------------------------------------------------------------------------ */
  const header = document.getElementById('js-header');
  const navLinks = document.querySelectorAll('.header_inner_listItem a');
  const sections = document.querySelectorAll('section[id]');

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ------------------------------------------------------------------------
     3.1.5 スマホ専用ハンバーガーメニュー開閉処理
  ------------------------------------------------------------------------ */
  const hamburger = document.getElementById('js-hamburger');
  const headerNav = document.getElementById('js-header-nav');

  const closeHamburgerMenu = () => {
    if (!hamburger || !headerNav) return;
    hamburger.classList.remove('is-open');
    headerNav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  if (hamburger && headerNav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = hamburger.classList.toggle('is-open');
      headerNav.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // メニュー内のリンクを押したら自動でメニューを閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeHamburgerMenu();
      });
    });

    // メニューの外側をタップしたら閉じる
    document.addEventListener('click', (e) => {
      if (headerNav.classList.contains('is-open') && !headerNav.contains(e.target) && !hamburger.contains(e.target)) {
        closeHamburgerMenu();
      }
    });
  }

  // 現在スクロール中のセクションを検知してヘッダーのアンダーラインを更新
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ------------------------------------------------------------------------
     3.2 スムーズスクロール（ページ内リンクの滑らかなスクロール）
  ------------------------------------------------------------------------ */
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || !href) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // ヘッダーの高さを考慮してオフセット計算
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - (headerHeight * 0.8);

        window.scrollTo({
          top: targetPos < 0 ? 0 : targetPos,
          behavior: 'smooth'
        });

        // URLのハッシュを更新（履歴を汚さない）
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     3.3 スクロールフェードインアニメーション（Intersection Observer）
  ------------------------------------------------------------------------ */
  const fadeElements = document.querySelectorAll('.fadein');

  if ('IntersectionObserver' in window && window.innerHeight <= 1400) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scrollin');
          observer.unobserve(entry.target); // 一度表示されたら監視終了
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -5% 0px', // 画面下部より少し手前で発火
      threshold: 0.05
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // 全画面キャプチャ時や古いブラウザ対応：全要素を一括表示
    fadeElements.forEach(el => el.classList.add('scrollin'));
  }

  /* ------------------------------------------------------------------------
     3.4 実績詳細モーダル機能（WORKS MODAL）
  ------------------------------------------------------------------------ */
  const worksModal = document.getElementById('js-works-modal');
  const modalOverlay = document.getElementById('js-modal-overlay');
  const modalClose = document.getElementById('js-modal-close');
  const modalBody = document.getElementById('js-modal-body');
  const workCards = document.querySelectorAll('.works_card');

  /**
   * モーダルを開く処理
   * @param {string} workId - 作品ID
   */
  const openWorksModal = (workId) => {
    const data = worksData[workId];
    if (!data || !worksModal || !modalBody) return;

    // ソリューションリストのHTML生成
    const solutionsHtml = data.solutions.map(item => `<li>${escapeHtml(item)}</li>`).join('');

    // モーダル内部のHTML組み立て
    modalBody.innerHTML = `
      <div class="modal_header">
        <p class="modal_work_category">${escapeHtml(data.category)}</p>
        <h3 class="modal_work_title">${escapeHtml(data.title)}</h3>
        <p class="modal_work_sub">${escapeHtml(data.sub)}</p>
      </div>

      <div class="modal_eyecatch">
        <img src="${escapeHtml(data.eyecatch)}" alt="${escapeHtml(data.title)} モックアップ" loading="lazy">
      </div>

      <table class="modal_meta_table" summary="プロジェクト概要情報">
        <tbody>
          <tr>
            <th scope="row">クライアント</th>
            <td>${escapeHtml(data.client)}</td>
          </tr>
          <tr>
            <th scope="row">サービス領域</th>
            <td>${escapeHtml(data.service)}</td>
          </tr>
          <tr>
            <th scope="row">担当範囲</th>
            <td>${escapeHtml(data.scope)}</td>
          </tr>
          <tr>
            <th scope="row">公開時期</th>
            <td>${escapeHtml(data.year)}</td>
          </tr>
        </tbody>
      </table>

      <section class="modal_section">
        <h4 class="modal_section_title">1. プロジェクトの背景・課題</h4>
        <p class="modal_section_text">${escapeHtml(data.background)}</p>
      </section>

      <section class="modal_section">
        <h4 class="modal_section_title">2. 実施したクリエイティブ施策</h4>
        <ul class="modal_section_list">
          ${solutionsHtml}
        </ul>
      </section>

      <section class="modal_section">
        <h4 class="modal_section_title">3. 成果・クライアントの声</h4>
        <blockquote class="modal_quote">
          ${escapeHtml(data.result)}
        </blockquote>
      </section>
    `;

    // 表示＆スクロール固定
    worksModal.classList.add('is-open');
    worksModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // 閉じるボタンにフォーカスを移動（アクセシビリティ対応）
    if (modalClose) {
      modalClose.focus();
    }
  };

  /**
   * モーダルを閉じる処理
   */
  const closeWorksModal = () => {
    if (!worksModal) return;
    worksModal.classList.remove('is-open');
    worksModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // 各カードへのクリックイベント設定
  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const workId = card.getAttribute('data-work-id');
      if (workId) {
        openWorksModal(workId);
      }
    });
  });

  // モーダルを閉じる各種トリガー
  if (modalClose) modalClose.addEventListener('click', closeWorksModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeWorksModal);

  // ESCキー押下でモーダルを閉じる
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (worksModal && worksModal.classList.contains('is-open')) {
        closeWorksModal();
      }
      closeThanksModal();
    }
  });

  /* ------------------------------------------------------------------------
     3.5 お問い合わせフォーム送信ハンドリング ＆ サンクスモーダル
  ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('js-submit-btn');
  const thanksModal = document.getElementById('js-thanks-modal');
  const thanksOverlay = document.getElementById('js-thanks-overlay');
  const thanksClose = document.getElementById('js-thanks-close');
  const thanksBtn = document.getElementById('js-thanks-btn');

  const openThanksModal = () => {
    if (!thanksModal) return;
    thanksModal.classList.add('is-open');
    thanksModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (thanksBtn) thanksBtn.focus();
  };

  const closeThanksModal = () => {
    if (!thanksModal) return;
    thanksModal.classList.remove('is-open');
    thanksModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (thanksOverlay) thanksOverlay.addEventListener('click', closeThanksModal);
  if (thanksClose) thanksClose.addEventListener('click', closeThanksModal);
  if (thanksBtn) thanksBtn.addEventListener('click', closeThanksModal);

  // フォームバリデーション＆送信処理
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 入力要素の取得
      const messageInput = document.getElementById('form-message');
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');

      // エラーメッセージ要素の取得
      const errorMessage = document.getElementById('error-message');
      const errorName = document.getElementById('error-name');
      const errorEmail = document.getElementById('error-email');

      // エラー表示リセット
      const clearErrors = () => {
        [messageInput, nameInput, emailInput].forEach(input => {
          if (input) input.classList.remove('is-invalid');
        });
        [errorMessage, errorName, errorEmail].forEach(err => {
          if (err) {
            err.textContent = '';
            err.classList.remove('is-visible');
          }
        });
      };

      clearErrors();

      // 1. メッセージ本文チェック
      if (!messageInput || !messageInput.value.trim()) {
        isValid = false;
        if (messageInput) messageInput.classList.add('is-invalid');
        if (errorMessage) {
          errorMessage.textContent = '※ご相談内容（メッセージ本文）を入力してください。';
          errorMessage.classList.add('is-visible');
        }
      }

      // 2. お名前チェック
      if (!nameInput || !nameInput.value.trim()) {
        isValid = false;
        if (nameInput) nameInput.classList.add('is-invalid');
        if (errorName) {
          errorName.textContent = '※お名前を入力してください。';
          errorName.classList.add('is-visible');
        }
      }

      // 3. メールアドレスチェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailInput.value.trim()) {
        isValid = false;
        if (emailInput) emailInput.classList.add('is-invalid');
        if (errorEmail) {
          errorEmail.textContent = '※メールアドレスを入力してください。';
          errorEmail.classList.add('is-visible');
        }
      } else if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        if (emailInput) emailInput.classList.add('is-invalid');
        if (errorEmail) {
          errorEmail.textContent = '※正しいメールアドレスの形式で入力してください（例: name@example.com）。';
          errorEmail.classList.add('is-visible');
        }
      }

      // バリデーションエラー時は最初の無効な入力欄へスクロール
      if (!isValid) {
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // 送信処理（擬似非同期処理）
      if (submitBtn) {
        submitBtn.disabled = true;
        const submitText = submitBtn.querySelector('.submitButton_text');
        const originalText = submitText ? submitText.textContent : 'メッセージを送信する';
        if (submitText) submitText.textContent = '送信中...';

        // 1秒後に送信成功としてサンクスモーダルを表示
        setTimeout(() => {
          submitBtn.disabled = false;
          if (submitText) submitText.textContent = originalText;
          
          // フォームリセット
          contactForm.reset();

          // サンクスモーダルを開く
          openThanksModal();
        }, 900);
      }
    });

    // ユーザーが入力し直した際にエラー表示を解除
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
          const errorEl = document.getElementById(`error-${input.name}`);
          if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('is-visible');
          }
        }
      });
    });
  }

});

/**
 * XSS（クロスサイトスクリプティング）対策用のエスケープ関数
 * @param {string} str - 入力文字列
 * @returns {string} エスケープ後の安全な文字列
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
