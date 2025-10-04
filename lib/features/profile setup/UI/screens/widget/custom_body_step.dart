import 'package:flutter/material.dart';
import 'package:nasa_app/features/profile%20setup/UI/screens/widget/custom_icon_circle_steps.dart';
import '../../../../../core/utils/app_text_styles.dart';

class CustomBodyStep extends StatelessWidget {
  final List<Color> gradient;
  final IconData icon;
  final String title;
  final String subTitle;
  final Widget body;
  final String footer;

  const CustomBodyStep({
    super.key,
    required this.gradient,
    required this.icon,
    required this.title,
    required this.subTitle,
    required this.body,
    required this.footer,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        CustomIconCircleSteps(gradient: gradient, icon: icon),
        const SizedBox(height: 20),
        Text(
          title,
          style: AppTextStyles.headlineMediumWhiteS20,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          subTitle,
          style: AppTextStyles.bodyRegularWhite70S14,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 30),
        body,
        const SizedBox(height: 20),
        Text(
          footer,
          style: AppTextStyles.bodyRegularWhite70S14,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
