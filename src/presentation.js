// ========================================
// 3. スライド生成メイン処理
// ========================================

/** settingsオブジェクトに基づき、CONFIG内の動的カラーを更新します */
function updateDynamicColors(settings) {
  const primary = settings.primaryColor;
  const mode = settings.themeMode || 'light';
  
  // Generate Apple-style semantic colors
  const semanticColors = generateAppleSemanticColors(primary, mode);
  
  // Apply to CONFIG.COLORS
  CONFIG.COLORS.background_white = semanticColors.background;
  CONFIG.COLORS.background_gray = semanticColors.backgroundSecondary;
  CONFIG.COLORS.faint_gray = semanticColors.backgroundTertiary;
  CONFIG.COLORS.text_primary = semanticColors.text;
  CONFIG.COLORS.primary_color = semanticColors.accent;
  
  // Legacy compatibility
  CONFIG.COLORS.ghost_gray = generateAppleTintedGray(primary, 8, mode === 'light' ? 88 : 30);
  CONFIG.COLORS.table_header_bg = semanticColors.backgroundTertiary;
  CONFIG.COLORS.lane_border = semanticColors.border;
  CONFIG.COLORS.card_border = semanticColors.border;
  CONFIG.COLORS.neutral_gray = semanticColors.textSecondary;
  CONFIG.COLORS.process_arrow = semanticColors.textTertiary;
  CONFIG.COLORS.separator = semanticColors.separator;
  CONFIG.COLORS.card_bg = semanticColors.cardBg;
}

function generateSlidesFromWebApp(slideDataString, settings) {
  try {
    const slideData = JSON.parse(slideDataString);
    return createPresentation(slideData, settings);
  } catch (e) {
    Logger.log(`Error: ${e.message}\nStack: ${e.stack}`);
    throw new Error(`Server error: ${e.message}`);
  }
}

let __SECTION_COUNTER = 0;
let __SLIDE_DATA_FOR_AGENDA = [];

function createPresentation(slideData, settings) {
  updateDynamicColors(settings);
  CONFIG.COLORS.primary_color = settings.primaryColor || CONFIG.COLORS.primary_color;
  CONFIG.FOOTER_TEXT = settings.footerText;
  CONFIG.FONTS.family = settings.fontFamily || CONFIG.FONTS.family;
  CONFIG.LOGOS.header = settings.headerLogoUrl;
  CONFIG.LOGOS.closing = settings.closingLogoUrl;
  CONFIG.BACKGROUND_IMAGES.title = settings.titleBgUrl;
  CONFIG.BACKGROUND_IMAGES.closing = settings.closingBgUrl;
  CONFIG.BACKGROUND_IMAGES.section = settings.sectionBgUrl;
  CONFIG.BACKGROUND_IMAGES.main = settings.mainBgUrl;

  __SLIDE_DATA_FOR_AGENDA = slideData;

  // ファイル名の生成（日付カラムの設定に応じて日付を付与）
  const rawTitle = (slideData[0] && slideData[0].type === 'title' ? String(slideData[0].title || '') : 'Google Slide Generator Presentation');
  const singleLineTitle = rawTitle.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  let finalName;
  if (settings.showDateColumn) {
    // 日付カラムがオンの場合：ファイル名に日付を付与
    const dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy.MM.dd');
    finalName = singleLineTitle ? (singleLineTitle + ' ' + dateStr) : ('Google Slide Generator Presentation ' + dateStr);
  } else {
    // 日付カラムがオフの場合：ファイル名に日付を付与しない
    finalName = singleLineTitle || 'Google Slide Generator Presentation';
  }
  const presentation = SlidesApp.create(finalName);
  presentation.getSlides()[0].remove();

  if (settings.driveFolderId && settings.driveFolderId.trim()) {
    try {
      DriveApp.getFileById(presentation.getId()).moveTo(DriveApp.getFolderById(settings.driveFolderId.trim()));
    } catch (e) {
      Logger.log(`フォルダ移動エラー: ${e.message}`);
    }
  }

  __SECTION_COUNTER = 0;
  const layout = createLayoutManager(presentation.getPageWidth(), presentation.getPageHeight());
  let pageCounter = 0;

  for (const data of slideData) {
    try {
      const generator = slideGenerators[data.type];
      if (data.type !== 'title' && data.type !== 'closing') {
        pageCounter++;
      }
      if (generator) {
        const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
        generator(slide, data, layout, pageCounter, settings);
        
        // スピーカーノートのクリーニング処理
        if (data.notes) {
          const cleanedNotes = cleanSpeakerNotes(data.notes);
          slide.getNotesPage().getSpeakerNotesShape().getText().setText(cleanedNotes);
        }
      }
    } catch (e) {
      Logger.log(`Slide generation skipped: Type: ${data.type}, Error: ${e.message}`);
    }
  }
  return presentation.getUrl();
}

// ========================================
// 4. スライドジェネレーター定義
// ========================================
const slideGenerators = {
  title: createTitleSlide,
  section: createSectionSlide,
  content: createContentSlide,
  agenda: createAgendaSlide,
  compare: createCompareSlide,
  process: createProcessSlide,
  processList: createProcessListSlide,
  timeline: createTimelineSlide,
  diagram: createDiagramSlide,
  cycle: createCycleSlide,
  cards: createCardsSlide,
  headerCards: createHeaderCardsSlide,
  table: createTableSlide,
  progress: createProgressSlide,
  quote: createQuoteSlide,
  kpi: createKpiSlide,
  closing: createClosingSlide,
  bulletCards: createBulletCardsSlide,
  faq: createFaqSlide,
  statsCompare: createStatsCompareSlide,
  barCompare: createBarCompareSlide,
  triangle: createTriangleSlide,
  pyramid: createPyramidSlide,
  flowChart: createFlowChartSlide,
  stepUp: createStepUpSlide,
  imageText: createImageTextSlide
};

