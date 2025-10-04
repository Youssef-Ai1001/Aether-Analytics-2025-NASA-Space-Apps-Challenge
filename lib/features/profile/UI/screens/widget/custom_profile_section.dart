import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';

class CustomProfileSection extends StatelessWidget {
  final IconData? icon;
  final Color? iconColor;
  final String? title;
  final Widget body;

  const CustomProfileSection({
    super.key,
    this.icon,
    this.iconColor,
    this.title,
    required this.body,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Color(0xFF1e2939),
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(color: Colors.white54, width: 1.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          //Section Title
          if (title != null)
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    if (icon != null) Icon(icon, color: iconColor, size: 22.r),
                    const SizedBox(width: 8),
                    Text(title!, style: AppTextStyles.headlineMediumWhiteS20),
                  ],
                ),
                const SizedBox(height: 20),
              ],
            ),
          //Section Body
          body,
        ],
      ),
    );
  }
}
