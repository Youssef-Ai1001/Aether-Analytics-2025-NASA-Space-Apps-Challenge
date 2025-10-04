import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../../core/utils/app_colors.dart';
import '../../../../../../core/utils/app_text_styles.dart';

class BulletPointItem extends StatelessWidget {
  final String text;
  final Color bulletColor;

  const BulletPointItem({
    super.key,
    required this.text,
    this.bulletColor = AppColors.primaryColor,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: 12.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            margin: EdgeInsets.only(top: 8.h, right: 8.w),
            width: 8.w,
            height: 8.w,
            decoration: BoxDecoration(
              color: bulletColor,
              shape: BoxShape.circle,
            ),
          ),
          Expanded(child: Text(text, style: AppTextStyles.bodyRegularWhiteS16)),
        ],
      ),
    );
  }
}
