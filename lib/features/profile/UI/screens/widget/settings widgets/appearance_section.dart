import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../../../core/utils/app_text_styles.dart';
import '../build_switch_item.dart';
import '../custom_profile_section.dart';

class AppearanceSection extends StatefulWidget {
  const AppearanceSection({super.key});

  @override
  State<AppearanceSection> createState() => _AppearanceSectionState();
}

class _AppearanceSectionState extends State<AppearanceSection> {
  // Appearance
  bool darkMode = true;

  @override
  Widget build(BuildContext context) {
    return CustomProfileSection(
      icon: Icons.dark_mode_outlined,
      iconColor: Colors.blue,
      title: "Appearance",
      body: Column(
        children: [
          BuildSwitchItem(
            label: "Dark Mode",
            subLabel: "Use dark theme",
            value: darkMode,
            onChanged: (val) => setState(() => darkMode = val),
          ),
          ListTile(
            contentPadding: EdgeInsets.zero,
            title: Text("Language", style: AppTextStyles.bodyRegularWhiteS16),
            subtitle: Text(
              "English (US)",
              style: AppTextStyles.captionRegularGrey400S12,
            ),
            trailing: Icon(
              Icons.arrow_forward_ios,
              size: 16.r,
              color: Colors.white54,
            ),
            onTap: () {},
          ),
        ],
      ),
    );
  }
}
