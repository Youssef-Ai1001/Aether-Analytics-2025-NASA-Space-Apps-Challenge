import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/core/utils/app_colors.dart';
import '../../../../../../core/utils/app_text_styles.dart';

class PollutantsItem extends StatelessWidget {
  final String title; // مثال: NO₂
  final double value; // مثال: 45
  final String unit; // مثال: ppb
  final String status; // مثال: moderate

  const PollutantsItem({
    super.key,
    required this.title,
    required this.value,
    required this.unit,
    required this.status,
  });

  // لتحديد لون حالة الـ status
  Color get _statusColor {
    switch (status.toLowerCase()) {
      case 'good':
        return Colors.green.shade600;
      case 'moderate':
        return Colors.amber.shade700;
      case 'unhealthy for sensitive':
        return Colors.orange.shade700;
      case 'unhealthy':
        return Colors.red.shade700;
      default:
        return Colors.grey.shade700;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
      decoration: BoxDecoration(
        color: AppColors.secondaryColor,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: Colors.white10, width: 1.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                child: Text(
                  title,
                  style: AppTextStyles.headlineMediumWhiteS20,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              SizedBox(width: 6.w),
              Flexible(
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
                  decoration: BoxDecoration(
                    color: _statusColor.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12.r),
                    border: Border.all(color: _statusColor, width: 1.0),
                  ),
                  child: FittedBox(
                    fit: BoxFit.scaleDown,
                    child: Text(
                      status.toUpperCase(),
                      style: TextStyle(
                        color: _statusColor,
                        fontSize: 10.sp,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 8.h),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Text("$value", style: AppTextStyles.headlineBoldWhiteS28),
          ),
          SizedBox(height: 4.h),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(unit, style: AppTextStyles.bodyRegularWhite70S14),
          ),
        ],
      ),
    );
  }
}
