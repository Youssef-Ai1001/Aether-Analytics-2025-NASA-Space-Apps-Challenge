import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:nasa_app/core/utils/app_routers.dart';
import '../../../../core/utils/app_colors.dart';
import '../../../../core/utils/app_text_styles.dart';
import 'package:go_router/go_router.dart';

class SuccessAuthScreen extends StatefulWidget {
  final String email;

  const SuccessAuthScreen({super.key, required this.email});

  @override
  State<SuccessAuthScreen> createState() => _SuccessAuthScreenState();
}

class _SuccessAuthScreenState extends State<SuccessAuthScreen> {
  @override
  void initState() {
    super.initState();
    // 🔹 بعد 3 ثواني انتقال تلقائي للصفحة الرئيسية
    Future.delayed(const Duration(seconds: 3), () {
      if (!mounted) return;
      context.pushReplacement(AppRouters.profileSetup, extra: widget.email);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(gradient: AppColors.firstScaffoldGradient),
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 16.h),
            child: SizedBox.expand(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildAnimatedIcon(),
                  SizedBox(height: 16.h),
                  _buildAnimatedTexts(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAnimatedIcon() {
    return Animate(
      effects: [
        ScaleEffect(
          begin: const Offset(0, 0),
          end: const Offset(1, 1),
          curve: Curves.elasticOut,
          duration: 1500.ms,
          // ⬅ خليتها أطول من 1100ms عشان تاخد وقت أطول وتكون أوضح
          delay: 300.ms,
        ),
        FadeEffect(duration: 1500.ms, delay: 300.ms),
      ],
      child: Container(
        padding: EdgeInsets.all(14.r),
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.green,
        ),
        child: Icon(
          Icons.check_circle_outline,
          size: 40.r,
          color: Colors.white,
        ),
      ),
    );
  }

  Widget _buildAnimatedTexts() {
    return Column(
      children: [
        // النص الأول يبدأ بعد انتهاء الايقونة
        Animate(
          effects: [
            FadeEffect(
              duration: 1000.ms,
              delay: 500.ms, // ⬅ يبدأ بعد ما الايقونة تخلص (1500 + 300 تقريبًا)
            ),
          ],
          child: Text(
            "Welcome!",
            textAlign: TextAlign.center,
            style: AppTextStyles.headlineBoldWhiteS28,
          ),
        ),
        SizedBox(height: 4.h),
        // النص التاني يبدأ بعد الأول بشوية
        Animate(
          effects: [
            FadeEffect(
              duration: 1100.ms,
              delay:
                  700.ms, // ⬅ بعد النص الأول بحوالي 300ms عشان يبقى تسلسل طبيعي
            ),
          ],
          child: Text(
            "Successfully verified. Setting up your experience.",
            textAlign: TextAlign.center,
            style: AppTextStyles.bodyRegularWhite70S14,
          ),
        ),
      ],
    );
  }
}
