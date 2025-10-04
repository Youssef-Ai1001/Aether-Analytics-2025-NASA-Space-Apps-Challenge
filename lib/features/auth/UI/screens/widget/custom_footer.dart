import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';

class CustomFooter extends StatelessWidget {
  final String? text1;
  final String text2;
  final String pageRouter;

  const CustomFooter({
    super.key,
    this.text1,
    required this.text2,
    required this.pageRouter,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text.rich(
        TextSpan(
          children: [
            if (text1 != null) // ✅ يظهر فقط لو فيه نص أول
              TextSpan(text: text1, style: AppTextStyles.bodyRegularWhite70S14),
            TextSpan(
              text: text2,
              style: AppTextStyles.bodyRegularWhite70S14.copyWith(
                color: AppColors.primaryColor,
                fontWeight: FontWeight.bold,
              ),
              recognizer: TapGestureRecognizer()
                ..onTap = () => context.push(pageRouter),
            ),
          ],
        ),
      ),
    );
  }
}
