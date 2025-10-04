// ========================================
// 2. Webアプリケーションのメイン関数
// ========================================

function doGet(e) {
  const htmlTemplate = HtmlService.createTemplateFromFile('index.html');
  htmlTemplate.settings = loadSettings();
  return htmlTemplate.evaluate().setTitle('Google Slide Generator').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function saveSettings(settings) {
  try {
    const storableSettings = Object.assign({}, settings);
    storableSettings.showTitleUnderline = String(storableSettings.showTitleUnderline);
    storableSettings.showBottomBar = String(storableSettings.showBottomBar);
    storableSettings.showDateColumn = String(storableSettings.showDateColumn); // 日付カラム設定を追加
    storableSettings.enableGradient = String(storableSettings.enableGradient);
    PropertiesService.getUserProperties().setProperties(storableSettings, false);
    return {
      status: 'success',
      message: '設定を保存しました。'
    };
  } catch (e) {
    Logger.log(`設定の保存エラー: ${e.message}`);
    return {
      status: 'error',
      message: `設定の保存中にエラーが発生しました: ${e.message}`
    };
  }
}

function saveSelectedPreset(presetName) {
  try {
    PropertiesService.getUserProperties().setProperty('selectedPreset', presetName);
    return {
      status: 'success',
      message: 'プリセット選択を保存しました。'
    };
  } catch (e) {
    Logger.log(`プリセット保存エラー: ${e.message}`);
    return {
      status: 'error',
      message: `プリセットの保存中にエラーが発生しました: ${e.message}`
    };
  }
}

function loadSettings() {
  const properties = PropertiesService.getUserProperties().getProperties();
  return {
    primaryColor: properties.primaryColor || '#4285F4',
    gradientStart: properties.gradientStart || '#4285F4',
    gradientEnd: properties.gradientEnd || '#ff52df',
    fontFamily: properties.fontFamily || 'Noto Sans JP',
    showTitleUnderline: properties.showTitleUnderline === 'false' ? false : true,
    showBottomBar: properties.showBottomBar === 'false' ? false : true,
    showDateColumn: properties.showDateColumn === 'false' ? false : true, // 日付カラム設定を追加（デフォルトtrue）
    enableGradient: properties.enableGradient === 'true' ? true : false,
    footerText: properties.footerText || '© Google Inc.',
    headerLogoUrl: properties.headerLogoUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png',
    closingLogoUrl: properties.closingLogoUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png',
    titleBgUrl: properties.titleBgUrl || '',
    sectionBgUrl: properties.sectionBgUrl || '',
    mainBgUrl: properties.mainBgUrl || '',
    closingBgUrl: properties.closingBgUrl || '',
    driveFolderUrl: properties.driveFolderUrl || '',
    selectedPreset: properties.selectedPreset || 'default'
  };
}

