import { TranslationSet } from "./translation-set";

// tslint:disable:object-literal-sort-keys for better readability
export const portugueseTranslationSet: TranslationSet = {
    trayIconShow: "Mostrar",
    trayIconSettings: "Configurações",
    trayIconQuit: "Sair",

    userConfirmationProceed: "Continuar?",

    noSearchResultsFoundDescription: "",
    noSearchResultsFoundTitle: "Nenhum resultado encontrado",

    refreshingIndexesPending: "Atualizando índices",

    ueliCommandClearCaches: "Limpar cachê",
    ueliCommandClearCachesDescription: "Limpar todo cachê de todos os plugins",
    ueliCommandEditSettingsFile: "Editar arquivo de configuração",
    ueliCommandEditSettingsFileDescription: "Editar o arquivo de configuração com o editor padrão",
    ueliCommandExit: "Fechar",
    ueliCommandExitDescription: "Fechar o ueli",
    ueliCommandOpenSettings: "Configuração",
    ueliCommandOpenSettingsDescription: "Alterar configurações",
    ueliCommandRefreshIndexes: "Atualizar índices",
    ueliCommandRefreshIndexesDescription: "Atualizar os índices de todos os plugins",
    ueliCommandReload: "Recarregar",
    ueliCommandReloadDescription: "Recarregar ueli",

    generalErrorTitle: "Um erro ocorreu",
    generalErrorDescription: "Verificar log para mais detalhes",

    successfullyRefreshedIndexes: "Índices atualizados com sucesso",
    successfullyClearedCaches: "Cachê limpo com sucesso",
    successfullyUpdatedconfig: "Configuração atualizada com sucesso",
    successfullyClearedExecutionLog: "Log de execução limpo com sucesso",

    commandlineSearchResultDescription: "Executar {{command}}",

    noFavoritesFoundDescription: "Seu log de execução está limpo",
    noFavoritesFoundTitle: "Nenhum favorito encontrado",

    // settings
    settings: "Configurações",

    generalSettingsMenuSection: "Geral",
    pluginSettingsMenuSection: "Plugins",

    generalSettings: "Geral",
    generalSettingsLanguage: "Idioma",
    generalSettingsLogExecution: "Log de execução",
    generalSettingsPersistentUserInput: "Manter o input do usuário",
    generalSettingsAutostartApp: "Inicializar com o sistema",
    generalSettingsShowTrayIcon: "Mostrar o icone na bandeja",
    generalSettingsClearCachesOnExit: "Limpar o cachê ao fechar",
    generalSettingsHotKey: "Atalho de teclado",
    generalSettingsRescanIntervalEnabled: "Varredura periódica habilitado",
    generalSettingsRescanInterval: "Intervalo de varredura (em segundos)",
    generalSettingsShowAlwaysOnPrimaryDisplay: "Sempre mostrar na tela principal",
    generalSettingsRememberWindowPosition: "Lembrar da posição na tela",
    generalSettingsExportSettings: "Exportar configuração atual",
    generalSettingsSuccessfullyExportedSettings: "Configuração exportada com sucesso",
    generalSettingsImportSettings: "Importar configuração",
    generalSettingsImportFileFilterJsonFiles: "Arquivos JSON",
    generalSettingsImportErrorInvalidConfig: "Falha na importação da configuração: o conteúdo do arquivo parece ser inválido",
    generalSettingsResetAllSettings: "Resetar todas as configurações",
    generalSettingsResetWarning: "Você tem certeza de resetar todas as configuraçãoes gerais para o padrão? Quer continuar?",
    generalSettingsResetAllSettingsWarning: "Você tem certeza que deseja resetar TODAS as configuraçãoes para o padrão? Quer continuar?",
    generalSettingsClearExecutionLogWarning: "Você tem certeza que deseja limpar o log de execução? Quer continuar?",
    generalSettingsHideMainWindowAfterExecution: "Esconder a janela de log de execução",
    generalSettingsHideMainWindowOnBlur: "Esconder a janela quando perder o foco",
    generalSettingsDecimalSeparator: "Separador decimal",
    generalSettingsCheckingForUpdate: "Verificando se a atualização está disponível",
    generalSettingsDownloadUpdate: "Baixar atualização",
    generalSettingsDownloadingUpdate: "Baixando atualização",
    generalSettingsLatestVersion: "Você está com a versão mais recente!",
    generalSettingsErrorWhileCheckingForUpdate: "Erro durante a tentativa de verificar a atualização",
    clearExecutionLog: "Limpar o log de execução",
    openDebugLog: "Abrir o log de debug",
    openTempFolder: "Abrir a pasta temporária",

    hotkeyKeyBackspace: "Backspace",
    hotkeyKeyDelete: "Delete",
    hotkeyKeyDown: "Baixo",
    hotkeyKeyEnd: "End",
    hotkeyKeyEscape: "Esc",
    hotkeyKeyHome: "Home",
    hotkeyKeyInsert: "Insert",
    hotkeyKeyLeft: "Esquerda",
    hotkeyKeyPageDown: "PageDown",
    hotkeyKeyPageUp: "PageUp",
    hotkeyKeyPlus: "+",
    hotkeyKeyReturn: "Enter",
    hotkeyKeyRight: "Direita",
    hotkeyKeySpace: "Espaço",
    hotkeyKeyTab: "Tab",
    hotkeyKeyUp: "Cima",
    hotkeyModifierAlt: "Alt",
    hotkeyModifierAltGr: "AltGr",
    hotkeyModifierCommand: "Cmd",
    hotkeyModifierControl: "Ctrl",
    hotkeyModifierOption: "Option",
    hotkeyModifierShift: "Shift",
    hotkeyModifierSuper: "Super",

    mouseSupport: "Mouse support",
    mouseSupportDoubleClick: "Double click",
    mouseSupportSingleClick: "Single click",
    mouseSupportDisabled: "Disabled",

    appearanceSettings: "Aparência",
    appearanceSettingsWindowWidth: "Largura da janela (em pixels)",
    appearanceSettingsMaxSearchResultsPerPage: "Número máximo de resultados por página",
    appearanceSettingsSearchResultHeight: "Altura máxima da pesquisa (em pixels)",
    appearanceSettingsSmoothScrolling: "Rolagem suave",
    appearanceSettingsUserInputHeight: "Altura do campo de pesquisa (em pixels)",
    appearanceSettingsShowDescriptionOnAllSearchResults: "Mostrar a descrição de todos os resultados",
    appearanceSettingsShowSearchIcon: "Mostrar o icone no campo de pesquisa",
    appearanceSettingsShowSearchResultNumbers: "Mostrar os números dos resultados",
    appearanceSettingsResetWarningMessage: "Você tem certeza que deseja resetar todas as configurações de aparência? Quer continuar?",
    appearanceSettingsAllowTransparentBackground: "Habilitar o fundo transparente",
    appearanceSettingsFontFamily: "Família de fontes",
    appearanceSettingsUserInputBorderRadius: "Raio da borda do campo de pesquisa",
    appearanceSettingsUserInputBottomMargin: "Margem inferior do campo de pesquisa (em pixels)",
    appearanceSettingsSearchResultsBorderRadius: "Raio da borda dos resultados",
    appearanceSettingsScrollbarBorderRadius: "Raio da borda da barra de rolagem",
    appearanceSettingsBorderRadiusDescription: "Este é um valor em css, então você precisa adicionar 'px' da seguinte forma '10px', ou separar os lados deste jeito '10px 0px 10px 5px'",

    settingsUserInputTitle: "Entrada do usuário",
    settingsSearchResultsBoxTitle: "Caixa de resultados de pesquisa ",
    settingsScrollbarTitle: "Barra de rolagem",
    settingsGeneralTitle:"Geral",

    colorThemeSettings: "Tema de cores",
    colorThemeSettingsImportColorTheme: "Importar tema de cores",
    colorThemeSettingsExportColorTheme: "Exportar tema de cores",
    colorThemeSettingsResetWarning: "Você tem certeza que deseja resetar todas as configurações de cores? Quer continuar?",
    colorThemeExportSucceeded: "Tema de cores exportado com sucesso",
    colorThemeExportFailed: "Falha na exportação do tema de cores",
    colorThemeImportSucceeded: "Tema de cores importado com sucesso",
    colorThemeImportFailed: "Falha na importação do tema de cores",
    colorThemeInvalidColorTheme: "Tema de cores inválido",
    colorThemePresets: "Predefinições",
    colorthemeUserInputBackgroundColor: "Cor do fundo do campo de pesquisa",
    colorThemeUserInputTextColor: "Cor do texto do campo de pesquisa",
    colorThemeSearchResultsBackgroundColor: "Cor do fundo dos resultados",
    colorThemeSearchResultsItemActiveBackgroundColor: "Cor do fundo do resultado selecionado",
    colorThemeSearchResultsItemActiveTextColor: "Cor do texto do resultado selecionado",
    colorThemeSearchResultsItemActiveDescriptionColor: "Cor da descrição do resultado selecionado",
    colorThemeSearchResutlsItemNameTextColor: "Cor do texto do nome dos resultados",
    colorThemeSearchResultsItemDescriptionTextColor: "Cor do texto da descrição dos resultados",
    colorThemeScrollbarForegroundColor: "Cor da barra de rolagem",
    colorThemeScrollbarBackgroundColor: "Cor do fundo da barra de rolagem",

    colorPicker: "Seletor de cor",

    applicationSearchSettings: "Procurar um aplicativo",
    applicationSearchSettingsDescription: `Este plugin procura por aplicativos no seu computador. Você pode especificar as pastas onde seus aplicativos estão instalados e quais extenções devem ser usadas para reconhecer um aplicativo.`,
    applicationSearchSettingsApplicationFolders: "Pastas de aplicativos",
    applicationSearchSettingsApplicationFolder: "Pasta do aplicativo",
    applicationSearchSettingsFolderPath: "Caminho da pasta",
    applicationSearchSettingsRemoveAction: "Remover",
    applicationSearchSettingsAddApplicationFolder: "Adicionar pasta de aplicativo",
    applicationSearchSettingsApplicationFileExtensions: "Extenções de aplicativos",
    applicationSearchSettingsApplicationFileExtension: "Extenção do arquivo",
    applicationSearchSettingsAddApplicationFileExtension: "Adicionar extenção de arquivo",
    applicationSearchSettingsInvalidFileExtensionErrorMessage: `"{{value}}" não é uma extenção válida`,
    applicationSearchSettingsNotAFolderErrorMessage: `"{{value}} não é uma pasta"`,
    applicationSearchSettingsDoesNotExistErrorMessage: `"{{value}} não existe"`,
    applicationSearchSettingsFolderValidationError: `Ocorreu um erro na tentativa de validar "{{value}}"`,
    applicationSearchSettingsUseNativeIcons: "Usar ícones nativos (desligar pode resultar em uma performance melhor)",

    searchEngineSettings: "Motor de busca",
    searchEngineSettingsDescription: `O motor de busca é usado para pré-indexar itens como aplicativos, atalhos e comandos/configurações do sistema operacional.`,
    searchEngineSettingsFuzzyness: "Imprecisão",
    searchEngineSettingsFuzzynessDescription: "0 = preciso, 1 = impreciso",
    searchEngineSettingsStrict: "Preciso",
    searchEngineSettingsFuzzy: "Impreciso",
    searchEngineSettingsBlacklist: "Lista de banimento",
    searchEngineSettingsMaxSearchResults: "Número máximo de resultados",
    searchEngineSettingsResetWarning: "Você tem certeza que deseja resetar todas as configurações do motor de busca? Quer continuar?",

    shortcutSettings: "Atalhos",
    shortcutSettingsDescription: `Este plugin te habilita a abrir rapidamente arquivos ou sites configurando seus próprios atalhos.`,
    shortcutSettingsTableType: "Tipo",
    shortcutSettingsTableName: "Nome",
    shortcutSettingsTableExecutionArgument: "Execução do argumento",
    shortcutSettingsTableDescription: "Descrição",
    shortcutSettingsTableTags: "Tags",
    shortcutSettingsTableIcon: "Ícone",
    shortcutSettingsTableEdit: "Editar",
    shortcutSettingsTableDelete: "Deletar",
    shortcutSettingsAddShortcut: "Adicionar atalho",
    shortcutSettingsEditModalImageUrl: "URL da imagem",
    shortcutSettingsEditModalSvgString: "SVG string",
    shortcutSettingsEditModalColor: "Cor",
    shortcutSettingsEditModalGoogleWebsite: "Página do Google",
    shortcutSettingsEditModalDownloadsFolder: "Pasta de Downloads",
    shortcutSettingsEditModalCommand: "Comando",
    shortcutSettingsInvalidShortcutErrorMessage: "Atalho inválido",
    shortcutSettingsTagPlaceholder: "Adicione uma tag ou pressione Enter",
    shortcutSettingsTypeUrl: "URL",
    shortcutSettingsTypeCommandlineTool: "Linha de comando",
    shortcutSettingsEditModalCommandLinetoolDescription: "Editar arquivo no Visual Studio Code",
    shortcutSettingsNeedsUserConfirmation: "Precisa de confirmação antes de executar",

    translationSettingsTranslation: "Tradução",
    translationSettingsDescription: `Este plugin te habilita a traduzir palavras ou frases curtas rapidamente. Ele usa uma API não-oficial (https://github.com/imankulov/linguee-api) para o Linguee (https://linguee.de) e pode ficar instável.`,
    translationSettingsDebounceDelay: "Tempo de resposta (em milisegundos)",
    translationSettingsMinSearchTermLength: "Tamanho minimo do termo de pesquisa",
    translationSettingsPrefix: "Prefixo",
    translationSettingsSourceLanguage: "Idioma de origem",
    translationSettingsTargetLanguage: "Idioma alvo",

    everythingSearch: "Pesquisa com Everything",
    everythingSearchSettingDescription: `Este plugin te habilita a usar a pesquisa do Everything para encontrar arquivos e pastas no seu sistema de arquivos local. Você precisa ter o "Everything" instalado e o "Everything Command-line Interface" disponível em https://www.voidtools.com/downloads/. Após ambos instalados, especifique o caminho do arquivo 'es.exe' abaixo.`,
    everythingSearchPathToBinary: `Caminho do "es.exe"`,
    everythingSearchPrefix: "Prefixo",
    everythingSearchMaxSearchResults: "Número máximo de resultados",
    everythingSearchPathToBinaryFilterName: "Arquivos executáveis",

    mdfindSearch: "Pesquisa com mdfind",
    mdfindSettingsDescription: "Este plugin te habilita a usar a pesquisa nativa do macOS para encontrar arquivos e pastas no sistema de arquivos local.",
    mdfindSearchDebounceDelay: "Tempo de resposta (em milisegundos)",
    mdfindSearchPrefix: "Prefixo",
    mdfindSearchMaxSearchResults: "Número máximo de resultados",

    websearch: "Pesquina na internet",
    websearchSettingDescription: `Este plugin te habilita a pesquisar rapidamente na internet com o seu motor de pesquisa favorito definindo seus motores de busca favoritos.`,
    websearchEngines: "Motores de busca",
    websearchEditingModalTitleAdd: "Adicionar motores de busca ",
    websearchEditingModalTitleEdit: "Editar motores de busca",
    websearchName: "Nome",
    websearchPrefix: "Prefixo",
    websearchUrl: "URL",
    websearchSuggestionUrl: "Sugestão URL",
    websearchIcon: "Ícone",
    websearchPriority: "Prioridade",
    websearchIsFallback: "Contingência",
    websearchEncodeSearchTerm: "Codificar termo de pesquisa",
    websearchInvalidWebsearchEngine: "Motor de pesquisa inválido",
    websearchDescription: `Procurar em {{websearch_engine}} por "{{search_term}}"`,

    fileBrowser: "Navegador de arquivos",
    fileBrowserSettingsDescription: `Este plugin te habilita a navegar pelo seus sistema de arquvios local. Para começar você tem que inserir um caminho absoluto válido.`,
    fileBrowserSettingsMaxSearchResults: "Número máximo de resultados",
    fileBrowserOptionsShowHiddenFiles: "Mostrar arquivos ocultos",
    fileBrowserOptionsBlackList: "Lista de banimento",
    fileBrowserOptionsBlackListPlaceholder: "Nome do arquivo ou pasta",

    operatingSystemCommands: "Comandos do sistema",
    operatingSystemCommandsSettingsDescription: `Comandos do sistema operacional são comandos simples para controlar seu sistema operacional. Ex.: Desligar ou reiniciar seu computador.`,

    operatingSystemSettings: "Configurações do sistema",
    operatingSystemSettingsSettingsDescription: "Este plugin te habilita a encontrar rapidamente as configurações do sistema operacional.",

    macOsShutdown: "Desligar",
    macOsShutdownDescription: "Desliga o computador",
    macOsRestart: "Reiniciar",
    macOsRestartDescription: "Reiniciar o computador",
    macOsLogout: "Sair",
    macOsLogoutDescription: "Sair do usuário atual",
    macOsSleep: "Dormir",
    macOsSleepDescription: "Colocar o computador para dormir",
    macOsLock: "Travar",
    macOsLockDescription: "Travar o computador",

    windowsShutdown: "Desligar",
    windowsShutdownDescription: "Desligar o computador",
    windowsRestart: "Reiniciar",
    windowsRestartDescription: "Reiniciar o computador",
    windowsSignout: "Sair",
    windowsSignoutDescription: "Sair do usuário atual",
    windowsLock: "Travar",
    windowsLockDescription: "Travar o computador",
    windowsSleep: "Dormir",
    windowsSleepDescription: "Colocar o computador para dormir",
    windowsHibernation: "Hibernar",
    windowsHibernationDescription: "Colocar o computador no modo hibernação",

    calcuator: "Calculadora",
    calculatorCopyToClipboard: "Pressione Enter para copiar para a área de transferência",
    calculatorDescription: "Este plugin te possibilita realizar cálculos simples rapidamente.",
    calculatorPrecision: "Precisão",

    openUrlWithBrowser: "Abrir com o navegador",
    url: "URL",
    urlDescription: "Este plugin te habilita a rapidamente abrir um site apenas digitando o URL.",
    urlDefaultProtocol: "Protocolo padrão",

    email: "E-mail",
    emailSettingsDescription: "Este plugin te habilita a começar a escrever um e-mail rapidamente apenas digitando um endereço de e-mail.",
    openNewMail: "Abrir novo e-mail",

    currencyConverter: "Converter moeda",
    currencyConverterDescription: "Este plugin te habilita a converter moedas rapidamente. As taxas de conversão são providas por https://exchangeratesapi.io/.",
    currencyConverterPrecision: "Precisão",
    currencyConverterCopyToClipboard: "Pressione Enter para copiar para a área de transferência",

    workflows: "Workflows",
    workflowSettingsDescription: "Este plugin te habilita a executar múltiplas tarefas de uma vez.",
    workflowSettingsAddWorkflow: "Adicionar workflow",
    workflowName: "Nome",
    workflowNamePlaceholder: "Adicione o nome do workflow aqui",
    workflowDescription: "Descrição",
    workflowDescriptionPlaceholder: "Adicione uma descrição do seu workflow aqui",
    workflowTags: "Tags",
    workflowIcon: "Ícone",
    workflowExecutionSteps: "Etapas de execução",
    workflowExecutionArgumentType: "Tipo de argumento",
    wofkflowExecutionArgumentTypeCommandlineTool: "Ferramenta de linha de comando",
    workflowExecutionArgumentTypeUrl: "URL",
    workflowInvalidExecutionStep: "Etapa de execução inválida",
    workflowInvalidWorkflow: "Workflow inválido",
    workflowNeedsUserConfirmationBeforeExecution: "Precisa de confirmação antes de executar",

    commandline: "Linha de comando",
    commandlinePrefix: "Prefixo",
    commandlineSettingsDescription: "Este plugin te habilita a executar linhas de comando rapidamente.",
    commandlineShell: "Shell",

    simpleFolderSearch: "Pesquisa simples em pasta",
    simpleFolderSearchDescription: "Este plugin te habilita a pesquisar rapidamente por arquivos ou pastas",
    simpleFolderSearchRecursive: "Escaneamento recursivo",
    simpleFolderSearchExcludeHiddenFiles: "Excluir arquivos ocultos",
    simpleFolderSearchFolderPath: "Caminho da pasta",
    simpleFolderSearchAddFolder: "Adicionar pasta",
    simpleFolderSearchEditFolder: "Editar pasta",

    uwpSettingsDescription: "Este plugin te habilita a encontrar aplicativos UWP instalados.",

    colorConverter: "Converter cor",
    colorConverterDescription: "Este plugin te habilita a rapidamente converter cores em diferentes formatos.",
    colorConverterShowColorPreview: "Pré-visualizar as cores",

    dictionary: "Dicionário",
    dictionaryDescription: "Este plugin te habilita a checar rapidamente definições e sinônimos de palavras. Ele usa uma API não-oficial do Google Dictionary (https://googledictionaryapi.eu-gb.mybluemix.net/)",
    dictionaryPrefix: "Prefixo",
    dictionaryMinSearchTermLength: "Tamanho mínimo do termo de pesquisa",
    dictionaryDebounceDelay: "Tempo de resposta (em milisegundos)",

    browserBookmarks: "Favoritos do navegador",
    browserBookmarksDescription: "Este plugin te habilita a procurar em seus favoritos de navegador.",
    browserBookmarksBrowser: "Navegador",
    browserBookmarksUseFavicons: "Usar favicons",
    browserBookmark: "Favoritos",

    cancel: "Cancelar",
    save: "Salvar",
    add: "Adicionar",
    remove: "Remover",
    edit: "Editar",
    forExample: "Por exemplo",
    example: "Exemplo",
    iconType: "Tipo do ícone",
    iconTypeColor: "Cor",
    showFullFilePath: "Mostrar o caminho completo do arquivo",
    yes: "Sim",
    no: "Não",
    resetToDefault: "Resetar ao padrão?",
    resetPluginSettingsToDefaultWarning: "Você tem certeza de resetar todas as configuraçãoes deste plugin para o padrão? Quer continuar?",
    filePath: "Caminho do arquivo",
    folderPath: "Caminho da pasta",
    chooseFile: "Escolher o arquivo",
    chooseFolder: "Escolher a pasta",
    restartRequired: "Necessário reiniciar",

    controlPanel: "Painel de controle",
    controlPanelSettingsDescription: "Este plugin te habilita a rapidamente encontrar itens do painel de controle.",
};
