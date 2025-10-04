import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/features/profile%20setup/UI/screens/widget/custom_body_step.dart';
import 'package:nasa_app/features/profile%20setup/UI/screens/widget/custom_checkbox_tile.dart';

class HealthStep extends StatelessWidget {
  final Map<String, bool> conditions;
  final Function(String, bool) onConditionChanged;

  const HealthStep({
    super.key,
    required this.conditions,
    required this.onConditionChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 22.w),
      child: CustomBodyStep(
        gradient: const [Color(0xFF43E97B), Color(0xFF38F9D7)],
        icon: Icons.favorite_border,
        title: "Health Sensitivity",
        subTitle:
            "Select any conditions that may make you more sensitive to air pollution",
        // ✅ هنا بنمرر الـ Checkboxes
        body: Column(
          mainAxisSize: MainAxisSize.min,
          children: conditions.keys.map((condition) {
            return CustomCheckboxTile(
              title: condition,
              value: conditions[condition] ?? false,
              onChanged: (val) => onConditionChanged(condition, val ?? false),
            );
          }).toList(),
        ),
        footer:
            "This helps us provide personalized health recommendations. You can skip this step or update it later.",
      ),
    );
  }
}
