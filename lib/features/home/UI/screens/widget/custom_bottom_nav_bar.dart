import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconly/iconly.dart';
import 'package:nasa_app/core/utils/app_colors.dart';

class CustomBottomNavBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const CustomBottomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 60,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Divider(height: 1, thickness: 1, color: Colors.white24),
          Expanded(
            child: BottomNavigationBar(
              currentIndex: currentIndex,
              onTap: onTap,
              type: BottomNavigationBarType.fixed,
              selectedFontSize: 12.sp,
              unselectedFontSize: 11.sp,
              backgroundColor: Colors.transparent,
              elevation: 0,
              selectedItemColor: AppColors.primaryColor,
              unselectedItemColor: Colors.white70,
              showUnselectedLabels: true,
              items: [
                BottomNavigationBarItem(
                  icon: Icon(IconlyLight.home),
                  activeIcon: Icon(
                    IconlyBold.home,
                    color: AppColors.primaryColor,
                  ),
                  label: "Home",
                ),
                BottomNavigationBarItem(
                  icon: Icon(IconlyLight.danger),
                  activeIcon: Icon(
                    IconlyBold.danger,
                    color: AppColors.primaryColor,
                  ),
                  label: "Alerts",
                ),
                BottomNavigationBarItem(
                  icon: Icon(IconlyLight.user_1),
                  activeIcon: Icon(
                    IconlyBold.user_3,
                    color: AppColors.primaryColor,
                  ),
                  label: "Community",
                ),
                BottomNavigationBarItem(
                  icon: Icon(IconlyLight.setting),
                  activeIcon: Icon(
                    IconlyBold.setting,
                    color: AppColors.primaryColor,
                  ),
                  label: "Profile",
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
