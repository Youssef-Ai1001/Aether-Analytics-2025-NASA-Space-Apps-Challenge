import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';

enum ButtonType { filled, outlined }

class CustomAppButton extends StatelessWidget {
  final Widget text;
  final IconData? icon;
  final VoidCallback? onPressed;
  final ButtonType type;

  const CustomAppButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.icon,
    this.type = ButtonType.filled,
  });

  @override
  Widget build(BuildContext context) {
    switch (type) {
      case ButtonType.filled:
        return SizedBox(
          width: double.infinity,
          height: 50.h,
          child: ElevatedButton(
            style: ButtonStyle(
              backgroundColor: WidgetStateProperty.resolveWith<Color>((states) {
                if (states.contains(WidgetState.disabled)) {
                  return AppColors.primaryColor.withValues(alpha: 0.4);
                }
                return AppColors.primaryColor;
              }),
              foregroundColor: WidgetStateProperty.resolveWith<Color>((states) {
                if (states.contains(WidgetState.disabled)) {
                  return Colors.white38;
                }
                return Colors.white;
              }),
              textStyle: WidgetStateProperty.all(AppTextStyles.button),
              shape: WidgetStateProperty.all(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.r),
                ),
              ),
              padding: WidgetStateProperty.all(
                EdgeInsets.symmetric(vertical: 12.h),
              ),
            ),
            onPressed: onPressed,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (icon != null) ...[
                  Icon(icon, size: 20.sp),
                  SizedBox(width: 8.w),
                ],
                text,
              ],
            ),
          ),
        );

      case ButtonType.outlined:
        return SizedBox(
          width: double.infinity,
          height: 50.h,
          child: OutlinedButton(
            style: ButtonStyle(
              foregroundColor: WidgetStateProperty.resolveWith<Color>((states) {
                if (states.contains(WidgetState.disabled)) {
                  return AppColors.primaryColor.withValues(alpha: 0.5);
                }
                return AppColors.primaryColor;
              }),
              textStyle: WidgetStateProperty.all(AppTextStyles.button),
              side: WidgetStateProperty.resolveWith<BorderSide>((states) {
                if (states.contains(WidgetState.disabled)) {
                  return BorderSide(
                    color: AppColors.primaryColor.withValues(alpha: 0.5),
                    width: 1.5,
                  );
                }
                return BorderSide(color: AppColors.primaryColor, width: 1.5);
              }),
              shape: WidgetStateProperty.all(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.r),
                ),
              ),
              padding: WidgetStateProperty.all(
                EdgeInsets.symmetric(vertical: 12.h),
              ),
            ),
            onPressed: onPressed,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (icon != null) ...[
                  Icon(icon, size: 20.sp), // ❌ من غير لون
                  SizedBox(width: 8.w),
                ],
                text,
              ],
            ),
          ),
        );
    }
  }
}
