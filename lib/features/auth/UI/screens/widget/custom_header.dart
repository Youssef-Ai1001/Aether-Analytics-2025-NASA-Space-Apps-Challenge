import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';

class CustomHeader extends StatelessWidget {
  final String title;
  final String subTitle;
  final double? height;

  const CustomHeader({
    super.key,
    required this.title,
    required this.subTitle,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: EdgeInsetsGeometry.all(14.r),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.primaryColor,
          ),
          child: Icon(Icons.email_outlined, size: 40.r, color: Colors.white),
        ),
        SizedBox(height: 4.h),
        Text(
          title,
          textAlign: TextAlign.center,
          style: AppTextStyles.headlineBoldWhiteS28,
        ),
        SizedBox(height: 4.h),
        Text(
          subTitle,
          textAlign: TextAlign.center,
          style: AppTextStyles.bodyRegularWhite70S14,
        ),
      ],
    );
  }
}
