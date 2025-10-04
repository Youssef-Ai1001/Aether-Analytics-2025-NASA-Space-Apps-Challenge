import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';
import '../../../data/models/onboarding_screen_model.dart';

class OnboardingPage extends StatelessWidget {
  final OnboardingPageModel page;

  const OnboardingPage({super.key, required this.page});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          width: 100.w,
          height: 100.h,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              colors: page.gradientColors,
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: Icon(page.icon, size: 50.r, color: Colors.white),
        ),
        const SizedBox(height: 30),
        Text(
          page.title,
          style: AppTextStyles.headlineMediumWhiteS20,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 12),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Text(
            page.description,
            style: AppTextStyles.bodyRegularWhite70S14,
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );
  }
}
