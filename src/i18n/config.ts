import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.bucketList': 'My Bucket List',
      'nav.progress': 'Progress',
      'nav.settings': 'Settings',
      'nav.logout': 'Logout',

      // Hero Section
      'hero.title': 'Track Your Travel Dreams',
      'hero.subtitle': 'Discover, plan, and track your global adventures with our premium travel bucket list platform.',
      'hero.cta': 'Start Your Journey',

      // Authentication
      'auth.login': 'Sign In',
      'auth.register': 'Sign Up',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full Name',
      'auth.rememberMe': 'Remember me',
      'auth.forgotPassword': 'Forgot password?',
      'auth.noAccount': "Don't have an account?",
      'auth.haveAccount': 'Already have an account?',
      'auth.createAccount': 'Create Account',
      'auth.signIn': 'Sign In',

      // Dashboard
      'dashboard.welcome': 'Welcome back',
      'dashboard.quickAdd': 'Quick Add Destination',
      'dashboard.addDestination': 'Add New Destination',
      'dashboard.recentlyAdded': 'Recently Added',
      'dashboard.stats': 'Your Travel Stats',
      'dashboard.countriesVisited': 'Countries Visited',
      'dashboard.countriesPlanned': 'Countries Planned',
      'dashboard.continentsExplored': 'Continents Explored',

      // Destinations
      'destination.visited': 'Visited',
      'destination.planned': 'Planned',
      'destination.wishlist': 'Wishlist',
      'destination.addNew': 'Add Destination',
      'destination.name': 'Destination Name',
      'destination.country': 'Country',
      'destination.bestTime': 'Best Time to Visit',
      'destination.budget': 'Estimated Budget',
      'destination.priority': 'Priority Level',
      'destination.notes': 'Personal Notes',
      'destination.save': 'Save Destination',
      'destination.edit': 'Edit',
      'destination.delete': 'Delete',
      'destination.markVisited': 'Mark as Visited',

      // Progress
      'progress.overall': 'Overall Progress',
      'progress.byContinent': 'Progress by Continent',
      'progress.achievements': 'Achievements',
      'progress.firstCountry': 'First Country Visited',
      'progress.continentExplorer': 'Continent Explorer',
      'progress.worldTraveler': 'World Traveler',

      // Settings
      'settings.profile': 'Profile Settings',
      'settings.language': 'Language',
      'settings.theme': 'Theme',
      'settings.light': 'Light',
      'settings.dark': 'Dark',
      'settings.export': 'Export Data',
      'settings.importData': 'Import Data',

      // Common
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.close': 'Close',
      'common.loading': 'Loading...',
      'common.error': 'An error occurred',
      'common.success': 'Success',
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.dashboard': 'डैशबोर्ड',
      'nav.bucketList': 'मेरी बकेट लिस्ट',
      'nav.progress': 'प्रगति',
      'nav.settings': 'सेटिंग्स',
      'nav.logout': 'लॉग आउट',

      // Hero Section
      'hero.title': 'अपने यात्रा सपनों को ट्रैक करें',
      'hero.subtitle': 'हमारे प्रीमियम यात्रा बकेट लिस्ट प्लेटफॉर्म के साथ अपने वैश्विक रोमांच की खोज, योजना और ट्रैकिंग करें।',
      'hero.cta': 'अपनी यात्रा शुरू करें',

      // Authentication
      'auth.login': 'साइन इन',
      'auth.register': 'साइन अप',
      'auth.email': 'ईमेल',
      'auth.password': 'पासवर्ड',
      'auth.name': 'पूरा नाम',
      'auth.rememberMe': 'मुझे याद रखें',
      'auth.forgotPassword': 'पासवर्ड भूल गए?',
      'auth.noAccount': 'खाता नहीं है?',
      'auth.haveAccount': 'पहले से खाता है?',
      'auth.createAccount': 'खाता बनाएं',
      'auth.signIn': 'साइन इन',

      // Common
      'common.save': 'सेव करें',
      'common.cancel': 'रद्द करें',
      'common.delete': 'डिलीट',
      'common.edit': 'एडिट',
      'common.close': 'बंद करें',
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'एक त्रुटि हुई',
      'common.success': 'सफलता',
    }
  },
  ja: {
    translation: {
      // Navigation
      'nav.dashboard': 'ダッシュボード',
      'nav.bucketList': 'マイバケットリスト',
      'nav.progress': '進捗',
      'nav.settings': '設定',
      'nav.logout': 'ログアウト',

      // Hero Section
      'hero.title': '旅行の夢を追跡',
      'hero.subtitle': 'プレミアム旅行バケットリストプラットフォームで、グローバルな冒険を発見、計画、追跡しましょう。',
      'hero.cta': '旅を始める',

      // Authentication
      'auth.login': 'サインイン',
      'auth.register': 'サインアップ',
      'auth.email': 'メール',
      'auth.password': 'パスワード',
      'auth.name': 'フルネーム',
      'auth.rememberMe': 'ログイン状態を保持',
      'auth.forgotPassword': 'パスワードを忘れましたか？',
      'auth.noAccount': 'アカウントをお持ちでない方',
      'auth.haveAccount': '既にアカウントをお持ちですか？',
      'auth.createAccount': 'アカウント作成',
      'auth.signIn': 'サインイン',

      // Common
      'common.save': '保存',
      'common.cancel': 'キャンセル',
      'common.delete': '削除',
      'common.edit': '編集',
      'common.close': '閉じる',
      'common.loading': '読み込み中...',
      'common.error': 'エラーが発生しました',
      'common.success': '成功',
    }
  },
  fr: {
    translation: {
      // Navigation
      'nav.dashboard': 'Tableau de bord',
      'nav.bucketList': 'Ma liste de souhaits',
      'nav.progress': 'Progrès',
      'nav.settings': 'Paramètres',
      'nav.logout': 'Déconnexion',

      // Hero Section
      'hero.title': 'Suivez vos rêves de voyage',
      'hero.subtitle': 'Découvrez, planifiez et suivez vos aventures mondiales avec notre plateforme premium de liste de souhaits de voyage.',
      'hero.cta': 'Commencez votre voyage',

      // Authentication
      'auth.login': 'Se connecter',
      'auth.register': "S'inscrire",
      'auth.email': 'Email',
      'auth.password': 'Mot de passe',
      'auth.name': 'Nom complet',
      'auth.rememberMe': 'Se souvenir de moi',
      'auth.forgotPassword': 'Mot de passe oublié ?',
      'auth.noAccount': "Vous n'avez pas de compte ?",
      'auth.haveAccount': 'Vous avez déjà un compte ?',
      'auth.createAccount': 'Créer un compte',
      'auth.signIn': 'Se connecter',

      // Common
      'common.save': 'Sauvegarder',
      'common.cancel': 'Annuler',
      'common.delete': 'Supprimer',
      'common.edit': 'Modifier',
      'common.close': 'Fermer',
      'common.loading': 'Chargement...',
      'common.error': 'Une erreur est survenue',
      'common.success': 'Succès',
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.dashboard': 'Panel de control',
      'nav.bucketList': 'Mi lista de deseos',
      'nav.progress': 'Progreso',
      'nav.settings': 'Configuración',
      'nav.logout': 'Cerrar sesión',

      // Hero Section
      'hero.title': 'Rastrea tus sueños de viaje',
      'hero.subtitle': 'Descubre, planifica y rastrea tus aventuras globales con nuestra plataforma premium de lista de deseos de viaje.',
      'hero.cta': 'Comienza tu viaje',

      // Authentication
      'auth.login': 'Iniciar sesión',
      'auth.register': 'Registrarse',
      'auth.email': 'Correo electrónico',
      'auth.password': 'Contraseña',
      'auth.name': 'Nombre completo',
      'auth.rememberMe': 'Recuérdame',
      'auth.forgotPassword': '¿Olvidaste tu contraseña?',
      'auth.noAccount': '¿No tienes una cuenta?',
      'auth.haveAccount': '¿Ya tienes una cuenta?',
      'auth.createAccount': 'Crear cuenta',
      'auth.signIn': 'Iniciar sesión',

      // Common
      'common.save': 'Guardar',
      'common.cancel': 'Cancelar',
      'common.delete': 'Eliminar',
      'common.edit': 'Editar',
      'common.close': 'Cerrar',
      'common.loading': 'Cargando...',
      'common.error': 'Ocurrió un error',
      'common.success': 'Éxito',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;