import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../../core/utils/app_text_styles.dart';

class PersonalInformationItem extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String title;
  final String subTitle;

  const PersonalInformationItem({
    super.key,
    required this.icon,
    required this.iconColor,
    required this.title,
    required this.subTitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsetsGeometry.all(12),
      decoration: BoxDecoration(
        color: Color(0xFF253141),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 20.r, color: iconColor),
              Text(title, style: AppTextStyles.bodyRegularWhiteS16),
            ],
          ),
          SizedBox(height: 7),
          Padding(
            padding: const EdgeInsets.only(left: 7),
            child: Text(subTitle, style: AppTextStyles.bodyRegularWhite70S14),
          ),
        ],
      ),
    );
  }
}
