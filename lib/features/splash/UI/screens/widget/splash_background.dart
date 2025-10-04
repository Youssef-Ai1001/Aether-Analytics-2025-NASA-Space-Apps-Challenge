import 'package:flutter/material.dart';
import '../../../../../core/utils/app_colors.dart';

class SplashBackground extends StatelessWidget {
  const SplashBackground({super.key});

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: Container(
        decoration: BoxDecoration(gradient: AppColors.firstScaffoldGradient),
      ),
    );
  }
}
