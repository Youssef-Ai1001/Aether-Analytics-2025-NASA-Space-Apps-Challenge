import 'package:flutter/material.dart';
import '../build_text_button.dart';
import '../custom_profile_section.dart';

class PrivacyAndSecuritySection extends StatelessWidget {
  const PrivacyAndSecuritySection({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomProfileSection(
      icon: Icons.security,
      iconColor: Colors.green,
      title: "Privacy & Security",
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          BuildTextButton(label: "Data Export", onTap: () {}),
          BuildTextButton(label: "Help & Support", onTap: () {}),
        ],
      ),
    );
  }
}
