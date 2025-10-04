import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_assets.dart';
import '../../../../../core/utils/app_text_styles.dart';

class SplashContent extends StatelessWidget {
  final Animation<double> animation;

  const SplashContent({super.key, required this.animation});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Image.asset(AppAssets.appIconRemoveBackground, height: 100),
        SizedBox(height: 8.h),
        Text("AirGuard", style: AppTextStyles.headlineBoldWhiteS28),
        Text("NASA TEMPO", style: AppTextStyles.bodyRegularWhite70S14),
        Text(
          "Real-time Air Quality Monitoring",
          style: AppTextStyles.bodyRegularWhiteS16,
        ),
        SizedBox(height: 17.h),
        AnimatedBuilder(
          animation: animation,
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(0, animation.value),
              child: Icon(Icons.air, color: Colors.white, size: 28.r),
            );
          },
        ),
      ],
    );
  }
}
