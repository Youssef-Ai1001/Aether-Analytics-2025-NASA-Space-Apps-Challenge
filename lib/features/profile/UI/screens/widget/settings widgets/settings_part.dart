import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/settings%20widgets/appearance_section.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/settings%20widgets/notification_section.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/settings%20widgets/other_settings_section.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/settings%20widgets/privacy_and_security_section.dart';

class SettingsPart extends StatelessWidget {
  const SettingsPart({super.key});

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
      sliver: SliverList(
        delegate: SliverChildListDelegate([
          const NotificationSection(),
          SizedBox(height: 16.h),
          const AppearanceSection(),
          SizedBox(height: 16.h),
          const PrivacyAndSecuritySection(),
          SizedBox(height: 16.h),
          const OtherSettingsSection(),
          SizedBox(height: 16.h),
        ]),
      ),
    );
  }
}
