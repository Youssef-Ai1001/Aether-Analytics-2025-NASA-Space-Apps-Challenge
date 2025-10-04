import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import 'package:nasa_app/features/auth/UI/screens/success_auth_screen.dart';
import 'package:nasa_app/features/auth/UI/screens/verification_otp_screen.dart';
import 'package:nasa_app/features/onboarding/UI/screens/onboarding_screen.dart';
import 'package:nasa_app/features/profile%20setup/UI/screens/profile_setup_onboarding_screen.dart';
import '../../features/about/UI/screens/about_screen.dart';
import '../../features/alerts/UI/screens/alerts_screen.dart';
import '../../features/auth/UI/screens/auth_screen.dart';
import '../../features/home/UI/screens/home_screen.dart';
import '../../features/home/UI/screens/home_wrapper_screen.dart';
import '../../features/map/UI/screens/map_screen.dart';
import '../../features/profile/UI/screens/profile_screen.dart';
import '../../features/splash/UI/screens/splash_screen.dart';
import '../../features/trending/UI/screens/trending_screen.dart';

abstract class AppRouters {
  static const splash = '/splash';
  static const onboarding = '/onboarding';
  static const auth = '/auth';
  static const verificationOtp = '/verification_otp';
  static const successAuth = '/success_auth';
  static const profileSetup = '/profile_setup';
  static const homeWrapper = '/home_wrapper';
  static const home = '/home';
  static const map = '/map';
  static const trending = '/trending';
  static const alert = '/alert';
  static const profile = '/profile';
  static const about = '/about';
}

// 🛠️ Helper to wrap child with flutter_animate
Widget animatePage(Widget child, {AnimateEffect effect = AnimateEffect.fade}) {
  switch (effect) {
    case AnimateEffect.fade:
      return child.animate().fade(duration: 470.ms);
    case AnimateEffect.slide:
      return child.animate().slide(duration: 400.ms, begin: const Offset(1, 0));
    case AnimateEffect.scale:
      return child.animate().scale(
        duration: 470.ms,
        begin: const Offset(0.8, 0.8),
        end: const Offset(1, 1),
      );
    case AnimateEffect.flip:
      return child.animate().flip(duration: 470.ms);
  }
}

// Enum for different animate effects
enum AnimateEffect { fade, slide, scale, flip }

// 🛣️ Router configuration
final GoRouter router = GoRouter(
  initialLocation: AppRouters.splash,
  routes: [
    GoRoute(
      path: AppRouters.splash,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const SplashScreen(), effect: AnimateEffect.fade),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.onboarding,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(OnboardingScreen(), effect: AnimateEffect.fade),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.auth,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const AuthScreen(), effect: AnimateEffect.slide),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.verificationOtp,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(
          VerificationOtpScreen(email: state.extra as String),
          effect: AnimateEffect.fade,
        ),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.successAuth,
      pageBuilder: (context, state) {
        return CustomTransitionPage(
          key: state.pageKey,
          child: animatePage(
            SuccessAuthScreen(email: state.extra as String),
            effect: AnimateEffect.fade,
          ),
          transitionDuration: const Duration(milliseconds: 600),
          transitionsBuilder: (context, animation, secondaryAnimation, child) =>
              child,
        );
      },
    ),
    GoRoute(
      path: AppRouters.profileSetup,
      pageBuilder: (context, state) {
        return CustomTransitionPage(
          key: state.pageKey,
          child: animatePage(
            ProfileSetupOnboardingScreen(email: state.extra as String),
            effect: AnimateEffect.fade,
          ),
          transitionDuration: const Duration(milliseconds: 600),
          transitionsBuilder: (context, animation, secondaryAnimation, child) =>
              child,
        );
      },
    ),
    GoRoute(
      path: AppRouters.homeWrapper,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(
          const HomeWrapperScreen(),
          effect: AnimateEffect.slide,
        ),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.home,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const HomeScreen(), effect: AnimateEffect.slide),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.map,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const MapScreen(), effect: AnimateEffect.flip),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.trending,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const TrendingScreen(), effect: AnimateEffect.slide),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.alert,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const AlertsScreen(), effect: AnimateEffect.scale),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.profile,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const ProfileScreen(), effect: AnimateEffect.flip),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
    GoRoute(
      path: AppRouters.about,
      pageBuilder: (context, state) => CustomTransitionPage(
        key: state.pageKey,
        child: animatePage(const AboutScreen(), effect: AnimateEffect.slide),
        transitionDuration: const Duration(milliseconds: 600),
        transitionsBuilder: (context, animation, secondaryAnimation, child) =>
            child,
      ),
    ),
  ],
);
