import 'package:flutter/material.dart';
import '../build_text_button.dart';
import '../custom_profile_section.dart';

class OtherSettingsSection extends StatelessWidget {
  const OtherSettingsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomProfileSection(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          BuildTextButton(
            label: "Delete Account",
            onTap: () {},
            backgroundColor: Colors.red.withValues(alpha: 0.2),
            borderColor: Colors.red,
          ),
          BuildTextButton(
            label: "Sign Out",
            onTap: () {},
            backgroundColor: Colors.red.withValues(alpha: 0.2),
            borderColor: Colors.red,
          ),
        ],
      ),
    );
  }
}
