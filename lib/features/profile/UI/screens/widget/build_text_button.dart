import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../core/utils/app_text_styles.dart';

class BuildTextButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  final Color? backgroundColor;
  final Color borderColor;

  const BuildTextButton({
    super.key,
    required this.label,
    required this.onTap,
    this.backgroundColor = Colors.black12,
    this.borderColor = Colors.black,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          onTap: onTap,
          child: Container(
            padding: EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: backgroundColor,
              borderRadius: BorderRadius.circular(12.r),
              border: Border.all(color: borderColor, width: 1.0),
            ),
            child: Text(label, style: AppTextStyles.bodyRegularWhite70S14),
          ),
        ),
        SizedBox(height: 7),
      ],
    );
  }
}
