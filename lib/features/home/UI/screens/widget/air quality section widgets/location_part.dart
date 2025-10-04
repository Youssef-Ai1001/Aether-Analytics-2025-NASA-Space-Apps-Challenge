import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconly/iconly.dart';
import '../../../../../../../core/utils/app_text_styles.dart';

class LocationPart extends StatelessWidget {
  final String location;

  const LocationPart({super.key, required this.location});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Icon(IconlyLight.location, size: 14.r, color: Colors.grey),
        const SizedBox(width: 3),
        Text(location, style: AppTextStyles.captionRegularGrey400S12),
      ],
    );
  }
}
