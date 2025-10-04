import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../core/utils/app_colors.dart';
import '../../../../../core/utils/app_text_styles.dart';

class BuildSwitchItem extends StatelessWidget {
  final String label;
  final String? subLabel;
  final bool value;
  final Function(bool) onChanged;

  const BuildSwitchItem({
    super.key,
    required this.label,
    this.subLabel,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: AppTextStyles.bodyRegularWhiteS16),
                  if (subLabel != null)
                    Text(
                      subLabel!,
                      style: AppTextStyles.captionRegularGrey400S12,
                    ),
                ],
              ),
            ),
            Switch(
              value: value,
              onChanged: onChanged,
              activeColor: AppColors.primaryColor,
            ),
          ],
        ),
        SizedBox(height: 8.h),
        Divider(),
      ],
    );
  }
}
