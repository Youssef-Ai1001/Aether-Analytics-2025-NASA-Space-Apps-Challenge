import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../../core/utils/app_text_styles.dart';

class TodayIsAdviceCard extends StatelessWidget {
  final String advice;

  const TodayIsAdviceCard({super.key, required this.advice});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.green.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(10.r),
        border: Border.all(color: Colors.teal, width: 1.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Today's Advice", style: AppTextStyles.primaryText),
          const SizedBox(height: 10),
          Text(advice, style: AppTextStyles.bodyRegularWhite70S14),
        ],
      ),
    );
  }
}
