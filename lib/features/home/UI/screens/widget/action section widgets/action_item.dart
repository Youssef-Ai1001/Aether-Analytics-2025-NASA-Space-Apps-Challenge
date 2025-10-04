import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../../core/utils/app_text_styles.dart';

class ActionItem extends StatelessWidget {
  final VoidCallback onTap;
  final IconData icon;
  final String label;

  const ActionItem({
    super.key,
    required this.onTap,
    required this.icon,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 8.h),
        decoration: BoxDecoration(
          color: Color(0xFF1A1A1A),
          borderRadius: BorderRadius.circular(10.r),
          border: Border.all(color: Colors.white10, width: 1.0),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: Colors.white70, size: 24.r),
            Text(label, style: AppTextStyles.bodyRegularWhite70S14),
          ],
        ),
      ),
    );
  }
}
