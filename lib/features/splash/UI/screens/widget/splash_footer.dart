import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../core/utils/app_text_styles.dart';

class SplashFooter extends StatelessWidget {
  const SplashFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: 0,
      left: 0,
      bottom: 80.h,
      child: Text(
        "Powered by NASA TEMPO",
        textAlign: TextAlign.center,
        style: AppTextStyles.captionRegularGrey400S12,
      ),
    );
  }
}
