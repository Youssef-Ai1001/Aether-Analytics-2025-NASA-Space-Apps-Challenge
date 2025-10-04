import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'package:nasa_app/core/utils/app_routers.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';
import 'package:nasa_app/features/onboarding/UI/screens/widget/onboarding_page.dart';
import '../../../../core/widgets/custom_onboarding_dots.dart';
import '../../data/models/onboarding_screen_model.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  final List<OnboardingPageModel> _pages = [
    OnboardingPageModel(
      title: "Track Your Air Quality",
      description:
          "Monitor real-time air pollution data from satellites and ground sensors in your area",
      icon: Icons.location_on_outlined,
      gradientColors: [Color(0xFF00C6FF), Color(0xFF0072FF)],
    ),
    OnboardingPageModel(
      title: "Personalized Health Advice",
      description:
          "Get tailored recommendations based on your health conditions and local air quality",
      icon: Icons.favorite_border,
      gradientColors: [Color(0xFF43E97B), Color(0xFF38F9D7)],
    ),
    OnboardingPageModel(
      title: "Stay Informed with Alerts",
      description:
          "Receive timely notifications about air quality changes and health recommendations",
      icon: Icons.notifications_none,
      gradientColors: [Color(0xFF5179FF), Color(0xFF9D55FF)],
    ),
  ];

  void _nextPage() {
    if (_currentIndex < _pages.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    } else {
      context.push(AppRouters.auth);
    }
  }

  void _previousPage() {
    if (_currentIndex > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool isLastPage = _currentIndex == _pages.length - 1;

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(gradient: AppColors.firstScaffoldGradient),
        child: SafeArea(
          child: Column(
            children: [
              CustomOnboardingDots(currentIndex: _currentIndex, count: _pages.length),
              Expanded(
                child: PageView.builder(
                  controller: _pageController,
                  itemCount: _pages.length,
                  onPageChanged: (index) {
                    setState(() => _currentIndex = index);
                  },
                  itemBuilder: (context, index) {
                    return OnboardingPage(page: _pages[index]);
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // زر Back يظهر من الصفحة الثانية
                    if (_currentIndex > 0)
                      InkWell(
                        onTap: _previousPage,
                        child: Text(
                          "Back",
                          style: AppTextStyles.button.copyWith(
                            fontSize: 14.sp,
                            color: Colors.white24,
                          ),
                        ),
                      )
                    else
                      const Spacer(), // space placeholder
                    // زر Next أو Get Started
                    ElevatedButton(
                      onPressed: _nextPage,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.teal,
                        foregroundColor: Colors.white,
                        textStyle: AppTextStyles.button.copyWith(
                          fontSize: 14.sp,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        padding: EdgeInsets.symmetric(
                          horizontal: 20.w,
                          vertical: 12.h,
                        ),
                      ),
                      child: Text(isLastPage ? "Get Started" : "Next"),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
