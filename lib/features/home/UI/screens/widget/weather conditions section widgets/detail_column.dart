import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../../../../core/utils/app_text_styles.dart';

// الكارد الفرعي القابل لإعادة الاستخدام لتمثيل كل قياس
class DetailColumn extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String value;
  final String label;

  const DetailColumn({
    super.key,
    required this.icon,
    required this.iconColor,
    required this.value,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // الأيقونة
          Icon(icon, color: iconColor, size: 30.sp),
          SizedBox(height: 8.h),

          // القيمة الرئيسية (مثال: 72°F)
          Text(value, style: AppTextStyles.headlineMediumWhiteS20),
          SizedBox(height: 4.h),

          // التسمية أو الوصف (مثال: Temperature)
          Text(label, style: AppTextStyles.bodyRegularWhite70S14),
        ],
      ),
    );
  }
}
