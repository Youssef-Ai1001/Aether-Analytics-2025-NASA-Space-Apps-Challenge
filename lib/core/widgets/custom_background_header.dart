import 'package:flutter/material.dart';
import '../utils/app_colors.dart';

class CustomBackgroundHeader extends StatelessWidget {
  final Widget child;

  const CustomBackgroundHeader({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(right: 20, left: 20, top: 50, bottom: 30),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.secondaryColor, AppColors.secondScaffoldGradient],
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
        ),
      ),
      child: child,
    );
  }
}
