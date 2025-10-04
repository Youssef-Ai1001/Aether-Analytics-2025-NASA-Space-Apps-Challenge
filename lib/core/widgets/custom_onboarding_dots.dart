import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_colors.dart';

class CustomOnboardingDots extends StatelessWidget {
  final int currentIndex;
  final int count;
  final bool isProgressMode; // 👈 جديد

  const CustomOnboardingDots({
    super.key,
    required this.currentIndex,
    required this.count,
    this.isProgressMode = false, // 👈 Default = false
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(count, (index) {
        final bool isActive = isProgressMode
            ? index <=
                  currentIndex // ✅ Progress Mode → كله لحد index
            : index == currentIndex; // ✅ Normal Mode → واحدة بس

        return Container(
          margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 18.h),
          width: 10.w,
          height: 10.h,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: isActive ? AppColors.primaryColor : Colors.white24,
          ),
        );
      }),
    );
  }
}
