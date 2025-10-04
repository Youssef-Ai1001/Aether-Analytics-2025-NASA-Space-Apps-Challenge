import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../core/utils/app_colors.dart';
import '../../../../../core/utils/app_text_styles.dart';

class FilterItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final VoidCallback? onTap;

  const FilterItem({
    super.key,
    required this.icon,
    required this.label,
    this.isActive = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final Color backgroundColor = isActive
        ? AppColors.primaryColor
        : Colors.transparent;
    final Color contentColor = isActive ? Colors.white : Colors.white70;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(12),
          // الإطار يظهر فقط عندما يكون غير نشط ليطابق الأزرار الأخرى في الصورة
          border: isActive
              ? null
              : Border.all(color: Colors.white10, width: 1.0),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            // الأيقونة
            Icon(icon, size: 18.r, color: contentColor),
            SizedBox(width: 7.w),
            // النص
            Text(
              label,
              style: AppTextStyles.bodyRegularWhiteS16.copyWith(
                fontSize: 14.sp,
                color: contentColor,
                fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
