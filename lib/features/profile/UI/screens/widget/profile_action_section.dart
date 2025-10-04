import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconly/iconly.dart';
import 'package:nasa_app/core/utils/app_text_styles.dart';
import 'package:nasa_app/core/widgets/custom_background_header.dart';
import 'filter_item.dart';

class ProfileActionSection extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onTap;

  const ProfileActionSection({
    super.key,
    required this.selectedIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return CustomBackgroundHeader(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Profile", style: AppTextStyles.headlineSemiBoldWhiteS24),
          SizedBox(height: 16.h),

          // Filter Row
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              spacing: 8.w,
              children: [
                FilterItem(
                  icon: IconlyLight.profile,
                  label: "Profile",
                  isActive: selectedIndex == 0,
                  onTap: () => onTap(0),
                ),
                FilterItem(
                  icon: IconlyLight.setting,
                  label: "Settings",
                  isActive: selectedIndex == 1,
                  onTap: () => onTap(1),
                ),
                FilterItem(
                  icon: IconlyLight.info_circle,
                  label: "About",
                  isActive: selectedIndex == 2,
                  onTap: () => onTap(2),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
